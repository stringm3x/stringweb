"use client";

import { caseStudy } from "../gym-data";
import { FiCheckCircle } from "react-icons/fi";

// Slide 4 — Caso Real
export default function GymCaseStudy() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/88" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green-400/20" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 lg:px-20">
        <div className="slide-tag mb-8">
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em]">
            04 · Caso real
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Izquierda */}
          <div className="space-y-5">
            <h2
              className="slide-heading font-black text-white uppercase leading-[0.9] tracking-tighter"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {caseStudy.name}
            </h2>

            <p className="slide-sub text-gray-400 text-sm leading-relaxed">
              {caseStudy.context}
            </p>

            <div className="border-l-2 border-green-400/30 pl-4 space-y-1">
              <p className="text-[10px] font-mono text-green-400 uppercase tracking-widest">
                Sistema implementado
              </p>
              <p className="text-white font-bold text-sm">
                {caseStudy.systemLabel} · {caseStudy.location}
              </p>
            </div>

            {/* Status */}
            <div className="border border-green-400/20 bg-green-400/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                  Sistema activo
                </span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                {caseStudy.status}
              </p>
              <p className="text-gray-600 text-[10px] leading-relaxed italic border-t border-white/5 pt-2 mt-2">
                {caseStudy.note}
              </p>
            </div>
          </div>

          {/* Derecha */}
          <div className="border border-white/10 p-6 space-y-3">
            <p className="text-[10px] font-mono text-green-400 uppercase tracking-[0.2em] mb-4">
              Lo que implementamos
            </p>
            {caseStudy.implemented.map((item, i) => (
              <div key={i} className="slide-item flex items-start gap-3">
                <FiCheckCircle className="text-green-400 text-xs mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        04
      </div>
    </div>
  );
}
