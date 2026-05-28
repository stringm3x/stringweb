"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiCheckCircle } from "react-icons/fi";

const implemented = [
  "Captación automática desde Instagram y WhatsApp",
  "Agenda de pruebas gratuitas sin coordinación manual",
  "Seguimiento automático a prospectos no convertidos",
  "Panel de miembros activos e inactivos",
  "Registro de pagos de membresías",
  "Control de inventario y venta de productos",
  "Dashboard operativo con métricas en tiempo real",
];

const moments = [
  {
    label: "Antes",
    color: "border-red/30",
    labelColor: "text-red",
    text: "Evolution GYM recibía consultas todos los días por Instagram y WhatsApp. Sin sistema, cada prospecto dependía de que alguien del staff estuviera disponible para responder. Los pagos se registraban manualmente. Nadie sabía exactamente cuántos miembros estaban activos.",
  },
  {
    label: "Ahora",
    color: "border-green",
    labelColor: "text-green",
    text: "El sistema opera solo. Cada prospecto que llega es capturado, calificado y recibe seguimiento automático. Los pagos, membresías e inventario se gestionan desde un solo panel. Evolution GYM opera con estructura — y eso se nota.",
  },
];

export default function GymCaseStudy() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Estado inicial
    [...headerRefs.current, ...leftRefs.current, ...rightRefs.current]
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));

    container.__animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline();

      // Header
      tl.to(headerRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });

      // Columna izquierda — momentos
      tl.to(
        leftRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

      // Columna derecha — lista implementado
      tl.to(
        rightRefs.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power3.out" },
        "-=0.3"
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/90" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green/20" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 lg:px-20">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            04 · Caso real
          </span>
        </div>

        <div className="flex items-end gap-6 mb-8">
          <h2
            ref={(el) => (headerRefs.current[1] = el)}
            className="font-black text-white uppercase leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Evolution GYM
          </h2>
          <div
            ref={(el) => (headerRefs.current[2] = el)}
            className="flex items-center gap-2 pb-2"
          >
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-green text-[10px] font-mono font-bold uppercase tracking-widest">
              Sistema activo · CDMX
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {/* Columna izquierda — Antes / Ahora */}
          <div className="bg-black p-8 space-y-6">
            {moments.map((m, i) => (
              <div
                key={m.label}
                ref={(el) => (leftRefs.current[i] = el)}
                className={`border-l-2 ${m.color} pl-5 space-y-2`}
              >
                <p
                  className={`text-[10px] font-mono uppercase tracking-[0.25em] font-bold ${m.labelColor}`}
                >
                  {m.label}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}

            {/* Nota interna */}
            <div
              ref={(el) => (leftRefs.current[2] = el)}
              className="border border-white/5 bg-white/[0.02] p-4 mt-4"
            >
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">
                Nota — para cuando tengas métricas
              </p>
              <p className="text-white/30 text-xs leading-relaxed italic">
                "Tasa de conversión, leads captados, membresías registradas —
                esta sección se convierte en el argumento de venta más poderoso
                de la página. Guarda todo desde hoy."
              </p>
            </div>
          </div>

          {/* Columna derecha — Lo que implementamos */}
          <div className="bg-black p-8">
            <p
              ref={(el) => (rightRefs.current[0] = el)}
              className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-6"
            >
              Lo que implementamos — Sistema GYM Completo
            </p>

            <div className="space-y-4">
              {implemented.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (rightRefs.current[i + 1] = el)}
                  className="flex items-start gap-3 group"
                >
                  <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Badge sistema */}
            <div
              ref={(el) => (rightRefs.current[implemented.length + 1] = el)}
              className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-green flex items-center justify-center flex-shrink-0">
                <span className="font-black text-black text-sm">S</span>
              </div>
              <div>
                <p className="text-white text-xs font-bold">
                  Sistema GYM Completo
                </p>
                <p className="text-white/30 text-[10px] font-mono">
                  Nivel 3 · Captación + Operación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        04
      </div>
    </div>
  );
}
