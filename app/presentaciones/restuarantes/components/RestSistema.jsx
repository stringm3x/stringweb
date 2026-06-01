"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiCheckCircle } from "react-icons/fi";
import { incluye, flujo } from "../rest-data";

export default function RestSistema() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const itemRefs = useRef([]);
  const flujoRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    [...headerRefs.current, ...itemRefs.current, ...flujoRefs.current]
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
        itemRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        flujoRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: "power3.out" },
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
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
            05 · Qué incluye + Cómo funciona
          </span>
        </div>
        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-8"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Sistema Mesa N3 —
          <br />
          <span className="text-green">todo lo que recibe el restaurante.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {/* Qué incluye */}
          <div className="bg-black p-6 lg:p-8">
            <p
              ref={(el) => (headerRefs.current[2] = el)}
              className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] mb-5"
            >
              Entregables concretos
            </p>
            <div className="space-y-2.5">
              {incluye.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="flex items-start gap-3 group"
                >
                  <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-xs leading-relaxed group-hover:text-white transition-colors duration-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cómo funciona */}
          <div className="bg-black p-6 lg:p-8">
            <p
              ref={(el) => (headerRefs.current[3] = el)}
              className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] mb-5"
            >
              Un día normal con el sistema activo
            </p>
            <div className="space-y-3">
              {flujo.map((f, i) => (
                <div
                  key={i}
                  ref={(el) => (flujoRefs.current[i] = el)}
                  className="flex items-start gap-3"
                >
                  <span className="text-[10px] font-mono text-gold/60 w-6 flex-shrink-0 mt-0.5">
                    {f.step}
                  </span>
                  <div className="flex-1">
                    <p className="text-white/60 text-xs leading-relaxed">
                      {f.desc}
                    </p>
                    {i < flujo.length - 1 && (
                      <div className="w-px h-3 bg-white/10 ml-0 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
