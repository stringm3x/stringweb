"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiUsers,
  FiMessageCircle,
  FiShoppingBag,
  FiCheckCircle,
  FiBarChart2,
  FiClock,
  FiAward,
} from "react-icons/fi";
import {
  MdOutlineSpeed,
  MdOutlineAnalytics,
  MdOutlineDesignServices,
  MdOutlineRocketLaunch,
} from "react-icons/md";
import {
  RiTeamLine,
  RiCustomerServiceLine,
  RiLightbulbLine,
  RiLineChartLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// Datos alineados con el documento estratégico
const stats = [
  {
    value: "10+",
    label: "Sistemas implementados",
    description: "Negocios transformados con estructura digital",
    gradient: "from-green to-green2",
    icon: RiTeamLine,
    metric: "+85% conversión",
  },
  {
    value: "85%",
    label: "Aumento en conversión",
    description: "Promedio de mejora en clientes",
    gradient: "from-green2 to-green3",
    icon: MdOutlineAnalytics,
    metric: "promedio",
  },
  {
    value: "24h",
    label: "Respuesta inicial",
    description: "Diagnóstico exprés de presencia digital",
    gradient: "from-green3 to-green4",
    icon: FiClock,
    metric: "garantizado",
  },
];

const principios = [
  {
    icon: FiTarget,
    title: "Enfoque en conversión",
    desc: "No diseñamos páginas, construimos sistemas que convierten visitas en clientes.",
  },
  {
    icon: FiTrendingUp,
    title: "Estructura clara",
    desc: "Cada elemento tiene un propósito estratégico, no decorativo.",
  },
  {
    icon: FiZap,
    title: "Optimización continua",
    desc: "Mejoramos constantemente la claridad y el flujo de captación.",
  },
  {
    icon: FiUsers,
    title: "Enfoque humano",
    desc: "Tecnología al servicio de personas, no al revés.",
  },
];

const Content = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const principiosRef = useRef([]);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // PRIMERO: Aseguramos que todo sea visible
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          ...principiosRef.current.filter(Boolean),
          ...statsRef.current.filter(Boolean),
          ctaRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          visibility: "visible",
        }
      );

      // Timeline de animación - SOLO ANIMA, NO OCULTA
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none", // Cambiado a "none" para que no se reverse
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          principiosRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        )
        .from(
          statsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            stagger: 0.15,
            duration: 0.9,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.2"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.2"
        );

      // Animación de línea decorativa
      gsap.to(lineRef.current, {
        width: "100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Elementos decorativos de fondo con tus colores */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-green/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-green2/10 rounded-full filter blur-3xl" />

        {/* Línea de progreso decorativa */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green via-green2 to-green3"
          style={{ width: "0%" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20 lg:gap-24">
          {/* Header con mensaje estratégico */}
          <div className="text-center space-y-4">
            <motion.div
              ref={titleRef}
              className="inline-block"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <span className="px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
                ✦ SISTEMAS DE CONVERSIÓN
              </span>
            </motion.div>

            <h2
              ref={subtitleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-ubuntu font-black tracking-tight leading-tight"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <span className="text-bg">NO ES DISEÑO,</span>
              <br />
              <span className="text-green">ES ESTRUCTURA</span>
            </h2>

            <div
              ref={descriptionRef}
              className="max-w-2xl mx-auto"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <p className="text-lg md:text-xl text-gray leading-relaxed">
                En <span className="font-bold text-green">STRING</span>{" "}
                transformamos presencia digital en clientes reales mediante
                sistemas claros de conversión. Cada elemento tiene un propósito
                estratégico.
              </p>
            </div>
          </div>

          {/* Principios estratégicos - AHORA SIEMPRE VISIBLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principios.map((principio, index) => {
              const Icon = principio.icon;
              return (
                <motion.div
                  key={index}
                  ref={(el) => (principiosRef.current[index] = el)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray/20"
                  style={{ opacity: 1, visibility: "visible" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-2xl text-green" />
                    </div>

                    <h3 className="text-lg font-bold text-bg mb-2">
                      {principio.title}
                    </h3>

                    <p className="text-sm text-gray leading-relaxed">
                      {principio.desc}
                    </p>

                    {/* Barra decorativa */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green to-green2 group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl shadow-xl border-2 border-green/20 p-8 overflow-hidden"
                  style={{ opacity: 1, visibility: "visible" }}
                >
                  {/* Número de fondo decorativo */}
                  <span className="absolute -bottom-4 -right-4 text-8xl font-black text-green/5 select-none">
                    {index + 1}
                  </span>

                  {/* Icono */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green to-green2 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="text-3xl text-white" />
                    </div>
                  </div>

                  {/* Valor principal */}
                  <div className="relative z-10">
                    <p
                      className={`text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </p>

                    <h3 className="text-xl font-bold text-bg mb-2">
                      {stat.label}
                    </h3>

                    <p className="text-sm text-gray mb-3">{stat.description}</p>

                    {/* Métrica adicional */}
                    <div className="flex items-center gap-2 text-xs text-green font-mono">
                      <FiCheckCircle />
                      <span>{stat.metric}</span>
                    </div>
                  </div>

                  {/* Barra de progreso animada */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray/20">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.gradient}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="relative bg-gradient-to-r from-green/5 to-green2/5 rounded-3xl p-8 md:p-12 border border-green/20 overflow-hidden"
            style={{ opacity: 1, visibility: "visible" }}
          >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green2 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left space-y-3">
                <h3 className="text-3xl md:text-4xl font-ubuntu font-bold text-bg">
                  ¿Listo para <span className="text-green">transformar</span> tu
                  negocio?
                </h3>
                <p className="text-gray max-w-xl">
                  Obtén un diagnóstico gratuito de tu presencia digital y
                  descubre cómo un sistema estructurado puede aumentar tus
                  conversiones.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiClock /> Respuesta en 24h
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiAward /> Sin compromiso
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiUsers /> 50+ clientes
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all whitespace-nowrap">
                    <span className="relative z-10 flex items-center gap-2">
                      Diagnosticar mi negocio
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Link>

                <Link href="/Proyects">
                  <button className="px-8 py-4 border-2 border-green/30 text-bg font-bold rounded-full hover:bg-green/5 transition-colors whitespace-nowrap">
                    Ver casos reales
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
