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
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiArrowRight,
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

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  { value: "basica", label: "Básica - Landing page o sitio institucional" },
  { value: "intermedia", label: "Intermedia - Tienda online o web app simple" },
  { value: "avanzada", label: "Avanzada - Plataforma compleja o marketplace" },
];

const benefits = [
  {
    icon: FiZap,
    text: "Respuesta en 24h",
    color: "from-yellow to-orange-500",
  },
  {
    icon: FiCheckCircle,
    text: "Código 100% personalizado",
    color: "from-green to-green-600",
  },
  {
    icon: FiShield,
    text: "Sin plantillas",
    color: "from-blue to-indigo-500",
  },
  {
    icon: FiClock,
    text: "Soporte 30 días",
    color: "from-purple to-pink-500",
  },
];

const stats = [
  { value: "50+", label: "Proyectos" },
  { value: "100%", label: "Personalizado" },
  { value: "24h", label: "Respuesta" },
  { value: "⭐ 5.0", label: "Valorado" },
];

export const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const benefitsRef = useRef([]);
  const sectionRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  // Animación de entrada mejorada - SOLO UNA VEZ
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aseguramos que todo sea visible primero
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          formRef.current,
          ...benefitsRef.current.filter(Boolean),
        ],
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          benefitsRef.current.filter(Boolean),
          {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          formRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación de error
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      gsap.to(formRef.current, {
        x: [-5, 5, -3, 3, 0],
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [errors]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      gsap
        .timeline()
        .to(buttonRef.current, { scale: 0.95, duration: 0.1 })
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

      setSuccessData(data);

      toast.success("¡Cotización enviada! Te contactaré en 24h", {
        duration: 5000,
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
          padding: "16px",
        },
      });

      gsap
        .timeline()
        .to(formRef.current, { scale: 0.98, opacity: 0.7, duration: 0.3 })
        .to(formRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
        });
    } catch (error) {
      toast.error(error.message || "Error al enviar", {
        icon: "❌",
        style: {
          borderRadius: "12px",
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
        },
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
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
    );
  }, [reset]);

  if (successData) {
    return <FormSuccess data={successData} onReset={handleReset} />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con stats */}
        <div className="text-center mb-12">
          <motion.div ref={titleRef} className="space-y-4">
            <span className="inline-block px-4 py-2 bg-green text-white rounded-full text-sm font-semibold tracking-wider shadow-lg shadow-green/30">
              ✦ Comienza tu proyecto
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-ubuntu font-black tracking-tight leading-none">
              <span className="text-black">COTIZA TU</span>
              <br />
              <span className="text-black relative">
                WEB
                <span className="absolute -bottom-3 left-0 w-full h-1 bg-green rounded-full" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Cuéntame tu idea y te prepararé una propuesta personalizada en
            código, no plantillas.
          </motion.p>
        </div>

        {/* Beneficios - AHORA SIEMPRE VISIBLES */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                ref={(el) => (benefitsRef.current[index] = el)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-lg border border-gray hover:shadow-xl transition-all"
                style={{ opacity: 1, visibility: "visible" }}
              >
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center`}
                >
                  <Icon className="text-white text-sm" />
                </div>
                <span className="text-sm font-medium text-gray">
                  {benefit.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Formulario */}
        <motion.div ref={formRef} className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200/50"
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Nombre completo"
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Juan Pérez"
                icon={FiUser}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "name"}
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                register={register}
                error={errors.email?.message}
                placeholder="juan@email.com"
                icon={FiMail}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "email"}
                required
              />

              <FormField
                label="WhatsApp"
                name="whatsapp"
                type="tel"
                register={register}
                error={errors.whatsapp?.message}
                placeholder="521234567890"
                icon={FiPhone}
                onFocus={() => setFocusedField("whatsapp")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "whatsapp"}
                required
              />

              <FormSelect
                label="Tipo de proyecto"
                name="projectType"
                register={register}
                error={errors.projectType?.message}
                options={projectTypes}
                icon={FiTarget}
                onFocus={() => setFocusedField("projectType")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "projectType"}
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
                placeholder="Describe el objetivo principal de tu proyecto, funcionalidades deseadas y cualquier detalle relevante..."
                rows={4}
                icon={FiTarget}
                onFocus={() => setFocusedField("objective")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "objective"}
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
                icon={FiCalendar}
                onFocus={() => setFocusedField("idealDate")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "idealDate"}
                required
              />

              <FormField
                label="Presupuesto estimado (MXN)"
                name="budget"
                type="number"
                register={register}
                error={errors.budget?.message}
                placeholder="70,000"
                icon={FiDollarSign}
                onFocus={() => setFocusedField("budget")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "budget"}
                required
              />
            </div>

            {/* Botón de envío */}
            <div className="mt-10">
              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-2xl bg-green px-8 py-5 text-lg font-bold text-white transition-all hover:shadow-2xl hover:shadow-green/30 disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <span>Obtener cotización</span>
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-700" />
              </motion.button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Los precios son aproximados. Te contactaremos en menos de 24
                horas.
              </p>
            </div>

            {/* Campos requeridos */}
            <div className="mt-6 text-xs text-gray-500 text-center border-t border-gray-100 pt-6">
              * Todos los campos son requeridos
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
