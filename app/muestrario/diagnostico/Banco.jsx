"use client";

import { useState } from "react";
import { BarraInterna } from "@/app/(interno)/interno/(protegido)/BarraInterna";
import { Captura } from "@/app/(interno)/interno/(protegido)/Captura";
import { Diagnostico } from "@/app/(interno)/interno/(protegido)/diagnostico/Diagnostico";

// La misma barra y la misma herramienta de /interno, sin sesión. "Salir"
// no cierra nada aquí: solo avisa que se habría salido (texto de ejemplo).
export function Banco() {
  const [salio, setSalio] = useState(false);
  return (
    <div data-theme="noche" className="min-h-screen bg-fondo text-texto">
      <Captura>
        <BarraInterna salir={() => setSalio(true)} />
        <main className="mx-auto w-full max-w-[640px] px-4 py-space-5">
          {salio && (
            <p role="status" className="mb-space-3 font-mono text-etiqueta uppercase text-texto-suave">
              Muestrario: aquí se habría cerrado la sesión
            </p>
          )}
          <Diagnostico />
        </main>
      </Captura>
    </div>
  );
}
