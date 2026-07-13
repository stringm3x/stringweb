"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor-hover]';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    // xPercent/yPercent centran el cursor sobre el punto real; se componen
    // con x/y (animados abajo) en la misma matriz de transform de GSAP, así
    // que no hace falta (ni conviene) usar las clases de traslado de Tailwind
    // aquí — GSAP ya escribe su propio `transform` inline en cada frame.
    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

    const setDotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    // El scale se anima con GSAP (no con clases de Tailwind): quickTo ya
    // escribe x/y en el transform inline del elemento en cada frame, así que
    // una clase `scale-*` de Tailwind nunca ganaría esa pelea de especificidad.
    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        gsap.to(ringRef.current, { scale: 1.5, duration: 0.2, ease: "power2.out" });
        ringRef.current?.classList.add("border-green", "bg-green/10");
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        gsap.to(ringRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
        ringRef.current?.classList.remove("border-green", "bg-green/10");
      }
    };
    const onLeave = () => gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-green"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 rounded-full border border-white/40 transition-[background-color,border-color] duration-200"
      />
    </>
  );
}
