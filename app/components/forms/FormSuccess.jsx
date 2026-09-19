"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";
import { Boton } from "../ui/Boton";

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

  const whatsappLines = [
    `Nombre: ${data.name}`,
    `Tipo de negocio: ${data.businessType}`,
    data.email && `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    data.projectType &&
      `Sistema: ${levelLabels[data.projectType] || data.projectType}`,
    `Qué te está pasando: ${data.objective}`,
    data.idealDate && `Fecha ideal: ${data.idealDate}`,
    data.budget &&
      `Presupuesto: $${Number(data.budget).toLocaleString("es-MX")} MXN`,
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, acabo de solicitar un diagnóstico en stringwebs.com:\n\n` +
      whatsappLines.join("\n")
  )}`;

  const resumenItems = [
    { label: "Tipo de negocio", value: data.businessType },
    data.projectType && {
      label: "Sistema",
      value: levelLabels[data.projectType] || data.projectType,
    },
    data.budget && {
      label: "Presupuesto",
      value: `$${Number(data.budget).toLocaleString("es-MX")} MXN`,
    },
    data.idealDate && { label: "Fecha ideal", value: data.idealDate },
  ].filter(Boolean);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
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
      className="mx-auto max-w-lg border-2 border-linea bg-fondo-elevado p-10 text-center md:p-14"
    >
      <div
        ref={checkRef}
        className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-acido"
      >
        <svg
          className="h-8 w-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div ref={contentRef} className="space-y-4">
        <span className="font-mono uppercase text-etiqueta text-acido">
          Diagnóstico enviado
        </span>

        <h3 className="font-anton uppercase text-titular-m text-tinta">
          ¡Listo, {data.name.split(" ")[0]}!
        </h3>

        <p className="text-cuerpo-s text-tinta-suave">
          Recibimos tu solicitud. Te contactaremos en menos de{" "}
          <span className="text-tinta">24 horas</span> con un diagnóstico
          preliminar de tu presencia digital.
        </p>

        <div className="mt-6 text-left">
          <p className="mb-2 font-mono uppercase text-etiqueta text-tinta-tenue">
            Tu solicitud
          </p>
          <div className="divide-y divide-linea border-y border-linea">
            {resumenItems.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-2">
                <span className="font-mono text-xs uppercase text-tinta-tenue">{label}</span>
                <span className="text-cuerpo-s text-tinta">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Boton href={whatsappUrl} variante="primario" className="w-full">
            <FaWhatsapp className="text-lg" />
            Contactar por WhatsApp
          </Boton>
          <Boton onClick={onReset} variante="texto" className="justify-center">
            Enviar otra cotización
          </Boton>
        </div>
      </div>
    </div>
  );
};
