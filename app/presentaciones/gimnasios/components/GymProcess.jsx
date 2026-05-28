"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    step: "01",
    title: "Diagnóstico gratuito",
    desc: "Analizamos tu flujo actual de prospectos y operación interna.",
    note: "30 minutos · Sin compromiso",
  },
  {
    step: "02",
    title: "Propuesta del sistema",
    desc: "Te presentamos el nivel exacto que necesita tu gimnasio — con precio claro y alcance definido.",
    note: "Sin sorpresas",
  },
  {
    step: "03",
    title: "Implementación",
    desc: "Construimos el sistema completo.",
    note: "3 a 4 semanas · Tu gimnasio no para",
  },
  {
    step: "04",
    title: "Sistema activo",
    desc: "Te entregamos todo funcionando. Capacitación incluida.",
    note: "Soporte los primeros 30 días",
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

      tl.to(headerRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
      tl.to(
        stepRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.5"
      );
      tl.to(noteRef.current, { opacity: 1, duration: 0.4 }, "-=0.1");
    };

    // Hover en steps — solo desktop
    stepRefs.current.forEach((step) => {
      if (!step) return;
      const title = step.querySelector(".step-title");
      const note = step.querySelector(".step-note");

      step.addEventListener("mouseenter", () => {
        gsap.to(title, { color: "#50ff05", duration: 0.2 });
        gsap.to(note, { opacity: 1, duration: 0.2 });
      });
      step.addEventListener("mouseleave", () => {
        gsap.to(title, { color: "#ffffff", duration: 0.2 });
        gsap.to(note, { opacity: 0.5, duration: 0.2 });
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            05 · Cómo funciona
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Del caos al sistema
          <br />
          <span className="text-green">en 3 semanas.</span>
        </h2>

        {/* ── Desktop — timeline horizontal ────────────────────────────── */}
        <div className="hidden lg:block relative">
          <div className="absolute top-4 left-0 right-0 h-px bg-white/5" />
          <div
            ref={lineRef}
            className="absolute top-4 left-0 right-0 h-px bg-green/40"
          />

          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative pt-12 cursor-default"
              >
                <div className="absolute top-0 left-0 flex items-center justify-center -translate-y-1/2">
                  <div className="w-3 h-3 bg-green rounded-full" />
                  <div className="absolute w-7 h-7 bg-green/20 rounded-full" />
                </div>
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

        {/* ── Mobile — pasos verticales ─────────────────────────────────── */}
        <div className="lg:hidden space-y-0">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className="relative flex gap-5"
            >
              {/* Línea vertical + dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 bg-green rounded-full z-10" />
                  <div className="absolute w-6 h-6 bg-green/20 rounded-full" />
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 bg-green/20 my-1"
                    style={{ minHeight: "60px" }}
                  />
                )}
              </div>

              {/* Contenido */}
              <div className="pb-8 flex-1">
                <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em] block mb-2">
                  {s.step}
                </span>
                <h3 className="step-title font-black text-white text-xl uppercase tracking-tight leading-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-2">
                  {s.desc}
                </p>
                <p className="step-note text-[10px] font-mono text-green uppercase tracking-wider opacity-70">
                  {s.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de cierre */}
        <div ref={noteRef} className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest text-center">
            Sin interrumpir tu operación · Capacitación incluida
          </p>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>

      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        05
      </div>
    </div>
  );
}
