"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUsers,
  FiAward,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: FiUsers, value: "15+", label: "Clientes satisfechos" },
  { icon: FiAward, value: "3+", label: "Años de experiencia" },
  { icon: FiHeart, value: "95%", label: "Tasa de retención" },
  { icon: FiStar, value: "4.9", label: "Calificación promedio" },
];

const Us = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);
  const testimonialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aseguramos que todo sea visible primero
      gsap.set(
        [
          contentRef.current,
          testimonialRef.current,
          ...statsRef.current.filter(Boolean),
        ],
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
        }
      );

      // Timeline de animación
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none", // Cambiado a "none" para que no se reverse
        },
      });

      // Animamos desde opacidad 0 a 1, pero dejamos en 1 al final
      tl.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          testimonialRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          statsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/sonido.png"
          alt="STRING Studio"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna izquierda */}
          <div ref={contentRef} className="space-y-8 w-full">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-2 bg-green/20 text-green rounded-full text-sm font-semibold tracking-wider backdrop-blur-sm border border-green/30">
              <span className="w-2 h-2 bg-green rounded-full mr-2 animate-pulse" />
              STRING STUDIO
            </span>

            {/* Texto principal */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-ubuntu font-black tracking-tight leading-tight">
                <span className="text-white">Hemos ayudado a las</span>
                <br />
                <span className="bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
                  marcas a crecer
                </span>
                <br />
                <span className="text-white">con claridad y confianza.</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              En STRING, transformamos visiones en realidades digitales. Cada
              proyecto es único y recibe la atención personalizada que merece
              para destacar en el entorno digital actual.
            </p>

            {/* Botón CTA */}
            <Link href="/Us">
              <button className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-10 sm:hover:pr-12 hover:shadow-xl hover:shadow-green/30">
                <span className="relative z-10">Acerca de STRING</span>
                <FiArrowRight className="absolute right-3 sm:right-4 opacity-0 group-hover:opacity-100 group-hover:right-4 sm:group-hover:right-6 transition-all duration-300" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          {/* Columna derecha */}
          <div ref={testimonialRef} className="w-full mt-10 lg:mt-0">
            {/* Testimonial Card */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 max-w-md mx-auto lg:mx-0">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green/20 to-green2/20 rounded-full filter blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full filter blur-2xl" />

              <div className="relative z-10">
                <span className="text-6xl text-green/30 font-serif absolute -top-2 -left-2">
                  "
                </span>

                <p className="text-white/90 text-sm sm:text-base italic leading-relaxed mt-4">
                  "STRING transformó completamente nuestra presencia digital. El
                  equipo entiende realmente las necesidades del negocio."
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green to-green2 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    AG
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">
                      Ana García
                    </p>
                    <p className="text-gray-400 text-sm">CEO, Marca Incode</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - SIEMPRE VISIBLES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 mb-2 mx-auto">
                  <Icon className="text-green text-lg sm:text-xl" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Us;
