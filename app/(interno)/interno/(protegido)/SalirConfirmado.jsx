"use client";

import { useRef, useState } from "react";
import { Boton } from "@/app/components/ui/Boton";
import { useCaptura } from "./Captura";
import { Confirmar } from "./diagnostico/Confirmar";

// "Salir" de la barra de /interno. Con datos capturados en el diagnóstico,
// antes pregunta (lote 20); sin datos, sale directo. `accion` es la server
// action salir().
export function SalirConfirmado({ accion }) {
  const { hayDatos, setHayDatos } = useCaptura();
  const [preguntando, setPreguntando] = useState(false);
  const formulario = useRef(null);

  return (
    <form
      ref={formulario}
      action={accion}
      onSubmit={(evento) => {
        if (hayDatos) {
          evento.preventDefault();
          setPreguntando(true);
        }
      }}
    >
      <Boton variante="secundario" type="submit" compacto>
        Salir
      </Boton>
      <Confirmar
        abierto={preguntando}
        onCancelar={() => setPreguntando(false)}
        onConfirmar={() => {
          setPreguntando(false);
          setHayDatos(false);
          // Sin datos ya no se intercepta: se envía de verdad.
          queueMicrotask(() => formulario.current?.requestSubmit());
        }}
      />
    </form>
  );
}
