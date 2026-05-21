"use client";

import { SECTORES } from "../../data/sectores";

export default function PasoSector({ valor, onChange }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 1 · Sector
        </span>
        <h1 className="font-anton text-4xl text-white uppercase tracking-tight leading-tight">
          ¿En qué sector opera
          <br />
          <span className="text-green">el negocio?</span>
        </h1>
        <p className="text-gray text-sm">
          Toca el sector para seleccionarlo y avanzar automáticamente.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SECTORES.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`flex flex-col items-start gap-2 p-4 border text-left transition-all duration-150 ${
              valor === s.id
                ? "border-green bg-green/10"
                : "border-white/10 hover:border-white/30 bg-white/[0.02]"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span
              className={`text-xs font-bold uppercase tracking-wide ${
                valor === s.id ? "text-green" : "text-white/80"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
