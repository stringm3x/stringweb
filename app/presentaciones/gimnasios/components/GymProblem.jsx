"use client";

import { problems, problemClose } from "../gym-data";

// Slide 2 — El Problema (6 golpes: 4 externos + 2 internos)
export default function GymProblem() {
  const external = problems.filter((p) => p.type === "external");
  const internal = problems.filter((p) => p.type === "internal");

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
        {/* Header */}
        <div className="slide-tag mb-8">
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em]">
            02 · El problema
          </span>
        </div>

        <h2
          className="slide-heading font-black text-white uppercase leading-[0.9] tracking-tighter mb-10"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          Así se escapa dinero
          <br />
          <span className="text-green-400">todos los días.</span>
        </h2>

        {/* Externos — captación */}
        <p className="slide-sub text-[10px] font-mono text-gray-600 uppercase tracking-[0.25em] mb-3">
          Afuera — captación
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-px">
          {external.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="slide-item bg-black px-5 py-6 group hover:bg-white/[0.03] transition-colors duration-200 relative"
              >
                <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                  {i + 1}
                </span>
                <div className="w-8 h-8 border border-green-400/20 flex items-center justify-center mb-4 group-hover:border-green-400 group-hover:bg-green-400/10 transition-all duration-300">
                  <Icon className="text-green-400 text-sm" />
                </div>
                <p className="text-white/50 text-xs font-mono leading-relaxed mb-2">
                  {p.trigger}
                </p>
                <p className="text-white font-bold text-sm leading-tight">
                  {p.result}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Internos — operación */}
        <p className="slide-item text-[10px] font-mono text-gray-600 uppercase tracking-[0.25em] mb-3 mt-px pt-4">
          Adentro — operación
        </p>
        <div className="grid grid-cols-2 gap-px bg-white/5">
          {internal.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="slide-item bg-black px-5 py-6 group hover:bg-white/[0.03] transition-colors duration-200 relative"
              >
                <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                  {i + 5}
                </span>
                <div className="w-8 h-8 border border-red-500/20 flex items-center justify-center mb-4 group-hover:border-red-500/40 transition-all duration-300">
                  <Icon className="text-red-400/70 text-sm" />
                </div>
                <p className="text-white/50 text-xs font-mono leading-relaxed mb-2">
                  {p.trigger}
                </p>
                <p className="text-white font-bold text-sm leading-tight">
                  {p.result}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-red-500/40 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Cierre */}
        <div className="slide-item mt-8 border-l-2 border-green-400 pl-5">
          <p className="text-white font-bold text-base leading-snug">
            {problemClose}
          </p>
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        02
      </div>
    </div>
  );
}
