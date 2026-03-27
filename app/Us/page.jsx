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
  FiX,
  FiPlus,
} from "react-icons/fi";
import { MdOutlineRocketLaunch, MdOutlineAnalytics } from "react-icons/md";
import { RiTeamLine, RiLightbulbLine, RiBarChartLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageUs = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("queEs");
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);
  const queEsRef = useRef(null);
  const queNoVendeRef = useRef(null);
  const queSiVendeRef = useRef(null);
  const metodologiaRef = useRef(null);
  const valoresRef = useRef(null);
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

      gsap.from(".fade-up", {
        scrollTrigger: {
          trigger: queEsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".valor-card", {
        scrollTrigger: {
          trigger: valoresRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
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
    }, [heroRef, queEsRef, valoresRef, ctaRef]);

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
      {/* Hero Section */}
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

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30 mb-6">
                AGENCIA DE SISTEMAS DIGITALES ESTRATÉGICOS
              </span>

              <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight leading-tight mb-6">
                <span className="bg-gradient-to-r from-green via-green-400 to-green-600 bg-clip-text text-transparent">
                  STRING
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ayudamos a los negocios a transformar su presencia digital en un
                <span className="text-green font-semibold">
                  {" "}
                  sistema estructurado de captación de clientes
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-green to-green-600 text-black font-bold rounded-full overflow-hidden hover:shadow-xl hover:shadow-green/30 transition-all">
                    <span className="relative z-10">
                      Diagnosticar mi negocio
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>
                </Link>

                <Link href="/Services">
                  <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                    Ver sistemas
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qué es STRING */}
      <section ref={queEsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-up">
              <span className="text-green font-mono text-sm">
                01 · QUÉ ES STRING
              </span>
              <h2 className="text-4xl md:text-5xl font-ubuntu font-bold">
                Sistemas digitales{" "}
                <span className="text-green">estratégicos</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Muchos negocios dependen únicamente de redes sociales y mensajes
                directos para recibir clientes, lo que provoca:
              </p>
              <ul className="space-y-3">
                {[
                  "desorden en la comunicación",
                  "pérdida de prospectos",
                  "respuestas tardías",
                  "falta de seguimiento",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <FiX className="text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed pt-4">
                STRING diseña{" "}
                <span className="text-green font-semibold">
                  sistemas digitales
                </span>{" "}
                que ayudan a organizar ese proceso. No se trata únicamente de
                crear páginas web, sino de construir estructuras digitales que
                conviertan visitas en clientes potenciales organizados.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 fade-up">
              <h3 className="text-2xl font-ubuntu font-bold text-green mb-4">
                Qué hace STRING
              </h3>
              <ul className="space-y-3">
                {[
                  "generar más mensajes de clientes interesados",
                  "organizar la captación de prospectos",
                  "reducir la pérdida de oportunidades",
                  "facilitar el contacto con el negocio",
                  "automatizar procesos básicos de comunicación",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheckCircle className="text-green mt-1 flex-shrink-0" />
                    <span className="text-gray-300">• {item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qué NO vende / Qué SÍ vende */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-green-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Qué NO vende */}
            <motion.div
              ref={queNoVendeRef}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-ubuntu font-bold text-red-500 mb-6 flex items-center gap-2">
                <FiX className="text-2xl" />
                Qué NO vendemos
              </h3>
              <ul className="space-y-3">
                {[
                  "diseño visual sin estrategia",
                  "tecnología innecesaria",
                  "tendencias digitales sin impacto real",
                  "seguidores sin conversión",
                  "automatizaciones complejas sin objetivo comercial",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-500/50">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Qué SÍ vende */}
            <motion.div
              ref={queSiVendeRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-ubuntu font-bold text-green mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-2xl" />
                Qué SÍ vendemos
              </h3>
              <ul className="space-y-3">
                {[
                  "estructura digital clara",
                  "optimización del proceso de contacto",
                  "páginas enfocadas en conversión",
                  "organización de prospectos",
                  "automatización básica del primer contacto",
                  "sistemas digitales que convierten visitas en clientes potenciales",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <FiCheckCircle className="text-green text-sm mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metodología de trabajo */}
      <section ref={metodologiaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green font-mono text-sm">
              02 · METODOLOGÍA
            </span>
            <h2 className="text-4xl md:text-5xl font-ubuntu font-bold mt-4">
              Cómo <span className="text-green">trabajamos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Diagnóstico",
                desc: "Análisis de redes sociales, claridad de servicios, proceso actual de contacto y flujo de captación existente.",
                icon: FiTarget,
              },
              {
                step: "02",
                title: "Estructuración",
                desc: "Definición de propuesta de valor, estructura de página, flujo de conversión y llamados a la acción.",
                icon: FiGrid,
              },
              {
                step: "03",
                title: "Desarrollo",
                desc: "Implementación de landing page, optimización mobile, integración de WhatsApp y automatizaciones.",
                icon: FiCode,
              },
              {
                step: "04",
                title: "Ajuste inicial",
                desc: "Pruebas de funcionamiento, revisión del flujo de contacto, ajustes de claridad y verificación técnica.",
                icon: FiShield,
              },
            ].map((fase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green/50 transition-all"
              >
                <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green font-bold">{fase.step}</span>
                </div>
                <fase.icon className="text-3xl text-green mb-3" />
                <h3 className="text-xl font-ubuntu font-bold text-white mb-2">
                  {fase.title}
                </h3>
                <p className="text-sm text-gray-400">{fase.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 mt-8 text-sm">
            STRING no entrega páginas web. Entrega sistemas funcionales de
            captación de clientes.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section
        ref={valoresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-green-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-ubuntu font-bold">
              Nuestros <span className="text-green">Valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: FiHeart, label: "Pasión" },
              { icon: FiUsers, label: "Colaboración" },
              { icon: FiAward, label: "Excelencia" },
              { icon: FiClock, label: "Compromiso" },
              { icon: FiStar, label: "Innovación" },
              { icon: FiZap, label: "Eficiencia" },
            ].map((valor, i) => (
              <motion.div
                key={i}
                className="valor-card bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-green/50 transition-all"
                whileHover={{ y: -5 }}
              >
                <valor.icon className="text-3xl text-green mx-auto mb-2" />
                <span className="text-sm text-white">{valor.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visión a 2 años */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-900/30 to-green-950/30 rounded-3xl p-12 border border-green-500/20 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-6">
              Visión a <span className="text-green">2 años</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { value: "10-15", label: "clientes recurrentes" },
                { value: "estables", label: "ingresos mensuales" },
                { value: "clara", label: "especialización" },
                { value: "replicable", label: "sistema" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-green">{item.value}</p>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300">
              Posicionarnos como agencia estratégica de sistemas digitales, no
              solo como equipo técnico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-900/30 to-green-950/30 rounded-3xl p-12 border border-green-500/20 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-ubuntu font-bold mb-6">
              ¿Listo para <span className="text-green">transformar</span> tu
              negocio?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              No necesitas más seguidores. Necesitas un sistema que convierta.
            </p>

            <Link href="/quote">
              <button className="group relative px-8 py-5 bg-gradient-to-r from-green to-green-600 text-black font-bold rounded-full text-lg overflow-hidden hover:shadow-2xl hover:shadow-green/30 transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Diagnosticar mi negocio
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
