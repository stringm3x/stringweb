"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
import { FiX, FiExternalLink } from "react-icons/fi";
import { proyects } from "./data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Cierre } from "@/app/components/ui/Cierre";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

// YUMA sigue en desarrollo: no se muestra en el sitio, pero sus datos e
// imágenes se quedan intactos en ./data para cuando se lance.
const proyectosVisibles = proyects.filter((p) => p.id !== "YUMA");

// ─── Componente ───────────────────────────────────────────────────────────────
const PageProyects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardRefs = useRef([]);
  const expandedRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const tagRef = useRef(null);

  // ── Animación de entrada ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(tagRef.current, { opacity: 0, y: 24 });
      gsap.set(cardRefs.current.filter(Boolean), { opacity: 0, y: 30 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          cardRefs.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "+=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Animación expand ────────────────────────────────────────────────────────
  useEffect(() => {
    if (
      !activeProject ||
      selectedCard === null ||
      !cardRefs.current[selectedCard]
    )
      return;

    const cardElement = cardRefs.current[selectedCard];
    const rect = cardElement.getBoundingClientRect();

    gsap.set(expandedRef.current, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 100,
    });

    gsap.set(overlayRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    tl.to(expandedRef.current, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.8,
      ease: "power3.inOut",
    });

    tl.to(overlayRef.current, { opacity: 0.9, duration: 0.5 }, "-=0.4");

    if (textRef.current) {
      const split = new SplitType(textRef.current, { types: "lines" });
      tl.from(
        split.lines,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3"
      );
      return () => split.revert();
    }
  }, [activeProject, selectedCard]);

  // ── Close expand ────────────────────────────────────────────────────────────
  const closeCard = () => {
    if (selectedCard === null || !cardRefs.current[selectedCard]) return;

    const cardElement = cardRefs.current[selectedCard];
    const rect = cardElement.getBoundingClientRect();

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
        setSelectedCard(null);
      },
    });

    tl.to(textRef.current, { opacity: 0, duration: 0.2 });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
    tl.to(
      expandedRef.current,
      {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.1"
    );
  };

  const handleProjectClick = (item, index) => {
    setActiveProject(item);
    setSelectedCard(index);
  };

  return (
    <>
    <section
      ref={sectionRef}
      className="bg-black min-h-screen px-6 lg:px-24 py-espacio-6 lg:py-espacio-7 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-espacio-6 space-y-6">
          <div ref={tagRef}>
            <Etiqueta variante="linea">Portafolio</Etiqueta>
          </div>

          <div>
            <TitularBrochada lineas={["Nuestros", "proyectos"]} retraso={0.25} />
          </div>
        </div>

        {/* ── Grid de proyectos ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectosVisibles.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => handleProjectClick(item, index)}
              className="flex cursor-pointer flex-col border border-linea bg-fondo-elevado"
            >
              <div className="relative h-[240px] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.id}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="font-mono uppercase text-etiqueta text-tinta-tenue">
                  {`PROYECTO ${String(index + 1).padStart(2, "0")} / ${String(
                    proyectosVisibles.length
                  ).padStart(2, "0")}`}
                </span>
                <h3 className="font-anton text-titular-m text-white uppercase">
                  {item.id}
                </h3>
                <p className="text-cuerpo-s text-tinta-suave">{item.title}</p>
                <span className="mt-auto font-mono uppercase text-etiqueta text-tinta-tenue">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expanded Card ─────────────────────────────────────────────────── */}
      {activeProject && (
        <div
          ref={expandedRef}
          className="fixed overflow-hidden"
          style={{ zIndex: 100 }}
        >
          <Image
            src={activeProject.img}
            alt={activeProject.id}
            fill
            className="object-cover"
            priority
          />

          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black"
            style={{ opacity: 0 }}
          />

          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 md:px-16 space-y-6 z-10 overflow-y-auto py-12"
          >
            <span className="font-mono text-etiqueta text-green uppercase tracking-[0.3em]">
              {activeProject.title}
            </span>

            <h2 className="font-anton text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              {activeProject.id}
            </h2>

            <p className="max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
              {activeProject.info}
            </p>

            <a
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Visitar sitio
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <button
            onClick={closeCard}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-fondo-elevado border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-white z-20"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      )}
    </section>

      <Cierre
        ctaTexto="Solicitar diagnóstico"
        ctaHref="/cotizacion"
        nota="Respuesta en 24 h · Sin compromiso"
      />
    </>
  );
};

export default PageProyects;
