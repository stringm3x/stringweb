"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import servicios from "./data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";
import { Cierre } from "@/app/components/ui/Cierre";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";
import { Telefono } from "@/app/components/ilustraciones/Telefono";
import { Libreta } from "@/app/components/ilustraciones/Libreta";
import { Reloj } from "@/app/components/ilustraciones/Reloj";
import { Tablero } from "@/app/components/ilustraciones/Tablero";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const LAMINAS = [
  {
    id: "1",
    Ilustracion: Telefono,
    puntos: ["Landing que convierte", "WhatsApp integrado", "Respuesta automática"],
  },
  {
    id: "2",
    Ilustracion: Libreta,
    puntos: ["Captura de prospectos", "Registro y calificación", "Aviso de cada nuevo"],
  },
  {
    id: "3",
    Ilustracion: Reloj,
    puntos: ["Agenda automática", "Seguimiento sin ti", "Panel de prospectos"],
  },
  {
    id: "4",
    Ilustracion: Tablero,
    puntos: ["Desarrollo a medida", "CRM propio", "Paneles internos"],
  },
];

const continuidad = [
  {
    nombre: "Base",
    precio: "$1,800–$2,500/mes",
    incluye: "Hosting, mantenimiento y soporte",
  },
  {
    nombre: "Crecimiento",
    precio: "$3,000–$4,500/mes",
    incluye: "Optimización mensual y ajustes",
  },
  {
    nombre: "Escalamiento",
    precio: "$5,000–$8,000/mes",
    incluye: "Análisis, mejoras y soporte prioritario",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const PageServices = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, descRef.current], { opacity: 0, y: 24 });
      gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      const tlHeader = gsap.timeline({
        scrollTrigger: { trigger: tagRef.current, start: REVEAL_START, once: true },
      });
      tlHeader
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.4");

      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: REVEAL_START, once: true },
      });

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: REVEAL_START, once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-black px-6 lg:px-24 pt-32 md:pt-40 pb-espacio-6 lg:pb-espacio-7"
      >
        <div className="max-w-6xl mx-auto">
          {/* ── Header de la página ─────────────────────────────────────────── */}
          <div className="mb-espacio-6 space-y-6">
            <div ref={tagRef}>
              <Etiqueta variante="linea">Sistemas de conversión</Etiqueta>
            </div>

            <div>
              <TitularBrochada lineas={["Servicios", "estratégicos"]} retraso={0.25} />
            </div>

            <p ref={descRef} className="text-tinta-suave text-cuerpo max-w-xl">
              No vendemos páginas. Implementamos sistemas digitales diseñados
              para convertir visitas en clientes reales.
            </p>
          </div>

          {/* ── Láminas ───────────────────────────────────────────────────── */}
          <div className="mb-6">
            <Etiqueta variante="linea">Sistemas a medida · serie de 4</Etiqueta>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
            <h2 className="font-anton uppercase text-white text-[64px] leading-[60px] md:text-[68px] md:leading-[64px]">
              Elige tu nivel
            </h2>
            <p className="hidden md:block text-tinta-tenue text-cuerpo">
              Cada nivel incluye el anterior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LAMINAS.map(({ id, Ilustracion, puntos }, index) => {
              const servicio = servicios.find((s) => s.id === id);
              const destacada = id === "3";
              return (
                <div key={id} ref={(el) => (cardsRef.current[index] = el)}>
                  <Link href={`/servicios/${id}`} className="block h-full">
                    <div
                      className={`flex h-full flex-col border ${
                        destacada ? "border-acido shadow-acido" : "border-linea"
                      }`}
                    >
                      <div className="h-[200px]">
                        <Ilustracion className="h-full w-full" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span
                          className={`mb-3 font-mono uppercase text-etiqueta ${
                            destacada ? "text-acido" : "text-tinta-tenue"
                          }`}
                        >
                          {destacada
                            ? `LÁMINA 0${id} / 04 · RECOMENDADO`
                            : `LÁMINA 0${id} / 04`}
                        </span>
                        <h3 className="font-anton uppercase text-[30px] leading-tight text-white mb-2">
                          {servicio.service}
                        </h3>
                        <p className="font-mono text-dato text-acido mb-4">
                          {servicio.metric}
                        </p>
                        <ul className="mt-auto divide-y divide-linea border-t border-linea">
                          {puntos.map((punto) => (
                            <li
                              key={punto}
                              className="py-2 text-[14px] leading-snug text-tinta-suave"
                            >
                              {punto}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <div
            ref={ctaRef}
            className="mt-espacio-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Boton href="/cotizacion" variante="primario">
              Diagnosticar mi negocio
            </Boton>
            <p className="font-mono uppercase text-etiqueta text-tinta-tenue">
              Te decimos qué nivel necesitas · 24 h
            </p>
          </div>

          {/* ── Planes de continuidad ────────────────────────────────────────── */}
          <div className="mt-espacio-7">
            <Etiqueta variante="linea">Planes de continuidad</Etiqueta>
            <p className="mt-4 text-tinta-suave text-cuerpo max-w-xl mb-6">
              Tu sistema no termina el día de la entrega. Un plan de
              continuidad lo mantiene funcionando y, según el plan, lo
              optimiza cada mes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {continuidad.map((plan) => (
                <TarjetaSistema
                  key={plan.nombre}
                  kicker="CONTINUIDAD"
                  precio={plan.precio}
                  titulo={plan.nombre}
                  frase={plan.incluye}
                />
              ))}
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

export default PageServices;
