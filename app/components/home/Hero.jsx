"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiZap,
  FiClock,
  FiAward,
  FiCheckCircle,
  FiTrendingUp,
  FiTarget,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const brandRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef([]);
  const graphicRef = useRef(null);
  const socialRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set(
        [
          badgeRef.current,
          brandRef.current,
          titleRef.current,
          descRef.current,
          taglineRef.current,
          ctaRef.current,
          ...statsRef.current.filter(Boolean),
          graphicRef.current,
          socialRef.current,
        ],
        { opacity: 0, y: 30 }
      );

      // Overlay de entrada
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "right center",
        }
      );

      // Timeline principal
      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { duration: 0.6, ease: "power3.out" },
      });

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(brandRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(
          statsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.2"
        )
        .to(
          graphicRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" },
          "-=0.4"
        )
        .to(socialRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

      // Animación flotante sutil para el gráfico
      gsap.to(graphicRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hover animación para stats
      statsRef.current.forEach((stat) => {
        if (!stat) return;
        stat.addEventListener("mouseenter", () => {
          gsap.to(stat, { scale: 1.08, duration: 0.2, ease: "back.out(0.8)" });
        });
        stat.addEventListener("mouseleave", () => {
          gsap.to(stat, { scale: 1, duration: 0.2 });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "50+", label: "Sistemas", icon: FiTarget },
    { value: "85%", label: "Conversión", icon: FiTrendingUp },
    { value: "24h", label: "Respuesta", icon: FiClock },
    { value: "100%", label: "Personalizado", icon: FiAward },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* Overlay de entrada */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-green to-green2 z-50"
        style={{ transformOrigin: "left center" }}
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green/10 text-green rounded-full text-sm font-mono border border-green/30 backdrop-blur-sm">
                <FiZap className="w-4 h-4" />
                SISTEMAS DE CONVERSIÓN
              </span>
            </div>

            {/* Marca */}
            <div ref={brandRef}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-anton tracking-tighter text-white leading-none">
                STRING
              </h1>
            </div>

            {/* Mensaje principal */}
            <div ref={titleRef} className="space-y-2">
              <p className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-black text-white leading-tight">
                No necesitas más
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-black text-green leading-tight">
                seguidores
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-black text-white leading-tight">
                Necesitas un{" "}
                <span className="underline decoration-green decoration-4">
                  sistema
                </span>
              </p>
            </div>

            {/* Descripción */}
            <div ref={descRef}>
              <p className="text-base sm:text-lg text-gray-300 max-w-md leading-relaxed">
                Transformamos presencia digital en clientes reales mediante
                sistemas claros de conversión.
              </p>
            </div>

            {/* Tagline */}
            <div
              ref={taglineRef}
              className="flex items-center gap-2 text-green text-sm"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span className="font-mono">Diseñamos sistemas, no páginas</span>
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2">
              <Link href="/quote">
                <button className="group px-6 sm:px-8 py-3 bg-green text-black font-bold rounded-full hover:shadow-xl hover:shadow-green/30 transition-all flex items-center gap-2">
                  Diagnosticar negocio
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/Services">
                <button className="px-6 sm:px-8 py-3 border-2 border-green/30 text-white font-bold rounded-full hover:bg-green/10 transition-all">
                  Ver sistemas
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 pt-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => (statsRef.current[idx] = el)}
                    className="text-center cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-green mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna Derecha */}
          <div ref={graphicRef} className="hidden lg:flex justify-center">
            <div className="relative w-[380px] h-[380px]">
              {/* Círculo central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 rounded-full bg-gradient-to-br from-green/20 to-green/5 backdrop-blur-3xl border border-green/30 flex items-center justify-center">
                  <span className="text-6xl font-anton text-green">S</span>
                </div>
              </div>

              {/* Elementos orbitales */}
              {[
                { icon: FiTarget, label: "Conversión", angle: 0 },
                { icon: FiZap, label: "Velocidad", angle: 90 },
                { icon: FiTrendingUp, label: "Escala", angle: 180 },
                { icon: FiAward, label: "Calidad", angle: 270 },
              ].map((item, i) => {
                const Icon = item.icon;
                const rad = (item.angle * Math.PI) / 180;
                const radius = 140;
                const x = 190 + radius * Math.cos(rad);
                const y = 190 + radius * Math.sin(rad);

                return (
                  <div
                    key={i}
                    className="absolute w-16 h-16 bg-green/10 backdrop-blur-sm rounded-xl border border-green/30 flex flex-col items-center justify-center"
                    style={{ left: x - 32, top: y - 32 }}
                  >
                    <Icon className="text-green text-xl" />
                    <span className="text-[10px] text-white mt-1">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border border-green/40 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-green rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Redes sociales */}
      <div
        ref={socialRef}
        className="absolute right-4 sm:right-6 bottom-1/2 translate-y-1/2 hidden lg:flex flex-col gap-3"
      >
        {[FaInstagram, FaWhatsapp, FaLinkedinIn].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-green/30 transition-all hover:scale-110"
          >
            <Icon className="text-green text-sm" />
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
