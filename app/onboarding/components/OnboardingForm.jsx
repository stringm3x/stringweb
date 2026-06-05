"use client";

import { useState } from "react";
import PantallaBienvenida from "./PantallaBienvenida";
import PantallaDatos from "./PantallaDatos";
import PantallaPreguntas from "./PantallaPreguntas";
import PantallaResumen from "./PantallaResumen";
import PantallaConfirmacion from "./PantallaConfirmacion";

const PANTALLAS = ["Bienvenida", "Datos", "Preguntas", "Resumen"];

export default function OnboardingForm({ cliente }) {
  const [pantalla, setPantalla] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [aprobado, setAprobado] = useState(false);

  const siguiente = () =>
    setPantalla((p) => Math.min(p + 1, PANTALLAS.length - 1));
  const anterior = () => setPantalla((p) => Math.max(p - 1, 0));

  const setRespuesta = (id, valor) =>
    setRespuestas((prev) => ({ ...prev, [id]: valor }));

  if (aprobado) {
    return <PantallaConfirmacion cliente={cliente} />;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header con progreso */}
      <div className="sticky top-0 z-50 bg-[#111111] border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-lg tracking-tight">
              STRING <span className="text-[#50ff05]">Onboarding</span>
            </span>
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              {pantalla + 1} / {PANTALLAS.length}
            </span>
          </div>
          {/* Barra de progreso */}
          <div className="flex gap-1">
            {PANTALLAS.map((nombre, i) => (
              <div key={nombre} className="flex-1 space-y-1">
                <div
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i <= pantalla ? "bg-[#50ff05]" : "bg-white/10"
                  }`}
                />
                <p
                  className={`text-[9px] font-mono uppercase tracking-wider hidden sm:block ${
                    i === pantalla ? "text-[#50ff05]" : "text-white/20"
                  }`}
                >
                  {nombre}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-2xl mx-auto px-6 py-10 pb-32">
        {pantalla === 0 && (
          <PantallaBienvenida cliente={cliente} onSiguiente={siguiente} />
        )}
        {pantalla === 1 && <PantallaDatos cliente={cliente} />}
        {pantalla === 2 && (
          <PantallaPreguntas
            sector={cliente.sector}
            respuestas={respuestas}
            onChange={setRespuesta}
          />
        )}
        {pantalla === 3 && (
          <PantallaResumen
            cliente={cliente}
            respuestas={respuestas}
            onEditar={anterior}
            onAprobar={() => setAprobado(true)}
          />
        )}
      </div>

      {/* Nav bottom — solo pantallas 1 a 3 */}
      {pantalla > 0 && pantalla < 3 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-white/10 z-50">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <button
              onClick={anterior}
              className="px-5 py-3 border border-white/10 text-white/40 text-sm font-mono uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-200"
            >
              ← Atrás
            </button>
            <button
              onClick={siguiente}
              className="flex-1 sm:flex-none px-8 py-3 bg-[#50ff05] text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
