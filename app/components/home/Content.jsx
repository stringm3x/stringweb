"use client";
import React, { useEffect, useRef, useState } from "react";
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
  FiCheckCircle,
  FiBarChart2,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// Datos actualizados
const stats = [
  {
    value: "10+",
    label: "Sistemas implementados",
    description: "Negocios transformados con estructura digital",
    gradient: "from-green to-green2",
    icon: RiTeamLine,
    metric: "Clientes recurrentes",
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
    desc: "No diseñamos páginas, construimos sistemas que convierten visitas en clientes potenciales organizados.",
  },
  {
    icon: FiTrendingUp,
    title: "Estructura clara",
    desc: "Cada elemento tiene un propósito estratégico: guiar al visitante hacia el contacto.",
  },
  {
    icon: FiZap,
    title: "Optimización continua",
    desc: "Mejoramos constantemente la claridad y el flujo de captación basado en datos.",
  },
  {
    icon: FiUsers,
    title: "Enfoque humano",
    desc: "Automatizamos procesos, no relaciones. La tecnología al servicio de las personas.",
  },
];

const Content = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const principiosRef = useRef([]);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Configurar estado inicial
      gsap.set(
        [titleRef.current, subtitleRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(principiosRef.current.filter(Boolean), {
        opacity: 0,
        y: 25,
      });

      // Timeline con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          principiosRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Línea decorativa
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
          <div className="h-96 bg-gray animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-green2/5 rounded-full filter blur-3xl" />

        {/* Línea de progreso */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green via-green2 to-green3"
          style={{ width: "0%" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20 lg:gap-24">
          {/* Header */}
          <div className="text-center space-y-4">
            <div ref={titleRef} className="inline-block">
              <span className="px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
                SISTEMAS DE CONVERSIÓN
              </span>
            </div>

            <h2
              ref={subtitleRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-ubuntu font-black tracking-tight leading-tight"
            >
              <span className="text-black">NO ES DISEÑO,</span>
              <br />
              <span className="text-green">ES ESTRUCTURA</span>
            </h2>

            <div ref={descriptionRef} className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-gray leading-relaxed">
                En <span className="font-bold text-green">STRING</span>{" "}
                transformamos presencia digital en clientes reales mediante
                sistemas claros de conversión. No vendemos páginas, vendemos
                <span className="font-semibold text-black"> estructura</span>.
              </p>
            </div>
          </div>

          {/* Principios estratégicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principios.map((principio, index) => {
              const Icon = principio.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (principiosRef.current[index] = el)}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-2xl text-green" />
                    </div>

                    <h3 className="text-lg font-bold text-black mb-2">
                      {principio.title}
                    </h3>

                    <p className="text-sm text-gray leading-relaxed">
                      {principio.desc}
                    </p>

                    {/* Barra decorativa */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green to-green2 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-xl border-2 border-green/20 p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                >
                  <span className="absolute -bottom-4 -right-4 text-8xl font-black text-green/5 select-none">
                    {index + 1}
                  </span>

                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green to-green2 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="text-3xl text-white" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p
                      className={`text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </p>

                    <h3 className="text-xl font-bold text-black mb-2">
                      {stat.label}
                    </h3>

                    <p className="text-sm text-gray mb-3">{stat.description}</p>

                    <div className="flex items-center gap-2 text-xs text-green font-mono">
                      <FiCheckCircle />
                      <span>{stat.metric}</span>
                    </div>
                  </div>

                  {/* Barra de progreso animada */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray/20">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        stat.gradient
                      } transition-all duration-1000 delay-${index * 200}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className="relative bg-gradient-to-r from-green/5 to-green2/5 rounded-3xl p-8 md:p-12 border border-green/20 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green2 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left space-y-3">
                <h3 className="text-3xl md:text-4xl font-ubuntu font-bold text-black">
                  ¿Listo para <span className="text-green">transformar</span> tu
                  negocio?
                </h3>
                <p className="text-gray max-w-xl">
                  Obtén un diagnóstico gratuito de tu presencia digital y
                  descubre cómo un sistema estructurado puede organizar tu
                  captación de clientes.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiClock /> Diagnóstico 24h
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiAward /> Sin compromiso
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray">
                    <FiUsers /> 50+ sistemas
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

                <Link href="/Services">
                  <button className="px-8 py-4 border-2 border-green/30 text-black font-bold rounded-full hover:bg-green/5 transition-colors whitespace-nowrap">
                    Ver sistemas
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
