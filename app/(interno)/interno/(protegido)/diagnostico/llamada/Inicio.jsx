"use client";

import { Boton } from "@/app/components/ui/Boton";
import { Campo } from "@/app/components/ui/Campo";
import { Elecciones } from "../piezas";

// Inicio de la llamada (lote 25): nicho (Clínicas en pausa), el atajo a
// Boaz, negocio, dueño y tipo de dueño. El contenido llega por props desde el
// servidor; aquí no se importa ninguna ficha.

// "B2B · Distribuidoras y proveedores", "Clínicas · en pausa".
export const etiquetaNicho = (n, enPausa) =>
  [n.nombre, n.enPausa ? enPausa : n.detalle].filter(Boolean).join(" · ");

export function Inicio({ llamada, nichos, tipos, textos, onCambiar, onGimnasio }) {
  const T = textos.inicio;
  const etiquetas = nichos.map((n) => etiquetaNicho(n, T.enPausa));
  const elegido = nichos.find((n) => n.id === llamada.nicho);

  return (
    <div className="flex flex-col gap-space-5">
      <Elecciones
        nombre="nicho"
        legenda={T.nicho}
        opciones={etiquetas}
        deshabilitadas={nichos.filter((n) => n.enPausa).map((n) => etiquetaNicho(n, T.enPausa))}
        valor={elegido ? etiquetaNicho(elegido, T.enPausa) : ""}
        onCambiar={(etiqueta) => onCambiar({ nicho: nichos[etiquetas.indexOf(etiqueta)].id })}
      />
      {elegido?.filtro && (
        <p className="-mt-space-2 rounded-md border border-borde p-space-3 text-pequeno text-texto-suave">
          <span className="font-mono uppercase">{T.filtro}</span> · {elegido.filtro}
        </p>
      )}
      <Boton variante="secundario" onClick={onGimnasio} className="w-full">
        {T.atajo}
      </Boton>

      <Campo
        id="negocio"
        etiqueta={T.negocio}
        autoComplete="off"
        value={llamada.negocio}
        onChange={(ev) => onCambiar({ negocio: ev.target.value })}
      />
      <Campo
        id="dueno"
        etiqueta={T.dueno}
        autoComplete="off"
        value={llamada.dueno}
        onChange={(ev) => onCambiar({ dueno: ev.target.value })}
      />
      <Elecciones
        nombre="tipo"
        legenda={T.tipo}
        opciones={tipos.map((t) => t.nombre)}
        valor={tipos.find((t) => t.id === llamada.tipo)?.nombre ?? ""}
        permiteVacio
        onCambiar={(nombre) => onCambiar({ tipo: tipos.find((t) => t.nombre === nombre)?.id ?? "" })}
      />
    </div>
  );
}
