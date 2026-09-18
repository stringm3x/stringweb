"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiX } from "react-icons/fi";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { Cierre } from "@/app/components/ui/Cierre";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const desorden = [
  "Desorden en la comunicación",
  "Pérdida de prospectos",
  "Respuestas tardías",
  "Falta de seguimiento",
];

const queHace = [
  "Genera más mensajes de clientes interesados",
  "Organiza la captación de prospectos",
  "Reduce la pérdida de oportunidades",
  "Facilita el contacto con el negocio",
  "Automatiza procesos básicos de comunicación",
];

const noVendemos = [
  "Diseño visual sin estrategia",
  "Tecnología innecesaria",
  "Tendencias digitales sin impacto real",
  "Seguidores sin conversión",
  "Automatizaciones complejas sin objetivo",
];

const siVendemos = [
  "Estructura digital clara",
  "Optimización del proceso de contacto",
  "Páginas enfocadas en conversión",
  "Organización de prospectos",
  "Automatización básica del primer contacto",
  "Sistemas que convierten visitas en clientes",
];

const metodologia = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Análisis de redes sociales, claridad de servicios, proceso actual de contacto y flujo de captación existente.",
  },
  {
    step: "02",
    title: "Estructuración",
    desc: "Definición de propuesta de valor, estructura de página, flujo de conversión y llamados a la acción.",
  },
  {
    step: "03",
    title: "Desarrollo",
    desc: "Implementación de landing page, optimización mobile, integración de WhatsApp y automatizaciones.",
  },
  {
    step: "04",
    title: "Ajuste inicial",
    desc: "Pruebas de funcionamiento, revisión del flujo de contacto, ajustes de claridad y verificación técnica.",
  },
];

const valores = [
  "Pasión",
  "Colaboración",
  "Excelencia",
  "Compromiso",
  "Innovación",
  "Eficiencia",
];

// ─── Componente ───────────────────────────────────────────────────────────────
const PageUs = () => {
  const pageRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);
  const queEsRef = useRef(null);
  const noSiRef = useRef(null);
  const metodologiaRef = useRef(null);
  const valoresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [heroTagRef.current, heroTitleRef.current, heroDescRef.current, heroCtaRef.current],
        { opacity: 0, y: 24 }
      );

      const tlHero = gsap.timeline({ delay: 0.15 });
      tlHero
        .to(heroTagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .to(heroDescRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(heroCtaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");

      const sections = [queEsRef, noSiRef, metodologiaRef, valoresRef];
      sections.forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: REVEAL_START, once: true },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-black text-white overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-24 pt-32 pb-espacio-6 md:pb-espacio-7">
        <div className="max-w-5xl mx-auto">
          <div ref={heroTagRef} className="mb-8">
            <Etiqueta variante="linea">
              Agencia de sistemas digitales estratégicos
            </Etiqueta>
          </div>

          <h1
            ref={heroTitleRef}
            className="font-anton text-titular-l uppercase mb-8"
          >
            <span className="text-white">Somos</span>{" "}
            <span className="text-acido">STRING</span>
          </h1>

          <p
            ref={heroDescRef}
            className="text-tinta-suave text-cuerpo-l max-w-2xl mb-8"
          >
            Ayudamos a los negocios a transformar su presencia digital en un
            sistema estructurado de captación de clientes. No páginas web —{" "}
            <span className="text-white">sistemas que convierten.</span>
          </p>

          <div ref={heroCtaRef} className="flex flex-wrap gap-4">
            <Boton href="/cotizacion" variante="primario">
              Diagnosticar mi negocio
            </Boton>
            <Boton href="/servicios" variante="secundario">
              Ver sistemas
            </Boton>
          </div>
        </div>
      </section>

      {/* ── Qué es STRING ─────────────────────────────────────────────────── */}
      <section ref={queEsRef} className="py-espacio-6 lg:py-espacio-7 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <Etiqueta variante="linea">Qué es STRING</Etiqueta>
            <h2 className="font-anton text-titular-l text-white uppercase">
              Sistemas digitales <span className="text-acido">estratégicos</span>
            </h2>
            <p className="text-tinta-suave text-cuerpo">
              Muchos negocios dependen únicamente de redes sociales y mensajes
              directos para recibir clientes, lo que provoca desorden en la
              comunicación, pérdida de prospectos, respuestas tardías y falta
              de seguimiento.
            </p>
            <div className="divide-y divide-linea border-y border-linea">
              {desorden.map((item) => (
                <div key={item} className="flex items-center gap-3 py-3">
                  <FiX className="text-tinta-tenue flex-shrink-0" />
                  <span className="text-tinta-tenue text-cuerpo-s">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-tinta-suave text-cuerpo">
              STRING diseña{" "}
              <span className="text-white font-semibold">
                sistemas digitales
              </span>{" "}
              que organizan ese proceso y convierten visitas en clientes
              potenciales organizados.
            </p>
          </div>

          <div className="border border-linea p-8 space-y-4">
            <Etiqueta variante="linea" className="mb-2">
              Qué hace STRING
            </Etiqueta>
            <div className="divide-y divide-linea border-y border-linea">
              {queHace.map((item) => (
                <div key={item} className="flex items-start gap-3 py-3">
                  <span className="text-acido" aria-hidden="true">
                    —
                  </span>
                  <span className="text-tinta-suave text-cuerpo-s">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── No vendemos / Sí vendemos ─────────────────────────────────────── */}
      <section ref={noSiRef} className="py-espacio-6 lg:py-espacio-7 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono uppercase text-etiqueta text-tinta-tenue mb-4">
              No vendemos
            </p>
            <div className="divide-y divide-linea border-y border-linea">
              {noVendemos.map((item) => (
                <div key={item} className="flex items-start gap-3 py-4">
                  <span className="text-acido" aria-hidden="true">
                    —
                  </span>
                  <span className="text-tinta-tenue text-cuerpo-s">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono uppercase text-etiqueta text-acido mb-4">
              Sí vendemos
            </p>
            <div className="divide-y divide-linea border-y border-linea">
              {siVendemos.map((item) => (
                <div key={item} className="flex items-start gap-3 py-4">
                  <span className="text-acido" aria-hidden="true">
                    —
                  </span>
                  <span className="text-tinta text-cuerpo-s">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Metodología ───────────────────────────────────────────────────── */}
      <section ref={metodologiaRef} className="py-espacio-6 lg:py-espacio-7 px-6 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Etiqueta variante="linea">Metodología</Etiqueta>
          </div>
          <h2 className="font-anton text-titular-l text-white uppercase mb-espacio-6">
            Cómo <span className="text-acido">trabajamos</span>
          </h2>

          <div className="border-t border-linea">
            {metodologia.map((fase) => (
              <div key={fase.step} className="flex gap-6 py-6 border-b border-linea">
                <span className="font-mono text-acido text-etiqueta flex-shrink-0">
                  {fase.step}
                </span>
                <div>
                  <h3 className="font-anton uppercase text-titular-m text-white mb-1">
                    {fase.title}
                  </h3>
                  <p className="text-tinta-suave text-cuerpo-s">{fase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono uppercase text-etiqueta text-tinta-tenue">
            STRING no entrega páginas web. Entrega sistemas funcionales de
            captación de clientes.
          </p>
        </div>
      </section>

      {/* ── Valores ───────────────────────────────────────────────────────── */}
      <section ref={valoresRef} className="py-espacio-6 lg:py-espacio-7 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-espacio-6">
            <h2 className="font-anton text-titular-l text-white uppercase">
              Nuestros <span className="text-acido">valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-linea">
            {valores.map((valor) => (
              <div
                key={valor}
                className="border-b border-r border-linea p-6 text-center"
              >
                <span className="font-mono uppercase text-etiqueta text-tinta-suave">
                  {valor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cierre
        ctaTexto="Solicitar diagnóstico"
        ctaHref="/cotizacion"
        nota="Respuesta en 24 h · Sin compromiso"
      />
    </main>
  );
};

export default PageUs;
