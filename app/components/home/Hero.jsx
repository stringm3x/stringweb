"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { HOME_STATS } from "@/app/lib/stats";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { FranjaDatos } from "@/app/components/ui/FranjaDatos";

gsap.registerPlugin(ScrollTrigger);

// ─── Componente ───────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const lineTopRef = useRef(null);
  const tagRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const franjaRef = useRef(null);
  const accentRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(
        [
          tagRef.current,
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          descRef.current,
          ctaRef.current,
          accentRef.current,
          scrollRef.current,
          franjaRef.current,
        ],
        { opacity: 0 }
      );

      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: 60,
        skewY: 3,
      });

      gsap.set([tagRef.current, descRef.current, ctaRef.current, franjaRef.current], {
        y: 20,
      });
      gsap.set(accentRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // ── Overlay de entrada ──────────────────────────────────────────────────
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1, transformOrigin: "right center" },
        {
          scaleX: 0,
          duration: 1.2,
          ease: "expo.inOut",
        }
      );

      // ── Línea superior ──────────────────────────────────────────────────────
      gsap.fromTo(
        lineTopRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "expo.out", delay: 0.3 }
      );

      // ── Timeline principal ──────────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(
          accentRef.current,
          { scaleX: 1, duration: 0.6, ease: "expo.out" },
          "-=0.3"
        )
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          franjaRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        )
        .to(
          scrollRef.current,
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden"
    >
      {/* ── Overlay de entrada ─────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-acido z-50 pointer-events-none"
      />

      {/* ── Fondo: grid de puntos ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Línea superior ────────────────────────────────────────────────── */}
      <div
        ref={lineTopRef}
        className="absolute top-0 left-0 right-0 h-px bg-acido/40"
        style={{ transformOrigin: "left center" }}
      />

      {/* ── Número decorativo de fondo ────────────────────────────────────── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-anton text-[28vw] leading-none text-white/[0.02] select-none pointer-events-none pr-4 hidden lg:block">
        S
      </div>

      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="space-y-10">
          {/* Tag */}
          <div ref={tagRef}>
            <Etiqueta conPunto>Sistemas de conversión · CDMX</Etiqueta>
          </div>

          {/* Headline */}
          <div className="overflow-hidden">
            <div className="space-y-1">
              <div ref={line1Ref} className="overflow-hidden">
                <p className="font-anton text-titular-m sm:text-titular-l lg:text-titular-xl text-white uppercase">
                  No necesitas
                </p>
              </div>
              <div ref={line2Ref} className="overflow-hidden flex items-end gap-4">
                <p className="font-anton text-titular-m sm:text-titular-l lg:text-titular-xl text-acido uppercase">
                  más seguidores.
                </p>
              </div>
              <div ref={line3Ref} className="overflow-hidden">
                <p className="font-anton text-titular-m sm:text-titular-l lg:text-titular-xl text-white uppercase">
                  Necesitas un{" "}
                  <span className="relative inline-block">
                    sistema
                    <span
                      ref={accentRef}
                      className="absolute bottom-1 left-0 right-0 h-[4px] bg-acido"
                    />
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div ref={descRef} className="max-w-lg">
            <p className="text-tinta-suave text-cuerpo-l">
              Transformamos tu presencia digital en un sistema que genera
              clientes reales. Diagnóstico, estrategia y ejecución —{" "}
              <span className="text-white">sin plantillas, sin excusas.</span>
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Boton href="/cotizacion" variante="primario">
              Solicitar diagnóstico
              <FiArrowRight className="w-4 h-4" />
            </Boton>

            <Boton href="/servicios" variante="secundario">
              Ver los 4 sistemas
              <FiArrowUpRight className="w-4 h-4" />
            </Boton>
          </div>
        </div>

        {/* Franja de cifras */}
        <div ref={franjaRef} className="mt-espacio-6 lg:mt-espacio-7">
          <FranjaDatos datos={HOME_STATS} />
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-6 sm:left-8 lg:left-12 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-acido" />
        <span className="text-etiqueta text-tinta-suave uppercase font-mono">
          Scroll
        </span>
      </div>

      {/* ── Línea inferior ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  );
};

export default Hero;
