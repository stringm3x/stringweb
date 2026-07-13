"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "4", label: "Sistemas\nactivos" },
  { value: "1", label: "SaaS en\nproducción" },
  { value: "70", label: "Miembros en\nEvolution GYM" },
  { value: "3", label: "Sectores\natendidos" },
];

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
  const statsRef = useRef([]);
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
          ...statsRef.current.filter(Boolean),
        ],
        { opacity: 0 }
      );

      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: 60,
        skewY: 3,
      });

      gsap.set([tagRef.current, descRef.current, ctaRef.current], { y: 20 });
      gsap.set(statsRef.current.filter(Boolean), { y: 16 });
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
          statsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.45,
            ease: "power3.out",
          },
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
        className="absolute inset-0 bg-green z-50 pointer-events-none"
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

      {/* ── Glow ambiental ────────────────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Línea superior ────────────────────────────────────────────────── */}
      <div
        ref={lineTopRef}
        className="absolute top-0 left-0 right-0 h-px bg-green/40"
        style={{ transformOrigin: "left center" }}
      />

      {/* ── Número decorativo de fondo ────────────────────────────────────── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-anton text-[28vw] leading-none text-white/[0.02] select-none pointer-events-none pr-4 hidden lg:block">
        S
      </div>

      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-end">
          {/* Columna izquierda */}
          <div className="space-y-10">
            {/* Tag */}
            <div ref={tagRef}>
              <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Sistemas de conversión · CDMX
              </span>
            </div>

            {/* Headline — tipografía masiva */}
            <div className="overflow-hidden">
              <div className="space-y-1">
                <div ref={line1Ref} className="overflow-hidden">
                  <p className="font-anton text-[13vw] sm:text-[10vw] lg:text-[9vw] leading-[0.88] text-white uppercase tracking-tighter">
                    No necesitas
                  </p>
                </div>
                <div
                  ref={line2Ref}
                  className="overflow-hidden flex items-end gap-4"
                >
                  <p className="font-anton text-[13vw] sm:text-[10vw] lg:text-[9vw] leading-[0.88] text-green uppercase tracking-tighter">
                    más likes.
                  </p>
                </div>
                <div ref={line3Ref} className="overflow-hidden">
                  <p className="font-anton text-[13vw] sm:text-[10vw] lg:text-[9vw] leading-[0.88] text-white uppercase tracking-tighter">
                    Necesitas un{" "}
                    <span className="relative inline-block">
                      sistema
                      <span
                        ref={accentRef}
                        className="absolute bottom-1 left-0 right-0 h-[4px] bg-green"
                      />
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div ref={descRef} className="max-w-lg">
              <p className="text-gray text-base sm:text-lg leading-relaxed">
                Transformamos tu presencia digital en un sistema que genera
                clientes reales. Diagnóstico, estrategia y ejecución —{" "}
                <span className="text-white">sin plantillas, sin excusas.</span>
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
              >
                Solicitar diagnóstico
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/Services"
                className="group inline-flex items-center gap-2 text-sm text-gray hover:text-white transition-colors duration-200 border-b border-white/10 hover:border-white pb-0.5"
              >
                Ver los 4 sistemas
                <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Columna derecha — Stats verticales */}
          <div className="hidden lg:flex flex-col justify-end gap-0 border-l border-white/10">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="group px-8 py-6 border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors duration-200 cursor-default"
              >
                <p className="font-anton text-4xl text-green leading-none mb-1.5">
                  {stat.value}
                </p>
                <p className="text-xs text-gray uppercase tracking-widest leading-relaxed whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats mobile — fila horizontal */}
        <div className="grid grid-cols-4 gap-4 mt-14 pt-8 border-t border-white/10 lg:hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i + 4] = el)}
              className="text-center"
            >
              <p className="font-anton text-2xl text-green leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] text-gray uppercase tracking-wider leading-relaxed whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-6 sm:left-8 lg:left-12 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-gradient-to-b from-green/60 to-transparent" />
        <span className="text-[10px] text-gray uppercase tracking-[0.25em] font-mono">
          Scroll
        </span>
      </div>

      {/* ── Línea inferior ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  );
};

export default Hero;
