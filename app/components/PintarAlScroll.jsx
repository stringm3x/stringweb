"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";

gsap.registerPlugin(ScrollTrigger);

// Envuelve una ilustración o mancha: cuando entra en pantalla, todo lo que
// lleve [data-brochada] adentro se pinta de izquierda a derecha, una sola
// vez. Con movimiento reducido GSAP lo resuelve al instante.
export function PintarAlScroll({
  children,
  className = "",
  duracion = 1,
  escalonado = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const brochadas = ref.current.querySelectorAll("[data-brochada]");
      if (!brochadas.length) return;
      gsap.set(brochadas, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(brochadas, {
        clipPath: "inset(0 0% 0 0)",
        duration: duracion,
        stagger: escalonado,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ref.current, start: REVEAL_START, once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [duracion, escalonado]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
