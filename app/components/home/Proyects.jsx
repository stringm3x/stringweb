"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";

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
    // YUMA sigue en desarrollo y no se muestra; este es el siguiente
    // proyecto de /proyectos que no estaba ya en la home.
    id: 3,
    src: "/proyects/alba&aguilar.png",
    title: "ALBA AGUILAR",
    category: "Construcción",
    description:
      "Empresa de construcción especializada en desarrollos residenciales y proyectos arquitectónicos de alto nivel en México.",
    tags: ["Landing Page"],
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const Proyects = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(projectsRef.current.filter(Boolean), { opacity: 0, y: 30 });
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
            <Etiqueta conPunto>Portafolio</Etiqueta>
          </div>

          <h2
            ref={titleRef}
            className="font-anton text-titular-l text-white uppercase"
          >
            Proyectos <span className="text-acido">recientes</span>
          </h2>

          <p
            ref={descRef}
            className="text-tinta-suave text-cuerpo-l max-w-xl"
          >
            Sistemas reales, resultados medibles. Cada proyecto tiene una
            estructura diseñada para convertir — no para impresionar en
            Dribbble.
          </p>
        </div>

        {/* ── Grid de proyectos ─────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (projectsRef.current[i] = el)}
              className="flex flex-col bg-fondo-elevado border border-linea"
            >
              <div className="relative h-[280px] lg:h-[360px] overflow-hidden bg-black">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <Etiqueta variante="texto">{project.category}</Etiqueta>
                <h3 className="font-anton text-titular-m text-white uppercase">
                  {project.title}
                </h3>
                <p className="flex-1 text-cuerpo-s text-tinta-suave">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-linea font-mono uppercase text-etiqueta text-tinta-tenue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Boton href="/proyectos" variante="texto" className="self-start">
                  Ver proyecto
                  <FiExternalLink className="w-3.5 h-3.5" />
                </Boton>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center">
          <Boton href="/proyectos" variante="primario">
            Ver todos los proyectos
            <FiArrowRight className="w-4 h-4" />
          </Boton>
          <p className="mt-4 font-mono uppercase text-etiqueta text-tinta-tenue">
            Construido con Next.js, TypeScript y Supabase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Proyects;
