"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiArrowRight } from "react-icons/fi";
import { Boton } from "@/app/components/ui/Boton";

gsap.registerPlugin(ScrollTrigger);

const RASGOS = ["Diagnóstico 24h", "Sin compromiso", "100% personalizado"];

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
      className="relative overflow-hidden bg-fondo-elevado border-t-2 border-acido py-espacio-6 lg:py-espacio-7"
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
        <div
          ref={ctaRef}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="space-y-4 max-w-xl">
            <h3 className="font-anton text-titular-l text-white uppercase">
              ¿Listo para <span className="text-acido">transformar</span> tu
              negocio?
            </h3>
            <p className="text-tinta-suave text-cuerpo">
              Obtén un diagnóstico de tu presencia digital y descubre cómo un
              sistema estructurado puede organizar tu captación de clientes.
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              {RASGOS.map((rasgo) => (
                <span
                  key={rasgo}
                  className="font-mono uppercase text-etiqueta text-tinta-tenue"
                >
                  {rasgo}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Boton href="/cotizacion" variante="primario">
              Solicitar diagnóstico
              <FiArrowRight className="w-4 h-4" />
            </Boton>

            <Boton href="/servicios" variante="texto">
              Ver sistemas
            </Boton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
