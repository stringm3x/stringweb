"use client";

import { useEffect, useRef, useState } from "react";
import { Boton } from "@/app/components/ui/Boton";
import { useCaptura } from "../../Captura";
import { Confirmar } from "../Confirmar";
import { Diagnostico } from "../Diagnostico";
import { BarraAcciones } from "../piezas";
import { usePantallaEncendida } from "../usePantallaEncendida";
import { Inicio } from "./Inicio";
import { NivelNicho } from "./NivelNicho";
import { armarResumenLlamada } from "@/app/lib/interno/llamada/resumen";
import { ResumenLlamada } from "./ResumenLlamada";
import { Objeciones } from "./Objeciones";
import { Reloj, tramoDelMinuto, useMinuto } from "./Reloj";
import { Tramo } from "./Tramo";
import { Tramos } from "./Tramos";
import { hayDatosLlamada, useLlamada } from "./useLlamada";

// La llamada de diagnóstico con los nichos nuevos (lote 25). `contenido`
// (guion y fichas) llega como props desde el servidor, después de
// exigirCarlos(). Las notas viven solo en esta pestaña (useLlamada).
// "Gimnasio → Boaz Pro" monta la herramienta del lote 20 con el giro fijo.
// `contenido.empresa` trae la nota de Empresa (boceto y mínimo) de
// precios-interno.js, ya leída en el servidor: solo la ve Carlos.
// `contenido.diagnostico` = { contenido, ofertas } de la herramienta del lote
// 20, también leídos en el servidor (lote 25).

const COMPACTO = "w-full !px-3";

export function Llamada({ contenido }) {
  const { guion, nichos, empresa, diagnostico } = contenido;
  const T = guion.TEXTOS;
  const { llamada, cambiar, terminar, lista } = useLlamada();
  const [gimnasio, setGimnasio] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const { setHayDatos } = useCaptura();
  const titulo = useRef(null);
  const hay = hayDatosLlamada(llamada);
  const minuto = useMinuto(llamada.inicio);

  usePantallaEncendida();

  // La barra de /interno pregunta antes de "Salir" si hay notas.
  useEffect(() => {
    if (!gimnasio) setHayDatos(hay);
  }, [hay, gimnasio, setHayDatos]);

  // Cerrar la pestaña sí borra las notas: el navegador pregunta antes.
  useEffect(() => {
    if (!hay || gimnasio) return;
    const avisar = (evento) => {
      evento.preventDefault();
      evento.returnValue = "";
    };
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [hay, gimnasio]);

  // Al cambiar de pantalla, el foco va al título nuevo.
  const pantalla = `${llamada.pantalla}-${llamada.tramo}`;
  const anterior = useRef(pantalla);
  useEffect(() => {
    if (anterior.current === pantalla) return;
    anterior.current = pantalla;
    titulo.current?.focus();
    window.scrollTo({ top: 0 });
  }, [pantalla]);

  if (gimnasio) {
    return <Diagnostico
        diagnostico={diagnostico}
        giroFijo="gimnasio"
        onVolver={() => setGimnasio(false)}
        textoVolver={T.gimnasio.volver}
      />;
  }

  // Hasta leer la pestaña no se pinta nada: así no parpadea el inicio vacío.
  if (!lista) return null;

  const nicho = nichos.find((n) => n.id === llamada.nicho && !n.enPausa);
  const tramo = guion.TRAMOS[llamada.tramo];
  const delReloj = tramoDelMinuto(guion.TRAMOS, minuto);
  const ultimo = guion.TRAMOS.length - 1;
  const enLlamada = llamada.pantalla === "llamada" && tramo && nicho;
  const enNivel = llamada.pantalla === "nivel" && nicho;
  const enResumen = llamada.pantalla === "resumen" && nicho;
  const enCurso = enLlamada || enNivel || enResumen;
  const generado = enResumen ? armarResumenLlamada(llamada, nicho, T) : "";
  const resumen = llamada.editado ? llamada.editado.texto : generado;

  const empezar = () => cambiar({ pantalla: "llamada", tramo: 0, inicio: llamada.inicio ?? Date.now() });
  const irATramo = (i) => cambiar({ tramo: i });
  const anteriorTramo = () => (llamada.tramo > 0 ? irATramo(llamada.tramo - 1) : cambiar({ pantalla: "inicio" }));
  const notar = (id, valor) => cambiar({ notas: { ...llamada.notas, [id]: valor } });
  // Lo del nicho se guarda bajo su id: cambiar de nicho no mezcla nada.
  const porNicho = (campo, valor) => cambiar({ [campo]: { ...llamada[campo], [nicho.id]: valor } });
  const capturar = (campo, valor) => porNicho("cuenta", { ...(llamada.cuenta[nicho.id] ?? {}), [campo]: valor });
  const copiar = () => {
    navigator.clipboard?.writeText(resumen).then(
      () => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      },
      () => {},
    );
  };
  const terminarConfirmado = () => {
    setConfirmando(false);
    terminar();
  };

  return (
    <div className="flex flex-col gap-space-5 pb-[220px]">
      <h1 className="sr-only">Diagnóstico</h1>
      {enCurso ? (
        <>
          {/* En la llamada, arriba fijos: el reloj y las objeciones. */}
          <div className="sticky top-0 z-10 -mx-4 -mt-space-5 flex min-h-[60px] items-center justify-between gap-space-3 border-b border-borde bg-fondo px-4 py-2">
            <Reloj minuto={minuto} tramo={delReloj} textos={T.reloj} />
            <Objeciones objeciones={nicho.objeciones} textos={T.objeciones} />
          </div>
          <p className="-mt-space-2 text-pequeno text-texto-suave">{T.aviso}</p>
        </>
      ) : (
        <p className="sticky top-0 z-10 -mx-4 -mt-space-5 border-b border-borde bg-fondo px-4 py-3 text-pequeno text-texto-suave">
          {T.aviso}
        </p>
      )}

      {llamada.pantalla === "inicio" && (
        <>
          <h2 ref={titulo} tabIndex={-1} className="text-subtitulo focus:outline-none">
            {T.inicio.titulo}
          </h2>
          <Inicio
            llamada={llamada}
            nichos={nichos}
            tipos={guion.TIPOS_DUENO}
            textos={T}
            onCambiar={cambiar}
            onGimnasio={() => setGimnasio(true)}
          />
        </>
      )}

      {enLlamada && (
        <>
          <Tramos
            tramos={guion.TRAMOS}
            actual={llamada.tramo}
            delReloj={delReloj?.id}
            onIr={irATramo}
            textos={T.tramos}
          />
          <Tramo
            key={tramo.id}
            tramo={tramo}
            nicho={nicho}
            llamada={llamada}
            guion={guion}
            onNota={notar}
            onTipo={(tipo) => cambiar({ tipo })}
            onCuenta={capturar}
            onPrioridad={(id) => porNicho("prioridad", id)}
            onCita={(parcial) => cambiar({ cita: { ...llamada.cita, ...parcial } })}
            tituloRef={titulo}
          />
          <Boton variante="texto" onClick={() => setConfirmando(true)} flecha={false} className="self-start">
            {T.terminar}
          </Boton>
        </>
      )}

      {enNivel && (
        <>
          <NivelNicho
            nicho={nicho}
            marcadas={llamada.reglas[nicho.id] ?? []}
            onCambiar={(marcadas) => porNicho("reglas", marcadas)}
            empresa={empresa}
            textos={T.nivel}
            tituloRef={titulo}
          />
          <Boton variante="texto" onClick={() => setConfirmando(true)} flecha={false} className="self-start">
            {T.terminar}
          </Boton>
        </>
      )}

      {enResumen && (
        <>
          <Boton variante="texto" onClick={() => cambiar({ pantalla: "nivel" })} flecha={false} className="-mt-space-2 self-start">
            {T.navegacion.anterior}
          </Boton>
          <ResumenLlamada
            texto={resumen}
            onEditar={(texto) => cambiar({ editado: { texto, base: llamada.editado?.base ?? generado } })}
            puedeRehacer={!!llamada.editado && llamada.editado.base !== generado}
            onRehacer={() => cambiar({ editado: null })}
            textos={T.resumen}
            tituloRef={titulo}
          />
        </>
      )}

      <BarraAcciones>
        {llamada.pantalla === "inicio" && (
          <Boton onClick={empezar} disabled={!nicho} className="w-full">
            {T.inicio.empezar}
          </Boton>
        )}
        {enLlamada && (
          <div className="grid grid-cols-2 gap-space-2">
            <Boton variante="secundario" onClick={anteriorTramo} className={COMPACTO}>
              {T.navegacion.anterior}
            </Boton>
            {/* Después del último tramo, el nivel (solo para Carlos). */}
            <Boton
              onClick={() => (llamada.tramo === ultimo ? cambiar({ pantalla: "nivel" }) : irATramo(llamada.tramo + 1))}
              className={COMPACTO}
            >
              {T.navegacion.siguiente}
            </Boton>
          </div>
        )}
        {enNivel && (
          <div className="grid grid-cols-2 gap-space-2">
            <Boton variante="secundario" onClick={() => cambiar({ pantalla: "llamada", tramo: ultimo })} className={COMPACTO}>
              {T.navegacion.anterior}
            </Boton>
            <Boton onClick={() => cambiar({ pantalla: "resumen" })} className={COMPACTO}>
              {T.navegacion.siguiente}
            </Boton>
          </div>
        )}
        {enResumen && (
          <div className="grid grid-cols-2 gap-space-2">
            <Boton onClick={copiar} className={COMPACTO}>
              <span aria-live="polite">{copiado ? T.resumen.copiado : T.resumen.copiar}</span>
            </Boton>
            <Boton variante="secundario" onClick={() => setConfirmando(true)} className={COMPACTO}>
              {T.terminar}
            </Boton>
          </div>
        )}
      </BarraAcciones>

      <Confirmar
        abierto={confirmando}
        textos={T.confirmar}
        onCancelar={() => setConfirmando(false)}
        onConfirmar={terminarConfirmado}
      />
    </div>
  );
}
