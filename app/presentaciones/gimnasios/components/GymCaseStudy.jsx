"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";

const implemented = [
  "Captación automática desde Instagram y WhatsApp",
  "Agenda de clases de prueba gratis sin coordinación manual",
  "Seguimiento automático a prospectos no convertidos",
  "Panel de miembros activos e inactivos",
  "Registro de pagos de membresías",
  "Control de inventario y venta de productos",
  "Dashboard operativo con métricas en tiempo real",
];

// Métricas: reales + proyectadas con base en datos reales
const metricas = [
  {
    valor: "184+",
    label: "Miembros activos",
    nota: "Dato real · Mayo 2026",
    color: "text-green",
    real: true,
  },
  {
    valor: "$350",
    label: "Membresía mensual",
    nota: "Plan más popular",
    color: "text-white",
    real: true,
  },
  {
    valor: "+$7,560",
    label: "Ingreso adicional/mes",
    nota: "Proyección: 3 prospectos extra/semana × $350 × 6 meses promedio",
    color: "text-green",
    real: false,
  },
  {
    valor: "90 días",
    label: "Medición en curso",
    nota: "Datos reales disponibles en Q3 2026",
    color: "text-yellow",
    real: false,
  },
];

const moments = [
  {
    label: "Antes",
    color: "border-red/40",
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

// Proyecciones calculadas con base real
const proyecciones = [
  {
    titulo: "Ingreso adicional proyectado",
    calculo:
      "184 miembros × $350 = $64,400/mes base. Con 3 prospectos extra por semana que antes se perdían → +$7,560/mes adicionales.",
    resultado: "+$7,560/mes",
    color: "text-green",
  },
  {
    titulo: "Tasa de conversión esperada",
    calculo:
      "De responder en horas a respuesta inmediata automática. Benchmark del sector: +25–35% de conversión con seguimiento automatizado.",
    resultado: "+30% estimado",
    color: "text-green",
  },
  {
    titulo: "Prospectos sin seguimiento",
    calculo:
      "Antes: 100% de prospectos no convertidos se perdían sin registro. Ahora: 0. Cada uno queda en el sistema para reactivación.",
    resultado: "0 perdidos",
    color: "text-green",
  },
];

export default function GymCaseStudy() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const metricRefs = useRef([]);
  const proyeccionRefs = useRef([]);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    [
      ...headerRefs.current,
      ...metricRefs.current,
      ...proyeccionRefs.current,
      ...leftRefs.current,
      ...rightRefs.current,
    ]
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));

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
        metricRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.2"
      );
      tl.to(
        proyeccionRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.2"
      );
      tl.to(
        leftRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );
      tl.to(
        rightRefs.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.3"
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-start overflow-hidden bg-black"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/92" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green/20" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        {/* Header */}
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-3">
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            04 · Caso real
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-4">
          <h2
            ref={(el) => (headerRefs.current[1] = el)}
            className="font-black text-white uppercase leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Evolution GYM
          </h2>
          <div
            ref={(el) => (headerRefs.current[2] = el)}
            className="flex items-center gap-2 pb-1"
          >
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-green text-[10px] font-mono font-bold uppercase tracking-widest">
              Sistema activo · Neza, CDMX
            </span>
          </div>
        </div>

        {/* Link */}
        <div ref={(el) => (headerRefs.current[3] = el)} className="mb-6">
          <a
            href="https://evolutiongymneza.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-green/30 text-green text-xs font-mono hover:bg-green/10 transition-colors duration-200"
          >
            evolutiongymneza.com
            <FiExternalLink className="text-xs" />
          </a>
        </div>

        {/* Métricas — 2 reales + 2 proyectadas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-px">
          {metricas.map((m, i) => (
            <div
              key={i}
              ref={(el) => (metricRefs.current[i] = el)}
              className="bg-black px-4 py-5 relative"
            >
              <p className={`font-anton text-2xl leading-none mb-1 ${m.color}`}>
                {m.valor}
              </p>
              <p className="text-white/70 text-xs font-semibold mb-1">
                {m.label}
              </p>
              <p className="text-[10px] font-mono text-gray leading-tight">
                {m.nota}
              </p>
            </div>
          ))}
        </div>

        {/* Proyecciones calculadas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 mb-6">
          {proyecciones.map((p, i) => (
            <div
              key={i}
              ref={(el) => (proyeccionRefs.current[i] = el)}
              className="bg-black px-5 py-5"
            >
              <p className="text-[9px] font-mono text-gray uppercase tracking-widest mb-2">
                {p.titulo}
              </p>
              <p className={`font-anton text-xl leading-none mb-2 ${p.color}`}>
                {p.resultado}
              </p>
              <p className="text-white/30 text-[10px] leading-relaxed">
                {p.calculo}
              </p>
            </div>
          ))}
        </div>

        {/* Grid: Antes/Ahora + Lista */}
        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {/* Antes / Ahora */}
          <div className="bg-black p-6 space-y-5">
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
          </div>

          {/* Lo que implementamos */}
          <div className="bg-black p-6">
            <p
              ref={(el) => (rightRefs.current[0] = el)}
              className="text-[10px] font-mono text-green uppercase tracking-[0.2em] mb-4"
            >
              Lo que implementamos
            </p>

            <div className="space-y-2.5">
              {implemented.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (rightRefs.current[i + 1] = el)}
                  className="flex items-start gap-3 group"
                >
                  <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-xs leading-relaxed group-hover:text-white transition-colors duration-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div
              ref={(el) => (rightRefs.current[implemented.length + 1] = el)}
              className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-green flex items-center justify-center flex-shrink-0">
                <span className="font-black text-black text-sm">S</span>
              </div>
              <div>
                <p className="text-white text-xs font-bold">
                  Sistema GYM Completo
                </p>
                <p className="text-white/30 text-[10px] font-mono">
                  Captación + Operación · Neza, CDMX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        04
      </div>
    </div>
  );
}
