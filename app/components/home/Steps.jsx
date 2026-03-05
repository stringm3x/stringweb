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
} from "react-icons/fi";
import {
  MdOutlineSpeed,
  MdOutlineAnalytics,
  MdOutlineRocketLaunch,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const stepsData = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    description: "Análisis profundo de tu presencia digital",
    items: [
      "Evaluación de claridad de oferta",
      "Identificación de fricciones en el contacto",
      "Revisión de flujo de captación",
      "Análisis de redes sociales",
    ],
    gradient: "from-green to-green2",
    icon: FiSearch,
    metric: "24h respuesta",
    color: "green",
  },
  {
    number: "02",
    title: "ESTRUCTURA",
    description: "Diseño del sistema de conversión",
    items: [
      "Ajuste de propuesta de valor",
      "Flujo de conversión estratégico",
      "Redacción con enfoque en conversión",
      "Llamados a la acción claros",
    ],
    gradient: "from-green2 to-green3",
    icon: FiLayers,
    metric: "100% personalizado",
    color: "green2",
  },
  {
    number: "03",
    title: "DESARROLLO",
    description: "Implementación del sistema",
    items: [
      "Landing page optimizada",
      "Integración de WhatsApp",
      "Optimización mobile",
      "Implementación técnica",
    ],
    gradient: "from-green3 to-green4",
    icon: FiCode,
    metric: "Sistema vivo",
    color: "green3",
  },
  {
    number: "04",
    title: "AJUSTE",
    description: "Optimización continua",
    items: [
      "Pruebas de flujo",
      "Ajustes de claridad",
      "Optimización UX",
      "Verificación completa",
    ],
    gradient: "from-green4 to-green",
    icon: MdOutlineRocketLaunch,
    metric: "Mejora continua",
    color: "green4",
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
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      className="relative"
    >
      {/* Círculo principal */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className={`
          relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] 
          rounded-full bg-gradient-to-br ${step.gradient}
          flex items-center justify-center
          shadow-2xl cursor-pointer
          border-4 border-white/10
          ${isActive ? "ring-4 ring-white/30" : ""}
        `}
      >
        {/* Círculo interior con blur */}
        <div className="absolute inset-2 rounded-full bg-black/20 backdrop-blur-sm" />

        {/* Contenido */}
        <div className="relative z-10 text-center p-6">
          <span className="text-3xl md:text-4xl font-black text-white mb-2 block">
            {step.number}
          </span>
          <step.icon className="text-3xl md:text-4xl text-white mx-auto mb-2" />
          <h3 className="text-lg md:text-xl font-ubuntu font-bold text-white">
            {step.title}
          </h3>
        </div>

        {/* Partículas animadas alrededor */}
        <div className="absolute -inset-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, Math.sin(i * 120) * 40, 0],
                y: [0, Math.cos(i * 120) * 40, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Línea conectora (excepto el último) */}
      {index < stepsData.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-16 w-16 h-0.5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="w-full h-full bg-gradient-to-r from-green/50 to-transparent origin-left"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -right-2 -top-2 w-4 h-4"
          >
            <div className="w-2 h-2 bg-green rounded-full" />
          </motion.div>
        </div>
      )}
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
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
        >
          <step.icon className="text-2xl text-white" />
        </div>
        <div>
          <span className={`text-sm font-mono text-${step.color} mb-1 block`}>
            PASO {step.number} · {step.metric}
          </span>
          <h3 className="text-2xl font-ubuntu font-bold text-white">
            {step.title}
          </h3>
        </div>
      </div>

      <p className="text-gray mb-6 text-lg">{step.description}</p>

      <ul className="space-y-3">
        {step.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 text-gray"
          >
            <FiCheckCircle
              className={`text-${step.color} mt-1 flex-shrink-0`}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Barra de progreso decorativa */}
      <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        visibility: "visible",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        subtitleRef.current,
        {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
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

        {/* Estrellas/partículas */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Líneas orbitales */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
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
          <motion.div ref={titleRef} className="space-y-4">
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
          </motion.div>
        </div>

        {/* Círculos en fila */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 lg:gap-16 mb-16">
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
        <div className="max-w-2xl mx-auto">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <Link href="/quote">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Comenzar diagnóstico
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;
