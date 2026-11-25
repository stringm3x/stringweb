"use client";

import { llenar } from "@/app/lib/interno/llamada/llenar";
import { sugerirNivelNicho } from "@/app/lib/interno/llamada/nivel";
import { Elecciones } from "../piezas";

// La sugerencia de nivel (lote 25), solo para Carlos: nunca se enseña. Las
// reglas de la ficha como casillas; si quedan dos, el más chico. En Empresa,
// la nota del mapa de procesos y el boceto, y el mínimo: las cifras salen de
// precios-interno.js en el servidor (`empresa`, por props). No muestra el
// "Desde" de ningún nivel.
export function NivelNicho({ nicho, marcadas, onCambiar, empresa, textos, tituloRef }) {
  const reglas = nicho.niveles.reglas;
  const sugerido = sugerirNivelNicho(nicho.niveles, marcadas);

  return (
    <div className="flex flex-col gap-space-5">
      <div className="flex flex-col gap-space-2">
        <h2 ref={tituloRef} tabIndex={-1} className="text-subtitulo focus:outline-none">
          {textos.titulo}
        </h2>
        <p className="font-mono text-etiqueta uppercase text-texto-suave">{textos.aviso}</p>
      </div>

      <Elecciones
        nombre={`reglas-${nicho.id}`}
        legenda={textos.reglas}
        opciones={reglas.map((r) => r.regla)}
        valor={marcadas.map((i) => reglas[i]?.regla).filter(Boolean)}
        varias
        onCambiar={(elegidas) => onCambiar(reglas.map((r, i) => (elegidas.includes(r.regla) ? i : null)).filter((i) => i !== null))}
      />

      <section aria-label={textos.sugerido} aria-live="polite" className="flex flex-col gap-space-3 rounded-md border-2 border-acento p-space-4">
        <p className="font-mono text-etiqueta uppercase text-texto-suave">{textos.sugerido}</p>
        {sugerido.nivel ? (
          <>
            <p className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-texto">
              {textos.nombres[sugerido.nivel]}
            </p>
            <p className="text-cuerpo text-texto-suave">{sugerido.porDefecto ? textos.casoTipico : sugerido.razones.join(" · ")}</p>
            {sugerido.nivel === "empresa" && (
              <div className="flex flex-col gap-space-1">
                <p className="font-mono text-cifra text-texto">{llenar(textos.notaEmpresa, { boceto: empresa.boceto })}</p>
                <p className="font-mono text-cifra text-texto-suave">{llenar(textos.minimoEmpresa, { minimo: empresa.minimo })}</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-cuerpo text-texto-suave">{textos.marca}</p>
        )}
      </section>
    </div>
  );
}
