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
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaQuoteRight,
} from "react-icons/fa";
import {
  MdOutlineSpeed,
  MdOutlineAnalytics,
  MdOutlineRocketLaunch,
} from "react-icons/md";
import {
  RiTeamLine,
  RiCustomerServiceLine,
  RiLightbulbLine,
  RiBarChartLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const stringRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef([]);
  const testimonialRef = useRef(null);
  const graphicRef = useRef(null);
  const overlayRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // PRIMERO: Aseguramos que todos los elementos sean visibles
      gsap.set(
        [
          badgeRef.current,
          stringRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          titleLine3Ref.current,
          descriptionRef.current,
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

      // 5. Descripción
      tl.from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.8"
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

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Stats
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
      icon: FiStar,
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
        className="absolute inset-0 bg-gradient-to-r from-green to-green-600 z-50"
        style={{ transformOrigin: "left center" }}
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-black" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #50ff05 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border border-green/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
            {/* Badge */}
            <motion.div
              ref={badgeRef}
              className="inline-block"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <span className="px-4 py-2 bg-green/10 text-green rounded-full text-xs sm:text-sm font-mono border border-green/30 inline-flex items-center gap-2 backdrop-blur-sm">
                <FiZap className="text-green animate-pulse" />
                SISTEMAS DE CONVERSIÓN DIGITAL
                <FiZap className="text-green animate-pulse" />
              </span>
            </motion.div>

            {/* Nombre STRING */}
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

            {/* Título */}
            <div ref={titleRef} className="space-y-1">
              <h1
                ref={titleLine1Ref}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NO NECESITAS
              </h1>
              <h1
                ref={titleLine2Ref}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                MÁS{" "}
                <span className="text-green relative">
                  SEGUIDORES
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-green blur-sm" />
                </span>
              </h1>
              <h1
                ref={titleLine3Ref}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NECESITAS UN{" "}
                <span className="relative inline-block">
                  SISTEMA
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-green"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h1>
            </div>

            {/* Descripción */}
            <div
              ref={descriptionRef}
              className="space-y-3"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                Transformamos presencia digital en{" "}
                <span className="text-green font-semibold">
                  clientes reales
                </span>{" "}
                mediante estructuras claras de conversión.
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
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <Link href="/quote" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:w-auto px-8 py-4 bg-green text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-green/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Diagnosticar mi negocio
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </Link>

              <Link href="/Proyects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-green/30 text-white font-bold rounded-full hover:bg-green/10 transition-all backdrop-blur-sm"
                >
                  Ver casos de éxito
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
                    <p className="text-[10px] text-gray-500 mt-1">
                      {stat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Elemento gráfico */}
            <div
              ref={graphicRef}
              className="relative hidden lg:block"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <div className="relative h-[450px] w-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
                  <div className="absolute inset-0 border-4 border-green/30 rounded-full animate-ping opacity-20" />
                  <div className="absolute inset-[10%] border-2 border-green/40 rounded-full" />
                  <div className="absolute inset-[20%] bg-gradient-to-br from-green/20 to-transparent rounded-full blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-anton text-green">S</span>
                  </div>
                </div>

                {[
                  { icon: FiTarget, angle: 0, label: "Conversión" },
                  { icon: FiZap, angle: 90, label: "Velocidad" },
                  {
                    icon: MdOutlineRocketLaunch,
                    angle: 180,
                    label: "Escalabilidad",
                  },
                  { icon: RiBarChartLine, angle: 270, label: "Resultados" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-14 h-14 bg-green/10 backdrop-blur-md rounded-xl border border-green/30 flex flex-col items-center justify-center"
                    style={{
                      top: `${
                        50 + 38 * Math.sin((item.angle * Math.PI) / 180)
                      }%`,
                      left: `${
                        50 + 38 * Math.cos((item.angle * Math.PI) / 180)
                      }%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <item.icon className="text-green text-xl" />
                    <span className="text-[8px] text-white mt-1">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <motion.div
              ref={testimonialRef}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <FaQuoteRight className="absolute top-4 right-4 text-green/20 text-3xl" />
              <p className="text-sm text-gray-300 italic mb-4">
                "STRING transformó completamente nuestra forma de captar
                clientes. Pasamos de tener una página web a tener un sistema que
                realmente convierte."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green to-green-600 rounded-full flex items-center justify-center text-black font-bold">
                  MG
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    María González
                  </p>
                  <p className="text-xs text-gray-400">CEO, Grupo MG</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-500 fill-yellow-500 text-xs"
                  />
                ))}
              </div>
            </motion.div>

            {/* Redes sociales */}
            <div className="flex justify-center lg:justify-end gap-3">
              {[FaInstagram, FaWhatsapp, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-green/30 transition-all"
                >
                  <Icon className="text-green text-sm" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 tracking-widest">EXPLORA</span>
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
