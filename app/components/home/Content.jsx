"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiArrowRight, FiTarget, FiClock, FiAward } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Componente ───────────────────────────────────────────────────────────────
const Content = () => {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(ctaRef.current, { opacity: 0, y: 24 });

      // ── CTA ─────────────────────────────────────────────────────────────────
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: REVEAL_START,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid de puntos */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-20 lg:gap-28">
          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <div
            ref={ctaRef}
            className="relative border border-white/10 p-10 md:p-14 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <h3 className="font-anton text-4xl md:text-5xl text-white uppercase leading-[0.95] tracking-tight">
                  ¿Listo para <span className="text-green">transformar</span> tu
                  negocio?
                </h3>
                <p className="text-gray leading-relaxed">
                  Obtén un diagnóstico de tu presencia digital y descubre cómo
                  un sistema estructurado puede organizar tu captación de
                  clientes.
                </p>

                <div className="flex flex-wrap gap-6 pt-2">
                  {[
                    { icon: FiClock, label: "Diagnóstico 24h" },
                    { icon: FiAward, label: "Sin compromiso" },
                    { icon: FiTarget, label: "100% personalizado" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-xs text-gray font-mono"
                    >
                      <Icon className="text-green" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link
                  href="/cotizacion"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 whitespace-nowrap"
                >
                  Solicitar diagnóstico
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-bold text-sm uppercase tracking-wide hover:border-white/40 hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
                >
                  Ver sistemas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
