"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { FormField } from "./FormField";
import { FormSelect } from "./FormSelect";
import { FormSuccess } from "./FormSuccess";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { PROJECT_TYPES } from "../../lib/constants/project-types";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const benefits = [
  "Diagnóstico en 24h",
  "Sistema 100% personalizado",
  "Sin plantillas",
  "Soporte continuo",
];

// ─── Componente ───────────────────────────────────────────────────────────────
export const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [selectedLevelData, setSelectedLevelData] = useState(null);

  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const benefitsRef = useRef([]);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      businessType: "",
      projectType: "",
      objective: "",
      idealDate: "",
      budget: "",
    },
  });

  const selectedSystem = watch("projectType");

  // Actualizar nivel seleccionado y autocompletar presupuesto
  useEffect(() => {
    if (selectedSystem) {
      const level = PROJECT_TYPES.find((l) => l.id === selectedSystem);
      setSelectedLevelData(level || null);
      if (level) {
        const minBudget = parseInt(
          level.price.split(" - ")[0].replace(/,/g, "")
        );
        setValue("budget", minBudget.toString());
      }
    } else {
      setSelectedLevelData(null);
    }
  }, [selectedSystem, setValue]);

  // ── Animación de entrada ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, descRef.current, formRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(benefitsRef.current.filter(Boolean), { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: REVEAL_START,
          once: true,
        },
      });

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "+=0.6"
        )
        .to(
          benefitsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          formRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Shake en error ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      gsap.to(formRef.current, {
        keyframes: { x: [-4, 4, -3, 3, 0] },
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  }, [errors]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar");
      }

      setSuccessData(data);
      toast.success("¡Diagnóstico enviado! Te contactamos en 24h", {
        duration: 5000,
        icon: <FiCheck className="text-acido" />,
      });
    } catch (error) {
      toast.error(error.message || "Error al enviar. Intenta de nuevo.", {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    setSuccessData(null);
    reset();
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [reset]);

  if (successData) {
    return <FormSuccess data={successData} onReset={handleReset} />;
  }

  return (
    <section ref={sectionRef} className="relative max-w-5xl mx-auto">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="mb-12 space-y-6">
        <div ref={tagRef}>
          <Etiqueta variante="linea">Diagnóstico gratuito</Etiqueta>
        </div>

        <div>
          <TitularBrochada lineas={["Diagnostica", "tu negocio"]} forma="tachon" retraso={0.25} />
        </div>

        <p ref={descRef} className="max-w-xl text-cuerpo-l text-tinta-suave">
          Descubre qué nivel del Sistema STRING necesita tu negocio para
          convertir visitas en clientes reales.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {benefits.map((texto, i) => (
            <span
              key={texto}
              ref={(el) => (benefitsRef.current[i] = el)}
              className="flex items-center gap-2 font-mono uppercase text-etiqueta text-tinta-suave"
            >
              <span className="text-acido" aria-hidden="true">
                —
              </span>
              {texto}
            </span>
          ))}
        </div>
      </div>

      {/* ── Formulario ──────────────────────────────────────────────────────── */}
      <div ref={formRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 border-2 border-linea bg-fondo-elevado p-8 md:p-10"
          noValidate
        >
          {/* Fila 1: Nombre + WhatsApp (obligatorios) */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Nombre completo"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Juan Pérez"
              required
            />
            <FormField
              label="WhatsApp"
              name="whatsapp"
              type="tel"
              register={register}
              error={errors.whatsapp?.message}
              placeholder="521234567890"
              required
            />
          </div>

          {/* Tipo de negocio (obligatorio) */}
          <FormField
            label="Tipo de negocio"
            name="businessType"
            register={register}
            error={errors.businessType?.message}
            placeholder="Ej. Gimnasio, restaurante, consultoría..."
            required
          />

          {/* Qué te está pasando hoy (obligatorio) */}
          <FormField
            label="¿Qué te está pasando hoy?"
            name="objective"
            type="textarea"
            register={register}
            error={errors.objective?.message}
            placeholder="Cuéntanos qué necesitas, cuál es tu negocio y qué esperas lograr..."
            rows={4}
            required
          />

          {/* Fila 2: Email + Nivel (opcionales) */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              placeholder="juan@email.com"
            />
            <FormSelect
              label="Nivel del Sistema STRING"
              name="projectType"
              register={register}
              error={errors.projectType?.message}
            />
          </div>

          {/* Info del nivel seleccionado */}
          {selectedLevelData && (
            <div className="space-y-2 border-l-2 border-acido pl-4">
              <p className="font-mono uppercase text-etiqueta text-acido">
                {selectedLevelData.label}
              </p>
              <p className="text-cuerpo-s text-tinta-suave">
                {selectedLevelData.description}
              </p>
              <p className="font-mono text-dato text-tinta">
                Precio estimado: ${selectedLevelData.price} MXN
              </p>
            </div>
          )}

          {/* Fila 3: Fecha + Presupuesto (opcionales) */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Fecha ideal de entrega"
              name="idealDate"
              type="date"
              register={register}
              error={errors.idealDate?.message}
            />
            <FormField
              label="Presupuesto estimado (MXN)"
              name="budget"
              type="number"
              register={register}
              error={errors.budget?.message}
              placeholder="8000"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Boton type="submit" variante="primario" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Enviando diagnóstico…" : "Solicitar diagnóstico gratuito"}
            </Boton>

            <p className="mt-4 text-center font-mono uppercase text-etiqueta text-tinta-tenue">
              Te contactamos en menos de 24 horas · Sin compromiso
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
