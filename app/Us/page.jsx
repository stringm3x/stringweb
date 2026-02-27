"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const msvs = [
  {
    id: "1",
    title: "Misión",
    content:
      "Es transformar ideas en sitios web funcionales, visualmente impactantes y alineados con la esencia de cada negocio, ayudando a nuestros clientes a crecer en el mundo digital. Creemos que cada marca tiene una historia única que merece ser contada con autenticidad y creatividad.",
  },
  {
    id: "2",
    title: "Visión",
    content:
      "Queremos inspirar y evolucionar junto a quienes confían en nosotros. Soñamos con un entorno digital donde cada marca tenga una voz auténtica y poderosa. Visualizamos ser una empresa líder en diseño y desarrollo web en Latinoamérica, reconocida por nuestro enfoque humano, innovación constante y compromiso con el éxito de nuestros clientes.",
  },
];

const PageUs = () => {
  const [active, setActive] = useState("vision");
  const [isVisible, setIsVisible] = useState({});

  // Refs para animaciones
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const logoRef = useRef(null);
  const brandRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const missionVisionRef = useRef(null);
  const workRef = useRef(null);
  const commitmentRef = useRef(null);
  const cardsRef = useRef([]);

  // Animaciones de entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      // Hero animations
      tl.from(heroRef.current, {
        opacity: 0,
        y: 50,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            x: -50,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          brandRef.current,
          {
            opacity: 0,
            x: 50,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.1,
            duration: 1.2,
          },
          "-=0.4"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6"
        );

      // Scroll animations
      gsap.from(missionVisionRef.current, {
        scrollTrigger: {
          trigger: missionVisionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });

      gsap.from(workRef.current, {
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -50,
        duration: 1,
      });

      gsap.from(commitmentRef.current, {
        scrollTrigger: {
          trigger: commitmentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 50,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación de cambio entre misión/visión
  useEffect(() => {
    gsap.to(missionVisionRef.current, {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }, [active]);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-6 lg:px-8"
      >
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título principal */}
          <div ref={titleRef} className="text-center mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-ubuntu font-black tracking-tight">
              <span className="bg-clip-text text-transparent">
                NOSOTROS
              </span>
            </h1>
          </div>

          {/* Logo y marca */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
            <motion.div
              ref={logoRef}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
            >
              <Image
                src="/logo-s-white.png"
                alt="Logo STRING"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            <motion.h2
              ref={brandRef}
              whileHover={{ scale: 1.02 }}
              className="font-anton text-7xl md:text-8xl lg:text-9xl text-green leading-none"
            >
              STRING
            </motion.h2>
          </div>

          {/* Imagen principal */}
          <motion.div
            ref={imageRef}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12"
          >
            <Image
              src="/us2.png"
              alt="Equipo STRING"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" />
          </motion.div>

          {/* Descripción */}
          <motion.div
            ref={descriptionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-3xl mx-auto space-y-6 text-center"
          >
            <p className="text-lg md:text-xl text-gray leading-relaxed">
              En <span className="text-green-400 font-semibold">STRING</span>{" "}
              desarrollamos páginas web profesionales enfocadas en brindar una
              presencia digital sólida, clara y funcional para marcas y
              negocios.
            </p>

            <p className="text-lg md:text-xl text-gray leading-relaxed">
              STRING es un proyecto independiente liderado por un diseñador y
              desarrollador web que se encarga personalmente de cada etapa del
              proceso: desde el análisis inicial y el diseño, hasta el
              desarrollo y la entrega final.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section ref={missionVisionRef} className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-ubuntu font-bold">
              Nuestra <span className="text-green">Esencia</span>
            </h2>
            <p className="text-gray mt-4">
              Lo que nos define y hacia dónde vamos
            </p>
          </div>

          {/* Botones de selección */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive("mission")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                active === "mission"
                  ? "bg-green text-white shadow-lg shadow-green-500/30"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              Misión
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive("vision")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                active === "vision"
                  ? "bg-green text-white shadow-lg shadow-green-500/30"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              Visión
            </motion.button>
          </div>

          {/* Contenido con animación */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Imagen */}
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={active === "mission" ? "/mision2.png" : "/vision.png"}
                alt={active === "mission" ? "Misión STRING" : "Visión STRING"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Texto superpuesto para móvil */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                <h3 className="text-2xl font-bold text-green mb-2">
                  {active === "mission" ? "Nuestra Misión" : "Nuestra Visión"}
                </h3>
                <p className="text-white text-sm">
                  {active === "mission"
                    ? msvs[0].content.substring(0, 100) + "..."
                    : msvs[1].content.substring(0, 100) + "..."}
                </p>
              </div>
            </motion.div>

            {/* Texto para desktop */}
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-3xl font-bold text-green-400 mb-4">
                {active === "mission" ? "Nuestra Misión" : "Nuestra Visión"}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {active === "mission" ? msvs[0].content : msvs[1].content}
              </p>

              {/* Stats decorativas */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold text-green">5+</p>
                  <p className="text-sm text-gray">Años</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green">50+</p>
                  <p className="text-sm text-gray">Proyectos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green">100%</p>
                  <p className="text-sm text-gray">Dedicación</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestra Forma de Trabajo */}
      <section ref={workRef} className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-ubuntu font-bold leading-tight">
                NUESTRA <span className="text-green">FORMA</span>
                <br />
                DE <span className="text-green">TRABAJO</span>
              </h2>

              <div className="space-y-4 text-gray">
                <p className="text-lg leading-relaxed">
                  Cada proyecto inicia con el entendimiento del negocio, sus
                  objetivos y su público. A partir de esta información, se
                  desarrolla una solución a la medida, cuidando tanto la
                  estética como la funcionalidad del sitio.
                </p>
                <p className="text-lg leading-relaxed">
                  El enfoque es crear páginas web que no solo se vean bien, sino
                  que transmitan confianza y aporten valor real al negocio.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {["Análisis", "Diseño", "Desarrollo", "Lanzamiento"].map(
                  (item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-green rounded-full" />
                      <span className="text-white">{item}</span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* Contenido derecho */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:text-right"
            >
              <h2 className="text-4xl md:text-5xl font-ubuntu font-bold leading-tight">
                NUESTRO
                <br />
                <span className="text-green">COMPROMISO</span>
              </h2>

              <div className="space-y-4 text-gray">
                <p className="text-lg leading-relaxed">
                  En STRING trabajamos con responsabilidad, claridad y atención
                  al detalle. El objetivo es entregar soluciones digitales bien
                  estructuradas, duraderas y alineadas a las necesidades de cada
                  cliente.
                </p>
                <p className="text-lg leading-relaxed">
                  Si buscas una página web profesional que represente
                  correctamente tu marca y fortalezca tu presencia digital,
                  STRING puede ayudarte.
                </p>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:flex lg:justify-end pt-4"
              >
                <a
                  href="/Quote"
                  className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Hablemos de tu proyecto
                  <svg
                    className="w-5 h-5 ml-2"
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
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageUs;
