"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { MdOutlineAnalytics, MdOutlineRocketLaunch } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const items = [
  {
    title: "SISTEMA DE CONVERSIÓN",
    subtitle: "Nivel 1",
    metric: "Desde $8,000",
    content:
      "Transformamos tu presencia digital en un sistema que genera clientes reales de manera consistente.",
    benefits: [
      "Diagnóstico completo de presencia digital",
      "Estructura estratégica de oferta",
      "Landing page optimizada",
      "Integración con WhatsApp",
      "Formulario básico de contacto",
      "Mensaje automático preconfigurado",
    ],
    icon: FiTarget,
  },
  {
    title: "SISTEMA DE CAPTACIÓN",
    subtitle: "Nivel 2",
    metric: "Desde $18,000",
    content:
      "Evita que los clientes interesados se pierdan y organiza tus prospectos automáticamente.",
    benefits: [
      "Todo el Nivel 1",
      "Captura automática de leads",
      "Registro organizado de prospectos",
      "Calificación inicial por preguntas",
      "Notificaciones por correo",
      "Integración con Notion / Sheets / Airtable",
    ],
    icon: FiTrendingUp,
  },
  {
    title: "SISTEMA AUTOMATIZADO",
    subtitle: "Nivel 3",
    metric: "Desde $28,000",
    content:
      "Crea un sistema digital que trabaja incluso cuando tu negocio no está disponible.",
    benefits: [
      "Todo el Nivel 2",
      "Respuesta automática inmediata",
      "Agenda de citas automatizada",
      "Seguimiento automático post-contacto",
      "Recordatorios de citas",
      "Panel de gestión de prospectos",
    ],
    icon: FiZap,
  },
  {
    title: "SISTEMA ESPECIALIZADO",
    subtitle: "Nivel 4",
    metric: "Desde $40,000",
    content:
      "Desarrollamos sistemas digitales personalizados para negocios que necesitan algo más avanzado.",
    benefits: [
      "Todo el Nivel 3",
      "Desarrollo a medida según negocio",
      "CRM personalizado",
      "Automatizaciones avanzadas",
      "Paneles de control internos",
      "Integraciones con APIs externas",
    ],
    icon: MdOutlineRocketLaunch,
  },
  {
    title: "PLANES DE CONTINUIDAD",
    subtitle: "Soporte mensual",
    metric: "Desde $1,800/mes",
    content: "Mantenimiento y optimización continua para tu sistema digital.",
    benefits: [
      "Plan Base $1,800–2,500/mes — Hosting, mantenimiento, soporte",
      "Plan Crecimiento $3,000–4,500/mes — Optimización mensual, ajustes",
      "Plan Escalamiento $5,000–8,000/mes — Análisis y soporte prioritario",
    ],
    icon: FiClock,
  },
];

const stats = [
  { value: "4", label: "Sistemas\nactivos", icon: RiTeamLine },
  { value: "1", label: "SaaS en\nproducción", icon: MdOutlineAnalytics },
  { value: "70", label: "Miembros en\nEvolution GYM", icon: FiClock },
  { value: "3", label: "Sectores\natendidos", icon: FiAward },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const containerRef = useRef(null);
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green/3 rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Los 4 sistemas
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-anton text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-white uppercase"
          >
            Elige tu nivel <span className="text-green">de sistema</span>
          </h2>

          <p
            ref={descRef}
            className="text-gray text-lg leading-relaxed max-w-xl"
          >
            Cuatro niveles de automatización para cada etapa de tu negocio. Cada
            sistema incluye el anterior — siempre puedes escalar.
          </p>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-px bg-white/5 mb-16">
          {stats.map((stat, i) => {
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

        {/* ── Acordeones ────────────────────────────────────────────────────── */}
        <div className="space-y-px">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="border border-white/10 hover:border-white/20 transition-colors duration-200 bg-black"
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-5">
                    {/* Ícono */}
                    <div
                      className={`w-11 h-11 border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "border-green bg-green/10"
                          : "border-white/10 group-hover:border-green/40"
                      }`}
                    >
                      <Icon
                        className={`text-lg transition-colors duration-300 ${
                          isOpen
                            ? "text-green"
                            : "text-gray group-hover:text-green"
                        }`}
                      />
                    </div>

                    {/* Texto */}
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap mb-0.5">
                        <span className="text-xs font-mono text-gray uppercase tracking-widest">
                          {item.subtitle}
                        </span>
                        <span className="text-xs font-mono text-green">
                          {item.metric}
                        </span>
                      </div>
                      <h3
                        className={`font-anton text-xl md:text-2xl tracking-tight leading-tight transition-colors duration-200 ${
                          isOpen ? "text-green" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-green bg-green text-black"
                        : "border-white/20 text-gray group-hover:border-white/40"
                    }`}
                  >
                    {isOpen ? (
                      <FiMinus className="text-sm" />
                    ) : (
                      <FiPlus className="text-sm" />
                    )}
                  </div>
                </button>

                {/* Contenido expandible */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-white/5">
                    <p className="text-gray text-sm leading-relaxed mt-6 mb-6">
                      {item.content}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {item.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm leading-relaxed">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/quote"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3 transition-all duration-200"
                    >
                      Solicitar diagnóstico
                      <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="mt-16 text-center space-y-4">
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
          >
            Diagnosticar mi negocio
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <p className="text-xs text-gray font-mono">
            Descubre qué nivel necesita tu negocio · Respuesta en 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
