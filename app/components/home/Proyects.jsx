"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    src: "/proyects/evolutiongym.png",
    title: "Evolution GYM",
    category: "Gimnasio",
    description:
      "Sitio web para gimnasio en CDMX, enfocado en captación de nuevos miembros.",
    tags: ["Next.js", "WhatsApp", "Tailwind"],
  },
  {
    id: 2,
    src: "/proyects/pecadodecanela1.png",
    title: "Pecado de Canela",
    category: "Panadería",
    description:
      "Panadería artesanal con presencia digital enfocada en branding cálido y experiencia gastronómica.",
    tags: ["Next.js", "Menú Digital"],
  },
  {
    id: 3,
    src: "/proyects/yuma1.png",
    title: "Yuma",
    category: "E-commerce",
    description:
      "Proyecto digital enfocado en diseño minimalista y experiencia de usuario moderna para marca emergente.",
    tags: ["Next.js", "E-commerce"],
  },
];

const techStack = [
  { src: "/tecno/css.png", title: "CSS3" },
  { src: "/tecno/html.png", title: "HTML5" },
  { src: "/tecno/javascript.png", title: "JavaScript" },
  { src: "/tecno/react.png", title: "React" },
  { src: "/tecno/nextjs.png", title: "Next.js" },
  { src: "/tecno/tailwind.png", title: "Tailwind" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Proyects = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectsRef = useRef([]);
  const techRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(projectsRef.current.filter(Boolean), { opacity: 0, y: 30 });
      gsap.set(techRef.current.filter(Boolean), { opacity: 0, y: 16 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      // ── Header ──────────────────────────────────────────────────────────────
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: tagRef.current,
          start: REVEAL_START,
          once: true,
        },
      });

      tlHeader
        .to(tagRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );

      // ── Proyectos ───────────────────────────────────────────────────────────
      gsap.to(projectsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });

      // ── Tech stack ──────────────────────────────────────────────────────────
      gsap.to(techRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: techRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });

      // ── CTA ─────────────────────────────────────────────────────────────────
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: REVEAL_START,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-24 md:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Portafolio
            </span>
          </div>

          <h2
            ref={titleRef}
            className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter text-white uppercase"
          >
            Proyectos <span className="text-green">recientes</span>
          </h2>

          <p
            ref={descRef}
            className="text-gray text-lg leading-relaxed max-w-xl"
          >
            Sistemas reales, resultados medibles. Cada proyecto tiene una
            estructura diseñada para convertir — no para impresionar en
            Dribbble.
          </p>
        </div>

        {/* ── Grid de proyectos ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-px bg-white/5 mb-px">
          {/* Proyecto 1 — ocupa 2 columnas */}
          <div
            ref={(el) => (projectsRef.current[0] = el)}
            className="lg:col-span-2 relative h-[400px] lg:h-[520px] overflow-hidden group cursor-pointer bg-black"
          >
            <Image
              src={projects[0].src}
              alt={projects[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Info siempre visible */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-xs font-mono text-green uppercase tracking-widest">
                {projects[0].category}
              </span>
              <h3 className="font-anton text-3xl text-white mt-1 mb-2 leading-tight">
                {projects[0].title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                {projects[0].description}
              </p>
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {projects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-white/20 text-white/70 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/Proyects"
              className="absolute top-6 right-6 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-green hover:bg-green/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <FiExternalLink className="text-white text-sm" />
            </Link>
          </div>

          {/* Proyecto 2 */}
          <div
            ref={(el) => (projectsRef.current[1] = el)}
            className="relative h-[400px] lg:h-[520px] overflow-hidden group cursor-pointer bg-black"
          >
            <Image
              src={projects[1].src}
              alt={projects[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-xs font-mono text-green uppercase tracking-widest">
                {projects[1].category}
              </span>
              <h3 className="font-anton text-2xl text-white mt-1 mb-2 leading-tight">
                {projects[1].title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {projects[1].description}
              </p>
            </div>

            <Link
              href="/Proyects"
              className="absolute top-5 right-5 w-8 h-8 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-green hover:bg-green/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <FiExternalLink className="text-white text-xs" />
            </Link>
          </div>
        </div>

        {/* Proyecto 3 — ancho completo */}
        <div
          ref={(el) => (projectsRef.current[2] = el)}
          className="relative h-[300px] lg:h-[420px] overflow-hidden group cursor-pointer bg-black mb-20"
        >
          <Image
            src={projects[2].src}
            alt={projects[2].title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono text-green uppercase tracking-widest">
                {projects[2].category}
              </span>
              <h3 className="font-anton text-4xl text-white mt-1 mb-2 leading-tight">
                {projects[2].title}
              </h3>
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {projects[2].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-white/20 text-white/70 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/Proyects"
              className="w-10 h-10 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-green hover:bg-green/10 transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
            >
              <FiExternalLink className="text-white text-sm" />
            </Link>
          </div>
        </div>

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <div className="mb-20 border-t border-white/5 pt-16">
          <p className="text-xs font-mono text-gray uppercase tracking-[0.25em] text-center mb-10">
            Stack tecnológico
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                ref={(el) => (techRef.current[i] = el)}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 p-3 hover:border-green/30 hover:bg-white/10 transition-all duration-300">
                  <Image
                    src={tech.src}
                    alt={tech.title}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs text-gray font-mono group-hover:text-white transition-colors duration-200">
                  {tech.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center">
          <Link
            href="/Proyects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
          >
            Ver todos los proyectos
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Proyects;
