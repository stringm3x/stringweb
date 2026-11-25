"use client";

import { Boton } from "@/app/components/ui/Boton";

// El borrador del resumen para WhatsApp (lote 25): editable, con "Copiar" en
// la barra. Nada de WhatsApp automático: Carlos lo pega y lo manda a mano.
// Si lo editó y después cambió algo de lo anotado, puede volver a armarlo.

// Que se lea completo sin desplazarse dentro del campo (≈ 40 caracteres por
// renglón a 390 px), como en el lote 20.
const filas = (texto) =>
  Math.max(8, texto.split("\n").reduce((n, renglon) => n + Math.max(1, Math.ceil(renglon.length / 40)), 0));

export function ResumenLlamada({ texto, onEditar, puedeRehacer, onRehacer, textos, tituloRef }) {
  return (
    <div className="flex flex-col gap-space-4">
      <h2 ref={tituloRef} tabIndex={-1} id="titulo-resumen" className="text-subtitulo focus:outline-none">
        {textos.titulo}
      </h2>
      <textarea
        aria-labelledby="titulo-resumen"
        value={texto}
        onChange={(e) => onEditar(e.target.value)}
        rows={filas(texto)}
        className="w-full resize-y rounded-[12px] border border-borde bg-fondo px-4 py-3 font-sans text-[16px] leading-[1.5] text-texto hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none"
      />
      {puedeRehacer && (
        <Boton variante="texto" onClick={onRehacer} flecha={false} className="self-start">
          {textos.rehacer}
        </Boton>
      )}
    </div>
  );
}
