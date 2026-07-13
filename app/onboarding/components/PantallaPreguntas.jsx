"use client";

import { bloqueA, getBloqueB, bloqueC, bloqueD } from "../data/preguntas";

// app/onboarding/components/PantallaPreguntas.jsx

export default function PantallaPreguntas({ sector, respuestas, onChange }) {
  const bloqueB = getBloqueB(sector);
  const bloques = [bloqueA, bloqueB, bloqueC, bloqueD].filter(Boolean);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 3 · Preguntas
        </span>
        <h2 className="font-black text-white text-3xl uppercase leading-tight tracking-tight">
          Cuéntanos cómo
          <br />
          <span className="text-green">opera tu negocio</span>
        </h2>
        <p className="text-white/40 text-sm">
          Las preguntas marcadas con <span className="text-red-400">*</span> son
          obligatorias.
        </p>
      </div>

      {bloques.map((bloque) => (
        <BloquePreguntas
          key={bloque.id}
          bloque={bloque}
          respuestas={respuestas}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

function BloquePreguntas({ bloque, respuestas, onChange }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-2">
        <p className="text-[10px] font-mono text-green uppercase tracking-[0.25em]">
          {bloque.titulo}
        </p>
      </div>

      {bloque.preguntas.map((pregunta) => {
        // Manejo de dependencias condicionales
        if (pregunta.dependeDe) {
          const valorDependencia = respuestas[pregunta.dependeDe.campo];
          if (valorDependencia !== pregunta.dependeDe.valor) return null;
        }

        return (
          <Pregunta
            key={pregunta.id}
            pregunta={pregunta}
            valor={respuestas[pregunta.id]}
            onChange={(val) => onChange(pregunta.id, val)}
          />
        );
      })}
    </div>
  );
}

function Pregunta({ pregunta, valor, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm text-white font-medium leading-relaxed">
        {pregunta.label}
        {pregunta.requerido && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Radio */}
      {pregunta.tipo === "radio" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pregunta.opciones.map((op) => (
            <button
              key={op.value}
              onClick={() => onChange(op.value)}
              className={`px-4 py-3 border text-left text-xs font-medium uppercase tracking-wide transition-all duration-150 ${
                valor === op.value
                  ? "border-green bg-green/10 text-green"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      )}

      {/* Checkbox */}
      {pregunta.tipo === "checkbox" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pregunta.opciones.map((op) => {
            const seleccionados = Array.isArray(valor) ? valor : [];
            const isSelected = seleccionados.includes(op.value);
            return (
              <button
                key={op.value}
                onClick={() => {
                  if (isSelected) {
                    onChange(seleccionados.filter((v) => v !== op.value));
                  } else {
                    onChange([...seleccionados, op.value]);
                  }
                }}
                className={`px-4 py-3 border text-left text-xs font-medium uppercase tracking-wide transition-all duration-150 flex items-center gap-2 ${
                  isSelected
                    ? "border-green bg-green/10 text-green"
                    : "border-white/10 text-white/60 hover:border-white/30"
                }`}
              >
                <span
                  className={`w-3 h-3 border flex-shrink-0 flex items-center justify-center ${
                    isSelected
                      ? "border-green bg-green"
                      : "border-white/30"
                  }`}
                >
                  {isSelected && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path
                        d="M1 3l2 2 4-4"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {op.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Número */}
      {pregunta.tipo === "numero" && (
        <input
          type="number"
          min={pregunta.min || 0}
          value={valor || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={pregunta.placeholder}
          className="w-full max-w-xs px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200"
        />
      )}

      {/* Texto */}
      {pregunta.tipo === "texto" && (
        <input
          type="text"
          value={valor || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={pregunta.placeholder}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200"
        />
      )}

      {/* Textarea */}
      {pregunta.tipo === "textarea" && (
        <div className="space-y-1">
          <textarea
            value={valor || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={pregunta.placeholder}
            maxLength={pregunta.maxLength}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200 resize-none"
          />
          {pregunta.maxLength && (
            <p className="text-[10px] font-mono text-white/20 text-right">
              {(valor || "").length} / {pregunta.maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
