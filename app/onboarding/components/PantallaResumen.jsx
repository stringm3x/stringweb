"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { bloqueA, getBloqueB, bloqueC, bloqueD } from "../data/preguntas";

// app/onboarding/components/PantallaResumen.jsx

export default function PantallaResumen({
  cliente,
  respuestas,
  onEditar,
  onAprobar,
}) {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const bloqueB = getBloqueB(cliente.sector);
  const bloques = [bloqueA, bloqueB, bloqueC, bloqueD].filter(Boolean);

  // Verificar si todas las preguntas requeridas están respondidas
  const preguntasRequeridas = bloques
    .flatMap((b) => b.preguntas)
    .filter((p) => {
      if (!p.requerido) return false;
      if (p.dependeDe) {
        return respuestas[p.dependeDe.campo] === p.dependeDe.valor;
      }
      return true;
    });

  const todasRespondidas = preguntasRequeridas.every((p) => {
    const val = respuestas[p.id];
    if (Array.isArray(val)) return val.length > 0;
    return val !== undefined && val !== null && val !== "";
  });

  const handleAprobar = async () => {
    if (!todasRespondidas) return;
    setEnviando(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, respuestas }),
      });

      if (!res.ok) throw new Error("Error al enviar");
      onAprobar();
    } catch {
      setError(
        "Hubo un error al enviar. Intenta de nuevo o avísale a tu asesor STRING."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 4 · Resumen
        </span>
        <h2 className="font-black text-white text-3xl uppercase leading-tight tracking-tight">
          Revisa y aprueba
          <br />
          <span className="text-green">el mapa de procesos</span>
        </h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Revisa que todo esté correcto antes de aprobar. Puedes regresar a
          editar si necesitas cambiar algo.
        </p>
      </div>

      {/* Datos del negocio */}
      <ResumenBloque titulo="Datos del negocio">
        <ResumenFila label="Negocio" valor={cliente.nombre_negocio} />
        <ResumenFila label="Sistema" valor={cliente.sistema_contratado} />
        <ResumenFila label="Contacto" valor={cliente.nombre_contacto} />
      </ResumenBloque>

      {/* Respuestas por bloque */}
      {bloques.map((bloque) => {
        const preguntasDelBloque = bloque.preguntas.filter((p) => {
          const val = respuestas[p.id];
          if (
            p.dependeDe &&
            respuestas[p.dependeDe.campo] !== p.dependeDe.valor
          )
            return false;
          if (Array.isArray(val)) return val.length > 0;
          return val !== undefined && val !== null && val !== "";
        });

        if (preguntasDelBloque.length === 0) return null;

        return (
          <ResumenBloque key={bloque.id} titulo={bloque.titulo}>
            {preguntasDelBloque.map((p) => {
              const val = respuestas[p.id];
              const display = Array.isArray(val)
                ? val
                    .map((v) => {
                      const op = p.opciones?.find((o) => o.value === v);
                      return op ? op.label : v;
                    })
                    .join(", ")
                : p.opciones
                ? p.opciones.find((o) => o.value === val)?.label || val
                : val;

              return (
                <ResumenFila
                  key={p.id}
                  label={p.label}
                  valor={display}
                  requerido={p.requerido}
                />
              );
            })}
          </ResumenBloque>
        );
      })}

      {/* Alerta de preguntas faltantes */}
      {!todasRespondidas && (
        <div className="border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-mono text-yellow-400 uppercase tracking-widest mb-1">
            <FiAlertTriangle className="text-xs" />
            Faltan respuestas requeridas
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            Hay preguntas obligatorias sin responder. Regresa a completarlas
            antes de aprobar.
          </p>
        </div>
      )}

      {error && (
        <div className="border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}

      {/* Botones */}
      <div className="space-y-3 pt-4">
        <button
          onClick={handleAprobar}
          disabled={!todasRespondidas || enviando}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {enviando ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enviando y generando PDF...
            </span>
          ) : (
            "Aprobar y firmar →"
          )}
        </button>

        <button
          onClick={onEditar}
          className="w-full px-8 py-3 border border-white/10 text-white/40 text-sm font-mono uppercase tracking-wide hover:border-white/30 hover:text-white transition-all duration-200"
        >
          ← Regresar y editar
        </button>
      </div>
    </div>
  );
}

function ResumenBloque({ titulo, children }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em]">
        {titulo}
      </p>
      <div className="space-y-px">{children}</div>
    </div>
  );
}

function ResumenFila({ label, valor, requerido }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 px-4 py-3 bg-white/[0.02]">
      <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider leading-relaxed pt-0.5">
        {label}
        {requerido && <span className="text-red-400 ml-1">*</span>}
      </p>
      <p className="text-white/80 text-xs leading-relaxed">{valor || "—"}</p>
    </div>
  );
}
