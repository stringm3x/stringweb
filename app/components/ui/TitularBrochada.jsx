"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";

gsap.registerPlugin(ScrollTrigger);

// Geometría normalizada (0..1) de la brochada diagonal y sus dos trazos.
// Se estira al tamaño del bloque de texto con preserveAspectRatio="none",
// así que la misma forma sirve para 2 o 4 líneas y para cualquier ancho.
const BROCHADA =
  "M 0 0.6 C 0.22 0.55 0.46 0.45 0.7 0.34 C 0.82 0.29 0.92 0.24 1 0.2 L 1 0.52 C 0.9 0.56 0.8 0.61 0.7 0.66 C 0.46 0.77 0.22 0.87 0 0.94 Z";
const TRAZOS = [
  "M 0.6 0.39 C 0.7 0.35 0.8 0.31 0.9 0.28 L 0.905 0.3 C 0.805 0.33 0.705 0.37 0.605 0.41 Z",
  "M 0.05 0.8 C 0.15 0.76 0.25 0.72 0.35 0.68 L 0.355 0.7 C 0.255 0.74 0.155 0.78 0.055 0.82 Z",
];

// Titular Anton en HTML real cruzado por una brochada acido: el texto se
// vuelve negro solo donde pasa la brochada. La copia negra es aria-hidden y
// se recorta con un clipPath en coordenadas del bounding box del texto, por
// lo que siempre coincide con la brochada dibujada detrás.
export function TitularBrochada({
  lineas,
  as: Tag = "h1",
  animar = true,
  disparo = "montaje",
  retraso = 0,
  className = "",
}) {
  const id = `brochada-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const raizRef = useRef(null);
  const brochadaRef = useRef(null);
  const lineasRef = useRef([]);
  const copiaRef = useRef([]);

  useEffect(() => {
    if (!animar) return;

    const ctx = gsap.context(() => {
      const lineasVisibles = lineasRef.current.filter(Boolean);
      const lineasCopia = copiaRef.current.filter(Boolean);
      gsap.set([...lineasVisibles, ...lineasCopia], { opacity: 0, y: 24 });
      gsap.set(brochadaRef.current, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        delay: retraso,
        scrollTrigger:
          disparo === "scroll"
            ? { trigger: raizRef.current, start: REVEAL_START, once: true }
            : undefined,
      });

      // El titular sube línea por línea y la brochada se pinta de izquierda a derecha.
      const subida = { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" };
      tl.to(lineasVisibles, subida)
        .to(lineasCopia, subida, "<")
        .to(
          brochadaRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" },
          "-=0.35"
        );
    }, raizRef);

    return () => ctx.revert();
  }, [animar, disparo, retraso]);

  const clasesTexto = "font-anton uppercase text-titular-l md:text-titular-xl";

  return (
    <div ref={raizRef} className={`relative inline-block max-w-full ${className}`.trim()}>
      <svg
        ref={brochadaRef}
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <path d={BROCHADA} className="fill-acido" />
        {TRAZOS.map((d) => (
          <path key={d} d={d} className="fill-black" />
        ))}
      </svg>

      <Tag className={`relative ${clasesTexto} text-tinta`}>
        {lineas.map((linea, i) => (
          <span
            key={linea}
            ref={(el) => (lineasRef.current[i] = el)}
            className="block"
          >
            {linea}
          </span>
        ))}
      </Tag>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${clasesTexto} text-black`}
        style={{ clipPath: `url(#${id})` }}
      >
        {lineas.map((linea, i) => (
          <span
            key={linea}
            ref={(el) => (copiaRef.current[i] = el)}
            className="block"
          >
            {linea}
          </span>
        ))}
      </div>

      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={BROCHADA} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
