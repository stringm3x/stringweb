"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Boton } from "@/app/components/ui/Boton";

// Las objeciones del nicho como consulta rápida (lote 25). Un botón abre un
// <dialog> nativo (atrapa el foco, Esc lo cierra y el foco regresa al botón)
// con un <details> por objeción: se abren y se cierran. Sin animación.
export function Objeciones({ objeciones, textos }) {
  const [abierto, setAbierto] = useState(false);
  const dialogo = useRef(null);
  const titulo = useId();

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  return (
    <>
      <Boton variante="secundario" compacto onClick={() => setAbierto(true)}>
        {textos.abrir}
      </Boton>
      <dialog
        ref={dialogo}
        aria-labelledby={titulo}
        onCancel={(evento) => {
          evento.preventDefault();
          setAbierto(false);
        }}
        className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[560px] overflow-y-auto rounded-md border border-borde bg-fondo p-space-4 text-texto backdrop:bg-black/80"
      >
        <div className="flex items-center justify-between gap-space-3">
          <h2 id={titulo} className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em]">
            {textos.titulo}
          </h2>
          <Boton variante="secundario" compacto onClick={() => setAbierto(false)}>
            {textos.cerrar}
          </Boton>
        </div>
        <ul className="mt-space-4 flex flex-col gap-space-2">
          {objeciones.map((o) => (
            <li key={o.dice}>
              <details className="group rounded-md border border-borde">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-space-3 px-space-3 py-3 text-[17px] font-medium leading-[1.3] hover:bg-texto/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgb(var(--foco))] [&::-webkit-details-marker]:hidden">
                  <span>“{o.dice}”</span>
                  <FiChevronDown aria-hidden="true" className="h-5 w-5 flex-shrink-0 group-open:rotate-180" />
                </summary>
                <div className="flex flex-col gap-space-2 px-space-3 pb-space-3">
                  <p className="text-cuerpo text-texto">{o.respuesta}</p>
                  {o.nota && <p className="text-pequeno text-texto-suave">{o.nota}</p>}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
