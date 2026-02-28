"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    src: "/design/joyeria.png",
    title: "Joyería Caelora",
    category: "E-commerce",
    description: "Diseño y desarrollo de tienda online para joyería premium",
    gradient: "from-purple-500 to-pink-500",
    tags: ["React", "Next.js", "Stripe"],
  },
  {
    id: 2,
    src: "/design/restuarante.png",
    title: "Sushi Sensation",
    category: "Restaurante",
    description: "Menú digital interactivo con diseño moderno",
    gradient: "from-orange-500 to-red-500",
    tags: ["Framer", "Interactive", "UI/UX"],
  },
  {
    id: 3,
    src: "/design/ropa.png",
    title: "GARM",
    category: "Moda",
    description: "Tienda online con enfoque en experiencia de compra rápida",
    gradient: "from-green-500 to-emerald-500",
    tags: ["E-commerce", "Shopify", "Custom"],
  },
];

const techStack = [
  { src: "/tecno/css.png", title: "CSS3", level: "Avanzado" },
  { src: "/tecno/html.png", title: "HTML5", level: "Avanzado" },
  { src: "/tecno/javascript.png", title: "JavaScript", level: "Avanzado" },
];

const Proyects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const projectsRef = useRef([]);
  const techRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          projectsRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        )
        .from(
          techRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-20 md:py-32 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-green/10 text-green rounded-full text-sm font-semibold uppercase tracking-wider">
            Portafolio
          </span>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-ubuntu font-black tracking-tight"
          >
            <span className="text-white">
              PROYECTOS
            </span>
          </h1>

          <h2
            ref={subtitleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-green"
          >
            RECIENTES
          </h2>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray max-w-3xl mx-auto"
          >
            Así es como transformamos tu visión en un diseño y una estrategia
            bien desarrollada. Cada proyecto es único y está optimizado para
            resultados excepcionales.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {/* Proyecto Principal - Joyería (ocupa 2 columnas) */}
          <div
            ref={(el) => (projectsRef.current[0] = el)}
            className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredProject(0)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Image
              src={projects[0].src}
              alt={projects[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Contenido Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span
                className={`inline-block px-3 py-1 bg-gradient-to-r ${projects[0].gradient} text-white text-xs font-semibold rounded-full mb-3`}
              >
                {projects[0].category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">
                {projects[0].title}
              </h3>
              <p className="text-white/80 mb-4">{projects[0].description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {projects[0].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/20 rounded text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/Proyects"
                className="absolute top-8 right-8 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <FiExternalLink className="text-white text-xl" />
              </Link>
            </div>
          </div>

          {/* Proyecto Restaurante */}
          <div
            ref={(el) => (projectsRef.current[1] = el)}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredProject(1)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Image
              src={projects[1].src}
              alt={projects[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span
                className={`inline-block px-3 py-1 bg-gradient-to-r ${projects[1].gradient} text-white text-xs font-semibold rounded-full mb-2`}
              >
                {projects[1].category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-1">
                {projects[1].title}
              </h3>
              <p className="text-white/80 text-sm mb-3">
                {projects[1].description}
              </p>

              <Link
                href={`/Proyects/${projects[1].id}`}
                className="absolute top-6 right-6 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <FiExternalLink className="text-white text-sm" />
              </Link>
            </div>
          </div>

          {/* Proyecto Ropa */}
          <div
            ref={(el) => (projectsRef.current[2] = el)}
            className="lg:col-span-3 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredProject(2)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Image
              src={projects[2].src}
              alt={projects[2].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span
                className={`inline-block px-3 py-1 bg-gradient-to-r ${projects[2].gradient} text-white text-xs font-semibold rounded-full mb-3`}
              >
                {projects[2].category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">
                {projects[2].title}
              </h3>
              <p className="text-white/80 mb-4">{projects[2].description}</p>

              <div className="flex flex-wrap gap-2">
                {projects[2].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/20 rounded text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/Proyects/${projects[2].id}`}
                className="absolute top-8 right-8 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <FiExternalLink className="text-white text-xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h3 className="text-2xl font-ubuntu font-bold text-center mb-8 text-white">
            Tecnologías que utilizamos
          </h3>

          <div className="flex flex-wrap justify-center gap-8 items-center">
            {techStack.map((tech, index) => (
              <div
                key={index}
                ref={(el) => (techRef.current[index] = el)}
                className="group relative flex flex-col items-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Image
                    src={tech.src}
                    alt={tech.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-gray">
                  {tech.title}
                </span>
                <span className="text-xs text-green opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/Proyects">
            <button className="group relative inline-flex items-center px-8 py-4 bg-green text-bg font-bold rounded-full overflow-hidden transition-all duration-300 hover:pr-12 hover:shadow-xl">
              <span className="relative z-10">Ver todos los proyectos</span>
              <FiArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300" />

              {/* Efecto hover */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Proyects;
