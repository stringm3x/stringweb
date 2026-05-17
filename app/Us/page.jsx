"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiTarget,
  FiCheckCircle,
  FiX,
  FiCode,
  FiShield,
  FiGrid,
  FiHeart,
  FiUsers,
  FiAward,
  FiClock,
  FiStar,
  FiZap,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const noVendemos = [
  "Diseño visual sin estrategia",
  "Tecnología innecesaria",
  "Tendencias digitales sin impacto real",
  "Seguidores sin conversión",
  "Automatizaciones complejas sin objetivo",
];

const siVendemos = [
  "Estructura digital clara",
  "Optimización del proceso de contacto",
  "Páginas enfocadas en conversión",
  "Organización de prospectos",
  "Automatización básica del primer contacto",
  "Sistemas que convierten visitas en clientes",
];

const metodologia = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Análisis de redes sociales, claridad de servicios, proceso actual de contacto y flujo de captación existente.",
    icon: FiTarget,
  },
  {
    step: "02",
    title: "Estructuración",
    desc: "Definición de propuesta de valor, estructura de página, flujo de conversión y llamados a la acción.",
    icon: FiGrid,
  },
  {
    step: "03",
    title: "Desarrollo",
    desc: "Implementación de landing page, optimización mobile, integración de WhatsApp y automatizaciones.",
    icon: FiCode,
  },
  {
    step: "04",
    title: "Ajuste inicial",
    desc: "Pruebas de funcionamiento, revisión del flujo de contacto, ajustes de claridad y verificación técnica.",
    icon: FiShield,
  },
];

const valores = [
  { icon: FiHeart, label: "Pasión" },
  { icon: FiUsers, label: "Colaboración" },
  { icon: FiAward, label: "Excelencia" },
  { icon: FiClock, label: "Compromiso" },
  { icon: FiStar, label: "Innovación" },
  { icon: FiZap, label: "Eficiencia" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const PageUs = () => {
  const pageRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);
  const queEsRef = useRef(null);
  const noSiRef = useRef(null);
  const metodologiaRef = useRef(null);
  const valoresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(
        [
          heroTagRef.current,
          heroTitleRef.current,
          heroDescRef.current,
          heroCtaRef.current,
        ],
        { opacity: 0, y: 24 }
      );

      // ── Hero — entrada directa sin scroll ───────────────────────────────────
      const tlHero = gsap.timeline({ delay: 0.15 });
      tlHero
        .to(heroTagRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          heroTitleRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          heroDescRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          heroCtaRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );

      // ── Secciones con ScrollTrigger ─────────────────────────────────────────
      const sections = [queEsRef, noSiRef, metodologiaRef, valoresRef, ctaRef];

      sections.forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-black text-white overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center py-24 px-6 sm:px-8 lg:px-12">
        {/* Fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-green/5 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto w-full">
          <div ref={heroTagRef} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Agencia de sistemas digitales estratégicos
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[12vw] leading-[0.85] tracking-tighter uppercase mb-10"
          >
            <span className="text-white">Somos</span>
            <br />
            <span className="text-green">STRING</span>
          </h1>

          <p
            ref={heroDescRef}
            className="text-gray text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
          >
            Ayudamos a los negocios a transformar su presencia digital en un
            sistema estructurado de captación de clientes. No páginas web —{" "}
            <span className="text-white">sistemas que convierten.</span>
          </p>

          <div ref={heroCtaRef} className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
            >
              Diagnosticar mi negocio
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/Services"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              Ver sistemas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Qué es STRING ─────────────────────────────────────────────────── */}
      <section
        ref={queEsRef}
        className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
              01 · Qué es STRING
            </span>
            <h2 className="font-anton text-5xl md:text-6xl leading-[0.9] tracking-tighter text-white uppercase">
              Sistemas digitales{" "}
              <span className="text-green">estratégicos</span>
            </h2>
            <p className="text-gray leading-relaxed">
              Muchos negocios dependen únicamente de redes sociales y mensajes
              directos para recibir clientes, lo que provoca desorden en la
              comunicación, pérdida de prospectos, respuestas tardías y falta de
              seguimiento.
            </p>
            <div className="space-y-2">
              {[
                "Desorden en la comunicación",
                "Pérdida de prospectos",
                "Respuestas tardías",
                "Falta de seguimiento",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FiX className="text-red-500/70 flex-shrink-0" />
                  <span className="text-gray text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray leading-relaxed">
              STRING diseña{" "}
              <span className="text-white font-semibold">
                sistemas digitales
              </span>{" "}
              que organizan ese proceso y convierten visitas en clientes
              potenciales organizados.
            </p>
          </div>

          <div className="border border-white/10 p-8 space-y-4">
            <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-6">
              Qué hace STRING
            </p>
            {[
              "Genera más mensajes de clientes interesados",
              "Organiza la captación de prospectos",
              "Reduce la pérdida de oportunidades",
              "Facilita el contacto con el negocio",
              "Automatiza procesos básicos de comunicación",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── No vendemos / Sí vendemos ─────────────────────────────────────── */}
      <section
        ref={noSiRef}
        className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {/* No vendemos */}
            <div className="bg-black p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-red-500/30 flex items-center justify-center">
                  <FiX className="text-red-500/70 text-sm" />
                </div>
                <h3 className="font-anton text-2xl text-white uppercase tracking-tight">
                  Qué NO vendemos
                </h3>
              </div>
              <div className="space-y-3">
                {noVendemos.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-red-500/50 mt-2 flex-shrink-0" />
                    <span className="text-gray text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sí vendemos */}
            <div className="bg-black p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-green/30 bg-green/10 flex items-center justify-center">
                  <FiCheckCircle className="text-green text-sm" />
                </div>
                <h3 className="font-anton text-2xl text-green uppercase tracking-tight">
                  Qué SÍ vendemos
                </h3>
              </div>
              <div className="space-y-3">
                {siVendemos.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metodología ───────────────────────────────────────────────────── */}
      <section
        ref={metodologiaRef}
        className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-4">
            <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
              02 · Metodología
            </span>
            <h2 className="font-anton text-5xl md:text-6xl leading-[0.9] tracking-tighter text-white uppercase">
              Cómo <span className="text-green">trabajamos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {metodologia.map((fase, i) => {
              const Icon = fase.icon;
              return (
                <div
                  key={i}
                  className="bg-black p-8 hover:bg-white/[0.03] transition-colors duration-200 group relative"
                >
                  <span className="font-anton text-[6rem] leading-none text-white/[0.03] absolute top-4 right-4 select-none">
                    {fase.step}
                  </span>
                  <div className="relative z-10 space-y-4">
                    <div className="w-9 h-9 border border-green/30 flex items-center justify-center group-hover:border-green group-hover:bg-green/10 transition-all duration-300">
                      <Icon className="text-green text-base" />
                    </div>
                    <h3 className="font-anton text-xl text-white tracking-tight">
                      {fase.title}
                    </h3>
                    <p className="text-gray text-sm leading-relaxed">
                      {fase.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>

          <p className="text-xs font-mono text-gray mt-8">
            STRING no entrega páginas web. Entrega sistemas funcionales de
            captación de clientes.
          </p>
        </div>
      </section>

      {/* ── Valores ───────────────────────────────────────────────────────── */}
      <section
        ref={valoresRef}
        className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-anton text-5xl md:text-6xl leading-[0.9] tracking-tighter text-white uppercase">
              Nuestros <span className="text-green">valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
            {valores.map((valor, i) => {
              const Icon = valor.icon;
              return (
                <div
                  key={i}
                  className="bg-black p-6 text-center hover:bg-white/[0.03] transition-colors duration-200 group relative"
                >
                  <Icon className="text-green text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs font-mono text-gray uppercase tracking-widest group-hover:text-white transition-colors duration-200">
                    {valor.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="border border-white/10 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center space-y-6">
              <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase">
                ¿Listo para <span className="text-green">transformar</span> tu
                negocio?
              </h2>
              <p className="text-gray text-lg max-w-xl mx-auto leading-relaxed">
                No necesitas más seguidores. Necesitas un sistema que convierta.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  href="/quote"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
                >
                  Diagnosticar mi negocio
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/Services"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                  Ver sistemas
                </Link>
              </div>
              <p className="text-xs font-mono text-gray pt-2">
                Diagnóstico en 24h · Sin compromiso · CDMX
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageUs;
