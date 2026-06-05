"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import servicios from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Componente ───────────────────────────────────────────────────────────────
const ServicePage = ({ params: paramsPromise }) => {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const servicio = servicios.find((p) => p.id === params.id);

  if (!servicio) return notFound();

  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("beneficios");

  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const incluyeRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────────────────
      gsap.set(
        [
          tagRef.current,
          titleRef.current,
          imageRef.current,
          infoRef.current,
          ctaRef.current,
        ],
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
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const Icon = servicio.icon;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* ── Fondo decorativo ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Botón volver ──────────────────────────────────────────────────── */}
        <div className="mb-10">
          <Link
            href="/Services"
            className="inline-flex items-center gap-2 text-gray hover:text-green transition-colors duration-200 group text-sm font-mono"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Volver a Servicios
          </Link>
        </div>

        {/* ── Tag + título ──────────────────────────────────────────────────── */}
        <div ref={tagRef} className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            {servicio.title2}
          </span>
          <span className="px-3 py-1.5 bg-green text-black text-xs font-bold uppercase tracking-wide rounded-sm">
            {servicio.metric}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-anton text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-white uppercase mb-12"
        >
          {servicio.service}
        </h1>

        {/* ── Grid principal ────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-px bg-white/5 mb-px">
          {/* Imagen */}
          <div
            ref={imageRef}
            className="relative h-[400px] lg:h-[500px] overflow-hidden bg-black"
          >
            <Image
              src={servicio.img}
              alt={servicio.service}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Info */}
          <div ref={infoRef} className="bg-black p-8 md:p-10 space-y-6">
            <p className="text-gray leading-relaxed">{servicio.intro}</p>

            {/* Objetivo */}
            <div className="border border-white/10 p-6 space-y-3">
              <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em]">
                Objetivo
              </p>
              <p className="text-white text-sm leading-relaxed">
                {servicio.objetivo}
              </p>
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray uppercase tracking-wider mb-1">
                  Ideal para
                </p>
                <p className="text-gray text-sm">{servicio.ideal}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {servicio.stats.map((stat, i) => (
                <div key={i} className="bg-black px-4 py-4 text-center">
                  <p className="font-anton text-2xl text-green leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-gray uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Descripción ───────────────────────────────────────────────────── */}
        <div className="border border-white/10 border-t-0 p-8 md:p-10 mb-px">
          <p className="text-gray leading-relaxed text-lg max-w-3xl">
            {servicio.p}
          </p>
        </div>

        {/* ── Qué incluye ───────────────────────────────────────────────────── */}
        <div className="border border-white/10 border-t-0 p-8 md:p-10 mb-16">
          <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-6">
            Qué incluye este sistema
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {servicio.incluye.map((item, index) => (
              <div
                key={index}
                ref={(el) => (incluyeRef.current[index] = el)}
                className="flex items-start gap-3"
              >
                <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs: Beneficios + FAQs ───────────────────────────────────────── */}
        <div className="mb-16">
          {/* Tab headers */}
          <div className="grid grid-cols-2 gap-px bg-white/5 mb-px">
            {["beneficios", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-green text-black"
                    : "bg-black text-gray hover:text-white"
                }`}
              >
                {tab === "beneficios" ? "Beneficios" : "Preguntas frecuentes"}
              </button>
            ))}
          </div>

          {/* Beneficios */}
          {activeTab === "beneficios" && (
            <div className="border border-white/10 border-t-0 p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                {servicio.content.map((texto, idx) => (
                  <div
                    key={idx}
                    className="bg-black p-6 hover:bg-white/[0.03] transition-colors duration-200 group relative"
                  >
                    <span className="font-anton text-5xl text-white/[0.04] absolute top-4 right-4 select-none leading-none">
                      {idx + 1}
                    </span>
                    <div className="w-7 h-7 border border-green/30 flex items-center justify-center mb-4 group-hover:border-green group-hover:bg-green/10 transition-all duration-300">
                      <Icon className="text-green text-sm" />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {texto}
                    </p>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-green group-hover:w-full transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {activeTab === "faqs" && (
            <div className="border border-white/10 border-t-0">
              <div className="space-y-px">
                {servicio.faqs?.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="bg-black">
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/[0.02] transition-colors duration-200"
                      >
                        <span
                          className={`text-sm font-semibold pr-8 transition-colors duration-200 ${
                            isOpen ? "text-green" : "text-white"
                          }`}
                        >
                          {item.title}
                        </span>
                        <div
                          className={`w-7 h-7 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            isOpen
                              ? "border-green bg-green text-black"
                              : "border-white/20 text-gray"
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
                          isOpen
                            ? "max-h-[300px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 md:px-8 pb-6 border-t border-white/5">
                          <p className="text-gray text-sm leading-relaxed pt-4">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="border border-white/10 p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-green/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3">
              <h3 className="font-anton text-4xl md:text-5xl text-white uppercase leading-[0.95] tracking-tight">
                ¿Listo para <span className="text-green">implementar</span> este
                sistema?
              </h3>
              <p className="text-gray leading-relaxed max-w-lg">
                Agenda un diagnóstico y descubre cómo este nivel puede
                transformar tu negocio.
              </p>
              <p className="text-xs text-gray font-mono">
                Diagnóstico en 24h · Sin compromiso
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200 whitespace-nowrap"
              >
                Solicitar diagnóstico
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/Proyects"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
              >
                Ver proyectos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
