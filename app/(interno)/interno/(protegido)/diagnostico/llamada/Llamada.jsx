"use client";

import { useEffect, useRef, useState } from "react";
import { Boton } from "@/app/components/ui/Boton";
import { llenar } from "@/app/lib/interno/llamada/llenar";
import { useCaptura } from "../../Captura";
import { Confirmar } from "../Confirmar";
import { Diagnostico } from "../Diagnostico";
import { BarraAcciones } from "../piezas";
import { usePantallaEncendida } from "../usePantallaEncendida";
import { Inicio } from "./Inicio";
import { hayDatosLlamada, useLlamada } from "./useLlamada";

// La llamada de diagnóstico con los nichos nuevos (lote 25). `contenido`
// (guion y fichas) llega como props desde el servidor, después de
// exigirCarlos(). Las notas viven solo en esta pestaña (useLlamada).
// "Gimnasio → Boaz Pro" monta la herramienta del lote 20 con el giro fijo.

const COMPACTO = "w-full !px-3";

export function Llamada({ contenido }) {
  const { guion, nichos } = contenido;
  const T = guion.TEXTOS;
  const { llamada, cambiar, terminar, lista } = useLlamada();
  const [gimnasio, setGimnasio] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const { setHayDatos } = useCaptura();
  const titulo = useRef(null);
  const hay = hayDatosLlamada(llamada);

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
    return <Diagnostico giroFijo="gimnasio" onVolver={() => setGimnasio(false)} textoVolver={T.gimnasio.volver} />;
  }

  // Hasta leer la pestaña no se pinta nada: así no parpadea el inicio vacío.
  if (!lista) return null;

  const nicho = nichos.find((n) => n.id === llamada.nicho && !n.enPausa);
  const valores = { dueño: llamada.dueno, negocio: llamada.negocio };
  const tramo = guion.TRAMOS[llamada.tramo];

  const empezar = () => cambiar({ pantalla: "llamada", tramo: 0, inicio: llamada.inicio ?? Date.now() });
  const terminarConfirmado = () => {
    setConfirmando(false);
    terminar();
  };

  return (
    <div className="flex flex-col gap-space-5 pb-[220px]">
      <h1 className="sr-only">Diagnóstico</h1>
      <p className="sticky top-0 z-10 -mx-4 -mt-space-5 border-b border-borde bg-fondo px-4 py-3 text-pequeno text-texto-suave">
        {T.aviso}
      </p>

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

      {/* La guía por tramos llega en el bloque 2; por ahora, la apertura. */}
      {llamada.pantalla === "llamada" && tramo && (
        <section aria-labelledby="titulo-tramo" className="flex flex-col gap-space-4">
          <p className="font-mono text-etiqueta uppercase text-texto-suave">
            {nicho?.nombre} · {tramo.desde}–{tramo.hasta} min
          </p>
          <h2 ref={titulo} tabIndex={-1} id="titulo-tramo" className="text-subtitulo focus:outline-none">
            {tramo.nombre}
          </h2>
          {tramo.frases.map((frase) => (
            <p key={frase} className="text-cuerpo text-texto">
              {llenar(frase, valores)}
            </p>
          ))}
        </section>
      )}

      <BarraAcciones>
        {llamada.pantalla === "inicio" && (
          <Boton onClick={empezar} disabled={!nicho} className="w-full">
            {T.inicio.empezar}
          </Boton>
        )}
        {llamada.pantalla === "llamada" && (
          <Boton variante="secundario" onClick={() => setConfirmando(true)} className={COMPACTO}>
            {T.terminar}
          </Boton>
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
