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
  FiZap,
  FiClock,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const stringRef = useRef(null);
  const badgeRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef([]);
  const graphicRef = useRef(null);
  const overlayRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          badgeRef.current,
          stringRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          titleLine3Ref.current,
          ctaRef.current,
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

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

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

      tl.from(
        badgeRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.8"
      );

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

      tl.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
        },
        "-=0.4"
      );

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

  const stats = [
    {
      value: "10+",
      label: "Sistemas",
      icon: RiTeamLine,
    },
    {
      value: "85%",
      label: "Conversión",
      icon: MdOutlineAnalytics,
    },
    {
      value: "24h",
      label: "Respuesta",
      icon: FiClock,
    },
    {
      value: "100%",
      label: "Personalizado",
      icon: FiAward,
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

      {/* Fondo */}
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12 sm:py-16 md:py-20">
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
                SISTEMAS DE CONVERSIÓN
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
                  }}
                  className="cursor-default inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Título principal */}
            <div className="space-y-2">
              <h1
                ref={titleLine1Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NO NECESITAS
              </h1>
              <h1
                ref={titleLine2Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl   font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                MÁS SEGUIDORES
              </h1>
              <h1
                ref={titleLine3Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl  font-ubuntu font-black text-white leading-tight"
                style={{ opacity: 1, visibility: "visible" }}
              >
                NECESITAS UN <span className="text-green">SISTEMA</span>
              </h1>
            </div>

            {/* Descripción corta */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
              Diseñamos sistemas digitales que convierten visitas en clientes
              reales.
            </p>
            <div className="flex items-center gap-2 text-green">
              <FiCheckCircle />
              <span className="text-xs sm:text-sm font-mono">
                Diseñamos sistemas, no páginas
              </span>
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
                    Diagnosticar
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </Link>

              <Link href="/Services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-green/30 text-white font-bold rounded-full hover:bg-green/10 transition-all backdrop-blur-sm"
                >
                  Ver sistemas
                </motion.button>
              </Link>
            </div>

            {/* Stats simplificadas */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="text-center"
                  >
                    <Icon className="text-xl sm:text-2xl text-green mx-auto mb-1" />
                    <p className="text-sm sm:text-base font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Solo gráfico */}
          <div className="space-y-6">
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
                    <span className="text-5xl font-anton text-green">S</span>
                  </div>
                </div>

                {[
                  { icon: FiZap, angle: 0, label: "Conversión" },
                  { icon: FiClock, angle: 90, label: "24h" },
                  { icon: FiAward, angle: 180, label: "100%" },
                  { icon: RiTeamLine, angle: 270, label: "50+" },
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
                      delay: i * 0.3,
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
        transition={{ delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-green/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-green rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
