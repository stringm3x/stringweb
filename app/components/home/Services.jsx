"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiPlus, FiMinus, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const items = [
  {
    title: "SISTEMA DE CONVERSIÓN",
    subtitle: "Nivel 1",
    metric: "Desde $8,000",
    content:
      "Transformamos tu presencia digital en un sistema que genera clientes reales de manera consistente.",
    benefits: [
      "Diagnóstico completo de presencia digital",
      "Estructura estratégica de oferta",
      "Landing page optimizada",
      "Integración con WhatsApp",
      "Formulario básico de contacto",
      "Mensaje automático preconfigurado",
    ],
  },
  {
    title: "SISTEMA DE CAPTACIÓN",
    subtitle: "Nivel 2",
    metric: "Desde $18,000",
    content:
      "Evita que los clientes interesados se pierdan y organiza tus prospectos automáticamente.",
    benefits: [
      "Todo el Nivel 1",
      "Captura automática de leads",
      "Registro organizado de prospectos",
      "Calificación inicial por preguntas",
      "Notificaciones por correo",
      "Integración con Notion / Sheets / Airtable",
    ],
  },
  {
    title: "SISTEMA AUTOMATIZADO",
    subtitle: "Nivel 3",
    metric: "Desde $28,000",
    content:
      "Crea un sistema digital que trabaja incluso cuando tu negocio no está disponible.",
    benefits: [
      "Todo el Nivel 2",
      "Respuesta automática inmediata",
      "Agenda de citas automatizada",
      "Seguimiento automático post-contacto",
      "Recordatorios de citas",
      "Panel de gestión de prospectos",
    ],
  },
  {
    title: "SISTEMA ESPECIALIZADO",
    subtitle: "Nivel 4",
    metric: "Desde $40,000",
    content:
      "Desarrollamos sistemas digitales personalizados para negocios que necesitan algo más avanzado.",
    benefits: [
      "Todo el Nivel 3",
      "Desarrollo a medida según negocio",
      "CRM personalizado",
      "Automatizaciones avanzadas",
      "Paneles de control internos",
      "Integraciones con APIs externas",
    ],
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
const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set([tagRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 });
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

      // ── Cards ───────────────────────────────────────────────────────────────
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-espacio-6 lg:py-espacio-7 overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-16 space-y-6">
          <div ref={tagRef}>
            <Etiqueta conPunto>Los 4 sistemas</Etiqueta>
          </div>

          <h2
            ref={titleRef}
            className="font-anton text-titular-l text-white uppercase"
          >
            Elige tu nivel <span className="text-acido">de sistema</span>
          </h2>

          <p ref={descRef} className="text-tinta-suave text-cuerpo max-w-xl">
            Cuatro niveles de automatización para cada etapa de tu negocio. Cada
            sistema incluye el anterior — siempre puedes escalar.
          </p>
        </div>

        {/* ── Acordeones ────────────────────────────────────────────────────── */}
        <div className="border-y border-linea divide-y divide-linea">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
                {/* Trigger */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors duration-200 hover:bg-fondo-elevado/50"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-3 flex-wrap mb-0.5">
                      <span className="font-mono uppercase text-etiqueta text-tinta-tenue">
                        {item.subtitle}
                      </span>
                      <span className="font-mono text-dato text-acido">
                        {item.metric}
                      </span>
                    </div>
                    <h3
                      className={`font-anton text-titular-m transition-colors duration-200 ${
                        isOpen ? "text-acido" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-acido bg-acido text-black"
                        : "border-linea text-tinta-tenue"
                    }`}
                  >
                    {isOpen ? (
                      <FiMinus className="text-sm" />
                    ) : (
                      <FiPlus className="text-sm" />
                    )}
                  </div>
                </button>

                {/* Contenido expandible */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-linea">
                    <p className="text-tinta-suave text-cuerpo-s mt-6 mb-6">
                      {item.content}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {item.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <FiCheckCircle className="text-acido text-sm mt-0.5 flex-shrink-0" />
                          <span className="text-tinta-suave text-cuerpo-s">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Boton href="/cotizacion" variante="texto">
                      Solicitar diagnóstico
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Boton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Planes de continuidad ────────────────────────────────────────── */}
        <div className="mt-16">
          <Etiqueta variante="texto">Planes de continuidad</Etiqueta>
          <p className="mt-2 text-tinta-suave text-cuerpo max-w-xl mb-6">
            Tu sistema no termina el día de la entrega. Un plan de
            continuidad lo mantiene funcionando y, según el plan, lo optimiza
            cada mes.
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

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="mt-16 text-center space-y-4">
          <Boton href="/cotizacion" variante="primario">
            Diagnosticar mi negocio
            <FiArrowRight className="w-4 h-4" />
          </Boton>
          <p className="font-mono uppercase text-etiqueta text-tinta-tenue">
            Descubre qué nivel necesita tu negocio · Respuesta en 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
