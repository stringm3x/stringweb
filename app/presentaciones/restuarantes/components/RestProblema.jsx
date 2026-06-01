"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { problems } from "../rest-data";

export default function RestProblema() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const cardRefs = useRef([]);
  const closeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(
      [
        ...headerRefs.current.filter(Boolean),
        ...cardRefs.current.filter(Boolean),
        closeRef.current,
      ].filter(Boolean),
      { opacity: 0, y: 24 }
    );

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
        cardRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        closeRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.1"
      );
    };
  }, []);

  const external = problems.filter((p) => p.type === "external");
  const internal = problems.filter((p) => p.type === "internal");

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
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80')",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
            02 · El diagnóstico
          </span>
        </div>
        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-3"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Lo que le pasa a casi todo
          <br />
          <span className="text-gold">restaurante en México.</span>
        </h2>
        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-white/40 text-sm mb-8 max-w-xl"
        >
          Sin tecnicismos. Esto es lo que cuesta hoy no tener un sistema.
        </p>

        {/* Externa */}
        <p
          ref={(el) => (headerRefs.current[3] = el)}
          className="text-[10px] font-mono text-white/30 uppercase tracking-[0.25em] mb-2"
        >
          Con los clientes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 mb-px">
          {external.map((p, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="bg-black px-5 py-6 group hover:bg-white/[0.03] transition-colors duration-200 relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                {p.number}
              </span>
              <p className="text-white/30 text-xs font-mono leading-relaxed mb-3 pr-6">
                {p.trigger}
              </p>
              <p className="text-white font-bold text-sm leading-snug">
                {p.result}
              </p>
              <div className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Interna */}
        <p
          ref={(el) => (headerRefs.current[4] = el)}
          className="text-[10px] font-mono text-white/30 uppercase tracking-[0.25em] mb-2 mt-3"
        >
          En la operación
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {internal.map((p, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[external.length + i] = el)}
              className="bg-black px-5 py-6 group hover:bg-white/[0.03] transition-colors duration-200 relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                {p.number}
              </span>
              <p className="text-white/30 text-xs font-mono leading-relaxed mb-3 pr-6">
                {p.trigger}
              </p>
              <p className="text-white font-bold text-sm leading-snug">
                {p.result}
              </p>
              <div className="absolute bottom-0 left-0 h-px bg-red/40 w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        <div ref={closeRef} className="mt-6 border-l-2 border-gold pl-5">
          <p className="text-white font-bold text-sm">
            Esto es lo que cuesta hoy no tener un sistema.
          </p>
        </div>
      </div>
      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        02
      </div>
    </div>
  );
}
