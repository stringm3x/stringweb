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
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiDollarSign,
  FiMail,
  FiUser,
  FiPhone,
  FiTarget,
  FiCalendar,
  FiClock,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { PROJECT_TYPES } from "../../lib/constants/project-types";

gsap.registerPlugin(ScrollTrigger);

// ─── Datos ────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: FiZap, text: "Diagnóstico en 24h" },
  { icon: FiCheckCircle, text: "Sistema 100% personalizado" },
  { icon: FiShield, text: "Sin plantillas" },
  { icon: FiClock, text: "Soporte continuo" },
];

// ─── Componente ───────────────────────────────────────────────────────────────
export const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [selectedLevelData, setSelectedLevelData] = useState(null);

  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const benefitsRef = useRef([]);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

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
      gsap.set(
        [tagRef.current, titleRef.current, descRef.current, formRef.current],
        { opacity: 0, y: 24 }
      );
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
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
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
    setIsSubmitting(true);

    // Feedback táctil en botón
    gsap
      .timeline()
      .to(buttonRef.current, { scale: 0.96, duration: 0.1 })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
      });

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
        icon: <FiCheck className="text-green" />,
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
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Diagnóstico gratuito
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-anton text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tighter uppercase"
        >
          <span className="text-white">Diagnostica</span>
          <br />
          <span className="text-green">tu negocio</span>
        </h1>

        <p ref={descRef} className="text-gray text-lg leading-relaxed max-w-xl">
          Descubre qué nivel del Sistema STRING necesita tu negocio para
          convertir visitas en clientes reales.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                ref={(el) => (benefitsRef.current[i] = el)}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 text-xs font-mono text-gray"
              >
                <Icon className="text-green text-sm" />
                {b.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Formulario ──────────────────────────────────────────────────────── */}
      <div ref={formRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-white/10 p-8 md:p-10 space-y-6"
          noValidate
        >
          {/* Fila 1: Nombre + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Nombre completo"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Juan Pérez"
              icon={FiUser}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              placeholder="juan@email.com"
              required
            />
          </div>

          {/* Fila 2: WhatsApp + Nivel */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="WhatsApp"
              name="whatsapp"
              type="tel"
              register={register}
              error={errors.whatsapp?.message}
              placeholder="521234567890"
              required
            />
            <FormSelect
              label="Nivel del Sistema STRING"
              name="projectType"
              register={register}
              error={errors.projectType?.message}
              required
            />
          </div>

          {/* Info del nivel seleccionado */}
          {selectedLevelData && (
            <div className="border border-green/20 bg-green/5 p-4 space-y-2">
              <p className="text-[10px] font-mono text-green uppercase tracking-widest">
                {selectedLevelData.label}
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {selectedLevelData.description}
              </p>
              <p className="text-[10px] font-mono text-gray">
                Precio estimado: ${selectedLevelData.price} MXN
              </p>
            </div>
          )}

          {/* Objetivo */}
          <FormField
            label="Objetivo del proyecto"
            name="objective"
            type="textarea"
            register={register}
            error={errors.objective?.message}
            placeholder="Cuéntanos qué necesitas, cuál es tu negocio y qué esperas lograr..."
            rows={4}
            required
          />

          {/* Fila 3: Fecha + Presupuesto */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Fecha ideal de entrega"
              name="idealDate"
              type="date"
              register={register}
              error={errors.idealDate?.message}
              required
            />
            <FormField
              label="Presupuesto estimado (MXN)"
              name="budget"
              type="number"
              register={register}
              error={errors.budget?.message}
              placeholder="8000"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden bg-green text-black font-bold px-8 py-4 text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando diagnóstico...
                  </>
                ) : (
                  <>
                    Solicitar diagnóstico gratuito
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>

            <p className="text-xs text-gray text-center mt-4 font-mono">
              Te contactamos en menos de 24 horas · Sin compromiso
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
