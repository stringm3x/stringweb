"use client";

import { llenar } from "@/app/lib/interno/llamada/llenar";

// Los cinco tramos como puntos numerados, para saltar de uno a otro (lote 25).
// El actual lleva borde de texto; el que marca el reloj, relleno de acento.
export function Tramos({ tramos, actual, delReloj, onIr, textos }) {
  return (
    <ol aria-label={textos.lista} className="flex gap-1.5">
      {tramos.map((t, i) => {
        const esActual = i === actual;
        const ahora = t.id === delReloj;
        return (
          <li key={t.id}>
            <button
              type="button"
              aria-current={esActual ? "step" : undefined}
              aria-label={llenar(textos.punto, { n: i + 1, nombre: t.nombre, desde: t.desde, hasta: t.hasta })}
              onClick={() => onIr(i)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-[14px] font-medium transition-transform duration-rapido active:scale-[.94] motion-reduce:active:scale-100 ${
                ahora ? "border-acento bg-acento text-sobre-acento" : "border-borde text-texto-suave"
              } ${esActual ? "!border-texto" : ""}`}
            >
              {i + 1}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
