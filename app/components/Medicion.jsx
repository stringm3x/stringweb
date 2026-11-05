"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { descartarInterno } from "../lib/medicion";

// Los dos medidores de Vercel con el filtro de /interno. Vive aparte porque
// beforeSend es una función y el layout raíz es de servidor: no se la
// puede pasar directo.
export default function Medicion() {
  return (
    <>
      <Analytics beforeSend={descartarInterno} />
      <SpeedInsights beforeSend={descartarInterno} />
    </>
  );
}
