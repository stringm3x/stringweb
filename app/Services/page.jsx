"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicios from "./data";

gsap.registerPlugin(ScrollTrigger);

const PageServices = () => {
  const [mounted, setMounted] = useState(false);

  // Refs para animaciones
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animaciones con GSAP
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Aseguramos visibilidad inicial
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          descriptionRef.current,
          ...cardsRef.current.filter(Boolean),
          footerRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Animación del header
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        // Animación de las cards con stagger
        .fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        )
        // Animación del footer
        .fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );

      // Hover animations para las cards
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const cardImage = card.querySelector(".card-image");
        const cardContent = card.querySelector(".card-content");
        const cardArrow = card.querySelector(".card-arrow");

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(
            card,
            {
              scale: 1.03,
              y: -8,
              boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
              duration: 0.4,
              ease: "power2.out",
            },
            0
          )
          .to(
            cardImage,
            {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
          .to(
            cardContent,
            {
              backgroundColor: "#f8f8f8",
              duration: 0.3,
              ease: "power2.out",
            },
            0
          )
          .to(
            cardArrow,
            {
              x: 5,
              color: "#50ff05",
              duration: 0.3,
              ease: "power2.out",
            },
            0
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());

        return () => {
          card.removeEventListener("mouseenter", () => hoverTl.play());
          card.removeEventListener("mouseleave", () => hoverTl.reverse());
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // Versión estática para SSR
  if (!mounted) {
    return (
      <section className="min-h-screen bg-white py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green rounded-full text-sm font-semibold mb-4">
              ✦ Lo que hacemos
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter font-ubuntu font-extrabold text-black mb-4">
              Servicios
            </h1>
            <p className="text-gray max-w-2xl mx-auto text-lg">
              Soluciones digitales personalizadas para llevar tu negocio al
              siguiente nivel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header con animaciones */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <motion.div
            ref={badgeRef}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-semibold tracking-wider border border-green/20">
              ✦ Lo que hacemos
            </span>
          </motion.div>

          {/* Título con gradiente */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter font-ubuntu font-extrabold"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-green bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>

          {/* Descripción */}
          <p
            ref={descriptionRef}
            className="text-gray max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Soluciones digitales personalizadas para llevar tu negocio al
            siguiente nivel. Cada proyecto es único y recibe atención especial.
          </p>
        </div>

        {/* Grid de servicios con animaciones */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {servicios.map((servicio, index) => (
            <Link
              href={`/Services/${servicio.id}`}
              key={servicio.id}
              className="block group focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 rounded-2xl"
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="card relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen con overlay */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={servicio.img}
                    alt={servicio.service}
                    fill
                    className="card-image object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Overlay gradient en hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Contenido */}
                <div className="card-content p-6 tracking-tighter bg-white transition-colors duration-300">
                  {/* Títulos */}
                  <h2 className="text-2xl sm:text-3xl font-ubuntu font-bold text-black mb-1 leading-tight">
                    {servicio.service}
                  </h2>

                  <h3 className="text-lg font-ubuntu text-green mb-3 font-semibold">
                    {servicio.title2}
                  </h3>

                  {/* Descripción corta */}
                  <p className="text-gray text-sm line-clamp-2 mb-4">
                    {servicio.intro}
                  </p>

                  {/* Línea decorativa */}
                  <div className="w-12 h-0.5 bg-green/30 rounded-full mb-4 group-hover:w-20 group-hover:bg-green transition-all duration-300" />

                  {/* Call to action */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-green transition-colors duration-300">
                      Ver detalles
                    </span>

                    <motion.div
                      className="card-arrow w-8 h-8 rounded-full bg-green/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "#50ff05" }}
                    >
                      <svg
                        className="w-4 h-4 text-green group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Badge de número de pasos */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-green rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer con CTA */}
        <div ref={footerRef} className="text-center mt-20">
          <p className="text-gray mb-6 text-lg">
            ¿No encuentras lo que buscas? Todos los proyectos son
            personalizados.
          </p>

          <Link
            href="/quote"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green to-green2 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-12 hover:shadow-xl hover:shadow-green/30"
          >
            <span className="relative z-10">Hablemos de tu proyecto</span>
            <svg
              className="absolute right-4 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            {/* Efecto hover */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageServices;
