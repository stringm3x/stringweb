"use client";

import { FiClock, FiUsers, FiFileText, FiZap } from "react-icons/fi";

// app/onboarding/components/PantallaBienvenida.jsx
export default function PantallaBienvenida({ cliente, onSiguiente }) {
  return (
    <div className="space-y-10 pt-6">
      {/* Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.25em]">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
        Estudio de Procesos · Fase 3
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="font-black text-white text-4xl sm:text-5xl leading-tight tracking-tight">
          Bienvenido,
          <br />
          <span className="text-green">
            {cliente.nombre_contacto.split(" ")[0]}
          </span>
        </h1>
        <p className="text-white/60 text-lg leading-relaxed max-w-lg">
          Antes de construir{" "}
          <span className="text-white font-semibold">
            {cliente.sistema_contratado}
          </span>{" "}
          para{" "}
          <span className="text-white font-semibold">
            {cliente.nombre_negocio}
          </span>
          , necesitamos entender cómo opera tu negocio hoy.
        </p>
      </div>

      {/* Info del proceso */}
      <div className="border border-white/10 p-6 space-y-4">
        <p className="text-[10px] font-mono text-green uppercase tracking-widest">
          ¿Qué es esto?
        </p>
        <div className="space-y-3">
          {[
            { icon: FiClock, text: "Esta sesión dura 30–45 minutos." },
            {
              icon: FiUsers,
              text: "Tú y el equipo STRING la completan juntos en llamada.",
            },
            {
              icon: FiFileText,
              text: "Al terminar se genera un documento firmado que arranca el desarrollo.",
            },
            {
              icon: FiZap,
              text: "Sin este documento, el desarrollo no inicia.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon className="text-base text-green flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={onSiguiente}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
        >
          Comenzar →
        </button>
        <a
          href="https://wa.me/525545524847"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs font-mono text-white/30 hover:text-white/60 transition-colors duration-200"
        >
          ¿Tienes dudas? Escríbenos al WhatsApp →
        </a>
      </div>
    </div>
  );
}
