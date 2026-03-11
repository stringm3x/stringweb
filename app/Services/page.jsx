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
  FiDollarSign,
  FiCalendar,
  FiRefreshCw, // ← Para planes de continuidad
  FiShield, // ← Para soporte
} from "react-icons/fi";
import { MdOutlineRocketLaunch, MdOutlineAnalytics } from "react-icons/md";
import { RiTeamLine, RiRobotLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// Importar datos
import servicios from "./data";

const statsPrincipales = [
  { value: "50+", label: "Sistemas implementados", icon: FiUsers },
  { value: "85%", label: "Aumento en conversión", icon: FiBarChart2 },
  { value: "24h", label: "Respuesta inicial", icon: FiClock },
  { value: "100%", label: "Personalizado", icon: FiAward },
];

const niveles = [
  { nivel: "Nivel 1", precio: "$8,000–12,000", desc: "Sistema de Conversión" },
  { nivel: "Nivel 2", precio: "$18,000–28,000", desc: "Sistema de Captación" },
  { nivel: "Nivel 3", precio: "$22,000–40,000", desc: "Sistema Automatizado" },
  {
    nivel: "Nivel 4",
    precio: "$40,000–90,000+",
    desc: "Sistema Especializado",
  },
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
  const nivelesRef = useRef([]);

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
          ...nivelesRef.current.filter(Boolean),
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
          nivelesRef.current.filter(Boolean),
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
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-ubuntu font-black tracking-tight"
          >
            <span className="text-black">SERVICIOS</span>
            <span className="text-green ml-4">ESTRATÉGICOS</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-black/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            No vendemos páginas. Implementamos sistemas digitales diseñados para
            convertir visitas en clientes reales. Cuatro niveles de
            automatización para cada etapa de tu negocio.
          </p>
        </div>

        {/* Tabla de niveles rápida */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {niveles.map((nivel, index) => (
            <div
              key={index}
              ref={(el) => (nivelesRef.current[index] = el)}
              className="text-center p-4 bg-gradient-to-br from-green/5 to-green2/5 rounded-xl border border-green/20"
            >
              <p className="text-sm font-mono text-green mb-1">{nivel.nivel}</p>
              <p className="text-lg font-bold text-black">{nivel.precio}</p>
              <p className="text-xs text-gray">{nivel.desc}</p>
            </div>
          ))}
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => {
            const isHovered = hoveredCard === index;

            // Asignar icono según el servicio (reemplazo de emojis)
            const getIcon = () => {
              switch (index) {
                case 0:
                  return <FiTarget className="text-2xl text-white" />;
                case 1:
                  return <FiTrendingUp className="text-2xl text-white" />;
                case 2:
                  return <MdOutlineAnalytics className="text-2xl text-white" />;
                case 3:
                  return (
                    <MdOutlineRocketLaunch className="text-2xl text-white" />
                  );
                case 4:
                  return <FiRefreshCw className="text-2xl text-white" />;
                default:
                  return <FiTarget className="text-2xl text-white" />;
              }
            };

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
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray/10"
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
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${servicio.gradient} flex items-center justify-center shadow-lg`}
                      >
                        {getIcon()}
                      </div>
                      <span className="text-xs font-mono bg-green/10 text-green px-3 py-1 rounded-full border border-green/30">
                        {servicio.metric}
                      </span>
                    </div>

                    {/* Títulos */}
                    <h2 className="text-2xl font-ubuntu font-bold text-black mb-1">
                      {servicio.service}
                    </h2>
                    <h3 className="text-sm text-green mb-3 font-mono">
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
                    <div className="w-12 h-0.5 bg-green/30 rounded-full mb-4 group-hover:w-20 group-hover:bg-green transition-all duration-300" />

                    {/* Objetivo en hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2 border-t border-gray/20">
                        <p className="text-xs text-gray font-medium">
                          {servicio.objetivo}
                        </p>
                        <p className="text-xs text-gray">
                          Ideal: {servicio.ideal}
                        </p>
                      </div>
                    </motion.div>

                    {/* CTA siempre visible */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-gray group-hover:text-green transition-colors">
                        Ver detalles
                      </span>
                      <div className="w-8 h-8 rounded-full bg-green/10 flex items-center justify-center group-hover:bg-green transition-colors">
                        <FiArrowRight className="text-green group-hover:text-white transition-colors" />
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
            ¿No encuentras lo que buscas? Todos los sistemas son 100%
            personalizables.
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

        {/* Mensaje final */}
        <div className="text-center mt-8 text-sm text-gray">
          <p>Cuatro niveles. Un objetivo: convertir visitas en clientes.</p>
        </div>
      </div>
    </section>
  );
};

export default PageServices;
