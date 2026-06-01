"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { timeline } from "../rest-data";

export default function RestTimeline() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  const argRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    [...headerRefs.current, ...stepRefs.current]
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(argRef.current, { opacity: 0, y: 16 });

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
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      );
      tl.to(
        stepRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" },
        "-=0.5"
      );
      tl.to(
        argRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.1"
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
            06 · Timeline + Argumento financiero
          </span>
        </div>
        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-12"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          5 semanas.
          <br />
          <span className="text-green">Entregables por etapa.</span>
        </h2>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-4 left-0 right-0 h-px bg-white/5" />
          <div
            ref={lineRef}
            className="absolute top-4 left-0 right-0 h-px bg-gold/40"
          />
          <div className="grid grid-cols-5 gap-4 relative">
            {timeline.map((s, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative pt-10"
              >
                <div className="absolute top-0 left-0 flex items-center justify-center -translate-y-1/2">
                  <div className="w-3 h-3 bg-gold rounded-full" />
                  <div className="absolute w-6 h-6 bg-gold/20 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block mb-2">
                  {s.semana}
                </span>
                <h3 className="font-black text-white text-sm uppercase tracking-tight leading-tight mb-1">
                  {s.titulo}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {s.desc}
                </p>
                {s.revision && (
                  <span className="inline-block mt-2 text-[9px] font-mono text-green uppercase tracking-widest border border-green/30 px-1.5 py-0.5">
                    ✓ Revisión
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-0 mb-10">
          {timeline.map((s, i) => (
            <div
              key={i}
              ref={(el) => (stepRefs.current[i + 5] = el)}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 bg-gold rounded-full" />
                {i < timeline.length - 1 && (
                  <div
                    className="w-px flex-1 bg-gold/20 my-1"
                    style={{ minHeight: "40px" }}
                  />
                )}
              </div>
              <div className="pb-5 flex-1">
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block mb-1">
                  {s.semana}
                </span>
                <h3 className="font-black text-white text-sm uppercase tracking-tight leading-tight mb-1">
                  {s.titulo}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {s.desc}
                </p>
                {s.revision && (
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-green uppercase tracking-widest border border-green/30 px-1.5 py-0.5">
                    ✓ Revisión
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Argumento financiero */}
        <div
          ref={argRef}
          className="border border-gold/20 bg-gold/5 p-6 lg:p-8"
        >
          <p className="text-[10px] font-mono text-gold uppercase tracking-widest mb-4">
            El argumento financiero
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Un restaurante con{" "}
            <span className="text-white font-bold">
              10 reservaciones por semana
            </span>{" "}
            y <span className="text-white font-bold">20% de no-shows</span>{" "}
            pierde entre{" "}
            <span className="text-white font-bold">8 y 12 mesas al mes</span>.
            El sistema de recordatorios solo recupera entre 3 y 5 de esas mesas.
          </p>
          <p className="font-black text-white text-2xl leading-none mb-2">
            $2,400 – $4,000 MXN
            <span className="text-sm font-normal text-white/40 ml-2">
              recuperados al mes — todos los meses.
            </span>
          </p>
          <p className="text-white/30 text-xs font-mono">
            En un ticket promedio de $400 MXN por persona · El sistema se paga
            solo en menos de 8 meses.
          </p>
        </div>
      </div>
      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        06
      </div>
    </div>
  );
}
