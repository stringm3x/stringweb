"use client";

import gsap from "gsap";

let initialized = false;

// Todos los tweens GSAP del sitio cuelgan de gsap.globalTimeline por default
// (ningún archivo pasa un timeline propio). Colapsar su timeScale acá los
// resuelve casi instantáneamente para quien prefiere menos movimiento, sin
// tener que tocar cada uno de los componentes que animan con GSAP.
export function initMotionPreferences() {
  if (initialized) return;
  initialized = true;

  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.globalTimeline.timeScale(50);
    return () => gsap.globalTimeline.timeScale(1);
  });
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
