"use client";

import { FiCheck } from "react-icons/fi";
import { PASOS, TEXTOS } from "@/app/lib/interno/diagnostico/contenido";

// Piezas de la herramienta de diagnóstico (lote 20), con los estados de
// docs/calidad.md § 3. Los colores cambian de golpe; solo se anima el
// transform al presionar.

// Píldora de ancho completo (≥ 56 px) con un radio o una casilla real. Mismo
// lenguaje que ui/Opciones: elegida = acento con texto negro y palomita.
const PILDORA =
  "group/opcion flex min-h-[56px] w-full cursor-pointer items-center gap-3 rounded-pill border border-borde px-5 py-3 text-[17px] font-medium leading-[1.3] text-texto transition-transform duration-rapido hover:border-texto active:scale-[.98] motion-reduce:active:scale-100 has-[:checked]:border-acento has-[:checked]:bg-acento has-[:checked]:text-sobre-acento has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[rgb(var(--foco))]";

export function Elecciones({
  nombre,
  legenda,
  opciones,
  valor,
  onCambiar,
  varias = false,
  permiteVacio = false,
  grande = false,
  legendaRef,
  describedBy,
}) {
  const elegidas = varias ? (Array.isArray(valor) ? valor : []) : [valor];
  return (
    <fieldset className="flex flex-col gap-space-3" aria-describedby={describedBy}>
      <legend
        ref={legendaRef}
        tabIndex={legendaRef ? -1 : undefined}
        className={
          grande
            ? "mb-space-4 text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-texto focus:outline-none"
            : "mb-space-3 text-[14px] font-medium text-texto"
        }
      >
        {legenda}
      </legend>
      <div className="flex flex-col gap-space-2">
        {opciones.map((opcion) => {
          const marcada = elegidas.includes(opcion);
          return (
            <label key={opcion} className={PILDORA}>
              <input
                type={varias ? "checkbox" : "radio"}
                name={nombre}
                value={opcion}
                checked={marcada}
                onChange={() => {
                  if (!varias) return onCambiar(opcion);
                  onCambiar(marcada ? elegidas.filter((o) => o !== opcion) : [...elegidas, opcion]);
                }}
                onClick={() => {
                  // Una opción que ya estaba elegida se puede quitar.
                  if (!varias && permiteVacio && marcada) onCambiar("");
                }}
                className="sr-only"
              />
              <FiCheck aria-hidden="true" className="hidden h-5 w-5 flex-shrink-0 group-has-[:checked]/opcion:block" />
              {opcion}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// Interruptor (apagado de inicio): una casilla real con role="switch".
export function Interruptor({ encendido, onCambiar, children }) {
  return (
    <label className="group/interruptor flex min-h-[56px] cursor-pointer items-center justify-between gap-space-3 rounded-pill border border-borde px-5 py-3 text-[16px] font-medium text-texto hover:border-texto has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[rgb(var(--foco))]">
      <span>{children}</span>
      <input
        type="checkbox"
        role="switch"
        checked={encendido}
        onChange={(e) => onCambiar(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-[28px] w-[48px] flex-shrink-0 rounded-pill border border-borde-hover bg-fondo group-has-[:checked]/interruptor:border-acento group-has-[:checked]/interruptor:bg-acento"
      >
        <span className="absolute left-[3px] top-[3px] h-[20px] w-[20px] rounded-full bg-texto-suave transition-transform duration-rapido group-has-[:checked]/interruptor:translate-x-[20px] group-has-[:checked]/interruptor:bg-sobre-acento motion-reduce:transition-none" />
      </span>
    </label>
  );
}

// "PASO N DE 5" con la barra de cinco segmentos.
export function BarraPasos({ paso }) {
  return (
    <div className="flex flex-col gap-space-2">
      <p className="font-mono text-etiqueta uppercase text-texto-suave">
        Paso {paso} de {PASOS.length}
      </p>
      <div aria-hidden="true" className="grid grid-cols-5 gap-1">
        {PASOS.map((nombre, i) => (
          <span key={nombre} className={`h-1 rounded-pill ${i < paso ? "bg-acento" : "bg-borde"}`} />
        ))}
      </div>
    </div>
  );
}

// La fila de puntos numerados: uno por pregunta del flujo. Contestada =
// relleno de acento; saltada = borde punteado; actual = borde de texto.
const PUNTO = {
  contestada: "border-acento bg-acento text-sobre-acento",
  saltada: "border-dashed border-texto-suave text-texto-suave",
  pendiente: "border-borde text-texto-suave",
};

export function Puntos({ estados, actual, onIr }) {
  return (
    <ol aria-label="Preguntas" className="flex flex-wrap gap-1.5">
      {estados.map((estado, i) => {
        const esActual = i === actual;
        return (
          <li key={i}>
            <button
              type="button"
              aria-current={esActual ? "step" : undefined}
              aria-label={TEXTOS.punto(i + 1, TEXTOS.estados[estado])}
              onClick={() => onIr(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[13px] font-medium transition-transform duration-rapido active:scale-[.94] motion-reduce:active:scale-100 ${
                PUNTO[estado]
              } ${esActual ? "!border-solid !border-texto" : ""}`}
            >
              {i + 1}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// Campo de texto grande para las preguntas abiertas: la pregunta es la
// etiqueta. Mismo estilo que ui/Campo.
const CAMPO =
  "w-full min-h-[48px] rounded-[12px] border border-borde bg-fondo px-4 py-3 font-sans text-[17px] text-texto placeholder:text-placeholder hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none";

export function Abierta({ id, pregunta, valor, onCambiar, corto = false, ayuda, etiquetaRef }) {
  const ayudaId = ayuda ? `${id}-ayuda` : undefined;
  const Control = corto ? "input" : "textarea";
  return (
    <div className="flex flex-col gap-space-3">
      <label
        ref={etiquetaRef}
        tabIndex={etiquetaRef ? -1 : undefined}
        htmlFor={id}
        className="mb-space-1 text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-texto focus:outline-none"
      >
        {pregunta}
      </label>
      {ayuda && (
        <p id={ayudaId} className="text-pequeno text-texto-suave">
          {ayuda}
        </p>
      )}
      <Control
        id={id}
        value={valor || ""}
        onChange={(e) => onCambiar(e.target.value)}
        aria-describedby={ayudaId}
        rows={corto ? undefined : 4}
        className={`${CAMPO} ${corto ? "" : "resize-y"}`}
      />
    </div>
  );
}

// Nota opcional por pregunta.
export function Nota({ id, valor, onCambiar }) {
  return (
    <div className="flex flex-col gap-space-2">
      <label htmlFor={id} className="text-[14px] font-medium text-texto">
        {TEXTOS.nota}
      </label>
      <textarea
        id={id}
        rows={2}
        value={valor || ""}
        onChange={(e) => onCambiar(e.target.value)}
        className={`${CAMPO} resize-y`}
      />
    </div>
  );
}

// La barra inferior fija con las acciones del paso.
export function BarraAcciones({ children }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-borde bg-fondo pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-space-2 px-4 py-3">{children}</div>
    </div>
  );
}
