"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SOCIOS_CARGADOS,
  SOCIOS_ACTIVOS,
  SAAS_EN_PRODUCCION,
  DIAGNOSTICO_INICIAL,
} from "@/app/lib/stats";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { FranjaDatos } from "@/app/components/ui/FranjaDatos";
import { prefersReducedMotion } from "@/app/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const STATS_ESCRITORIO = [
  { value: SOCIOS_CARGADOS, label: "Socios cargados" },
  { value: SOCIOS_ACTIVOS, label: "Activos hoy" },
  { value: SAAS_EN_PRODUCCION, label: "SaaS en producción" },
  { value: DIAGNOSTICO_INICIAL, label: "Diagnóstico inicial" },
];

const STATS_CELULAR = [
  { value: SOCIOS_CARGADOS, label: "Cargados" },
  { value: SOCIOS_ACTIVOS, label: "Activos" },
  { value: DIAGNOSTICO_INICIAL, label: "Diagnóstico" },
];

const CLIP_ESCRITORIO =
  "M 36 604 C 240 566 470 520 700 462 C 930 404 1180 348 1436 306 L 1440 474 C 1180 516 930 572 700 632 C 470 692 240 740 44 762 Z";
const CLIP_MOVIL =
  "M -8 392 C 70 374 158 350 248 322 C 310 302 356 288 398 276 L 398 396 C 352 408 306 424 244 444 C 154 472 66 496 -8 514 Z";

// ─── Componente ───────────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const franjaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [svgRef.current, tagRef.current, descRef.current, ctaRef.current, franjaRef.current],
        { opacity: 0, y: 20 }
      );

      // La brochada se pinta de izquierda a derecha después de que entra el titular.
      const brochadas = svgRef.current.querySelectorAll("[data-brochada]");
      gsap.set(brochadas, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(svgRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .to(brochadas, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }, "-=0.35")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(franjaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
    }, sectionRef);

    // Solo con puntero fino y sin movimiento reducido: la brochada sigue al
    // cursor unos píxeles (el texto blanco se queda quieto, así el negro
    // "se pinta" distinto según dónde esté el mouse).
    let quitarParallax = () => {};
    if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion()) {
      const brochadas = svgRef.current.querySelectorAll("[data-brochada]");
      const moverX = gsap.quickTo(brochadas, "x", { duration: 0.6, ease: "power3.out" });
      const moverY = gsap.quickTo(brochadas, "y", { duration: 0.6, ease: "power3.out" });
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        moverX(nx * 24);
        moverY(ny * 12);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      quitarParallax = () => window.removeEventListener("mousemove", onMove);
    }

    return () => {
      quitarParallax();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden">
      {/* h1 real, para lectores de pantalla — el titular visible vive en el SVG */}
      <h1 className="sr-only">
        No necesitas más seguidores. Necesitas un sistema.
      </h1>

      <div className="pt-32 md:pt-40">
        {/* Kicker */}
        <div ref={tagRef} className="px-6 lg:px-24 mb-8 md:mb-12">
          <Etiqueta variante="linea">Sistemas de conversión · CDMX</Etiqueta>
        </div>

        {/* Titular en SVG */}
        <div ref={svgRef}>
          <svg
            viewBox="0 260 1440 540"
            aria-hidden="true"
            className="hidden md:block w-full h-auto"
          >
            <defs>
              <clipPath id="hero-clip-escritorio">
                <path d={CLIP_ESCRITORIO} />
              </clipPath>
            </defs>
            <text
              fontFamily="var(--font-anton-sans)"
              fontSize="104"
              letterSpacing="0.01em"
              className="fill-tinta"
            >
              <tspan x="96" y="392">NO NECESITAS</tspan>
              <tspan x="96" y="488">MÁS SEGUIDORES.</tspan>
              <tspan x="96" y="584">NECESITAS UN SISTEMA.</tspan>
            </text>
            <g data-brochada>
              <path d={CLIP_ESCRITORIO} className="fill-acido" />
            <g className="fill-black">
              <path d="M 1150 356 C 1240 342 1330 328 1424 316 L 1426 332 C 1332 344 1242 358 1152 372 Z" />
              <path d="M 980 428 C 1040 418 1098 408 1156 398 L 1158 408 C 1100 418 1042 428 982 438 Z" />
              <path d="M 120 690 C 220 676 322 660 420 642 L 422 654 C 324 672 222 688 122 702 Z" />
              <path d="M 640 540 C 700 530 760 518 818 506 L 820 514 C 762 526 702 538 642 548 Z" />
            </g>
            <text
              fontFamily="var(--font-anton-sans)"
              fontSize="104"
              letterSpacing="0.01em"
              className="fill-black"
              clipPath="url(#hero-clip-escritorio)"
            >
              <tspan x="96" y="392">NO NECESITAS</tspan>
              <tspan x="96" y="488">MÁS SEGUIDORES.</tspan>
              <tspan x="96" y="584">NECESITAS UN SISTEMA.</tspan>
            </text>
            </g>
          </svg>

          <svg
            viewBox="0 250 390 310"
            aria-hidden="true"
            className="md:hidden w-full h-auto"
          >
            <defs>
              <clipPath id="hero-clip-movil">
                <path d={CLIP_MOVIL} />
              </clipPath>
            </defs>
            <text
              fontFamily="var(--font-anton-sans)"
              fontSize="46"
              letterSpacing="0.01em"
              className="fill-tinta"
            >
              <tspan x="24" y="300">NO NECESITAS</tspan>
              <tspan x="24" y="344">MÁS SEGUIDORES.</tspan>
              <tspan x="24" y="388">NECESITAS UN</tspan>
              <tspan x="24" y="432">SISTEMA.</tspan>
            </text>
            <g data-brochada>
              <path d={CLIP_MOVIL} className="fill-acido" />
            <g className="fill-black">
              <path d="M 250 338 C 300 324 348 310 394 298 L 394 308 C 348 320 300 334 250 348 Z" />
              <path d="M 20 452 C 80 440 142 424 200 408 L 200 416 C 142 432 80 448 20 460 Z" />
            </g>
            <text
              fontFamily="var(--font-anton-sans)"
              fontSize="46"
              letterSpacing="0.01em"
              className="fill-black"
              clipPath="url(#hero-clip-movil)"
            >
              <tspan x="24" y="300">NO NECESITAS</tspan>
              <tspan x="24" y="344">MÁS SEGUIDORES.</tspan>
              <tspan x="24" y="388">NECESITAS UN</tspan>
              <tspan x="24" y="432">SISTEMA.</tspan>
            </text>
            </g>
          </svg>
        </div>

        {/* Bajada */}
        <div ref={descRef} className="px-6 lg:px-24 mt-8 md:mt-10">
          <p className="hidden md:block max-w-2xl text-cuerpo-l text-tinta-suave">
            El sistema trabaja aunque tu negocio no esté disponible. Captamos,
            registramos y damos seguimiento a cada prospecto — sin que
            dependas de tu memoria.
          </p>
          <p className="md:hidden text-cuerpo text-tinta-suave">
            El sistema trabaja aunque tu negocio no esté disponible.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="px-6 lg:px-24 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <Boton href="/cotizacion" variante="primario" className="w-full sm:w-auto">
            Solicitar diagnóstico
          </Boton>
          <Boton
            href="/gym/registro?plan=pro"
            variante="secundario"
            className="w-full sm:w-auto"
          >
            Probar STRING GYM
          </Boton>
        </div>

        {/* Franja de cifras */}
        <div ref={franjaRef} className="mt-espacio-6 md:mt-espacio-7">
          <div className="hidden md:block">
            <FranjaDatos datos={STATS_ESCRITORIO} compacta />
          </div>
          <div className="md:hidden">
            <FranjaDatos datos={STATS_CELULAR} compacta />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
