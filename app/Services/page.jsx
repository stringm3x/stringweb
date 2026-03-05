"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiClock,
  FiAward,
  FiArrowRight,
  FiCheckCircle,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import { MdOutlineRocketLaunch, MdOutlineAnalytics } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);
const servicios = [
  {
    id: "1",
    service: "SISTEMA DE CONVERSIÓN",
    title2: "Diagnóstico + Estructura",
    img: "/serv/design4.png",
    intro:
      "Transformamos tu presencia digital en un sistema que genera clientes reales de manera consistente.",
    p: "No se trata de tener una página bonita. Se trata de tener una estructura clara que guíe a tus visitantes a convertirse en clientes. Analizamos tu negocio, identificamos fricciones y diseñamos un flujo de conversión optimizado.",
    content: [
      "Diagnóstico completo de presencia digital",
      "Estructura estratégica de oferta",
      "Optimización de flujo de captación",
      "Claridad en llamados a la acción",
    ],
    metric: "+85% conversión",
    gradient: "from-green to-black",
    icon: FiTarget,
    color: "green",
    stats: [
      { value: "24h", label: "Diagnóstico" },
      { value: "100%", label: "Personalizado" },
    ],
  },
  {
    id: "2",
    service: "LANDING PAGE",
    title2: "Estratégica",
    img: "/serv/computadora.png",
    intro:
      "Páginas diseñadas para convertir, no solo para verse bien. Cada elemento tiene un propósito.",
    p: "Diseñamos landing pages con un objetivo claro: convertir visitantes en leads o clientes. Cada palabra, cada imagen, cada botón está estratégicamente pensado para maximizar resultados.",
    content: [
      "Landing page enfocada en conversión",
      "Redacción estratégica (copywriting)",
      "Diseño UI/UX optimizado",
      "Integración con WhatsApp",
    ],
    metric: "100% personalizado",
    gradient: "from-green2 to-green3",
    icon: FiTrendingUp,
    color: "green",
    stats: [
      { value: "2-3x", label: "Más conversión" },
      { value: "Mobile", label: "Optimizado" },
    ],
  },
  {
    id: "3",
    service: "OPTIMIZACIÓN CONTINUA",
    title2: "Mejora constante",
    img: "/serv/imagen.png",
    intro:
      "Tu sistema evoluciona con los datos. Ajustamos y mejoramos para maximizar resultados.",
    p: "El mercado cambia, tu audiencia cambia. Nosotros nos adaptamos. Analizamos métricas, probamos variantes y optimizamos tu sistema de conversión de manera continua.",
    content: [
      "Análisis de métricas de conversión",
      "A/B testing de flujos",
      "Optimización UX recurrente",
      "Ajustes estratégicos mensuales",
    ],
    metric: "Mejora mensual",
    gradient: "from-green3 to-green4",
    icon: MdOutlineAnalytics,
    color: "green",
    stats: [
      { value: "+85%", label: "Mejora promedio" },
      { value: "30 días", label: "Ciclo" },
    ],
  },
  {
    id: "4",
    service: "SISTEMA E-COMMERCE",
    title2: "Ventas automatizadas",
    img: "/serv/mantenimiento.png",
    intro:
      "Plataformas de venta diseñadas para maximizar conversión y minimizar fricción.",
    p: "Vender online no es solo tener un catálogo. Es tener un sistema que guíe al usuario, reduzca la fricción y facilite la compra. Diseñamos e-commerce que convierten.",
    content: [
      "Tienda online optimizada",
      "Checkout de alta conversión",
      "Integración con métodos de pago",
      "Sistema de carritos abandonados",
    ],
    metric: "Ventas 24/7",
    gradient: "from-green4 to-green",
    icon: MdOutlineRocketLaunch,
    color: "green",
    stats: [
      { value: "30%", label: "Más conversión" },
      { value: "Seguro", label: "SSL incluido" },
    ],
  },
  {
    id: "5",
    service: "AUTOMATIZACIÓN",
    title2: "Y Soporte",
    img: "/serv/mantenimiento.png",
    intro:
      "Tu negocio funciona sin ti. Automatizamos procesos y te acompañamos en el camino.",
    p: "Libera tiempo. Automatizamos respuestas, seguimientos y procesos. Y si algo falla, estamos ahí. Soporte técnico prioritario para que tú solo te preocupes de vender.",
    content: [
      "Automatización de respuestas",
      "Soporte técnico prioritario",
      "Backups y seguridad",
      "Actualizaciones continuas",
    ],
    metric: "24/7 disponible",
    gradient: "from-green to-green2",
    icon: FiZap,
    color: "green",
    stats: [
      { value: "24/7", label: "Soporte" },
      { value: "99.9%", label: "Uptime" },
    ],
  },
];

const statsPrincipales = [
  { value: "50+", label: "Sistemas implementados", icon: FiUsers },
  { value: "85%", label: "Aumento en conversión", icon: FiBarChart2 },
  { value: "24h", label: "Respuesta inicial", icon: FiClock },
  { value: "100%", label: "Personalizado", icon: FiAward },
];

const PageServices = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          descriptionRef.current,
          ...statsRef.current.filter(Boolean),
          ...cardsRef.current.filter(Boolean),
          footerRef.current,
        ],
        { opacity: 1, y: 0, visibility: "visible" }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.6 })
        .from(titleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
        .from(
          descriptionRef.current,
          { opacity: 0, y: 30, duration: 0.6 },
          "-=0.3"
        )
        .from(
          statsRef.current.filter(Boolean),
          { opacity: 0, y: 30, stagger: 0.1, duration: 0.6 },
          "-=0.2"
        )
        .from(
          cardsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        )
        .from(footerRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white py-20 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-green/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-green2/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div ref={badgeRef} className="inline-block">
            <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
              ✦ SISTEMAS DE CONVERSIÓN
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-ubuntu font-black tracking-tight"
          >
            <span className="text-black">SERVICIOS</span>
            <span className="text-green ml-4">ESTRATÉGICOS</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-black/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            No vendemos páginas. Implementamos sistemas digitales diseñados para
            convertir visitas en clientes reales.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon;
            const isHovered = hoveredCard === index;

            return (
              <Link
                href={`/Services/${servicio.id}`}
                key={servicio.id}
                className="block group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                >
                  {/* Borde con gradiente animado */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${servicio.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: "2px" }}
                  />

                  <div className="relative bg-white h-full p-6">
                    {/* Header con icono y métrica */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${servicio.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="text-xl text-white" />
                      </div>
                      <span
                        className={`text-xs font-mono text-${servicio.color} bg-${servicio.color}/10 px-2 py-1 rounded-full`}
                      >
                        {servicio.metric}
                      </span>
                    </div>

                    {/* Títulos */}
                    <h2 className="text-2xl font-ubuntu font-bold text-black mb-1">
                      {servicio.service}
                    </h2>
                    <h3 className="text-lg text-green mb-3 font-semibold">
                      {servicio.title2}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray text-sm mb-4 line-clamp-2">
                      {servicio.intro}
                    </p>

                    {/* Stats rápidas */}
                    <div className="flex gap-3 mb-4">
                      {servicio.stats.map((stat, i) => (
                        <div key={i} className="text-xs">
                          <span className="font-bold text-black">
                            {stat.value}
                          </span>
                          <span className="text-gray ml-1">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Línea decorativa */}
                    <div
                      className={`w-12 h-0.5 bg-${servicio.color}/30 rounded-full mb-4 group-hover:w-20 group-hover:bg-${servicio.color} transition-all duration-300`}
                    />

                    {/* Beneficios en hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2 border-t border-gray">
                        {servicio.content.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray"
                          >
                            <FiCheckCircle
                              className={`text-${servicio.color} mt-0.5 flex-shrink-0`}
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA siempre visible */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-gray group-hover:text-green transition-colors">
                        Ver detalles
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full bg-${servicio.color}/10 flex items-center justify-center group-hover:bg-${servicio.color} transition-colors`}
                      >
                        <FiArrowRight
                          className={`text-${servicio.color} group-hover:text-white transition-colors`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div ref={footerRef} className="text-center mt-20">
          <p className="text-gray mb-6 text-lg">
            ¿No encuentras lo que buscas? Todos los proyectos son 100%
            personalizados.
          </p>

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

export default PageServices;
