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

// Servicios alineados con el documento estratégico
const items = [
  {
    title: "SISTEMA DE CONVERSIÓN",
    subtitle: "Diagnóstico y Estructura",
    content:
      "Transformamos tu presencia digital en un sistema que genera clientes reales de manera consistente.",
    benefits: [
      "Diagnóstico completo de presencia digital",
      "Estructura estratégica de oferta",
      "Optimización de flujo de captación",
      "Claridad en llamados a la acción",
    ],
    gradient: "from-green to-green2",
    icon: FiTarget,
    metric: "+85% conversión",
    color: "green",
  },
  {
    title: "LANDING PAGE ESTRATÉGICA",
    subtitle: "Diseño con propósito",
    content:
      "Páginas diseñadas para convertir, no solo para verse bien. Cada elemento tiene un propósito.",
    benefits: [
      "Landing page enfocada en conversión",
      "Redacción estratégica",
      "Diseño UI/UX optimizado",
      "Integración con WhatsApp",
    ],
    gradient: "from-green2 to-green3",
    icon: FiTrendingUp,
    metric: "100% personalizado",
    color: "green2",
  },
  {
    title: "OPTIMIZACIÓN CONTINUA",
    subtitle: "Mejora constante",
    content:
      "Tu sistema evoluciona con los datos. Ajustamos y mejoramos para maximizar resultados.",
    benefits: [
      "Análisis de métricas de conversión",
      "A/B testing de flujos",
      "Optimización UX recurrente",
      "Ajustes estratégicos mensuales",
    ],
    gradient: "from-green3 to-green4",
    icon: MdOutlineAnalytics,
    metric: "Mejora mensual",
    color: "green3",
  },
  {
    title: "SISTEMA E-COMMERCE",
    subtitle: "Ventas automatizadas",
    content:
      "Plataformas de venta diseñadas para maximizar conversión y minimizar fricción.",
    benefits: [
      "Tienda online optimizada",
      "Checkout de alta conversión",
      "Integración con métodos de pago",
      "Sistema de carritos abandonados",
    ],
    gradient: "from-green4 to-green",
    icon: MdOutlineRocketLaunch,
    metric: "Ventas 24/7",
    color: "green4",
  },
  {
    title: "AUTOMATIZACIÓN Y SOPORTE",
    subtitle: "Sistema vivo",
    content:
      "Tu negocio funciona sin ti. Automatizamos procesos y te acompañamos en el camino.",
    benefits: [
      "Automatización de respuestas",
      "Soporte técnico prioritario",
      "Backups y seguridad",
      "Actualizaciones continuas",
    ],
    gradient: "from-green to-green2",
    icon: FiZap,
    metric: "24/7 disponible",
    color: "green",
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-gray">
              RESULTADOS
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-bg">
              COMERCIALES.
            </h1>
          </div>

          <p className="description-text text-lg md:text-xl text-gray max-w-2xl mx-auto">
            Implementamos sistemas digitales diseñados para convertir visitas en
            clientes reales, no páginas que solo se ven bien.
          </p>
        </div>
        {/* Accordion - Rediseñado */}
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
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="text-xl text-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`text-xl md:text-2xl font-ubuntu font-bold transition-colors duration-300 ${
                              isOpen ? `text-green` : "text-bg"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={`text-xs font-mono text-green bg-green/10 px-2 py-1 rounded-full`}
                          >
                            {item.metric}
                          </span>
                        </div>
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
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-gray">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.benefits.map((benefit, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <FiCheckCircle
                                  className={`text-green text-sm md:text-base flex-shrink-0`}
                                />
                                <span className="text-bg text-sm md:text-base">
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
                            className="mt-6 pt-4 border-t border-gray-100"
                          >
                            <Link
                              href="/quote"
                              className={`inline-flex items-center text-sm font-medium text-green hover:opacity-80 transition-opacity group`}
                            >
                              Solicitar diagnóstico
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
            Diagnóstico gratuito · Respuesta en 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
