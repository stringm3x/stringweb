"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Boton } from "@/app/components/ui/Boton";
import { Campo } from "@/app/components/ui/Campo";
import { AVISO, GIROS, ORIGENES, PASOS, TEXTOS, preguntasDelFlujo } from "@/app/lib/interno/diagnostico/contenido";
import { conBoceto, sugerirNivel } from "@/app/lib/interno/diagnostico/nivel";
import { armarResumen, datosPropuesta, digitos, enlaceWhatsApp } from "@/app/lib/interno/diagnostico/resumen";
import { useCaptura } from "../Captura";
import { Confirmar } from "./Confirmar";
import { PasoNivel } from "./PasoNivel";
import { PasoResumen } from "./PasoResumen";
import { Abierta, BarraAcciones, BarraPasos, Elecciones, Nota, Puntos } from "./piezas";
import { usePantallaEncendida } from "./usePantallaEncendida";

// La herramienta de diagnóstico (lote 20, docs/textos.md § Interno). Todo
// vive en este estado: no se guarda nada, no se manda nada al servidor y,
// una vez cargada, funciona sin señal.

const VACIO = {
  paso: 1,
  prospecto: { nombre: "", negocio: "", whatsapp: "", giro: "", origen: "" },
  rapida: false,
  actual: 0, // índice de la pregunta en el flujo
  respuestas: {}, // { [id]: { valor, nota } }
  dejadas: [], // preguntas que ya se dejaron atrás (sin respuesta = saltada)
  nivelElegido: null,
  boceto: false,
  fundador: false,
  siguiente: { tipo: "", dia: "" },
  editado: null, // { texto, base }: el resumen editado a mano y de qué versión salió
};

const tieneValor = (r) => (Array.isArray(r?.valor) ? r.valor.length > 0 : !!String(r?.valor ?? "").trim());

function hayDatos(e) {
  return (
    Object.values(e.prospecto).some((v) => v.trim()) ||
    Object.values(e.respuestas).some((r) => tieneValor(r) || r?.nota?.trim()) ||
    !!e.siguiente.tipo ||
    !!e.siguiente.dia
  );
}

const GIRO_NOMBRES = GIROS.map((g) => g.nombre);
const T = TEXTOS;
const COMPACTO = "w-full !px-3";

export function Diagnostico() {
  const [e, setE] = useState(VACIO);
  const [confirmando, setConfirmando] = useState(false);
  const [copiado, setCopiado] = useState(null); // "resumen" | "datos"
  const { setHayDatos } = useCaptura();
  const titulo = useRef(null);
  const yaMovio = useRef(false);

  const giro = e.prospecto.giro;
  const gimnasio = giro === "gimnasio";
  const flujo = useMemo(() => preguntasDelFlujo(giro, e.rapida), [giro, e.rapida]);
  const sugerido = useMemo(() => sugerirNivel({ giro, respuestas: e.respuestas }), [giro, e.respuestas]);
  const nivel = gimnasio ? "boaz" : e.nivelElegido || sugerido.nivel;
  const estadoResumen = {
    prospecto: e.prospecto,
    respuestas: e.respuestas,
    nivel,
    boceto: e.boceto && conBoceto(nivel),
    fundador: gimnasio && e.fundador,
    siguiente: e.siguiente,
  };
  const generado = giro ? armarResumen(estadoResumen) : "";
  const resumen = e.editado ? e.editado.texto : generado;
  const hay = hayDatos(e);

  usePantallaEncendida();

  // La barra de /interno pregunta antes de "Salir" si hay datos.
  useEffect(() => {
    setHayDatos(hay);
  }, [hay, setHayDatos]);

  // Recargar o cerrar la pestaña con datos: el navegador pregunta.
  useEffect(() => {
    if (!hay) return;
    const avisar = (evento) => {
      evento.preventDefault();
      evento.returnValue = "";
    };
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [hay]);

  // Al cambiar de pantalla, el foco va al título nuevo (no al cargar).
  useEffect(() => {
    if (!yaMovio.current) {
      yaMovio.current = true;
      return;
    }
    titulo.current?.focus();
    window.scrollTo({ top: 0 });
  }, [e.paso, e.actual]);

  const cambiar = (parcial) => setE((prev) => ({ ...prev, ...parcial }));
  const cambiarProspecto = (campo, valor) =>
    setE((prev) => {
      const prospecto = { ...prev.prospecto, [campo]: valor };
      if (campo !== "giro" || valor === prev.prospecto.giro) return { ...prev, prospecto };
      // Otro giro: sus preguntas y el nivel elegido ya no aplican.
      const { sGiro, pGiro, iGiro, ...respuestas } = prev.respuestas;
      return { ...prev, prospecto, respuestas, nivelElegido: null, editado: null };
    });
  const responder = (id, parcial) =>
    setE((prev) => ({ ...prev, respuestas: { ...prev.respuestas, [id]: { ...prev.respuestas[id], ...parcial } } }));

  const pregunta = flujo[e.actual];
  const dejar = (prev) => (pregunta && !prev.dejadas.includes(pregunta.id) ? [...prev.dejadas, pregunta.id] : prev.dejadas);
  const irAPregunta = (i) => setE((prev) => ({ ...prev, dejadas: dejar(prev), actual: i, paso: flujo[i].paso }));
  const avanzar = () =>
    setE((prev) =>
      prev.actual < flujo.length - 1
        ? { ...prev, dejadas: dejar(prev), actual: prev.actual + 1, paso: flujo[prev.actual + 1].paso }
        : { ...prev, dejadas: dejar(prev), paso: 4 },
    );
  const saltar = () => {
    // Saltada = sin respuesta (cuenta como "No sé"); la nota se queda.
    if (pregunta) responder(pregunta.id, { valor: undefined });
    avanzar();
  };
  const regresar = () =>
    setE((prev) => {
      if (prev.paso === 5) return { ...prev, paso: 4 };
      if (prev.paso === 4) return { ...prev, actual: flujo.length - 1, paso: flujo[flujo.length - 1].paso };
      if (prev.actual > 0) return { ...prev, dejadas: dejar(prev), actual: prev.actual - 1, paso: flujo[prev.actual - 1].paso };
      return { ...prev, dejadas: dejar(prev), paso: 1 };
    });
  const empezar = (rapida) => {
    const nuevo = preguntasDelFlujo(giro, rapida);
    setE((prev) => ({ ...prev, rapida, actual: 0, paso: nuevo[0].paso, editado: null }));
  };

  const borrarTodo = () => {
    setConfirmando(false);
    setCopiado(null);
    setE(VACIO);
  };
  const nuevoDiagnostico = () => (hay ? setConfirmando(true) : borrarTodo());

  const copiar = (cual, texto) => {
    navigator.clipboard?.writeText(texto).then(
      () => {
        setCopiado(cual);
        setTimeout(() => setCopiado((c) => (c === cual ? null : c)), 2000);
      },
      () => {},
    );
  };

  const estados = flujo.map((p) =>
    tieneValor(e.respuestas[p.id]) ? "contestada" : e.dejadas.includes(p.id) ? "saltada" : "pendiente",
  );
  const numeroWhatsapp = digitos(e.prospecto.whatsapp);
  const whatsappIncompleto = numeroWhatsapp.length > 0 && numeroWhatsapp.length !== 10;
  const tituloPaso = (
    <h2 ref={e.paso === 2 || e.paso === 3 ? undefined : titulo} tabIndex={-1} id="titulo-paso" className="text-subtitulo focus:outline-none">
      {PASOS[e.paso - 1]}
    </h2>
  );

  return (
    <div className="flex flex-col gap-space-5 pb-[220px]">
      <h1 className="sr-only">Diagnóstico</h1>
      <p className="sticky top-0 z-10 -mx-4 -mt-space-5 border-b border-borde bg-fondo px-4 py-3 text-pequeno text-texto-suave">{AVISO}</p>

      <div className="flex flex-col gap-space-4">
        <BarraPasos paso={e.paso} />
        {tituloPaso}
      </div>

      {e.paso === 1 && (
        <div className="flex flex-col gap-space-5">
          <Campo
            id="nombre"
            etiqueta={T.prospecto.nombre}
            autoComplete="off"
            value={e.prospecto.nombre}
            onChange={(ev) => cambiarProspecto("nombre", ev.target.value)}
          />
          <Campo
            id="negocio"
            etiqueta={T.prospecto.negocio}
            autoComplete="off"
            value={e.prospecto.negocio}
            onChange={(ev) => cambiarProspecto("negocio", ev.target.value)}
          />
          <div className="flex flex-col gap-space-2">
            <Campo
              id="whatsapp"
              etiqueta={T.prospecto.whatsapp}
              type="tel"
              inputMode="tel"
              autoComplete="off"
              value={e.prospecto.whatsapp}
              onChange={(ev) => cambiarProspecto("whatsapp", ev.target.value)}
              aria-describedby={whatsappIncompleto ? "whatsapp-aviso" : undefined}
            />
            {whatsappIncompleto && (
              <p id="whatsapp-aviso" className="text-pequeno text-texto-suave">
                {T.prospecto.whatsappAviso}
              </p>
            )}
          </div>
          <Elecciones
            nombre="giro"
            legenda={T.prospecto.giro}
            opciones={GIRO_NOMBRES}
            valor={GIROS.find((g) => g.id === giro)?.nombre}
            onCambiar={(nombre) => cambiarProspecto("giro", GIROS.find((g) => g.nombre === nombre).id)}
          />
          <Elecciones
            nombre="origen"
            legenda={T.prospecto.origen}
            opciones={ORIGENES}
            valor={e.prospecto.origen}
            permiteVacio
            onCambiar={(origen) => cambiarProspecto("origen", origen)}
          />
        </div>
      )}

      {(e.paso === 2 || e.paso === 3) && pregunta && (
        <div className="flex flex-col gap-space-5">
          <Puntos estados={estados} actual={e.actual} onIr={irAPregunta} />
          {pregunta.tipo === "texto" ? (
            <Abierta
              key={pregunta.id}
              id={`r-${pregunta.id}`}
              pregunta={pregunta.texto}
              valor={e.respuestas[pregunta.id]?.valor}
              onCambiar={(valor) => responder(pregunta.id, { valor })}
              corto={pregunta.corto}
              ayuda={pregunta.ayuda}
              etiquetaRef={titulo}
            />
          ) : (
            <Elecciones
              key={pregunta.id}
              nombre={`r-${pregunta.id}`}
              legenda={pregunta.texto}
              opciones={pregunta.opciones}
              valor={e.respuestas[pregunta.id]?.valor}
              varias={pregunta.tipo === "varias"}
              permiteVacio
              grande
              legendaRef={titulo}
              onCambiar={(valor) => responder(pregunta.id, { valor })}
            />
          )}
          <Nota
            id={`nota-${pregunta.id}`}
            valor={e.respuestas[pregunta.id]?.nota}
            onCambiar={(nota) => responder(pregunta.id, { nota })}
          />
        </div>
      )}

      {e.paso === 4 && (
        <PasoNivel
          nivel={nivel}
          sugerido={sugerido}
          gimnasio={gimnasio}
          boceto={e.boceto}
          fundador={e.fundador}
          siguiente={e.siguiente}
          onCambiar={(parcial) => cambiar(parcial)}
        />
      )}

      {e.paso === 5 && (
        <Boton variante="texto" onClick={regresar} flecha={false} className="-mt-space-3 self-start">
          {T.navegacion.anterior}
        </Boton>
      )}

      {e.paso === 5 && (
        <PasoResumen
          tituloId="titulo-paso"
          texto={resumen}
          onEditar={(texto) => cambiar({ editado: { texto, base: e.editado?.base ?? generado } })}
          puedeRehacer={!!e.editado && e.editado.base !== generado}
          onRehacer={() => cambiar({ editado: null })}
          datos={datosPropuesta(estadoResumen)}
          copiado={copiado === "datos"}
          onCopiarDatos={() => copiar("datos", datosPropuesta(estadoResumen))}
        />
      )}

      <BarraAcciones>
        {e.paso === 1 && (
          <>
            <Boton onClick={() => empezar(false)} disabled={!giro} className="w-full">
              {T.prospecto.empezar}
            </Boton>
            <Boton variante="secundario" onClick={() => empezar(true)} disabled={!giro} className="w-full">
              {T.prospecto.rapida}
            </Boton>
          </>
        )}
        {(e.paso === 2 || e.paso === 3) && (
          <div className="grid grid-cols-3 gap-space-2">
            <Boton variante="secundario" onClick={regresar} className={COMPACTO}>
              {T.navegacion.anterior}
            </Boton>
            <Boton variante="secundario" onClick={saltar} className={COMPACTO}>
              {T.navegacion.saltar}
            </Boton>
            <Boton onClick={avanzar} className={COMPACTO}>
              {T.navegacion.siguiente}
            </Boton>
          </div>
        )}
        {e.paso === 4 && (
          <div className="grid grid-cols-2 gap-space-2">
            <Boton variante="secundario" onClick={regresar} className={COMPACTO}>
              {T.navegacion.anterior}
            </Boton>
            <Boton onClick={() => cambiar({ paso: 5 })} className={COMPACTO}>
              {T.navegacion.siguiente}
            </Boton>
          </div>
        )}
        {e.paso === 5 && (
          <>
            <Boton href={enlaceWhatsApp(e.prospecto.whatsapp, resumen)} className="w-full">
              {T.resumen.abrir}
            </Boton>
            <div className="grid grid-cols-2 gap-space-2">
              <Boton variante="secundario" onClick={() => copiar("resumen", resumen)} className={COMPACTO}>
                <span aria-live="polite">{copiado === "resumen" ? T.resumen.copiado : T.resumen.copiar}</span>
              </Boton>
              <Boton variante="secundario" onClick={nuevoDiagnostico} className={COMPACTO}>
                {T.resumen.nuevo}
              </Boton>
            </div>
          </>
        )}
      </BarraAcciones>

      <Confirmar abierto={confirmando} onCancelar={() => setConfirmando(false)} onConfirmar={borrarTodo} />
    </div>
  );
}
