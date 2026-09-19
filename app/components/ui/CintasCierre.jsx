"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Las tres cintas negras del Cierre. Se desplazan unos píxeles con el
// scroll (parallax mínimo, scrub), cada una a distinta velocidad. Es solo
// fondo: aria-hidden y sin texto encima.
export function CintasCierre() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cintas = svgRef.current.querySelectorAll("[data-cinta]");
      cintas.forEach((cinta, i) => {
        gsap.fromTo(
          cinta,
          { y: 24 * (i + 1) },
          {
            y: -24 * (i + 1),
            ease: "none",
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <path
        data-cinta
        d="M 0 96 C 260 84 520 78 780 82 C 1000 86 1220 96 1440 112 L 1440 126 C 1220 110 1000 100 780 96 C 520 92 260 98 0 110 Z"
        className="fill-black"
      />
      <path
        data-cinta
        d="M 0 548 C 300 536 620 530 940 536 C 1140 540 1300 548 1440 558 L 1440 570 C 1300 560 1140 552 940 548 C 620 542 300 548 0 560 Z"
        className="fill-black"
      />
      <path
        data-cinta
        d="M 980 300 C 1120 292 1260 288 1400 290 L 1400 300 C 1260 298 1120 302 980 310 Z"
        className="fill-black"
      />
    </svg>
  );
}
