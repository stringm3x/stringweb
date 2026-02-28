"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "25+",
    label: "Proyectos entregados",
    description: "Sitios web y aplicaciones completadas con éxito",
    gradient: "from-green to-green2",
  },
  {
    value: "85%",
    label: "Retención de clientes",
    description: "Clientes que confían nuevamente en nosotros",
    gradient: "from-green2 to-green3",
  },
  {
    value: "+2",
    label: "Años de experiencia",
    description: "Creando experiencias digitales excepcionales",
    gradient: "from-green3 to-green4",
  },
];

const Content = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Configurar estado inicial para animación
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(statsRef.current.filter(Boolean), {
        opacity: 0,
        y: 40,
        scale: 0.9,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          statsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32 border-t-1 border-bg"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green2/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* TÍTULO */}
          <div ref={titleRef} className="space-y-0">
            <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-ubuntu font-black tracking-tight leading-none text-bg">
              DESARROLLO
            </h2>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
              <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-ubuntu font-black tracking-tight leading-none text-bg">
                DISEÑO
              </h2>
              <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-green">
                &
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none text-green">
                OPTIMIZACIÓN
              </h2>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div ref={descriptionRef} className="max-w-3xl">
            <div className="relative">
              <span className="absolute -top-6 -left-6 text-6xl text-green/20 select-none">
                "
              </span>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray leading-relaxed font-light relative z-10">
                En <span className="font-bold text-green">STRING</span>, nuestra
                experiencia radica en{" "}
                <span className="font-semibold text-bg">diseño web</span>,{" "}
                <span className="font-semibold text-bg">UI/UX</span>,{" "}
                <span className="font-semibold text-bg">SEO</span>, la creación
                de identidad de marca y la mejora de la visibilidad en línea.
              </p>

              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-green to-green2 rounded-full" />
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-white rounded-2xl shadow-lg border-2 border-green/30 p-6 lg:p-8"
              >
                <span className="absolute -top-2 -right-2 text-7xl font-black text-green/30 select-none">
                  {index + 1}
                </span>

                <p
                  className={`text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-black`}
                >
                  {stat.value}
                </p>

                <h3 className="text-lg lg:text-xl font-bold text-bg mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm text-gray opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </p>

                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="/quote"
              className="inline-flex items-center text-gray hover:text-green transition-colors group"
            >
              <span className="text-lg">¿Listo para comenzar?</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
