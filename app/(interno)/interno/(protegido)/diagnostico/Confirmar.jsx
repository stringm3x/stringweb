"use client";

import { useEffect, useId, useRef } from "react";
import { Boton } from "@/app/components/ui/Boton";
import { TEXTOS } from "@/app/lib/interno/diagnostico/contenido";

// El diálogo de "¿Seguro?" (lote 20): un <dialog> nativo con showModal(),
// que atrapa el foco, cierra con Esc (= Cancelar) y devuelve el foco al
// botón que lo abrió. El foco empieza en "Cancelar", el primero.
export function Confirmar({ abierto, onCancelar, onConfirmar }) {
  const dialogo = useRef(null);
  const titulo = useId();

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  return (
    <dialog
      ref={dialogo}
      aria-labelledby={titulo}
      onCancel={(evento) => {
        evento.preventDefault();
        onCancelar();
      }}
      className="m-auto w-[calc(100%-32px)] max-w-[420px] rounded-md border border-borde bg-fondo p-space-4 text-texto backdrop:bg-black/80"
    >
      <p id={titulo} className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em]">
        {TEXTOS.confirmar.pregunta}
      </p>
      <div className="mt-space-4 flex flex-col gap-space-2">
        <Boton variante="secundario" onClick={onCancelar} className="w-full">
          {TEXTOS.confirmar.cancelar}
        </Boton>
        <Boton variante="secundario" onClick={onConfirmar} className="w-full">
          {TEXTOS.confirmar.borrar}
        </Boton>
      </div>
    </dialog>
  );
}
