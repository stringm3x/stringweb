"use client";

import { process } from "../gym-data";

// Slide 5 — Cómo funciona
export default function GymProcess() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 lg:px-20">
        <div className="slide-tag mb-8">
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em]">
            05 · Cómo funciona
          </span>
        </div>

        <h2
          className="slide-heading font-black text-white uppercase leading-[0.9] tracking-tighter mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Del caos al sistema
          <br />
          <span className="text-green-400">en 3 semanas.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Línea horizontal */}
          <div className="absolute top-5 left-0 right-0 h-px bg-white/10" />
          {/* Línea de progreso verde */}
          <div className="absolute top-5 left-0 w-full h-px bg-green-400/30" />

          <div className="grid grid-cols-4 gap-0 relative">
            {process.map((p, i) => (
              <div key={i} className="slide-item relative pt-12 pr-8">
                {/* Dot */}
                <div className="absolute top-0 left-0 w-10 h-10 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <div className="absolute w-6 h-6 bg-green-400/20 rounded-full" />
                </div>

                {/* Número */}
                <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em] block mb-3">
                  {p.step}
                </span>

                <h3 className="text-white font-black text-lg uppercase tracking-tight leading-tight mb-3">
                  {p.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.desc}
                </p>

                {/* Flecha entre pasos */}
                {i < process.length - 1 && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 text-green-400/40">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path
                        d="M1 5h12M8 1l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Nota */}
        <div className="slide-sub mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
            Sin interrumpir tu operación
          </p>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        05
      </div>
    </div>
  );
}
