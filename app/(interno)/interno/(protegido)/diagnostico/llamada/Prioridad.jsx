"use client";

import { Elecciones } from "../piezas";

// Prioridad → pantalla de ejemplo (lote 25): Carlos elige lo más urgente de
// la lista del nicho y aquí sale el nombre de la pantalla que corresponde.
// Solo el nombre; las imágenes vendrán después.
export function Prioridad({ nicho, valor, onCambiar, textos }) {
  const elegida = nicho.prioridades.find((p) => p.id === valor);
  return (
    <div className="flex flex-col gap-space-3">
      <Elecciones
        nombre={`prioridad-${nicho.id}`}
        legenda={textos.titulo}
        opciones={nicho.prioridades.map((p) => p.nombre)}
        valor={elegida?.nombre ?? ""}
        permiteVacio
        onCambiar={(nombre) => onCambiar(nicho.prioridades.find((p) => p.nombre === nombre)?.id ?? "")}
      />
      <p aria-live="polite" className="min-h-[24px] text-cuerpo text-texto">
        {elegida && (
          <>
            <span className="font-mono text-etiqueta uppercase text-texto-suave">{textos.pantalla}</span> ·{" "}
            {elegida.pantalla}
          </>
        )}
      </p>
    </div>
  );
}
