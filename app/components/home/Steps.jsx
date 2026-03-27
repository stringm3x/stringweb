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
  FiSearch,
  FiLayers,
  FiCode,
  FiShield,
} from "react-icons/fi";
import {
  MdOutlineSpeed,
  MdOutlineAnalytics,
  MdOutlineRocketLaunch,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

// Las 4 fases de la metodología STRING
const stepsData = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    description: "Análisis profundo de tu presencia digital actual",
    items: [
      "Análisis de redes sociales actuales",
      "Evaluación de claridad de servicios",
      "Revisión de proceso actual de contacto",
      "Identificación de fricciones en la captación",
    ],
    gradient: "from-green to-green2",
    icon: FiSearch,
    metric: "24h",
    color: "green",
    fase: "Fase 1",
  },
  {
    number: "02",
    title: "ESTRUCTURACIÓN",
    description: "Definición de la estrategia del sistema digital",
    items: [
      "Definición de propuesta de valor",
      "Diseño de flujo de conversión",
      "Estructura de la página",
      "Llamados a la acción claros",
    ],
    gradient: "from-green2 to-green3",
    icon: FiLayers,
    metric: "Estratégico",
    color: "green2",
    fase: "Fase 2",
  },
  {
    number: "03",
    title: "DESARROLLO",
    description: "Implementación del sistema digital",
    items: [
      "Desarrollo de landing page",
      "Optimización para celular",
      "Integración con WhatsApp",
      "Implementación de automatizaciones",
    ],
    gradient: "from-green3 to-green4",
    icon: FiCode,
    metric: "Técnico",
    color: "green3",
    fase: "Fase 3",
  },
  {
    number: "04",
    title: "AJUSTE INICIAL",
    description: "Pruebas y verificación del sistema",
    items: [
      "Pruebas de funcionamiento",
      "Revisión del flujo de contacto",
      "Ajustes de claridad",
      "Verificación técnica completa",
    ],
    gradient: "from-green4 to-green",
    icon: FiShield,
    metric: "Garantizado",
    color: "green4",
    fase: "Fase 4",
  },
];

const StepCircle = ({ step, index, isActive, onHover }) => {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={circleRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative cursor-pointer"
    >
      {/* Círculo principal */}
      <div
        className={`
          relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] 
          rounded-full bg-gradient-to-br ${step.gradient}
          flex items-center justify-center
          shadow-2xl
          border-4 border-white/10
          transition-all duration-300
          ${isActive ? "scale-110 ring-4 ring-white/30" : "hover:scale-105"}
        `}
      >
        {/* Círculo interior con blur */}
        <div className="absolute inset-2 rounded-full bg-black/20 backdrop-blur-sm" />

        {/* Contenido */}
        <div className="relative z-10 text-center p-4">
          <span className="text-xs font-mono text-white/80 mb-1 block">
            {step.fase}
          </span>
          <span className="text-3xl md:text-4xl font-black text-white mb-2 block">
            {step.number}
          </span>
          <step.icon className="text-3xl md:text-4xl text-white mx-auto mb-2" />
          <h3 className="text-base md:text-lg font-ubuntu font-bold text-white">
            {step.title}
          </h3>
          <span className={`text-xs font-mono text-${step.color} mt-2 block`}>
            {step.metric}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const InfoPanel = ({ step, isVisible }) => {
  if (!step || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10"
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
        >
          <step.icon className="text-2xl text-white" />
        </div>
        <div>
          <span className={`text-sm font-mono text-${step.color} mb-1 block`}>
            {step.fase} · PASO {step.number}
          </span>
          <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white">
            {step.title}
          </h3>
        </div>
      </div>

      <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
        {step.description}
      </p>

      <div className="bg-black/30 rounded-xl p-4 mb-6">
        <p className="text-sm text-green font-mono mb-3">
          OBJETIVO DE ESTA FASE:
        </p>
        <ul className="space-y-3">
          {step.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-gray-300 text-sm"
            >
              <FiCheckCircle
                className={`text-${step.color} mt-1 flex-shrink-0`}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-gray-400 italic border-t border-white/10 pt-4">
        "STRING no entrega páginas web. Entrega sistemas funcionales de
        captación de clientes."
      </p>

      {/* Barra de progreso decorativa */}
      <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-full bg-gradient-to-r ${step.gradient}`}
        />
      </div>
    </motion.div>
  );
};

const Steps = () => {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animación de entrada con ScrollTrigger
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

      // Timeline con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 bg-gray-900 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 overflow-hidden"
    >
      {/* Fondo con partículas */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-black to-black" />

        {/* Estrellas/partículas estáticas (sin animación para mejor rendimiento) */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(80, 255, 5, 0.2) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Líneas orbitales decorativas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <circle
            cx="50%"
            cy="50%"
            r="300"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="1"
            strokeDasharray="10,10"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#50ff05" />
              <stop offset="100%" stopColor="#28a624" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="space-y-4">
            <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30">
              ✦ METODOLOGÍA STRING
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black tracking-tight leading-tight">
              <span className="text-white">NUESTRO</span>
              <br />
              <span className="bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
                SISTEMA
              </span>
            </h2>

            <h2
              ref={subtitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold tracking-tight leading-tight text-white"
            >
              DE CONVERSIÓN
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mt-6"
          >
            Cuatro fases para transformar tu presencia digital en un sistema que
            convierte visitas en clientes potenciales organizados.
          </p>
        </div>

        {/* Círculos en fila */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-16">
          {stepsData.map((step, index) => (
            <StepCircle
              key={index}
              step={step}
              index={index}
              isActive={activeStep === index}
              onHover={setActiveStep}
            />
          ))}
        </div>

        {/* Panel de información dinámico */}
        <div className="max-w-3xl mx-auto">
          <InfoPanel step={stepsData[activeStep]} isVisible={true} />
        </div>

        {/* Indicadores de paso */}
        <div className="flex justify-center gap-3 mt-8">
          {stepsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? "w-8 bg-green"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link href="/quote">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Comenzar diagnóstico
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Diagnóstico gratuito · Respuesta en 24h
          </p>
        </div>

        {/* Mensaje final */}
        <div className="text-center mt-12 text-sm text-gray">
          <p>
            STRING no entrega páginas. Entrega sistemas funcionales de
            captación.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Steps;
