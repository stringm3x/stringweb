"use client";

import React, { useState, useEffect, useRef } from "react";
import servicios from "../data";
import { notFound } from "next/navigation";
import { FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { Cierre } from "@/app/components/ui/Cierre";
import { MarcasRegistro } from "@/app/components/ui/MarcasRegistro";
import { Telefono } from "@/app/components/ilustraciones/Telefono";
import { Libreta } from "@/app/components/ilustraciones/Libreta";
import { Reloj } from "@/app/components/ilustraciones/Reloj";
import { Tablero } from "@/app/components/ilustraciones/Tablero";

gsap.registerPlugin(ScrollTrigger);

const ILUSTRACIONES = {
  1: Telefono,
  2: Libreta,
  3: Reloj,
  4: Tablero,
};

// ─── Componente ───────────────────────────────────────────────────────────────
const ServicePage = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id === params.id);

  if (!servicio) return notFound();

  const [openIndex, setOpenIndex] = useState(null);

  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const incluyeRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(
        [tagRef.current, titleRef.current, imageRef.current, infoRef.current],
        { opacity: 0, y: 24 }
      );
      gsap.set(incluyeRef.current.filter(Boolean), { opacity: 0, y: 16 });

      // ── Entrada ─────────────────────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(tagRef.current, {
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
          imageRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          infoRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );

      gsap.to(incluyeRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: incluyeRef.current[0],
          start: REVEAL_START,
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-black py-espacio-6 lg:py-espacio-7 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      >
      <div className="relative max-w-6xl mx-auto">
        {/* ── Botón volver ──────────────────────────────────────────────────── */}
        <div className="mb-10">
          <Boton href="/servicios" variante="texto">
            <FiArrowLeft className="w-3.5 h-3.5" />
            Volver a Servicios
          </Boton>
        </div>

        {/* ── Tag + título ──────────────────────────────────────────────────── */}
        <div ref={tagRef} className="flex flex-wrap items-center gap-3 mb-8">
          <Etiqueta variante="linea">
            LÁMINA {servicio.id.padStart(2, "0")} / 04
          </Etiqueta>
        </div>

        <div className="flex flex-wrap items-baseline gap-4 mb-12">
          <h1
            ref={titleRef}
            className="font-anton text-titular-l text-white uppercase"
          >
            {servicio.service}
          </h1>
          <span className="font-mono text-dato text-acido">
            {servicio.metric}
          </span>
        </div>

        {/* ── Grid principal ────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Bloque acido con la ilustración del nivel */}
          <div
            ref={imageRef}
            className="relative h-[240px] lg:h-[500px] overflow-hidden bg-black"
          >
            {(() => {
              const Ilustracion = ILUSTRACIONES[servicio.id];
              return <Ilustracion className="w-full h-full" />;
            })()}
            <MarcasRegistro />
          </div>

          {/* Info */}
          <div ref={infoRef} className="bg-black p-8 md:p-10 space-y-6">
            <p className="text-tinta-suave text-cuerpo">{servicio.intro}</p>

            {/* Objetivo */}
            <div className="border border-linea p-6 space-y-3">
              <Etiqueta variante="linea">Objetivo</Etiqueta>
              <p className="text-white text-cuerpo-s">{servicio.objetivo}</p>
              <div className="pt-2 border-t border-linea">
                <p className="font-mono uppercase text-etiqueta text-tinta-tenue mb-1">
                  Ideal para
                </p>
                <p className="text-tinta-suave text-cuerpo-s">
                  {servicio.ideal}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Descripción ───────────────────────────────────────────────────── */}
        <div className="border border-linea p-8 md:p-10 mb-6">
          <p className="text-tinta-suave text-cuerpo max-w-3xl">
            {servicio.p}
          </p>
        </div>

        {/* ── Qué incluye ───────────────────────────────────────────────────── */}
        <div className="border border-linea p-8 md:p-10 mb-16">
          <Etiqueta variante="linea" className="mb-6">
            Qué incluye este sistema
          </Etiqueta>
          <div className="divide-y divide-linea border-y border-linea">
            {servicio.incluye.map((item, index) => (
              <div
                key={index}
                ref={(el) => (incluyeRef.current[index] = el)}
                className="flex items-start gap-3 py-espacio-2"
              >
                <span className="text-acido" aria-hidden="true">
                  —
                </span>
                <span className="text-tinta-suave text-cuerpo-s">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Preguntas frecuentes ─────────────────────────────────────────── */}
        <div className="border border-linea p-8 md:p-10 mb-16">
          <Etiqueta variante="linea" className="mb-6">
            Preguntas frecuentes
          </Etiqueta>
          <div className="divide-y divide-linea border-y border-linea">
            {servicio.faqs?.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors duration-200 hover:bg-fondo-elevado/50"
                  >
                    <span className="text-cuerpo text-tinta pr-8">
                      {item.title}
                    </span>
                    <div
                      className={`w-7 h-7 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "border-acido bg-acido text-black"
                          : "border-linea text-tinta-tenue"
                      }`}
                    >
                      {isOpen ? (
                        <FiMinus className="text-xs" />
                      ) : (
                        <FiPlus className="text-xs" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 border-t border-linea">
                      <p className="text-tinta-suave text-cuerpo-s pt-4">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>

      <Cierre
        ctaTexto="Solicitar diagnóstico"
        ctaHref="/cotizacion"
        nota="Respuesta en 24 h · Sin compromiso"
      />
    </>
  );
};

export default ServicePage;
