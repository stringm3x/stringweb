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

// Los mismos items...
const items = [
  {
    title: "SISTEMA DE CONVERSIÓN",
    subtitle: "Nivel 1 · $8,000–12,000",
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
    gradient: "from-green to-green2",
    icon: FiTarget,
    metric: "Desde $8,000",
    color: "green",
  },
  {
    title: "SISTEMA DE CAPTACIÓN",
    subtitle: "Nivel 2 · $18,000–28,000",
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
    gradient: "from-green2 to-green3",
    icon: FiTrendingUp,
    metric: "Desde $18,000",
    color: "green2",
  },
  {
    title: "SISTEMA AUTOMATIZADO",
    subtitle: "Nivel 3 · $22,000–40,000",
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
    gradient: "from-green3 to-green4",
    icon: FiZap,
    metric: "Desde $22,000",
    color: "green3",
  },
  {
    title: "SISTEMA ESPECIALIZADO",
    subtitle: "Nivel 4 · $40,000–90,000+",
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
    gradient: "from-green4 to-green",
    icon: MdOutlineRocketLaunch,
    metric: "Desde $40,000",
    color: "green4",
  },
  {
    title: "PLANES DE CONTINUIDAD",
    subtitle: "Soporte mensual",
    content: "Mantenimiento y optimización continua para tu sistema digital.",
    benefits: [
      "Plan Base: $1,800–2,500/mes - Hosting, mantenimiento, soporte",
      "Plan Crecimiento: $3,000–4,500/mes - Optimización mensual, ajustes",
      "Plan Escalamiento: $5,000–8,000/mes - Análisis, soporte prioritario",
    ],
    gradient: "from-green to-green2",
    icon: FiClock,
    metric: "Desde $1,800/mes",
    color: "green",
  },
];

const stats = [
  { value: "50+", label: "Sistemas implementados", icon: RiTeamLine },
  { value: "85%", label: "Aumento en conversión", icon: MdOutlineAnalytics },
  { value: "24h", label: "Respuesta inicial", icon: FiClock },
  { value: "100%", label: "Personalizado", icon: FiAward },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animaciones con ScrollTrigger - se activan cuando la sección entra en vista
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Header se anima al entrar
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
      });

      // Stats con stagger
      gsap.from(statsRef.current.filter(Boolean), {
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Cards con stagger
      gsap.from(cardsRef.current.filter(Boolean), {
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1)",
      });

      // CTA
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!mounted) {
    return (
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green2/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
            ✦ SISTEMAS DE CONVERSIÓN
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight">
            <span className="text-black">POTENCIA TUS</span>
            <br />
            <span className="bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
              RESULTADOS
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray max-w-2xl mx-auto">
            Cuatro niveles de automatización para cada etapa de tu negocio.
            Implementamos sistemas digitales que convierten visitas en clientes
            reales.
          </p>
        </div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <Icon className="text-2xl text-green mx-auto mb-2" />
                <p className="text-xl font-bold text-black">{stat.value}</p>
                <p className="text-xs text-gray">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Acordeones */}
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="text-2xl text-white" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3
                          className={`text-xl md:text-2xl font-ubuntu font-bold transition-colors duration-300 ${
                            isOpen ? "text-green" : "text-black"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono text-green bg-green/10 px-3 py-1 rounded-full border border-green/30">
                          {item.metric}
                        </span>
                      </div>
                      <p className="text-sm text-green font-mono mb-1">
                        {item.subtitle}
                      </p>
                      <p className="text-gray text-sm md:text-base">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-r from-green to-green2 text-white shadow-lg"
                        : "bg-gray/10 text-gray group-hover:bg-gray/20"
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>

                {/* Content - CSS transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-gray/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200"
                        >
                          <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                          <span className="text-black text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray/20">
                      <Link
                        href="/quote"
                        className="inline-flex items-center text-sm font-medium text-green hover:opacity-80 transition-all group"
                      >
                        Solicitar diagnóstico
                        <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Principal */}
        <div ref={ctaRef} className="text-center mt-20">
          <Link href="/quote">
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-12 hover:shadow-2xl hover:shadow-green/30">
              <span className="relative z-10">Diagnosticar mi negocio</span>
              <FiArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
          <p className="text-sm text-gray mt-4">
            Descubre qué nivel necesita tu negocio · Respuesta en 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
