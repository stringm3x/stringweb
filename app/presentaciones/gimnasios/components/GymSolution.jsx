"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FiCheckCircle,
  FiTarget,
  FiZap,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";

// PARCHE — solo el array levels con precios corregidos
// Reemplazar el array levels en GymSolution.jsx

const levels = [
  {
    id: "nivel2",
    label: "Nivel 2",
    title: "Sistema de Captación",
    price: "$18,000 – $24,000",
    tag: null,
    pitch:
      "Para gimnasios que ya tienen interesados pero los pierden por desorden.",
    description:
      "Ya no dependes de que alguien esté disponible para responder. El sistema captura cada prospecto, lo registra solo y notifica al staff en segundos — aunque sean las 11pm.",
    features: [
      "Landing page del gimnasio optimizada",
      "Formulario con calificación automática",
      "CRM automático de prospectos",
      "Notificación inmediata al staff",
      "Respuesta automática al prospecto",
    ],
    icon: FiTarget,
  },
  {
    id: "gym-completo",
    label: "Sistema GYM Completo",
    title: "Captación + Operación",
    price: "$45,000 – $55,000",
    tag: "Recomendado",
    pitch:
      "Para gimnasios que quieren resolver captación y operación de una sola vez.",
    description:
      "No son dos sistemas separados. Es uno solo que conecta todo: desde el momento en que alguien pregunta por membresía, hasta el registro de su pago, el control de inventario y las métricas del negocio en tiempo real.",
    featureGroups: [
      {
        label: "Captación",
        items: [
          "Landing page optimizada",
          "Agenda automática de clases de prueba gratis",
          "Seguimiento a prospectos no convertidos",
          "Recordatorios automáticos de cita",
        ],
      },
      {
        label: "Operación interna",
        items: [
          "Panel de miembros activos e inactivos",
          "Caja de pagos con registro de membresías",
          "Caja de productos e inventario",
          "Dashboard con métricas en tiempo real",
        ],
      },
    ],
    tagline: "Un solo sistema. Todo el gimnasio adentro.",
    icon: FiZap,
  },
  {
    id: "especializado",
    label: "Sistema Especializado",
    title: "Multi-sucursal",
    price: "Desde $70,000",
    tag: null,
    pitch:
      "Para cadenas o gimnasios con operaciones que un sistema estándar no puede cubrir.",
    description:
      "Cuando tienes múltiples sucursales o software de gestión existente, construimos la infraestructura exacta que necesitas.",
    features: [
      "Todo el Sistema GYM Completo",
      "Gestión multi-sucursal centralizada",
      "Integración con software existente",
      "CRM personalizado",
      "Automatizaciones avanzadas",
    ],
    icon: FiSettings,
  },
];

// Renderiza los features de un nivel
function Features({ level }) {
  return (
    <div className="mt-4 space-y-4">
      <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em]">
        {level.pitch}
      </p>
      <p className="text-white/60 text-sm leading-relaxed">
        {level.description}
      </p>

      {level.featureGroups ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {level.featureGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] font-mono text-green/50 uppercase tracking-[0.2em] mb-2">
                {group.label}
              </p>
              <ul className="space-y-1.5">
                {group.items.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-xs leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5 mt-2">
          {level.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2">
              <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
              <span className="text-white/70 text-xs leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      )}

      {level.tagline && (
        <p className="mt-3 pt-3 border-t border-white/5 text-[10px] font-mono text-green/60 italic">
          {level.tagline}
        </p>
      )}
    </div>
  );
}

export default function GymSolution() {
  // Desktop — hover state
  const [activeId, setActiveId] = useState("gym-completo");
  // Mobile — acordeón
  const [openId, setOpenId] = useState("gym-completo");

  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const cardRefs = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    Object.values(cardRefs.current).forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, y: 24 });
    });
    headerRefs.current.filter(Boolean).forEach((el) => {
      gsap.set(el, { opacity: 0, y: 16 });
    });

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

  const active = levels.find((l) => l.id === activeId);

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
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            03 · La solución STRING
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-2"
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}
        >
          Dependiendo del momento de tu gimnasio,
          <br className="hidden sm:block" />
          <span className="text-green">
            {" "}
            hay un nivel que encaja exactamente.
          </span>
        </h2>

        {/* Subtítulo diferente en desktop vs mobile */}
        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-gray text-sm mb-8 max-w-xl hidden lg:block"
        >
          Pasa el cursor sobre cada nivel para ver los detalles.
        </p>
        <p className="text-gray text-sm mb-8 max-w-xl lg:hidden">
          Toca cada nivel para ver los detalles.
        </p>

        {/* ── DESKTOP — selector + detalle ─────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.6fr] gap-px bg-white/5">
          {/* Selector */}
          <div className="flex flex-col gap-px bg-white/5">
            {levels.map((level) => {
              const Icon = level.icon;
              const isActive = activeId === level.id;
              return (
                <div
                  key={level.id}
                  ref={(el) => (cardRefs.current[level.id] = el)}
                  onMouseEnter={() => setActiveId(level.id)}
                  className={`bg-black px-6 py-5 cursor-default relative transition-colors duration-200 border-l-2 ${
                    isActive
                      ? "border-green bg-white/[0.03]"
                      : "border-transparent hover:border-green/30"
                  }`}
                >
                  {level.tag && (
                    <span className="absolute top-3 right-4 bg-green text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      ⭐ {level.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className={`text-base transition-colors duration-200 ${
                        isActive ? "text-green" : "text-white/30"
                      }`}
                    />
                    <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                      {level.label}
                    </span>
                  </div>
                  <h3
                    className={`font-black text-base uppercase tracking-tight leading-tight mb-1 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    {level.title}
                  </h3>
                  <p
                    className={`font-bold text-lg leading-none transition-colors duration-200 ${
                      isActive ? "text-green" : "text-white/20"
                    }`}
                  >
                    {level.price}{" "}
                    <span className="text-xs font-normal text-gray">MXN</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detalle */}
          <div className="bg-black p-8 flex flex-col justify-center min-h-[360px]">
            {active && (
              <div key={active.id}>
                <Features level={active} />
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE — acordeón ─────────────────────────────────────────── */}
        <div className="lg:hidden space-y-2">
          {levels.map((level) => {
            const Icon = level.icon;
            const isOpen = openId === level.id;

            return (
              <div
                key={level.id}
                ref={(el) => (cardRefs.current[`mobile-${level.id}`] = el)}
                className={`border transition-colors duration-200 ${
                  isOpen ? "border-green/40" : "border-white/10"
                }`}
              >
                {/* Header del acordeón */}
                <button
                  onClick={() => setOpenId(isOpen ? null : level.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-8 h-8 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isOpen ? "border-green bg-green/10" : "border-white/20"
                      }`}
                    >
                      <Icon
                        className={`text-sm transition-colors duration-200 ${
                          isOpen ? "text-green" : "text-gray"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                          {level.label}
                        </span>
                        {level.tag && (
                          <span className="bg-green text-black text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                            ⭐ {level.tag}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-black text-sm uppercase tracking-tight leading-tight transition-colors duration-200 ${
                          isOpen ? "text-white" : "text-white/60"
                        }`}
                      >
                        {level.title}
                      </h3>
                      <p
                        className={`font-bold text-base leading-none mt-0.5 transition-colors duration-200 ${
                          isOpen ? "text-green" : "text-white/30"
                        }`}
                      >
                        {level.price}{" "}
                        <span className="text-[10px] font-normal text-gray">
                          MXN
                        </span>
                      </p>
                    </div>
                  </div>
                  <FiChevronDown
                    className={`text-green flex-shrink-0 ml-2 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Contenido expandible */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-6 border-t border-white/5">
                    <Features level={level} />
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
        03
      </div>
    </div>
  );
}
