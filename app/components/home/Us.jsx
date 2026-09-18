"use client";

import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";

gsap.registerPlugin(ScrollTrigger);

const PUNTOS = [
  "Diagnóstico real antes de cualquier propuesta",
  "Sin plantillas — cada sistema es construido desde cero",
  "Entregamos en 24h el análisis inicial",
  "Soporte continuo después de la entrega",
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Us = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, contentRef.current, cardRef.current], {
        opacity: 0,
        y: 24,
      });

      // ── Contenido ───────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: REVEAL_START,
          once: true,
        },
      });

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          contentRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          cardRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-papel py-espacio-6 lg:py-espacio-7"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Columna izquierda ─────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Tag */}
            <div ref={tagRef}>
              <Etiqueta conPunto sobrePapel>
                STRING Studio
              </Etiqueta>
            </div>

            {/* Texto */}
            <div ref={contentRef} className="space-y-6">
              <h2 className="font-anton text-titular-l text-tinta-papel uppercase">
                Hemos ayudado
                <br />
                a las marcas a
                <br />
                <span className="text-acido-profundo">crecer con</span>
                <br />
                <span className="text-acido-profundo">claridad.</span>
              </h2>

              <p className="text-tinta-papel/70 text-cuerpo max-w-md">
                En STRING transformamos presencia digital en clientes reales.
                Cada sistema es único, construido a medida, sin plantillas ni
                atajos.
              </p>

              <Boton href="/nosotros" variante="primario" sobrePapel>
                Acerca de STRING
                <FiArrowRight className="w-4 h-4" />
              </Boton>
            </div>
          </div>

          {/* ── Columna derecha — card de propuesta ───────────────────────── */}
          <div ref={cardRef} className="w-full lg:flex lg:justify-end">
            <div className="border border-tinta-papel/10 bg-papel p-8 max-w-md w-full">
              {/* Header card */}
              <div className="border-b border-tinta-papel/10 pb-6 mb-6">
                <Etiqueta variante="texto" sobrePapel className="mb-3">
                  Por qué STRING
                </Etiqueta>
                <p className="text-tinta-papel text-cuerpo-l font-medium">
                  No vendemos páginas web. Vendemos sistemas que trabajan por tu
                  negocio mientras tú haces lo tuyo.
                </p>
              </div>

              {/* Puntos clave */}
              <div className="space-y-4">
                {PUNTOS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-acido-profundo mt-2 flex-shrink-0" />
                    <span className="text-tinta-papel/70 text-cuerpo-s">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Firma */}
              <div className="mt-8 pt-6 border-t border-tinta-papel/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-acido-profundo flex items-center justify-center flex-shrink-0">
                  <span className="font-anton text-white text-sm">S</span>
                </div>
                <div>
                  <p className="text-tinta-papel text-sm font-semibold">
                    STRING
                  </p>
                  <p className="font-mono uppercase text-etiqueta text-tinta-papel/60">
                    Sistemas digitales estratégicos · CDMX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Us;
