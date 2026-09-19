"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Mancha } from "@/app/components/Mancha";
import { PintarAlScroll } from "@/app/components/PintarAlScroll";

gsap.registerPlugin(ScrollTrigger);

const FILAS = [
  "Alguien pregunta por precio en Instagram y nadie responde a tiempo.",
  "La conversación se pierde entre cientos de chats.",
  "El interesado pide información, no recibe seguimiento y se enfría.",
  "Tu personal registra pagos en Excel, sin historial y sin control.",
  "Nadie sabe cuántos clientes están activos y cuántos ya vencieron.",
  "Dependes de tu memoria para operar el negocio.",
];

const MANCHA_LINEAS = ["NO ES FALTA DE DEMANDA.", "ES FALTA DE SISTEMA."];

const Problema = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const filasRef = useRef([]);
  const manchaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([tagRef.current, titleRef.current, manchaRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(filasRef.current.filter(Boolean), { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: REVEAL_START, once: true },
      });
      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

      gsap.to(filasRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: filasRef.current[0], start: REVEAL_START, once: true },
      });

      gsap.to(manchaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: manchaRef.current, start: REVEAL_START, once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-6 lg:px-24 py-espacio-6 lg:py-espacio-7"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={tagRef} className="mb-6">
          <Etiqueta variante="linea">El problema</Etiqueta>
        </div>

        <h2
          ref={titleRef}
          className="font-anton uppercase text-titular-l text-white mb-espacio-6 max-w-3xl"
        >
          Lo que hoy se te está perdiendo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {FILAS.map((texto, i) => (
            <div
              key={texto}
              ref={(el) => (filasRef.current[i] = el)}
              className="flex gap-4 py-6 border-t border-linea md:odd:pr-8 md:even:pl-8"
            >
              <span className="font-mono text-acido text-etiqueta flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-tinta-suave text-[17px] leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>

        <div ref={manchaRef} className="mt-espacio-6 lg:mt-espacio-7">
          <PintarAlScroll>
            <Mancha lineas={MANCHA_LINEAS} className="w-full h-auto" />
          </PintarAlScroll>
          <p className="sr-only">No es falta de demanda. Es falta de sistema.</p>
        </div>
      </div>
    </section>
  );
};

export default Problema;
