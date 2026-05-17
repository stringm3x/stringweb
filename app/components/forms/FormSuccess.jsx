"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

// Número real de STRING
const WHATSAPP_NUMBER = "525545524847";

export const FormSuccess = ({ data, onReset }) => {
  const containerRef = useRef(null);
  const checkRef = useRef(null);
  const contentRef = useRef(null);

  const levelLabels = {
    nivel1: "Sistema de Conversión",
    nivel2: "Sistema de Captación",
    nivel3: "Sistema Automatizado",
    nivel4: "Sistema Especializado",
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, acabo de solicitar un diagnóstico en stringwebs.com:\n\n` +
      `Nombre: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `WhatsApp: ${data.whatsapp}\n` +
      `Sistema: ${levelLabels[data.projectType] || data.projectType}\n` +
      `Objetivo: ${data.objective}\n` +
      `Fecha ideal: ${data.idealDate}\n` +
      `Presupuesto: $${Number(data.budget).toLocaleString("es-MX")} MXN`
  )}`;

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { scale: 0.92, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(
        checkRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="border border-white/10 p-10 md:p-14 text-center max-w-lg mx-auto"
    >
      {/* Check */}
      <div
        ref={checkRef}
        className="w-16 h-16 bg-green flex items-center justify-center mx-auto mb-8"
      >
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div ref={contentRef} className="space-y-4">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Diagnóstico enviado
        </span>

        <h3 className="font-anton text-4xl text-white tracking-tight uppercase leading-tight">
          ¡Listo, {data.name.split(" ")[0]}!
        </h3>

        <p className="text-gray text-sm leading-relaxed">
          Recibimos tu solicitud. Te contactaremos en menos de{" "}
          <span className="text-white font-semibold">24 horas</span> con un
          diagnóstico preliminar de tu presencia digital.
        </p>

        {/* Resumen */}
        <div className="border border-white/10 p-4 text-left space-y-2 mt-6">
          <p className="text-[10px] font-mono text-green uppercase tracking-widest mb-3">
            Tu solicitud
          </p>
          {[
            {
              label: "Sistema",
              value: levelLabels[data.projectType] || data.projectType,
            },
            {
              label: "Presupuesto",
              value: `$${Number(data.budget).toLocaleString("es-MX")} MXN`,
            },
            { label: "Fecha ideal", value: data.idealDate },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-xs text-gray font-mono">{label}</span>
              <span className="text-xs text-white font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
          >
            <FaWhatsapp className="text-lg" />
            Contactar por WhatsApp
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          <button
            onClick={onReset}
            className="text-xs text-gray hover:text-white transition-colors duration-200 font-mono underline underline-offset-4"
          >
            Enviar otra cotización
          </button>
        </div>
      </div>
    </div>
  );
};
