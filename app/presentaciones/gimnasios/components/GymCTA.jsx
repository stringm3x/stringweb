"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";

export default function GymCTA() {
  const [form, setForm] = useState({ name: "", gym: "", whatsapp: "" });
  const [status, setStatus] = useState("idle");

  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const calcRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(headerRefs.current.filter(Boolean), { opacity: 0, y: 24 });
    gsap.set(calcRef.current, { opacity: 0, y: 16 });
    gsap.set(formRef.current, { opacity: 0, y: 24 });

    container.__animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline();
      tl.to(headerRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });
      tl.to(
        calcRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        formRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    };
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.gym || !form.whatsapp) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: "gym-lead@stringwebs.com",
          whatsapp: form.whatsapp,
          projectType: "nivel3",
          objective: `Diagnóstico desde presentación gimnasios. Gimnasio: ${form.gym}`,
          idealDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          budget: "32000",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-green/30" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        {status === "success" ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green flex items-center justify-center mx-auto">
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
            <h2
              className="font-black text-white uppercase leading-tight tracking-tighter"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              ¡Listo, {form.name.split(" ")[0]}!
            </h2>
            <p className="text-gray text-lg max-w-md mx-auto leading-relaxed">
              Te contactamos en menos de{" "}
              <span className="text-white font-bold">24 horas</span> para
              agendar tu diagnóstico.
            </p>
            <a
              href={`https://wa.me/525545524847?text=${encodeURIComponent(
                `Hola, soy ${form.name} de ${form.gym}. Acabo de solicitar un diagnóstico desde la presentación de STRING.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Contactar por WhatsApp
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Copy */}
            <div className="space-y-6">
              <div ref={(el) => (headerRefs.current[0] = el)}>
                <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
                  07 · Empezar
                </span>
              </div>

              <h2
                ref={(el) => (headerRefs.current[1] = el)}
                className="font-black text-white uppercase leading-[0.88] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
              >
                ¿Cuántos prospectos
                <br />
                perdió tu gimnasio
                <br />
                <span className="text-green">esta semana?</span>
              </h2>

              {/* Calculador */}
              <div
                ref={calcRef}
                className="border border-white/10 p-5 space-y-3"
              >
                <p className="text-[10px] font-mono text-green uppercase tracking-widest">
                  El costo real del desorden
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Si pierdes{" "}
                  <span className="text-white font-bold">
                    10 prospectos por semana
                  </span>{" "}
                  y cada membresía vale{" "}
                  <span className="text-white font-bold">$600/mes</span> —
                </p>
                <p className="font-black text-white text-2xl leading-none">
                  $72,600{" "}
                  <span className="text-sm font-normal text-gray">
                    al año que se van por falta de sistema.
                  </span>
                </p>
              </div>

              <div ref={(el) => (headerRefs.current[2] = el)}>
                <p className="text-white/30 text-xs leading-relaxed font-mono italic">
                  "No es una llamada de ventas. Es un diagnóstico real de cómo
                  está operando tu gimnasio hoy."
                </p>
              </div>
            </div>

            {/* Formulario */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="border border-white/10 p-6 sm:p-8 space-y-5"
            >
              {[
                { name: "name", label: "Tu nombre", placeholder: "Juan Pérez" },
                {
                  name: "gym",
                  label: "Nombre del gimnasio",
                  placeholder: "Evolution GYM",
                },
                {
                  name: "whatsapp",
                  label: "WhatsApp",
                  placeholder: "521234567890",
                  type: "tel",
                },
              ].map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
                    {field.label} <span className="text-green">*</span>
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200"
                  />
                </div>
              ))}

              {status === "error" && (
                <p className="text-red text-xs font-mono">
                  Error al enviar. Intenta de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
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
                    Enviando...
                  </span>
                ) : (
                  <>
                    Quiero saber cuánto está perdiendo mi gimnasio
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-widest">
                Sin costo · Sin compromiso · 30 minutos
              </p>
            </form>
          </div>
        )}
      </div>

      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        06
      </div>
    </div>
  );
}
