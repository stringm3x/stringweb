"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import {
  FiArrowRight,
  FiCheckCircle,
  FiSearch,
  FiLayers,
  FiCode,
  FiShield,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const stepsData = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    fase: "Fase 1",
    metric: "24h",
    description:
      "Análisis profundo de tu presencia digital actual. Identificamos fricciones, oportunidades y el punto de partida real del sistema.",
    items: [
      "Análisis de redes sociales actuales",
      "Evaluación de claridad de servicios",
      "Revisión del proceso actual de contacto",
      "Identificación de fricciones en la captación",
    ],
    icon: FiSearch,
  },
  {
    number: "02",
    title: "ESTRUCTURACIÓN",
    fase: "Fase 2",
    metric: "Estratégico",
    description:
      "Definimos la arquitectura del sistema. Propuesta de valor, flujo de conversión y llamados a la acción con propósito claro.",
    items: [
      "Definición de propuesta de valor",
      "Diseño de flujo de conversión",
      "Estructura de la página",
      "Llamados a la acción claros",
    ],
    icon: FiLayers,
  },
  {
    number: "03",
    title: "DESARROLLO",
    fase: "Fase 3",
    metric: "Técnico",
    description:
      "Implementamos el sistema digital. Landing optimizada, integración con WhatsApp y automatizaciones que trabajan por ti.",
    items: [
      "Desarrollo de landing page",
      "Optimización para celular",
      "Integración con WhatsApp",
      "Implementación de automatizaciones",
    ],
    icon: FiCode,
  },
  {
    number: "04",
    title: "AJUSTE INICIAL",
    fase: "Fase 4",
    metric: "Garantizado",
    description:
      "Pruebas y verificación del sistema completo antes de la entrega. Cero errores, flujo funcional, listo para captar.",
    items: [
      "Pruebas de funcionamiento",
      "Revisión del flujo de contacto",
      "Ajustes de claridad",
      "Verificación técnica completa",
    ],
    icon: FiShield,
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const stepsRef = useRef([]);
  const panelRef = useRef(null);
  const ctaRef = useRef(null);

  // ── Animación de entrada ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [tagRef.current, titleRef.current, descRef.current, ctaRef.current],
        { opacity: 0, y: 24 }
      );
      gsap.set(stepsRef.current.filter(Boolean), { opacity: 0, y: 20 });
      gsap.set(panelRef.current, { opacity: 0, y: 16 });

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

      gsap.to(stepsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });

      gsap.to(panelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelRef.current,
          start: REVEAL_START,
          once: true,
        },
      });

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

  // ── Animar panel al cambiar step ───────────────────────────────────────────
  const handleStepChange = (index) => {
    if (index === activeStep) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
    setActiveStep(index);
  };

  const step = stepsData[activeStep];
  const Icon = step.icon;

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* ── Fondo ─────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green/4 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Metodología STRING
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-anton text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-white uppercase"
          >
            Nuestro sistema <span className="text-green">de conversión</span>
          </h2>

          <p
            ref={descRef}
            className="text-gray text-lg leading-relaxed max-w-xl"
          >
            Cuatro fases para transformar tu presencia digital en un sistema que
            convierte visitas en clientes potenciales organizados.
          </p>
        </div>

        {/* ── Steps — tabs horizontales ──────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-px bg-white/5 mb-px">
          {stepsData.map((s, i) => {
            const SIcon = s.icon;
            const isActive = activeStep === i;
            return (
              <button
                key={i}
                ref={(el) => (stepsRef.current[i] = el)}
                onClick={() => handleStepChange(i)}
                className={`group relative bg-black px-4 py-6 text-left transition-colors duration-200 ${
                  isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Indicador activo */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px transition-all duration-300 ${
                    isActive ? "bg-green" : "bg-transparent"
                  }`}
                />

                <span className="text-[10px] font-mono text-gray uppercase tracking-widest block mb-3">
                  {s.fase}
                </span>

                <SIcon
                  className={`text-xl mb-3 transition-colors duration-200 ${
                    isActive ? "text-green" : "text-gray group-hover:text-white"
                  }`}
                />

                <p
                  className={`font-anton text-base leading-tight tracking-tight transition-colors duration-200 ${
                    isActive
                      ? "text-green"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {s.title}
                </p>

                <p className="text-[10px] font-mono text-gray mt-2">
                  {s.metric}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Panel de detalle ──────────────────────────────────────────────── */}
        <div
          ref={panelRef}
          className="border border-white/10 border-t-0 bg-black p-8 md:p-10"
        >
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12">
            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-green/30 bg-green/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-green text-lg" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                    {step.fase} · Paso {step.number}
                  </span>
                  <h3 className="font-anton text-2xl text-white tracking-tight leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray leading-relaxed text-sm">
                {step.description}
              </p>

              {/* Número grande decorativo */}
              <div className="font-anton text-[8rem] leading-none text-white/[0.04] select-none mt-auto">
                {step.number}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-4">
                Objetivo de esta fase
              </p>
              {step.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}

              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-xs text-gray italic leading-relaxed">
                  "STRING no entrega páginas web. Entrega sistemas funcionales
                  de captación de clientes."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Indicadores de paso ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mt-4">
          {stepsData.map((_, i) => (
            <button
              key={i}
              onClick={() => handleStepChange(i)}
              className={`h-px transition-all duration-300 ${
                activeStep === i
                  ? "w-8 bg-green"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
          >
            Comenzar diagnóstico
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <p className="text-xs text-gray font-mono">
            Diagnóstico en 24h · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
};

export default Steps;
