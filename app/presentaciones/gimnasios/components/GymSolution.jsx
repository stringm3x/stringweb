"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiCheckCircle, FiTarget, FiZap, FiSettings } from "react-icons/fi";

const levels = [
  {
    id: "nivel2",
    label: "Nivel 2",
    title: "Sistema de Captación",
    price: "$12,000 – $18,000",
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
    accent: "border-white/10",
    accentHover: "border-green/40",
  },
  {
    id: "gym-completo",
    label: "Sistema GYM Completo",
    title: "Captación + Operación",
    price: "$32,000 – $40,000",
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
          "Agenda automática de pruebas gratuitas",
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
    accent: "border-green",
    accentHover: "border-green",
  },
  {
    id: "especializado",
    label: "Sistema Especializado",
    title: "Multi-sucursal",
    price: "Desde $55,000",
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
    accent: "border-white/10",
    accentHover: "border-green/40",
  },
];

export default function GymSolution() {
  const [activeId, setActiveId] = useState("gym-completo");
  const containerRef = useRef(null);
  const cardRefs = useRef({});
  const headerRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inicializar cards
    Object.values(cardRefs.current).forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, y: 24 });
    });
    headerRefs.current.filter(Boolean).forEach((el) => {
      gsap.set(el, { opacity: 0, y: 16 });
    });

    // Función llamada por GymLanding al entrar el slide
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
          stagger: 0.12,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.2"
      );
    };
  }, []);

  const handleHover = (id) => {
    if (id === activeId) return;
    setActiveId(id);
  };

  const active = levels.find((l) => l.id === activeId);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center overflow-hidden bg-black"
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 lg:px-20">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            03 · La solución STRING
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-2"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
        >
          Dependiendo del momento de tu gimnasio,
          <br />
          <span className="text-green">
            hay un nivel que encaja exactamente.
          </span>
        </h2>

        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-gray text-sm mb-8 max-w-xl"
        >
          Pasa el cursor sobre cada nivel para ver los detalles.
        </p>

        {/* Grid — selector izquierda + detalle derecha */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-px bg-white/5">
          {/* Columna izquierda — cards selector */}
          <div className="flex flex-col gap-px bg-white/5">
            {levels.map((level) => {
              const Icon = level.icon;
              const isActive = activeId === level.id;

              return (
                <div
                  key={level.id}
                  ref={(el) => (cardRefs.current[level.id] = el)}
                  onMouseEnter={() => handleHover(level.id)}
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

          {/* Columna derecha — detalle activo */}
          <div className="bg-black p-8 flex flex-col justify-center min-h-[360px]">
            {active && (
              <div key={active.id}>
                <p className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-3">
                  {active.pitch}
                </p>

                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">
                  {active.description}
                </p>

                {/* Features con grupos o lista simple */}
                {active.featureGroups ? (
                  <div className="grid grid-cols-2 gap-6">
                    {active.featureGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[9px] font-mono text-green/50 uppercase tracking-[0.2em] mb-3">
                          {group.label}
                        </p>
                        <ul className="space-y-2">
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
                  <ul className="space-y-2 max-w-sm">
                    {active.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-xs leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {active.tagline && (
                  <p className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-green/60 italic">
                    {active.tagline}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        03
      </div>
    </div>
  );
}
