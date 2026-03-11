"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiUsers,
  FiClock,
  FiStar,
  FiAward,
  FiCheckCircle,
  FiMessageCircle,
  FiBarChart2,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaQuoteRight,
} from "react-icons/fa";
import { MdOutlineRocketLaunch, MdOutlineAnalytics } from "react-icons/md";
import {
  RiTeamLine,
  RiLightbulbLine,
  RiBarChartLine,
  RiCustomerServiceLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [activeProblem, setActiveProblem] = useState(0);

  // Refs
  const containerRef = useRef(null);
  const stringRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const problemRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef([]);
  const testimonialRef = useRef(null);
  const graphicRef = useRef(null);
  const overlayRef = useRef(null);
  const lettersRef = useRef([]);
  const problemItemsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Aseguramos visibilidad inicial
      gsap.set(
        [
          badgeRef.current,
          stringRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          titleLine3Ref.current,
          problemRef.current,
          ctaRef.current,
          testimonialRef.current,
          graphicRef.current,
          ...statsRef.current.filter(Boolean),
        ],
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          visibility: "visible",
        }
      );

      // Timeline principal
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Overlay de entrada
      tl.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.8,
          ease: "power3.inOut",
          transformOrigin: "right center",
        }
      );

      // 2. Nombre STRING
      tl.from(
        stringRef.current,
        {
          opacity: 0,
          y: -100,
          rotation: -5,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1.2"
      );

      // 3. Badge
      tl.from(
        badgeRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.8"
      );

      // 4. Título con SplitType
      const split1 = new SplitType(titleLine1Ref.current, { types: "chars" });
      const split2 = new SplitType(titleLine2Ref.current, { types: "chars" });
      const split3 = new SplitType(titleLine3Ref.current, { types: "chars" });

      tl.from(
        [...split1.chars, ...split2.chars, ...split3.chars],
        {
          opacity: 0,
          yPercent: 150,
          rotateX: -90,
          stagger: {
            amount: 1.5,
            from: "start",
          },
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.4"
      );

      // 5. Problemas (animación secuencial)
      tl.from(
        problemItemsRef.current.filter(Boolean),
        {
          opacity: 0,
          x: -30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // 6. CTA
      tl.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
        },
        "-=0.4"
      );

      // 7. Stats
      tl.from(
        statsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      );

      // 8. Testimonial
      tl.from(
        testimonialRef.current,
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
        },
        "-=0.4"
      );

      // 9. Elemento gráfico
      tl.from(
        graphicRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotation: 180,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1.2"
      );

      // Animación flotante continua
      gsap.to(graphicRef.current, {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotación automática de problemas
      const interval = setInterval(() => {
        setActiveProblem((prev) => (prev + 1) % 4);
      }, 3000);

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
        clearInterval(interval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Problemas que resolvemos (del documento)
  const problems = [
    {
      icon: FiMessageCircle,
      text: "desorden en la comunicación",
      color: "text-orange-400",
    },
    {
      icon: FiTarget,
      text: "pérdida de prospectos",
      color: "text-red-400",
    },
    {
      icon: FiClock,
      text: "respuestas tardías",
      color: "text-yellow-400",
    },
    {
      icon: FiBarChart2,
      text: "falta de seguimiento",
      color: "text-purple-400",
    },
  ];

  // Stats actualizadas del documento
  const stats = [
    {
      value: "50+",
      label: "Sistemas Implementados",
      icon: RiTeamLine,
      desc: "Negocios transformados",
    },
    {
      value: "85%",
      label: "Aumento en Conversión",
      icon: MdOutlineAnalytics,
      desc: "Promedio en clientes",
    },
    {
      value: "24h",
      label: "Respuesta Inicial",
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

  const stringLetters = "STRING".split("");

  if (!mounted) {
    return (
      <section className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-anton text-green mb-4">
            STRING
          </h1>
          <span className="text-green/60 text-sm font-mono">
            SISTEMAS DE CONVERSIÓN
          </span>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-black min-h-screen flex items-center overflow-hidden"
    >
      {/* Overlay de entrada */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-green to-green2 z-50"
        style={{ transformOrigin: "left center" }}
      />

      {/* Fondo con gradiente y textura */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-black" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #50ff05 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-green/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* STRING gigante al fondo */}
        <div className="absolute top-0 right-0 text-[200px] md:text-[300px] lg:text-[400px] font-anton text-white/5 select-none pointer-events-none">
          STRING
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8 w-full relative z-10">
            {/* Badge con definición */}
            <motion.div
              ref={badgeRef}
              className="inline-block"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <span className="px-4 py-2 bg-green/10 text-green rounded-full text-xs sm:text-sm font-mono border border-green/30 inline-flex items-center gap-2 backdrop-blur-sm">
                <FiZap className="text-green animate-pulse" />
                AGENCIA DE SISTEMAS DIGITALES ESTRATÉGICOS
                <FiZap className="text-green animate-pulse" />
              </span>
            </motion.div>

            {/* Nombre STRING con animación hover */}
            <div
              ref={stringRef}
              className="flex gap-1 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-anton text-white mb-2"
              style={{ opacity: 1, visibility: "visible" }}
            >
              {stringLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  whileHover={{
                    scale: 1.2,
                    color: "#50ff05",
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  className="cursor-default inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Título principal - MENSAJE CENTRAL */}
            <div ref={titleRef} className="space-y-2">
              <h1
                ref={titleLine1Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NO NECESITAS
              </h1>
              <h1
                ref={titleLine2Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                MÁS{" "}
                <span className="text-green relative">
                  SEGUIDORES
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-green"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h1>
              <h1
                ref={titleLine3Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NECESITAS UN{" "}
                <span className="text-green relative">
                  SISTEMA
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-green blur-sm" />
                </span>
              </h1>
            </div>

            {/* Problemas que resolvemos (del documento) */}
            <div ref={problemRef} className="space-y-3 mt-4">
              <p className="text-white/70 text-sm font-mono mb-2">
                MUCHOS NEGOCIOS DEPENDEN ÚNICAMENTE DE REDES SOCIALES, LO QUE
                PROVOCA:
              </p>
              <div className="space-y-2">
                {problems.map((problem, index) => {
                  const Icon = problem.icon;
                  return (
                    <motion.div
                      key={index}
                      ref={(el) => (problemItemsRef.current[index] = el)}
                      className="flex items-center gap-3"
                      animate={{
                        x: activeProblem === index ? 10 : 0,
                        scale: activeProblem === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Icon className={`text-green text-sm`} />
                      </div>
                      <span className="text-white/80 text-sm md:text-base">
                        {problem.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Descripción de STRING */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                STRING diseña{" "}
                <span className="text-green font-semibold">
                  sistemas digitales estratégicos
                </span>{" "}
                que ayudan a organizar el proceso de captación de clientes.
              </p>
              <div className="flex items-center gap-2 text-green">
                <FiCheckCircle />
                <span className="text-xs sm:text-sm font-mono">
                  Diseñamos sistemas, no páginas
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <Link href="/quote" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-green/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Diagnosticar mi negocio
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </Link>

              <Link href="/metodologia" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-green/30 text-white font-bold rounded-full hover:bg-green/10 transition-all backdrop-blur-sm"
                >
                  Conocer el sistema
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    ref={(el) => (statsRef.current[index] = el)}
                    whileHover={{ y: -5 }}
                    className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green/30 transition-all group"
                    style={{ opacity: 1, visibility: "visible" }}
                  >
                    <div className="flex justify-center mb-2">
                      <Icon className="text-xl sm:text-2xl text-green group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Elemento gráfico principal - Representa el "sistema" */}
            <div
              ref={graphicRef}
              className="relative hidden lg:block"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <div className="relative h-[500px] w-full">
                {/* Círculo central - El "sistema" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
                  <div className="absolute inset-0 border-4 border-green/30 rounded-full animate-ping opacity-20" />
                  <div
                    className="absolute inset-[5%] border-2 border-green/40 rounded-full animate-spin"
                    style={{ animationDuration: "20s" }}
                  />
                  <div className="absolute inset-[15%] border border-green/30 rounded-full" />
                  <div className="absolute inset-[25%] bg-gradient-to-br from-green/20 to-green2/20 rounded-full blur-xl" />

                  {/* Logo STRING centrado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-anton text-green">S</span>
                  </div>

                  {/* Partículas orbitando */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green rounded-full"
                      style={{
                        top: `${50 + 45 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                        left: `${
                          50 + 45 * Math.cos((i * 45 * Math.PI) / 180)
                        }%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>

                {/* Elementos orbitales con etiquetas */}
                {[
                  {
                    icon: FiTarget,
                    angle: 0,
                    label: "Conversión",
                    desc: "+85%",
                  },
                  { icon: FiZap, angle: 90, label: "Velocidad", desc: "24h" },
                  {
                    icon: MdOutlineRocketLaunch,
                    angle: 180,
                    label: "Escalabilidad",
                    desc: "100%",
                  },
                  {
                    icon: FiUsers,
                    angle: 270,
                    label: "Captación",
                    desc: "50+",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 bg-green/10 backdrop-blur-md rounded-2xl border border-green/30 flex flex-col items-center justify-center"
                    style={{
                      top: `${
                        50 + 42 * Math.sin((item.angle * Math.PI) / 180)
                      }%`,
                      left: `${
                        50 + 42 * Math.cos((item.angle * Math.PI) / 180)
                      }%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <item.icon className="text-green text-2xl" />
                    <span className="text-[10px] text-white mt-1">
                      {item.label}
                    </span>
                    <span className="text-[8px] text-green/80">
                      {item.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial con más impacto */}
            <motion.div
              ref={testimonialRef}
              className="bg-gradient-to-br from-green/10 to-green2/10 backdrop-blur-md rounded-2xl p-6 border border-green/30 relative"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <FaQuoteRight className="absolute top-4 right-4 text-green/30 text-3xl" />
              <p className="text-sm text-gray-300 italic mb-4">
                "STRING transformó completamente nuestra forma de captar
                clientes. Pasamos de tener una página web a tener un sistema que
                realmente convierte. Nuestros prospectos ahora están
                organizados."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green to-green2 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  MG
                </div>
                <div>
                  <p className="text-white font-semibold text-base">
                    María González
                  </p>
                  <p className="text-xs text-gray-400">CEO, Grupo MG</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-500 fill-yellow-500 text-sm"
                  />
                ))}
              </div>
            </motion.div>

            {/* Redes sociales con hover mejorado */}
            <div className="flex justify-center lg:justify-end gap-3">
              {[FaInstagram, FaWhatsapp, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-green/30 hover:bg-green/10 transition-all"
                >
                  <Icon className="text-green text-sm" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator con mensaje */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 tracking-widest font-mono">
            DESCUBRE EL SISTEMA
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-green/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-green rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
