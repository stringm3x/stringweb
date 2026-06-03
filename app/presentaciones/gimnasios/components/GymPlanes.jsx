"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiCheckCircle, FiChevronDown } from "react-icons/fi";

const planes = [
  {
    id: "base",
    label: "Plan Base",
    precio: "$1,800 – $2,500",
    periodo: "/mes",
    tag: null,
    descripcion:
      "Para gimnasios que quieren mantener su sistema funcionando sin preocupaciones.",
    incluye: [
      "Mantenimiento técnico del sistema",
      "Soporte por WhatsApp",
      "Actualizaciones menores",
      "Monitoreo de automatizaciones",
    ],
  },
  {
    id: "crecimiento",
    label: "Plan Crecimiento",
    precio: "$3,000 – $4,500",
    periodo: "/mes",
    tag: "Popular",
    descripcion:
      "Para gimnasios que quieren mejorar su conversión mes a mes con datos reales.",
    incluye: [
      "Todo el Plan Base",
      "Optimización mensual del sistema",
      "Reporte mensual de métricas",
      "Ajustes de flujos y automatizaciones",
      "Mejoras de claridad y conversión",
    ],
  },
  {
    id: "escalamiento",
    label: "Plan Escalamiento",
    precio: "$5,000 – $8,000",
    periodo: "/mes",
    tag: null,
    descripcion:
      "Para gimnasios que quieren crecer con estrategia y datos, no solo mantener.",
    incluye: [
      "Todo el Plan Crecimiento",
      "Reunión estratégica mensual",
      "Análisis de oportunidades de crecimiento",
      "Propuestas de mejora del sistema",
      "Soporte prioritario",
    ],
  },
];

export default function GymPlanes() {
  const [activeId, setActiveId] = useState("crecimiento");
  const [openId, setOpenId] = useState("crecimiento");

  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const cardRefs = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    Object.values(cardRefs.current).forEach(
      (c) => c && gsap.set(c, { opacity: 0, y: 24 })
    );
    headerRefs.current
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 16 }));

    container.__animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const tl = gsap.timeline();
      tl.to(headerRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.to(
        Object.values(cardRefs.current).filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );
    };
  }, []);

  const active = planes.find((p) => p.id === activeId);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green/20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            05 · Planes de continuidad
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          ¿Ya tienes el sistema?
          <br />
          <span className="text-green">Mantenlo creciendo.</span>
        </h2>

        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-gray text-sm mb-8 max-w-xl"
        >
          El sistema se entrega funcionando. Los planes de continuidad son
          opcionales — para quien quiere optimizar, medir y escalar mes a mes.
        </p>

        {/* ── Desktop — selector + detalle ─────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.6fr] gap-px bg-white/5">
          {/* Selector */}
          <div className="flex flex-col gap-px bg-white/5">
            {planes.map((plan) => {
              const isActive = activeId === plan.id;
              return (
                <div
                  key={plan.id}
                  ref={(el) => (cardRefs.current[plan.id] = el)}
                  onMouseEnter={() => setActiveId(plan.id)}
                  className={`bg-black px-6 py-5 cursor-default relative transition-colors duration-200 border-l-2 ${
                    isActive
                      ? "border-green bg-white/[0.03]"
                      : "border-transparent hover:border-green/30"
                  }`}
                >
                  {plan.tag && (
                    <span className="absolute top-3 right-4 bg-green text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      ⭐ {plan.tag}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-gray uppercase tracking-widest block mb-2">
                    {plan.label}
                  </span>
                  <p
                    className={`font-black text-xl leading-none transition-colors duration-200 ${
                      isActive ? "text-green" : "text-white/30"
                    }`}
                  >
                    {plan.precio}
                    <span className="text-xs font-normal text-gray ml-1">
                      MXN{plan.periodo}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detalle */}
          <div className="bg-black p-8 flex flex-col justify-center min-h-[300px]">
            {active && (
              <div key={active.id} className="space-y-4">
                <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em]">
                  {active.label}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {active.descripcion}
                </p>
                <ul className="space-y-2">
                  {active.incluye.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] font-mono text-white/20 pt-3 border-t border-white/5">
                  Los planes de continuidad inician después de la entrega del
                  sistema. Sin compromiso de permanencia.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile — acordeón ─────────────────────────────────────────── */}
        <div className="lg:hidden space-y-2">
          {planes.map((plan) => {
            const isOpen = openId === plan.id;
            return (
              <div
                key={plan.id}
                ref={(el) => (cardRefs.current[`m-${plan.id}`] = el)}
                className={`border transition-colors duration-200 ${
                  isOpen ? "border-green/40" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : plan.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                        {plan.label}
                      </span>
                      {plan.tag && (
                        <span className="bg-green text-black text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                          ⭐ {plan.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-black text-xl leading-none transition-colors duration-200 ${
                        isOpen ? "text-green" : "text-white/50"
                      }`}
                    >
                      {plan.precio}
                      <span className="text-xs font-normal text-gray ml-1">
                        MXN{plan.periodo}
                      </span>
                    </p>
                  </div>
                  <FiChevronDown
                    className={`text-green flex-shrink-0 ml-2 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-6 border-t border-white/5 space-y-3 pt-4">
                    <p className="text-white/50 text-sm leading-relaxed">
                      {plan.descripcion}
                    </p>
                    <ul className="space-y-2">
                      {plan.incluye.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-xs leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] font-mono text-white/20 pt-2 border-t border-white/5">
                      Sin compromiso de permanencia.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        05
      </div>
    </div>
  );
}
