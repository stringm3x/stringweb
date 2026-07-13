"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import {
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiUsers,
  FiClock,
  FiAward,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const stats = [
  {
    value: "4",
    label: "Sistemas activos",
    description: "Negocios transformados con estructura digital real.",
    metric: "Clientes recurrentes",
  },
  {
    value: "1",
    label: "SaaS en producción",
    description: "STRING GYM operando en un gimnasio real desde junio 2026.",
    metric: "En operación",
  },
  {
    value: "70",
    label: "Miembros gestionados",
    description: "Gestionados hoy en Evolution GYM con STRING GYM.",
    metric: "Dato real",
  },
];

const principios = [
  {
    icon: FiTarget,
    title: "Enfoque en conversión",
    desc: "No diseñamos páginas. Construimos sistemas que convierten visitas en clientes reales.",
  },
  {
    icon: FiTrendingUp,
    title: "Estructura clara",
    desc: "Cada elemento tiene un propósito estratégico: guiar al visitante hacia el contacto.",
  },
  {
    icon: FiZap,
    title: "Optimización continua",
    desc: "Mejoramos el flujo de captación basándonos en datos, no en tendencias.",
  },
  {
    icon: FiUsers,
    title: "Enfoque humano",
    desc: "Automatizamos procesos, no relaciones. La tecnología al servicio de las personas.",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Content = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const principiosRef = useRef([]);
  const statsRef = useRef([]);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(
        [tagRef.current, titleRef.current, descRef.current, ctaRef.current],
        { opacity: 0, y: 24 }
      );
      gsap.set(principiosRef.current.filter(Boolean), { opacity: 0, y: 20 });
      gsap.set(statsRef.current.filter(Boolean), { opacity: 0, y: 20 });
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // ── Header ──────────────────────────────────────────────────────────────
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: REVEAL_START,
          once: true,
        },
      });

      tlHeader
        .to(tagRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.7, ease: "expo.out" },
          "-=0.2"
        );

      // ── Principios ──────────────────────────────────────────────────────────
      gsap.to(principiosRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: principiosRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });

      // ── Stats ───────────────────────────────────────────────────────────────
      gsap.to(statsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });

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
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-green/3 rounded-full blur-[80px]" />
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
          {/* ── Header ────────────────────────────────────────────────────── */}
          <div ref={headerRef} className="max-w-3xl space-y-6">
            <div ref={tagRef}>
              <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green" />
                Nuestra filosofía
              </span>
            </div>

            <h2
              ref={titleRef}
              className="font-anton text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-white uppercase"
            >
              No es diseño, <span className="text-green">es estructura</span>
            </h2>

            <p
              ref={descRef}
              className="text-gray text-lg leading-relaxed max-w-xl"
            >
              En <span className="text-white font-semibold">STRING</span>{" "}
              transformamos presencia digital en clientes reales mediante
              sistemas claros de conversión. No vendemos páginas, vendemos{" "}
              <span className="text-white">estructura</span>.
            </p>

            {/* Línea decorativa animada */}
            <div
              ref={lineRef}
              className="h-px w-full bg-gradient-to-r from-green via-green/40 to-transparent"
            />
          </div>

          {/* ── Principios ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {principios.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  ref={(el) => (principiosRef.current[i] = el)}
                  className="group bg-black p-8 hover:bg-white/[0.03] transition-colors duration-300 relative"
                >
                  {/* Número de fondo */}
                  <span className="absolute top-6 right-6 font-anton text-6xl text-white/[0.04] select-none leading-none">
                    {i + 1}
                  </span>

                  <div className="relative z-10 space-y-4">
                    <div className="w-10 h-10 border border-green/30 rounded-sm flex items-center justify-center group-hover:border-green group-hover:bg-green/10 transition-all duration-300">
                      <Icon className="text-green text-lg" />
                    </div>

                    <h3 className="text-white font-bold text-base leading-tight">
                      {p.title}
                    </h3>

                    <p className="text-gray text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Borde inferior hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>

          {/* ── Stats ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="group bg-black px-8 py-10 hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden"
              >
                {/* Número grande de fondo */}
                <span className="absolute -bottom-4 -right-2 font-anton text-[8rem] leading-none text-white/[0.03] select-none">
                  {i + 1}
                </span>

                <div className="relative z-10 space-y-3">
                  <p className="font-anton text-6xl text-green leading-none">
                    {stat.value}
                  </p>
                  <h3 className="text-white font-bold text-base">
                    {stat.label}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {stat.description}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="w-1 h-1 rounded-full bg-green" />
                    <span className="text-xs text-green font-mono uppercase tracking-wider">
                      {stat.metric}
                    </span>
                  </div>
                </div>

                {/* Borde inferior hover */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <div
            ref={ctaRef}
            className="relative border border-white/10 p-10 md:p-14 overflow-hidden"
          >
            {/* Glow de fondo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-green/5 rounded-full blur-[80px] pointer-events-none" />

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
                  href="/quote"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200 whitespace-nowrap"
                >
                  Solicitar diagnóstico
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  href="/Services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
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
