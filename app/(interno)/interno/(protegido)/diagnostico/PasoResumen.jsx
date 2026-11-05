"use client";

import { Boton } from "@/app/components/ui/Boton";
import { TEXTOS } from "@/app/lib/interno/diagnostico/contenido";

const T = TEXTOS.resumen;

// Que el resumen se lea completo sin desplazarse dentro del campo: una fila
// por renglón más las que ocupa el texto largo (≈ 40 caracteres a 390 px).
const filas = (texto) =>
  Math.max(8, texto.split("\n").reduce((n, renglon) => n + Math.max(1, Math.ceil(renglon.length / 40)), 0));

// Paso 5: el resumen editable y los datos para la propuesta. Los botones de
// enviar, copiar y empezar de nuevo van en la barra inferior.
export function PasoResumen({ texto, onEditar, puedeRehacer, onRehacer, datos, copiado, onCopiarDatos, tituloId }) {
  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex flex-col gap-space-3">
        <textarea
          aria-labelledby={tituloId}
          value={texto}
          onChange={(e) => onEditar(e.target.value)}
          rows={filas(texto)}
          className="w-full resize-y rounded-[12px] border border-borde bg-fondo px-4 py-3 font-sans text-[16px] leading-[1.5] text-texto hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none"
        />
        {puedeRehacer && (
          <Boton variante="texto" onClick={onRehacer} flecha={false} className="self-start">
            {T.rehacer}
          </Boton>
        )}
      </div>

      <section aria-labelledby="datos-propuesta" className="flex flex-col gap-space-3">
        <h3 id="datos-propuesta" className="font-mono text-etiqueta uppercase text-texto-suave">
          {T.datos}
        </h3>
        <p className="whitespace-pre-line rounded-md border border-borde p-space-3 font-mono text-[14px] leading-[1.6] text-texto">
          {datos}
        </p>
        <Boton variante="secundario" onClick={onCopiarDatos} className="self-start">
          <span aria-live="polite">{copiado ? T.copiado : T.copiarDatos}</span>
        </Boton>
      </section>
    </div>
  );
}
