"use client";

import { levels } from "../gym-data";
import { FiCheckCircle } from "react-icons/fi";

// Slide 3 — La Solución
export default function GymSolution() {
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 lg:px-20">
        <div className="slide-tag mb-6">
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em]">
            03 · La solución STRING
          </span>
        </div>

        <h2
          className="slide-heading font-black text-white uppercase leading-[0.9] tracking-tighter mb-8"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
        >
          Elige el sistema que
          <br />
          <span className="text-green-400">necesita tu gimnasio</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5">
          {levels.map((level) => {
            const Icon = level.icon;
            const isRecommended = level.tag === "Recomendado";
            const isGymComplete = level.id === "gym-completo";

            return (
              <div
                key={level.id}
                className={`slide-item bg-black px-6 py-7 relative group hover:bg-white/[0.03] transition-colors duration-200 ${
                  isRecommended ? "border-t-2 border-green-400" : ""
                }`}
              >
                {/* Tag recomendado */}
                {isRecommended && (
                  <div className="absolute top-0 left-6">
                    <span className="bg-green-400 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 -translate-y-full inline-block">
                      ⭐ Recomendado
                    </span>
                  </div>
                )}

                {/* Ícono + label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-green-400/30 flex items-center justify-center group-hover:border-green-400 group-hover:bg-green-400/10 transition-all duration-300">
                    <Icon className="text-green-400 text-sm" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    {level.label}
                  </span>
                </div>

                <h3 className="font-black text-white text-lg uppercase tracking-tight leading-tight mb-1">
                  {level.title}
                </h3>

                <p className="font-black text-green-400 text-xl leading-none mb-3">
                  {level.price}{" "}
                  <span className="text-xs font-normal text-gray-500">MXN</span>
                </p>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 pb-4 border-b border-white/5">
                  {level.description}
                </p>

                {/* Features — con grupos si aplica */}
                {isGymComplete && level.featureGroups ? (
                  <div className="space-y-4">
                    {level.featureGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[9px] font-mono text-green-400/60 uppercase tracking-[0.2em] mb-2">
                          {group.label}
                        </p>
                        <ul className="space-y-1.5">
                          {group.items.map((f, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <FiCheckCircle className="text-green-400 text-xs mt-0.5 flex-shrink-0" />
                              <span className="text-white/70 text-xs leading-relaxed">
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {level.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <FiCheckCircle className="text-green-400 text-xs mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-xs leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tagline Sistema GYM */}
                {isGymComplete && (
                  <p className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-green-400/60 italic">
                    Un solo sistema. Todo el gimnasio adentro.
                  </p>
                )}

                <div className="absolute bottom-0 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        03
      </div>
    </div>
  );
}
