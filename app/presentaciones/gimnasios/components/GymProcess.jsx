"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    step: "01",
    title: "Diagnóstico gratuito",
    desc: "Analizamos tu flujo actual de prospectos y operación interna.",
    note: "30 minutos · Sin compromiso",
    color: "border-white/10",
  },
  {
    step: "02",
    title: "Propuesta del sistema",
    desc: "Te presentamos el nivel exacto que necesita tu gimnasio — con precio claro y alcance definido.",
    note: "Sin sorpresas",
    color: "border-white/10",
  },
  {
    step: "03",
    title: "Implementación",
    desc: "Construimos el sistema completo.",
    note: "3 a 4 semanas · Tu gimnasio no para",
    color: "border-white/10",
  },
  {
    step: "04",
    title: "Sistema activo",
    desc: "Te entregamos todo funcionando. Capacitación incluida.",
    note: "Soporte los primeros 30 días",
    color: "border-green",
  },
];

export default function GymProcess() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  const noteRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(headerRefs.current.filter(Boolean), { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(stepRefs.current.filter(Boolean), { opacity: 0, y: 30 });
    gsap.set(noteRef.current, { opacity: 0 });

    container.__animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline();

      // Header
      tl.to(headerRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });

      // Línea horizontal que crece
      tl.to(
        lineRef.current,
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      );

      // Steps uno por uno
      tl.to(
        stepRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: "power3.out" },
        "-=0.5"
      );

      // Nota final
      tl.to(noteRef.current, { opacity: 1, duration: 0.4 }, "-=0.1");
    };

    // Hover en steps
    stepRefs.current.forEach((step) => {
      if (!step) return;
      const dot = step.querySelector(".step-dot");
      const title = step.querySelector(".step-title");
      const note = step.querySelector(".step-note");

      step.addEventListener("mouseenter", () => {
        gsap.to(dot, { scale: 1.4, backgroundColor: "#50ff05", duration: 0.2 });
        gsap.to(title, { color: "#50ff05", duration: 0.2 });
        gsap.to(note, { opacity: 1, y: 0, duration: 0.2 });
      });

      step.addEventListener("mouseleave", () => {
        gsap.to(dot, { scale: 1, backgroundColor: "#50ff05", duration: 0.2 });
        gsap.to(title, { color: "#ffffff", duration: 0.2 });
        gsap.to(note, { opacity: 0.5, duration: 0.2 });
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center overflow-hidden bg-black"
    >
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
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            05 · Cómo funciona
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Del caos al sistema
          <br />
          <span className="text-green">en 3 semanas.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Línea base */}
          <div className="absolute top-4 left-0 right-0 h-px bg-white/5" />
          {/* Línea animada */}
          <div
            ref={lineRef}
            className="absolute top-4 left-0 right-0 h-px bg-green/40"
          />

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative pt-12 cursor-default"
              >
                {/* Dot */}
                <div className="absolute top-0 left-0 flex items-center justify-center -translate-y-1/2">
                  <div className="step-dot w-3 h-3 bg-green rounded-full" />
                  <div className="absolute w-7 h-7 bg-green/10 rounded-full" />
                </div>

                {/* Número */}
                <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em] block mb-3">
                  {s.step}
                </span>

                <h3 className="step-title font-black text-white text-lg uppercase tracking-tight leading-tight mb-3 transition-colors duration-200">
                  {s.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed mb-3">
                  {s.desc}
                </p>

                <p className="step-note text-[10px] font-mono text-green uppercase tracking-wider opacity-50">
                  {s.note}
                </p>

                {/* Flecha entre pasos */}
                {i < steps.length - 1 && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 text-white/10">
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

        {/* Nota de cierre */}
        <div ref={noteRef} className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
            Sin interrumpir tu operación · Capacitación incluida · Soporte 30
            días
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
