"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";
import { pagos, pasos } from "../rest-data";

export default function RestCTA() {
  const [form, setForm] = useState({ name: "", restaurante: "", whatsapp: "" });
  const [status, setStatus] = useState("idle");
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const pagosRef = useRef([]);
  const pasosRef = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    [...headerRefs.current, ...pagosRef.current, ...pasosRef.current]
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 20 }));
    gsap.set(formRef.current, { opacity: 0, y: 24 });

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
        pagosRef.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        pasosRef.current.filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        formRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    };
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.restaurante || !form.whatsapp) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: "rest-lead@stringwebs.com",
          whatsapp: form.whatsapp,
          projectType: "nivel3",
          objective: `Sistema Mesa N3. Restaurante: ${form.restaurante}`,
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

  const waUrl = `https://wa.me/525545524847?text=${encodeURIComponent(
    "Hola, quiero el Sistema Mesa para mi restaurante. Vi la propuesta de STRING."
  )}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/92" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        {status === "success" ? (
          <div className="text-center space-y-6 max-w-xl mx-auto">
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
              className="font-black text-white uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              ¡Listo, {form.name.split(" ")[0]}!
            </h2>
            <p className="text-gray leading-relaxed">
              Te contactamos en menos de{" "}
              <span className="text-white font-bold">24 horas</span> para
              arrancar.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Contactar por WhatsApp <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Izquierda */}
            <div className="space-y-8">
              <div ref={(el) => (headerRefs.current[0] = el)}>
                <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
                  07 · Inversión + Próximos pasos
                </span>
              </div>
              <h2
                ref={(el) => (headerRefs.current[1] = el)}
                className="font-black text-white uppercase leading-[0.88] tracking-tighter"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Sistema Mesa N3
                <br />
                <span className="text-green">$32,000 MXN</span>
              </h2>

              {/* Pagos */}
              <div className="grid grid-cols-2 gap-px bg-white/5">
                {pagos.map((p, i) => (
                  <div
                    key={i}
                    ref={(el) => (pagosRef.current[i] = el)}
                    className="bg-black p-5"
                  >
                    <p className="text-[10px] font-mono text-gold uppercase tracking-widest mb-2">
                      {p.label} · {p.porcentaje}
                    </p>
                    <p className="font-black text-white text-xl leading-none mb-1">
                      {p.monto}
                    </p>
                    <p className="text-white/30 text-xs leading-relaxed">
                      {p.cuando}
                    </p>
                  </div>
                ))}
              </div>

              {/* Próximos pasos */}
              <div className="space-y-0">
                <p
                  ref={(el) => (headerRefs.current[2] = el)}
                  className="text-[10px] font-mono text-gold uppercase tracking-widest mb-3"
                >
                  Próximos pasos
                </p>
                {pasos.map((p, i) => (
                  <div
                    key={i}
                    ref={(el) => (pasosRef.current[i] = el)}
                    className="flex gap-4 pb-4"
                  >
                    <span className="font-mono text-gold/50 text-xs w-6 flex-shrink-0 mt-0.5">
                      {p.num}
                    </span>
                    <div>
                      <p className="text-white text-sm font-bold">{p.titulo}</p>
                      <p className="text-white/30 text-xs mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="border border-white/10 p-6 sm:p-8 space-y-5"
            >
              <p className="text-[10px] font-mono text-gold uppercase tracking-widest">
                Solicitar el sistema
              </p>
              {[
                { name: "name", label: "Tu nombre", placeholder: "Juan Pérez" },
                {
                  name: "restaurante",
                  label: "Nombre del restaurante",
                  placeholder: "El Fogón",
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
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Enviando..."
                ) : (
                  <>
                    <span>Quiero el Sistema Mesa</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
              <div className="text-center">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-gray hover:text-white transition-colors duration-200 underline underline-offset-4"
                >
                  Tengo preguntas → WhatsApp
                </a>
              </div>
              <p className="text-center text-[10px] font-mono text-white/20 uppercase tracking-widest">
                Sin anticipo no arranca · Con anticipo, arrancamos en 48h
              </p>
            </form>
          </div>
        )}
      </div>
      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        07
      </div>
    </div>
  );
}
