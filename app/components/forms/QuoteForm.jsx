"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "../../lib/validations/quote-schema";
import { FormField } from "./FormField";
import { FormSelect } from "./FormSelect";
import { FormSuccess } from "./FormSuccess";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import toast from "react-hot-toast";

export const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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

  // Animación de entrada mejorada
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline para animación secuencial
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          formRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  // Animación de error en tiempo real
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      gsap.to(formRef.current, {
        x: [-5, 5, -3, 3, 0],
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Animación sutil en el primer campo con error
      const firstErrorField = document.querySelector(".error-field");
      if (firstErrorField) {
        gsap.to(firstErrorField, {
          backgroundColor: "rgba(239, 68, 68, 0.05)",
          borderColor: "#ef4444",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  }, [errors]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Animación del botón mejorada
      gsap
        .timeline()
        .to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "elastic.out(1, 0.5)",
        });

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar");
      }

      // Éxito - Animación elegante
      setSuccessData(data);
      toast.success("¡Cotización enviada! Revisa tu email", {
        duration: 5000,
        icon: "🎉",
        style: {
          borderRadius: "10px",
          background: "#10b981",
          color: "#fff",
        },
      });

      // Animación de éxito del formulario
      gsap
        .timeline()
        .to(formRef.current, {
          scale: 0.98,
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(formRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          clearProps: "all",
        });
    } catch (error) {
      toast.error(error.message || "Error al enviar. Intenta de nuevo.", {
        duration: 4000,
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    setSuccessData(null);
    reset();

    gsap.fromTo(
      formRef.current,
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
    );

    toast("Nueva cotización", {
      icon: "📝",
      duration: 2000,
    });
  }, [reset]);

  if (successData) {
    return <FormSuccess data={successData} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header con animación */}
        <div className="text-center mb-12 space-y-4">
          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-ubuntu font-extrabold text-bg leading-none"
          >
            COTIZA TU{" "}
            <span className="text-green relative inline-block">
              WEB
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-green/30 rounded-full"></span>
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-bg/90 max-w-2xl mx-auto px-4"
          >
            Cuéntame tu idea y te prepararé una propuesta personalizada en
            código, no plantillas.
          </p>
        </div>

        {/* Formulario */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray/20"
          noValidate
        >
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
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              placeholder="juan@email.com"
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

            <FormSelect
              label="Tipo de proyecto"
              name="projectType"
              register={register}
              error={errors.projectType?.message}
              required
            />
          </div>

          <div className="mt-6">
            <FormField
              label="Objetivo del sitio web"
              name="objective"
              type="textarea"
              register={register}
              error={errors.objective?.message}
              placeholder="Describe el objetivo principal de tu proyecto..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
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
              placeholder="7,000"
              required
            />
          </div>

          {/* Botón de envío */}
          <div className="mt-8 flex flex-col items-center">
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-xl font-medium
                transition-all duration-200 transform
                focus:outline-none focus:ring-2 focus:ring-green/50 focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-70
                ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green text-black hover:bg-green/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  <span>Enviando cotización...</span>
                </span>
              ) : (
                "Obtener Cotización"
              )}
            </button>

            <p className="text-xs sm:text-sm text-gray/80 text-center mt-4 max-w-xs">
              Los precios son aproximados, nos comunicaremos contigo.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
