"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { comparativa } from "../rest-data";
import { FiX, FiCheckCircle } from "react-icons/fi";

export default function RestComparativa() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const rowRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    [...headerRefs.current, ...rowRefs.current]
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));
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
        rowRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-8"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/94" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-gold/20" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
            04 · Antes vs. después
          </span>
        </div>
        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-8"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Cómo cambia el día a día
          <br />
          <span className="text-green">del restaurante.</span>
        </h2>

        {/* Headers */}
        <div
          ref={(el) => (headerRefs.current[2] = el)}
          className="grid grid-cols-2 gap-px bg-white/5 mb-px"
        >
          <div className="bg-black px-5 py-3">
            <p className="text-[10px] font-mono text-red/60 uppercase tracking-widest">
              Antes
            </p>
          </div>
          <div className="bg-black px-5 py-3">
            <p className="text-[10px] font-mono text-green uppercase tracking-widest">
              Después
            </p>
          </div>
        </div>

        {/* Filas */}
        <div className="space-y-px bg-white/5">
          {comparativa.map((c, i) => (
            <div
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              className="grid grid-cols-2 gap-px bg-white/5 group"
            >
              <div className="bg-black px-5 py-5 flex items-start gap-3 group-hover:bg-white/[0.02] transition-colors duration-200">
                <FiX className="text-red/50 text-sm mt-0.5 flex-shrink-0" />
                <p className="text-white/50 text-sm leading-relaxed">
                  {c.antes}
                </p>
              </div>
              <div className="bg-black px-5 py-5 flex items-start gap-3 group-hover:bg-white/[0.02] transition-colors duration-200">
                <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm leading-relaxed font-medium">
                  {c.despues}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        04
      </div>
    </div>
  );
}
