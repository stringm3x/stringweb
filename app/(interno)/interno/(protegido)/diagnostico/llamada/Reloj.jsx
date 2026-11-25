"use client";

import { useEffect, useState } from "react";
import { llenar } from "@/app/lib/interno/llamada/llenar";

// El reloj discreto de la llamada (lote 25): el minuto desde que empezó y el
// tramo que toca. Cambia una vez por minuto, sin animación, y nunca corta ni
// cambia de pantalla: si el prospecto quiere seguir, se sigue. Pasado el
// minuto 20 solo marca el minuto.

const minutoDesde = (inicio) => Math.max(0, Math.floor((Date.now() - inicio) / 60000));

export function tramoDelMinuto(tramos, minuto) {
  return tramos.find((t) => minuto >= t.desde && minuto < t.hasta) ?? null;
}

// El minuto de la llamada. Revisa cada 15 s (nunca se atrasa más que eso);
// React no repinta si el minuto no cambió.
export function useMinuto(inicio) {
  const [minuto, setMinuto] = useState(() => (inicio ? minutoDesde(inicio) : 0));
  useEffect(() => {
    if (!inicio) return;
    setMinuto(minutoDesde(inicio));
    const id = setInterval(() => setMinuto(minutoDesde(inicio)), 15000);
    return () => clearInterval(id);
  }, [inicio]);
  return minuto;
}

export function Reloj({ minuto, tramo, textos }) {
  const texto = tramo
    ? llenar(textos.conTramo, { minuto, tramo: tramo.nombre })
    : llenar(textos.sinTramo, { minuto });
  return <p className="font-mono text-etiqueta uppercase text-texto-suave">{texto}</p>;
}
