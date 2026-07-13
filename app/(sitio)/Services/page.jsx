"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiAward,
} from "react-icons/fi";
import servicios from "./data";

gsap.registerPlugin(ScrollTrigger);

// ─── Stats ────────────────────────────────────────────────────────────────────
const statsPrincipales = [
  { value: "4", label: "Sistemas\nactivos", icon: FiUsers },
  { value: "1", label: "SaaS en\nproducción", icon: FiBarChart2 },
  { value: "70", label: "Miembros en\nEvolution GYM", icon: FiClock },
  { value: "3", label: "Sectores\natendidos", icon: FiAward },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const PageServices = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(statsRef.current.filter(Boolean), { opacity: 0, y: 16 });
      gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      // ── Header ──────────────────────────────────────────────────────────────
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: tagRef.current,
          start: "top 82%",
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
          start: "top 84%",
          once: true,
        },
      });

      // ── Cards ───────────────────────────────────────────────────────────────
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 84%",
          once: true,
        },
      });

      // ── CTA ─────────────────────────────────────────────────────────────────
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Sistemas de conversión
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase"
          >
            <span className="text-white">Servicios</span>{" "}
            <span className="text-green">estratégicos</span>
          </h1>

          <p
            ref={descRef}
            className="text-gray text-lg leading-relaxed max-w-xl"
          >
            No vendemos páginas. Implementamos sistemas digitales diseñados para
            convertir visitas en clientes reales.
          </p>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-px bg-white/5 mb-16">
          {statsPrincipales.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                ref={(el) => (statsRef.current[i] = el)}
                className="bg-black px-4 py-6 text-center hover:bg-white/[0.03] transition-colors duration-200"
              >
                <Icon className="text-green text-xl mx-auto mb-2" />
                <p className="font-anton text-2xl text-green leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray uppercase tracking-wider leading-relaxed whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Grid de servicios ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon;
            return (
              <Link
                href={`/Services/${servicio.id}`}
                key={servicio.id}
                className="block group"
              >
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="relative bg-black overflow-hidden h-full hover:bg-white/[0.03] transition-colors duration-300"
                >
                  {/* Imagen */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={servicio.img}
                      alt={servicio.service}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Precio sobre imagen */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-green/30 text-green text-xs font-mono">
                        {servicio.metric}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 border border-green/30 flex items-center justify-center group-hover:border-green group-hover:bg-green/10 transition-all duration-300">
                        <Icon className="text-green text-base" />
                      </div>
                      <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                        {servicio.title2}
                      </span>
                    </div>

                    <h2 className="font-anton text-2xl text-white tracking-tight leading-tight mb-3 group-hover:text-green transition-colors duration-200">
                      {servicio.service}
                    </h2>

                    <p className="text-gray text-sm leading-relaxed mb-6 line-clamp-2">
                      {servicio.intro}
                    </p>

                    {/* Stats rápidas */}
                    <div className="flex gap-6 mb-6 pb-6 border-b border-white/5">
                      {servicio.stats.map((stat, i) => (
                        <div key={i}>
                          <p className="font-anton text-lg text-green leading-none">
                            {stat.value}
                          </p>
                          <p className="text-[10px] text-gray uppercase tracking-wider mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray group-hover:text-green transition-colors duration-200 uppercase tracking-wider">
                        Ver sistema
                      </span>
                      <FiArrowRight className="text-gray group-hover:text-green group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>

                  {/* Borde inferior hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center mt-20 space-y-4">
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
          >
            Diagnosticar mi negocio
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <p className="text-xs text-gray font-mono">
            Diagnóstico gratuito · Respuesta en 24h
          </p>
        </div>

        {/* ── CTA STRING SaaS ──────────────────────────────────────────────── */}
        <div className="mt-16 border border-white/10 p-8 md:p-10 text-center space-y-3">
          <h3 className="font-anton text-2xl md:text-3xl text-white uppercase tracking-tight">
            ¿Presupuesto limitado <span className="text-green">o necesitas empezar ya?</span>
          </h3>
          <p className="text-gray text-sm leading-relaxed max-w-xl mx-auto">
            STRING también tiene sistemas listos por nicho con suscripción
            mensual. Primer producto activo:{" "}
            <span className="text-white font-semibold">STRING GYM</span> para
            gimnasios — desde $799/mes.
          </p>
          <Link
            href="/#saas"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3 transition-all duration-200"
          >
            Conocer STRING SaaS
            <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageServices;
