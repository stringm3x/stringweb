"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Diseño UI/UX",
    content: "Interfaz amigable y moderna para tus usuarios.",
    benefits: [
      "Experiencia de usuario intuitiva",
      "Diseño responsive",
      "Prototipos interactivos",
      "Pruebas de usabilidad",
    ],
    gradient: "from-purple-500 to-pink-500",
    icon: "🎨",
  },
  {
    title: "Desarrollo Web",
    content: "Sitios rápidos, accesibles y funcionales.",
    benefits: [
      "Código optimizado",
      "Arquitectura escalable",
      "Integración con APIs",
      "SEO-friendly",
    ],
    gradient: "from-blue-500 to-cyan-500",
    icon: "💻",
  },
  {
    title: "Optimización SEO",
    content: "Haz que te encuentren en Google.",
    benefits: [
      "Palabras clave estratégicas",
      "Optimización on-page",
      "Link building",
      "Análisis de competencia",
    ],
    gradient: "from-green-500 to-emerald-500",
    icon: "🚀",
  },
  {
    title: "Pruebas y mantenimiento",
    content: "Nos aseguramos de que todo funcione bien.",
    benefits: [
      "Testing continuo",
      "Backups automáticos",
      "Actualizaciones regulares",
      "Soporte 24/7",
    ],
    gradient: "from-orange-500 to-red-500",
    icon: "🔧",
  },
  {
    title: "Adaptabilidad Mobile",
    content: "Diseño responsivo para todos los dispositivos.",
    benefits: [
      "Mobile-first approach",
      "Optimización de velocidad",
      "Touch-friendly interfaces",
      "Cross-device testing",
    ],
    gradient: "from-indigo-500 to-purple-500",
    icon: "📱",
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Refs para animaciones de entrada
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  // Animaciones de entrada SOLO para elementos que NO son el acordeón
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Badge
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      })
        // Título principal (animación por partes)
        .from(
          titleRef.current?.children || [],
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // Descripción
        .from(
          ".description-text",
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // Botón CTA
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Stats
        .from(
          statsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 md:py-32 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-semibold uppercase tracking-wider"
          >
            Nuestros Servicios
          </span>

          {/* Título */}
          <div ref={titleRef} className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-bg">
              POTENCIA TUS
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight bg-gradient-to-r from-green to-green2 bg-clip-text text-transparent">
              RESULTADOS
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight text-bg">
              COMERCIALES.
            </h1>
          </div>

          {/* Descripción */}
          <p className="description-text text-lg md:text-xl text-black max-w-2xl mx-auto">
            Soluciones integrales diseñadas para llevar tu negocio al siguiente
            nivel
          </p>
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="text-center mb-20">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green to-green2 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-12 hover:shadow-xl">
            <span className="relative z-10">Conoce nuestros servicios</span>
            <FiArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Accordion - SIN ANIMACIÓN DE ENTRADA, SOLO ANIMACIÓN AL ABRIR */}
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient border on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    item.gradient
                  } rounded-2xl transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ padding: "2px" }}
                />

                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <h3
                          className={`text-xl md:text-3xl font-bold transition-colors duration-300 ${
                            isOpen ? "text-green" : "text-bg"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray text-sm md:text-base mt-1">
                          {item.content}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-green to-green2 text-white"
                          : "bg-gray text-white"
                      }`}
                    >
                      {isOpen ? <FiMinus /> : <FiPlus />}
                    </motion.div>
                  </button>

                  {/* Content - SOLO ANIMACIÓN AL ABRIR */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <FiCheckCircle
                                  className={`text-green text-sm md:text-base flex-shrink-0`}
                                />
                                <span className="text-black text-sm md:text-base">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA dentro del acordeón */}
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <a
                              href="/quote"
                              className={`inline-flex items-center text-sm font-medium text-gray t hover:opacity-80 transition-opacity`}
                            >
                              Más información sobre {item.title}
                              <FiArrowRight className="ml-2" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-gray-200">
          {[
            { value: "50+", label: "Proyectos completados" },
            { value: "95%", label: "Clientes satisfechos" },
            { value: "24/7", label: "Soporte continuo" },
            { value: "5+", label: "Años de experiencia" },
          ].map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-black text-green">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
