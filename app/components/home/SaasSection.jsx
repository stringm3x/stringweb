"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiCheck } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const proximamente = [
  {
    emoji: "🍽️",
    nombre: "STRING RESTO",
    desc: "Sistema para restaurantes: mesas, órdenes, caja, inventario.",
  },
  {
    emoji: "🏥",
    nombre: "STRING CLINIC",
    desc: "Sistema para clínicas: agenda, expediente, cobros, recordatorios.",
  },
  {
    emoji: "✂️",
    nombre: "STRING BARBER",
    desc: "Sistema para barberías: agenda, clientes frecuentes, caja.",
  },
];

const SaasSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 24 });
      gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="saas"
      ref={sectionRef}
      className="relative bg-black py-24 md:py-32 overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-green/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-4 space-y-6">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            Parte de STRING SaaS — sistemas por nicho con suscripción mensual
          </span>

          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-white uppercase">
            Sistemas listos <span className="text-green">para tu sector</span>
          </h2>

          <p className="text-gray text-lg leading-relaxed max-w-xl">
            Sin inversión de desarrollo. Sin contratos largos. Empieza en
            minutos.
          </p>

          <p className="text-gray text-sm leading-relaxed max-w-xl">
            STRING también tiene productos SaaS listos por nicho — para
            negocios que necesitan resultados ya sin esperar meses de
            desarrollo.
          </p>
        </div>

        {/* Card activa: STRING GYM */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="mt-12 border border-green/40 bg-green/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-anton text-2xl text-white tracking-tight">
                STRING GYM
              </span>
              <span className="px-2 py-0.5 bg-green text-black text-[10px] font-bold uppercase tracking-widest rounded-sm">
                Activo
              </span>
            </div>
            <p className="text-gray text-sm leading-relaxed max-w-md">
              Sistema completo de gestión para gimnasios.
            </p>
            <p className="text-white font-bold text-sm">
              $799/mes <span className="text-gray font-normal">· Prueba gratis 14 días</span>
            </p>
          </div>

          <Link
            href="/saas"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            Ver sistema
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Cards próximamente */}
        <div className="mt-px grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
          {proximamente.map((p, i) => (
            <div
              key={p.nombre}
              ref={(el) => (cardsRef.current[i + 1] = el)}
              className="bg-black p-6 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.emoji}</span>
                <span className="font-anton text-base text-white/50 tracking-tight">
                  {p.nombre}
                </span>
              </div>
              <p className="text-gray text-xs leading-relaxed">{p.desc}</p>
              <span className="inline-block text-[10px] font-mono text-white/30 uppercase tracking-widest pt-1">
                Próximamente
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 text-center space-y-4">
          <p className="text-gray text-sm">
            ¿Tu sector no está en la lista? Construimos sistemas a medida.
          </p>
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Diagnóstico gratuito
            <FiCheck className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaasSection;
