"use client";

// Una pregunta de la guía con su campo debajo, para anotar lo que dice el
// prospecto con sus palabras, tal cual (lote 25). La pregunta es la etiqueta.
// Mismo estilo de campo que ui/Campo; los colores cambian de golpe.
const CAMPO =
  "w-full min-h-[48px] rounded-[12px] border border-borde bg-fondo px-4 py-3 font-sans text-[17px] text-texto hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none resize-y";

export function Pregunta({ id, texto, valor, onCambiar, nota }) {
  const notaId = nota ? `${id}-nota` : undefined;
  return (
    <div className="flex flex-col gap-space-2">
      <label htmlFor={id} className="text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-texto">
        {texto}
      </label>
      {nota && (
        <p id={notaId} className="font-mono text-etiqueta uppercase text-texto-suave">
          {nota}
        </p>
      )}
      <textarea
        id={id}
        rows={2}
        value={valor || ""}
        onChange={(e) => onCambiar(e.target.value)}
        aria-describedby={notaId}
        className={CAMPO}
      />
    </div>
  );
}
