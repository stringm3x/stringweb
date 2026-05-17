"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

// Slide 6 — CTA Final con formulario
export default function GymCTA() {
  const [form, setForm] = useState({ name: "", gym: "", whatsapp: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.gym || !form.whatsapp) return;
    setStatus("loading");

    try {
      // Reutiliza el endpoint existente con campos mínimos
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: `gym-lead@stringwebs.com`, // placeholder — no requerido en este flujo
          whatsapp: form.whatsapp,
          projectType: "nivel3",
          objective: `Lead desde landing gimnasios. Gimnasio: ${form.gym}`,
          idealDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          budget: "28000",
        }),
      });

      if (!res.ok) throw new Error("Error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-black">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green-400/30" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-12 lg:px-20">
        <div className="slide-tag mb-8">
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.3em]">
            06 · Empezar
          </span>
        </div>

        {status === "success" ? (
          // ── Estado éxito ─────────────────────────────────────────────────
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-400 flex items-center justify-center mx-auto">
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
            <h2 className="font-black text-white uppercase text-4xl tracking-tight leading-tight">
              ¡Listo, {form.name.split(" ")[0]}!
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
              Te contactamos en menos de{" "}
              <span className="text-white font-bold">24 horas</span> para
              agendar tu diagnóstico gratuito.
            </p>
            <a
              href={`https://wa.me/525545524847?text=${encodeURIComponent(
                `Hola, soy ${form.name} de ${form.gym}. Acabo de solicitar un diagnóstico desde stringwebs.com/gimnasios.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-400 text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Contactar por WhatsApp
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          // ── Formulario ────────────────────────────────────────────────────
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Copy */}
            <div className="space-y-6">
              <h2
                className="slide-heading font-black text-white uppercase leading-[0.9] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                ¿Cuántos prospectos
                <br />
                perdió tu gimnasio
                <br />
                <span className="text-green-400">esta semana?</span>
              </h2>

              <p className="slide-sub text-gray-500 text-sm leading-relaxed">
                Sin costo. Sin compromiso.{" "}
                <span className="text-white">30 minutos.</span>
              </p>

              <div className="space-y-2">
                {[
                  "Sin promesas de resultados garantizados",
                  "Sin precio fijo sin diagnóstico previo",
                  "Sin plantillas genéricas",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-green-400/50" />
                    <span className="text-gray-600 text-xs font-mono">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="slide-item border border-white/10 p-8 space-y-5"
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
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    {field.label} <span className="text-green-400">*</span>
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green-400 transition-colors duration-200"
                  />
                </div>
              ))}

              {status === "error" && (
                <p className="text-red-400 text-xs font-mono">
                  Error al enviar. Intenta de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="slide-cta group w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-400 text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
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
                    Quiero mi diagnóstico gratuito
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        06
      </div>
    </div>
  );
}
