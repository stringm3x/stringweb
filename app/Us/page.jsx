"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiTarget,
  FiEye,
  FiHeart,
  FiUsers,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiCode,
  FiTrendingUp,
  FiShield,
  FiStar,
  FiZap,
  FiGrid,
  FiCompass,
  FiPackage,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const msvs = [
  {
    id: "mission",
    title: "Misión",
    icon: FiTarget,
    content:
      "Transformar ideas en sitios web funcionales, visualmente impactantes y alineados con la esencia de cada negocio, ayudando a nuestros clientes a crecer en el mundo digital. Creemos que cada marca tiene una historia única que merece ser contada con autenticidad y creatividad.",
    color: "from-green-500 to-green-600",
    stats: [
      { label: "Proyectos", value: "50+" },
      { label: "Satisfacción", value: "98%" },
      { label: "Equipo", value: "5+" },
    ],
  },
  {
    id: "vision",
    title: "Visión",
    icon: FiEye,
    content:
      "Inspirar y evolucionar junto a quienes confían en nosotros. Soñamos con un entorno digital donde cada marca tenga una voz auténtica y poderosa. Visualizamos ser una empresa líder en diseño y desarrollo web en Latinoamérica, reconocida por nuestro enfoque humano, innovación constante y compromiso con el éxito de nuestros clientes.",
    color: "from-green-600 to-green-700",
    stats: [
      { label: "Metas 2025", value: "10+" },
      { label: "Innovación", value: "100%" },
      { label: "Expansión", value: "3x" },
    ],
  },
];

const values = [
  { icon: FiHeart, title: "Pasión", desc: "Amamos lo que hacemos" },
  { icon: FiUsers, title: "Colaboración", desc: "Trabajo en equipo" },
  { icon: FiAward, title: "Excelencia", desc: "Calidad en cada detalle" },
  { icon: FiClock, title: "Compromiso", desc: "Cumplimos lo prometido" },
  { icon: FiStar, title: "Innovación", desc: "Siempre actualizados" },
  { icon: FiZap, title: "Eficiencia", desc: "Resultados rápidos" },
];

const process = [
  {
    step: "01",
    title: "Descubrimiento",
    icon: FiCompass,
    desc: "Entendemos tu negocio, objetivos y audiencia",
  },
  {
    step: "02",
    title: "Estrategia",
    icon: FiTrendingUp,
    desc: "Planificamos la mejor solución digital",
  },
  {
    step: "03",
    title: "Diseño",
    icon: FiGrid,
    desc: "Creamos experiencias visuales únicas",
  },
  {
    step: "04",
    title: "Desarrollo",
    icon: FiPackage,
    desc: "Construimos con tecnologías modernas",
  },
  {
    step: "05",
    title: "Lanzamiento",
    icon: FiShield,
    desc: "Publicamos y monitoreamos el éxito",
  },
];

const stats = [
  { value: "50+", label: "Proyectos", icon: FiCode },
  { value: "5+", label: "Años", icon: FiClock },
  { value: "98%", label: "Clientes felices", icon: FiHeart },
  { value: "10+", label: "Expertos", icon: FiUsers },
];

const PageUs = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [mounted, setMounted] = useState(false);

  const heroRef = useRef(null);
  const missionVisionRef = useRef(null);
  const valuesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
      });

      gsap.from(".process-item", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, [heroRef, valuesRef, processRef, ctaRef]);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-green border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Hero Section - Responsive */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black" />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full text-center lg:text-left"
            >
              <span className="inline-block px-3 sm:px-4 py-2 bg-green/10 text-green rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-green/20">
                ✦ Sobre STRING
              </span>

              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ubuntu font-black tracking-tight leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-green via-green-400 to-green-600 bg-clip-text text-transparent">
                  CREANDO
                </span>
                <br />
                <span className="text-white">EXPERIENCIAS</span>
                <br />
                <span className="text-white">DIGITALES</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Somos un equipo apasionado por transformar ideas en realidades
                digitales. Cada proyecto es único y recibe la atención
                personalizada que merece.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/quote">
                  <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green to-green-600 text-black font-bold rounded-full overflow-hidden hover:shadow-xl hover:shadow-green/30 transition-all text-sm sm:text-base">
                    <span className="relative z-10">Comenzar proyecto</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>
                </Link>

                <Link href="/Proyects">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm sm:text-base">
                    Ver trabajo
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right content - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
                  >
                    <Icon className="text-2xl sm:text-3xl text-green mb-2 sm:mb-3" />
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión con Tabs - Responsive */}
      <section
        ref={missionVisionRef}
        className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-green font-semibold tracking-wider text-sm sm:text-base">
              NUESTRA ESENCIA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Lo que nos <span className="text-green">define</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green to-green-600 mx-auto" />
          </div>

          {/* Tabs - Scroll horizontal en móvil */}
          <div className="flex flex-nowrap lg:flex-wrap justify-start lg:justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2 px-2">
            {msvs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold transition-all overflow-hidden ${
                    isActive
                      ? "text-black"
                      : "text-white bg-white/10 hover:bg-white/20"
                  } text-sm sm:text-base`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${item.color}`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <Icon className="text-base sm:text-xl" />
                    <span className="hidden sm:inline">{item.title}</span>
                    <span className="sm:hidden">{item.title.slice(0, 3)}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Texto */}
              <div className="w-full space-y-4 sm:space-y-6 order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-ubuntu font-bold text-center lg:text-left">
                  {msvs.find((m) => m.id === activeTab)?.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-center lg:text-left">
                  {msvs.find((m) => m.id === activeTab)?.content}
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
                  {msvs
                    .find((m) => m.id === activeTab)
                    ?.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-1 lg:order-2"
              >
                <Image
                  src={activeTab === "mission" ? "/mision2.png" : "/vision.png"}
                  alt={activeTab === "mission" ? "Misión" : "Visión"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20"
                >
                  <p className="text-white/90 text-xs sm:text-sm italic">
                    {activeTab === "mission"
                      ? "Cada marca tiene una historia única que merece ser contada"
                      : "Innovación constante y compromiso con el éxito de nuestros clientes"}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Valores - Responsive */}
      <section
        ref={valuesRef}
        className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-green-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold">
              Nuestros <span className="text-green">Valores</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4">
              Lo que nos guía en cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  className="value-card group relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-white/10 hover:border-green/50 transition-colors"
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="text-3xl sm:text-4xl text-green mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso - Responsive */}
      <section
        ref={processRef}
        className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-green font-semibold tracking-wider text-sm sm:text-base">
              CÓMO TRABAJAMOS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold mt-3 sm:mt-4">
              Nuestro <span className="text-green">Proceso</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {process.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="process-item relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-green/50 transition-all">
                      <div className="absolute -top-3 sm:-top-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-green rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                        {i + 1}
                      </div>

                      <Icon className="text-2xl sm:text-3xl text-green mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400">{item.desc}</p>

                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Responsive */}
      <section
        ref={ctaRef}
        className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-900/30 to-green-950/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-green-500/20 backdrop-blur-sm"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-ubuntu font-bold mb-4 sm:mb-6">
              ¿Listo para <span className="text-green">transformar</span> tu
              idea?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Hagamos realidad tu proyecto con la calidad y dedicación que
              merece
            </p>

            <Link href="/quote">
              <button className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-green to-green-600 text-black font-bold rounded-full text-base sm:text-lg overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Comenzamos?
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PageUs;
