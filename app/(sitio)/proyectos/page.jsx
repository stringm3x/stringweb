"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
import { FiX, FiExternalLink } from "react-icons/fi";
import { proyects } from "./data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Cierre } from "@/app/components/ui/Cierre";
import { Boton } from "@/app/components/ui/Boton";
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

    const tl = gsap.timeline();

    tl.to(expandedRef.current, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.8,
      ease: "power3.inOut",
    });

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

      {/* ── Ficha expandida ───────────────────────────────────────────────── */}
      {activeProject && (
        <div
          ref={expandedRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.id}
          className="fixed flex flex-col overflow-hidden bg-fondo"
          style={{ zIndex: 100 }}
        >
          <div className="relative h-[46vh] flex-shrink-0 border-b border-linea md:h-[56vh]">
            <Image
              src={activeProject.img}
              alt={activeProject.id}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <div
            ref={textRef}
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-8 md:px-16 md:py-10"
          >
            <span className="font-mono uppercase text-etiqueta text-acido">
              {activeProject.title}
            </span>
            <h2 className="font-anton uppercase text-titular-l text-tinta md:text-titular-xl">
              {activeProject.id}
            </h2>
            <p className="max-w-2xl text-cuerpo text-tinta-suave">{activeProject.info}</p>
            <div className="mt-auto pt-4">
              <Boton href={activeProject.href} variante="primario">
                Visitar sitio
                <FiExternalLink className="h-4 w-4" aria-hidden="true" />
              </Boton>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCard}
            aria-label="Cerrar"
            className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-linea bg-fondo-elevado text-acido transition-colors duration-200 hover:border-acido"
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
