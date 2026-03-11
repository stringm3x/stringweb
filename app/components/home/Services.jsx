"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiUsers,
  FiClock,
  FiAward,
  FiDollarSign,
} from "react-icons/fi";
import {
  MdOutlineSpeed,
  MdOutlineAnalytics,
  MdOutlineRocketLaunch,
} from "react-icons/md";
import { RiTeamLine, RiLightbulbLine, RiLineChartLine } from "react-icons/ri";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// LOS 4 NIVELES DEL SISTEMA STRING (según documento)
const items = [
  {
    title: "SISTEMA DE CONVERSIÓN",
    subtitle: "Nivel 1 · $8,000–12,000",
    content:
      "Crea una presencia digital clara que convierta visitas en mensajes de clientes interesados.",
    benefits: [
      "Diagnóstico digital inicial",
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
    ideal: "Negocios que dependen de Instagram, WhatsApp y recomendaciones",
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
    ideal: "Negocios con volumen creciente de consultas",
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
    ideal: "Negocios con alto volumen de consultas o que trabajan con citas",
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
    ideal: "Empresas con procesos complejos o necesidades específicas",
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
    ideal: "Todos los clientes STRING",
  },
];

const stats = [
  {
    value: "50+",
    label: "Sistemas implementados",
    icon: RiTeamLine,
    desc: "Negocios transformados",
  },
  {
    value: "85%",
    label: "Aumento en conversión",
    icon: MdOutlineAnalytics,
    desc: "Promedio en clientes",
  },
  {
    value: "24h",
    label: "Respuesta inicial",
    icon: FiClock,
    desc: "Diagnóstico exprés",
  },
  {
    value: "100%",
    label: "Personalizado",
    icon: FiAward,
    desc: "Sin plantillas",
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aseguramos visibilidad inicial
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          buttonRef.current,
          ...statsRef.current.filter(Boolean),
        ],
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          titleRef.current?.children || [],
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".description-text",
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          statsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green2/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            ref={badgeRef}
            className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30"
          >
            ✦ SISTEMAS DE CONVERSIÓN
          </motion.span>

          <div ref={titleRef} className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-bg">
              POTENCIA TUS
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
              RESULTADOS
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-bg">
              COMERCIALES.
            </h1>
          </div>

          <p className="description-text text-lg md:text-xl text-gray max-w-2xl mx-auto">
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
                className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray/20"
              >
                <Icon className="text-2xl text-green mx-auto mb-2" />
                <p className="text-xl font-bold text-black">{stat.value}</p>
                <p className="text-xs text-gray">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Accordion con los 4 niveles */}
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Borde con gradiente en hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    item.gradient
                  } rounded-2xl transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ padding: "2px" }}
                />

                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icono con gradiente */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="text-2xl text-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3
                            className={`text-xl md:text-2xl font-ubuntu font-bold transition-colors duration-300 ${
                              isOpen ? `text-green` : "text-bg"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={`text-xs font-mono text-green bg-green/10 px-3 py-1 rounded-full border border-green/30`}
                          >
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

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                          : "bg-gray/10 text-gray hover:bg-gray/20"
                      }`}
                    >
                      {isOpen ? <FiMinus /> : <FiPlus />}
                    </motion.div>
                  </button>

                  {/* Content - Animación al abrir */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-gray/20">
                          {/* Ideal para */}
                          <p className="text-xs text-gray mb-3 italic">
                            <span className="font-semibold text-green">
                              Ideal para:
                            </span>{" "}
                            {item.ideal}
                          </p>

                          {/* Beneficios */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.benefits.map((benefit, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <FiCheckCircle
                                  className={`text-green text-sm mt-0.5 flex-shrink-0`}
                                />
                                <span className="text-bg text-sm">
                                  {benefit}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA dentro del acordeón */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 pt-4 border-t border-gray/20"
                          >
                            <Link
                              href="/quote"
                              className={`inline-flex items-center text-sm font-medium text-green hover:opacity-80 transition-opacity group`}
                            >
                              Solicitar diagnóstico para este nivel
                              <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Principal */}
        <div ref={buttonRef} className="text-center mt-20">
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
