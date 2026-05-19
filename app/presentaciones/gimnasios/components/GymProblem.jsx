"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const external = [
  {
    number: "01",
    trigger: "Prospecto manda DM a las 11pm preguntando por membresías",
    result: "Al día siguiente ya se inscribió en el gimnasio de enfrente.",
  },
  {
    number: "02",
    trigger: "Preguntan precio por WhatsApp entre 200 mensajes sin leer",
    result: "Nadie responde. El prospecto asume que no les importa.",
  },
  {
    number: "03",
    trigger: "Interesado pide info de clases y horarios",
    result: '"Te mandamos info" — y nunca llega nada.',
  },
  {
    number: "04",
    trigger: "Lugar disponible en clase de las 7am",
    result: "Nadie lo sabe. El lugar queda vacío y el ingreso se pierde.",
  },
];

const internal = [
  {
    number: "05",
    trigger: "El staff anota los pagos en Excel, en papel, o de memoria",
    result: "Sin saber quién debe, quién venció, quién va a cancelar.",
  },
  {
    number: "06",
    trigger: "Fin de mes — ¿cuántos miembros activos tienes exactamente?",
    result: "Nadie tiene el número exacto. Se opera a ciegas.",
  },
];

export default function GymProblem() {
  const containerRef = useRef(null);
  const externalRefs = useRef([]);
  const internalRefs = useRef([]);
  const headerRefs = useRef([]);
  const closeRef = useRef(null);
  const hasAnimated = useRef(false);

  // Esta función la llama GymLanding cuando el slide entra en vista
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Exponer función de animación al contenedor para que GymLanding la llame
    container.__animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline();

      // Header
      tl.fromTo(
        headerRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }
      );

      // Externos — cascada dramática
      tl.fromTo(
        externalRefs.current.filter(Boolean),
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // Internos
      tl.fromTo(
        internalRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.45, ease: "power3.out" },
        "-=0.1"
      );

      // Cierre
      tl.fromTo(
        closeRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );
    };

    // Hover en cards — highlight
    const allCards = [
      ...externalRefs.current.filter(Boolean),
      ...internalRefs.current.filter(Boolean),
    ];

    allCards.forEach((card) => {
      const result = card.querySelector(".card-result");
      const trigger = card.querySelector(".card-trigger");
      const line = card.querySelector(".card-line");

      card.addEventListener("mouseenter", () => {
        gsap.to(result, { color: "#ffffff", duration: 0.2 });
        gsap.to(trigger, { color: "rgba(255,255,255,0.7)", duration: 0.2 });
        gsap.to(line, { width: "100%", duration: 0.4, ease: "power2.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(result, { color: "rgba(255,255,255,0.9)", duration: 0.2 });
        gsap.to(trigger, { color: "rgba(255,255,255,0.4)", duration: 0.2 });
        gsap.to(line, { width: "0%", duration: 0.3 });
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #50ff05 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-12 lg:px-20">
        {/* Tag + Headline + Sub */}
        <div
          ref={(el) => (headerRefs.current[0] = el)}
          className="mb-2"
          style={{ opacity: 0 }}
        >
          <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
            02 · El problema
          </span>
        </div>

        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-2"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", opacity: 0 }}
        >
          La mayoría de gimnasios tiene más
          <br />
          demanda de la que cree.
        </h2>

        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-gray text-sm leading-relaxed mb-6 max-w-2xl"
          style={{ opacity: 0 }}
        >
          El problema no es conseguir interesados —
          <span className="text-white"> es lo que pasa después.</span>
        </p>

        {/* Externos */}
        <p
          ref={(el) => (headerRefs.current[3] = el)}
          className="text-[10px] font-mono text-gray uppercase tracking-[0.25em] mb-2"
          style={{ opacity: 0 }}
        >
          Afuera — captación
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-px">
          {external.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => (externalRefs.current[i] = el)}
              className="bg-black px-5 py-6 cursor-default relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                {p.number}
              </span>
              <p className="card-trigger text-white/40 text-xs font-mono leading-relaxed mb-3 pr-6 transition-colors duration-200">
                {p.trigger}
              </p>
              <p className="card-result text-white/90 font-bold text-sm leading-snug transition-colors duration-200">
                {p.result}
              </p>
              {/* Línea animada en hover */}
              <div
                className="card-line absolute bottom-0 left-0 h-px bg-green"
                style={{ width: "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Internos */}
        <p
          ref={(el) => (headerRefs.current[4] = el)}
          className="text-[10px] font-mono text-gray uppercase tracking-[0.25em] mb-2 mt-3"
          style={{ opacity: 0 }}
        >
          Adentro — operación
        </p>

        <div className="grid grid-cols-2 gap-px bg-white/5">
          {internal.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => (internalRefs.current[i] = el)}
              className="bg-black px-5 py-6 cursor-default relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <span className="absolute top-3 right-3 font-black text-white/[0.04] text-4xl leading-none select-none">
                {p.number}
              </span>
              <p className="card-trigger text-white/40 text-xs font-mono leading-relaxed mb-3 pr-6 transition-colors duration-200">
                {p.trigger}
              </p>
              <p className="card-result text-white/90 font-bold text-sm leading-snug transition-colors duration-200">
                {p.result}
              </p>
              <div
                className="card-line absolute bottom-0 left-0 h-px bg-red/50"
                style={{ width: "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Cierre */}
        <div
          ref={closeRef}
          className="mt-6 border-l-2 border-green pl-5"
          style={{ opacity: 0 }}
        >
          <p className="text-white/50 text-sm leading-relaxed">
            No es que tu gimnasio no funcione.
          </p>
          <p className="text-white font-bold text-sm leading-relaxed">
            Es que está operando sin sistema — y eso tiene un costo real todos
            los días.
          </p>
        </div>
      </div>

      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        02
      </div>
    </div>
  );
}
