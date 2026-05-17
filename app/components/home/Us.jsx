"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiUsers,
  FiAward,
  FiTarget,
  FiClock,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos reales ─────────────────────────────────────────────────────────────
const stats = [
  { icon: FiUsers, value: "10+", label: "Clientes con sistema" },
  { icon: FiAward, value: "2+", label: "Años de experiencia" },
  { icon: FiTarget, value: "4", label: "Sistemas activos" },
  { icon: FiClock, value: "24h", label: "Diagnóstico inicial" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Us = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, contentRef.current, cardRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(statsRef.current.filter(Boolean), { opacity: 0, y: 16 });

      // ── Contenido ───────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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

      // ── Stats ───────────────────────────────────────────────────────────────
      gsap.to(statsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 86%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-24"
    >
      {/* ── Imagen de fondo ───────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/sonido.png"
          alt="STRING Studio"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />
      </div>

      {/* ── Decorativo ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Columna izquierda ─────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Tag */}
            <div ref={tagRef}>
              <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                STRING Studio
              </span>
            </div>

            {/* Texto */}
            <div ref={contentRef} className="space-y-6">
              <h2 className="font-anton text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter uppercase">
                <span className="text-white">Hemos ayudado</span>
                <br />
                <span className="text-white">a las marcas a</span>
                <br />
                <span className="text-green">crecer con</span>
                <br />
                <span className="text-green">claridad.</span>
              </h2>

              <p className="text-gray text-base sm:text-lg leading-relaxed max-w-md">
                En STRING transformamos presencia digital en clientes reales.
                Cada sistema es único, construido a medida, sin plantillas ni
                atajos.
              </p>

              <Link
                href="/Us"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
              >
                Acerca de STRING
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* ── Columna derecha — card de propuesta ───────────────────────── */}
          <div ref={cardRef} className="w-full lg:flex lg:justify-end">
            <div className="border border-white/10 bg-black/60 backdrop-blur-md p-8 max-w-md w-full">
              {/* Header card */}
              <div className="border-b border-white/10 pb-6 mb-6">
                <p className="text-xs font-mono text-green uppercase tracking-[0.2em] mb-3">
                  Por qué STRING
                </p>
                <p className="text-white text-lg leading-relaxed font-medium">
                  No vendemos páginas web. Vendemos sistemas que trabajan por tu
                  negocio mientras tú haces lo tuyo.
                </p>
              </div>

              {/* Puntos clave */}
              <div className="space-y-4">
                {[
                  "Diagnóstico real antes de cualquier propuesta",
                  "Sin plantillas — cada sistema es construido desde cero",
                  "Entregamos en 24h el análisis inicial",
                  "Soporte continuo después de la entrega",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-green mt-2 flex-shrink-0" />
                    <span className="text-gray text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Firma */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-green flex items-center justify-center flex-shrink-0">
                  <span className="font-anton text-black text-sm">S</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">STRING</p>
                  <p className="text-gray text-xs font-mono">
                    Sistemas digitales estratégicos · CDMX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-px bg-white/5 mt-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="bg-black/80 backdrop-blur-sm px-4 py-6 text-center hover:bg-black/60 transition-colors duration-200"
              >
                <Icon className="text-green text-xl mx-auto mb-2" />
                <p className="font-anton text-2xl text-green leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Us;
