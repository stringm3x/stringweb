"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiArrowRight } from "react-icons/fi";
import servicios from "./data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const continuidad = [
  {
    nombre: "Base",
    precio: "$1,800–$2,500/mes",
    incluye: "Hosting, mantenimiento y soporte",
  },
  {
    nombre: "Crecimiento",
    precio: "$3,000–$4,500/mes",
    incluye: "Optimización mensual y ajustes",
  },
  {
    nombre: "Escalamiento",
    precio: "$5,000–$8,000/mes",
    incluye: "Análisis, mejoras y soporte prioritario",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const PageServices = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      // ── Header ──────────────────────────────────────────────────────────────
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: tagRef.current,
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
        );

      // ── Cards ───────────────────────────────────────────────────────────────
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: REVEAL_START,
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
      className="min-h-screen bg-black py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
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
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em]">
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

        {/* ── Grid de servicios ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map((servicio, index) => {
            const destacado = servicio.id === "3";
            const kicker = destacado
              ? `NIVEL ${servicio.id.padStart(2, "0")} · RECOMENDADO`
              : `NIVEL ${servicio.id.padStart(2, "0")}`;
            return (
              <div key={servicio.id} ref={(el) => (cardsRef.current[index] = el)}>
                <TarjetaSistema
                  kicker={kicker}
                  precio={servicio.metric}
                  titulo={servicio.service}
                  frase={servicio.intro}
                  puntos={servicio.incluye.slice(0, 6)}
                  destacada={destacado}
                >
                  <Boton href={`/servicios/${servicio.id}`} variante="texto">
                    Ver sistema
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Boton>
                </TarjetaSistema>
              </div>
            );
          })}
        </div>

        {/* ── Planes de continuidad ────────────────────────────────────────── */}
        <div className="mt-16 border border-white/10 p-8 md:p-10">
          <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-2">
            Planes de continuidad
          </p>
          <p className="text-gray text-sm leading-relaxed max-w-xl mb-6">
            Tu sistema no termina el día de la entrega. Un plan de
            continuidad lo mantiene funcionando y, según el plan, lo
            optimiza cada mes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {continuidad.map((plan) => (
              <div key={plan.nombre} className="bg-black p-6">
                <h3 className="font-anton text-xl text-white tracking-tight mb-1">
                  {plan.nombre}
                </h3>
                <p className="text-green font-mono text-sm mb-2">
                  {plan.precio}
                </p>
                <p className="text-gray text-sm leading-relaxed">
                  {plan.incluye}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center mt-20 space-y-4">
          <Link
            href="/cotizacion"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
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
            href="/saas"
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
