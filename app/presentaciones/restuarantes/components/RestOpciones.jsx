"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiCheckCircle, FiChevronDown } from "react-icons/fi";
import { sistemas } from "../rest-data";

function Features({ sistema }) {
  return (
    <div className="mt-4 space-y-3">
      <p className="text-white/50 text-sm leading-relaxed">
        {sistema.description}
      </p>
      <ul className="space-y-1.5">
        {sistema.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <FiCheckCircle className="text-green text-xs mt-0.5 flex-shrink-0" />
            <span className="text-white/60 text-xs leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RestOpciones() {
  const [activeId, setActiveId] = useState("n3");
  const [openId, setOpenId] = useState("n3");
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);
  const headerRefs = useRef([]);
  const cardRefs = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    Object.values(cardRefs.current).forEach(
      (c) => c && gsap.set(c, { opacity: 0, y: 24 })
    );
    headerRefs.current
      .filter(Boolean)
      .forEach((el) => gsap.set(el, { opacity: 0, y: 16 }));

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
        Object.values(cardRefs.current).filter(Boolean),
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    };
  }, []);

  const active = sistemas.find((s) => s.id === activeId);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-20 py-16">
        <div ref={(el) => (headerRefs.current[0] = el)} className="mb-2">
          <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
            03 · Las 3 opciones
          </span>
        </div>
        <h2
          ref={(el) => (headerRefs.current[1] = el)}
          className="font-black text-white uppercase leading-[0.9] tracking-tighter mb-2"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Elige según la etapa
          <br />
          <span className="text-green">de tu restaurante.</span>
        </h2>
        <p
          ref={(el) => (headerRefs.current[2] = el)}
          className="text-white/40 text-sm mb-8 hidden lg:block"
        >
          Pasa el cursor sobre cada opción para ver los detalles.
        </p>
        <p className="text-white/40 text-sm mb-8 lg:hidden">
          Toca cada opción para ver los detalles.
        </p>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.6fr] gap-px bg-white/5">
          <div className="flex flex-col gap-px bg-white/5">
            {sistemas.map((s) => {
              const isActive = activeId === s.id;
              return (
                <div
                  key={s.id}
                  ref={(el) => (cardRefs.current[s.id] = el)}
                  onMouseEnter={() => setActiveId(s.id)}
                  className={`bg-black px-6 py-5 cursor-default relative transition-colors duration-200 border-l-2 ${
                    isActive
                      ? "border-green bg-white/[0.03]"
                      : "border-transparent hover:border-green/30"
                  }`}
                >
                  {s.tag && (
                    <span className="absolute top-3 right-4 bg-green text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      ⭐ {s.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{s.icon || "🍽️"}</span>
                    <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                      {s.label}
                    </span>
                  </div>
                  <p
                    className={`font-black text-xl leading-none mb-1 transition-colors duration-200 ${
                      isActive ? "text-green" : "text-white/30"
                    }`}
                  >
                    {s.price}{" "}
                    <span className="text-xs font-normal text-gray">MXN</span>
                  </p>
                  <p className="text-[10px] font-mono text-gray">{s.tiempo}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-black p-8 flex flex-col justify-center min-h-[360px]">
            {active && <Features sistema={active} />}
          </div>
        </div>

        {/* Mobile acordeón */}
        <div className="lg:hidden space-y-2">
          {sistemas.map((s) => {
            const isOpen = openId === s.id;
            return (
              <div
                key={s.id}
                ref={(el) => (cardRefs.current[`m-${s.id}`] = el)}
                className={`border transition-colors duration-200 ${
                  isOpen ? "border-green/40" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                        {s.label}
                      </span>
                      {s.tag && (
                        <span className="bg-green text-black text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5">
                          ⭐ {s.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-black text-xl leading-none transition-colors duration-200 ${
                        isOpen ? "text-green" : "text-white/50"
                      }`}
                    >
                      {s.price}{" "}
                      <span className="text-xs font-normal text-gray">MXN</span>
                    </p>
                    <p className="text-[10px] font-mono text-gray mt-0.5">
                      {s.tiempo}
                    </p>
                  </div>
                  <FiChevronDown
                    className={`text-green flex-shrink-0 ml-2 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-6 border-t border-white/5">
                    <Features sistema={s} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        03
      </div>
    </div>
  );
}
