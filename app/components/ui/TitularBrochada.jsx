"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";

gsap.registerPlugin(ScrollTrigger);

// Geometría normalizada (0..1) de cada brochada y sus trazos negros.
// Se estira al tamaño del bloque de texto con preserveAspectRatio="none",
// así que la misma forma sirve para 2 o 4 líneas y para cualquier ancho.
const FORMAS = {
  // Una diagonal que sube de izquierda a derecha (la del hero).
  diagonal: {
    brochada:
      "M 0 0.6 C 0.22 0.55 0.46 0.45 0.7 0.34 C 0.82 0.29 0.92 0.24 1 0.2 L 1 0.52 C 0.9 0.56 0.8 0.61 0.7 0.66 C 0.46 0.77 0.22 0.87 0 0.94 Z",
    trazos: [
      "M 0.6 0.39 C 0.7 0.35 0.8 0.31 0.9 0.28 L 0.905 0.3 C 0.805 0.33 0.705 0.37 0.605 0.41 Z",
      "M 0.05 0.8 C 0.15 0.76 0.25 0.72 0.35 0.68 L 0.355 0.7 C 0.255 0.74 0.155 0.78 0.055 0.82 Z",
    ],
  },
  // Dos pasadas encimadas, como un tachón hecho a mano.
  tachon: {
    brochada:
      "M 0 0.48 C 0.3 0.44 0.6 0.38 1 0.28 L 1 0.54 C 0.6 0.64 0.3 0.7 0 0.74 Z M 0.04 0.68 C 0.34 0.64 0.68 0.58 1 0.5 L 1 0.78 C 0.68 0.86 0.34 0.92 0.04 0.96 Z",
    trazos: [
      "M 0.5 0.42 C 0.65 0.39 0.8 0.36 0.95 0.32 L 0.955 0.34 C 0.805 0.38 0.655 0.41 0.505 0.44 Z",
    ],
  },
  // Una mancha ancha que cubre casi todo el bloque; el texto queda negro.
  mancha: {
    brochada:
      "M 0.02 0.3 C 0.2 0.16 0.5 0.1 0.8 0.14 C 0.95 0.16 1.01 0.3 0.99 0.46 C 0.97 0.66 0.92 0.86 0.72 0.92 C 0.46 0.98 0.14 0.96 0.04 0.82 C -0.02 0.66 -0.02 0.44 0.02 0.3 Z",
    trazos: [
      "M 0.12 0.24 C 0.3 0.2 0.5 0.18 0.7 0.2 L 0.7 0.23 C 0.5 0.21 0.3 0.23 0.12 0.27 Z",
      "M 0.3 0.86 C 0.5 0.84 0.7 0.8 0.88 0.72 L 0.885 0.745 C 0.705 0.825 0.505 0.865 0.3 0.885 Z",
    ],
  },
  // Un trazo corto abajo a la derecha: solo toca la última línea.
  corta: {
    brochada:
      "M 0.34 0.7 C 0.55 0.64 0.78 0.58 1 0.5 L 1 0.8 C 0.78 0.86 0.56 0.92 0.38 0.98 Z",
    trazos: [
      "M 0.6 0.72 C 0.72 0.69 0.84 0.65 0.96 0.6 L 0.965 0.62 C 0.845 0.67 0.725 0.71 0.605 0.74 Z",
    ],
  },
};

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
  tamano = "xl",
  forma = "diagonal",
  className = "",
}) {
  const id = `brochada-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { brochada: BROCHADA, trazos: TRAZOS } = FORMAS[forma] || FORMAS.diagonal;
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

  // "xl" crece a titular-xl en escritorio; "l" se queda en titular-l para
  // titulares largos que no caben en una línea.
  const clasesTexto = `font-anton uppercase text-titular-l ${
    tamano === "xl" ? "md:text-titular-xl" : ""
  }`.trim();

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
