"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { productos } from "@/app/(sitio)/saas/saas-data";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";

gsap.registerPlugin(ScrollTrigger);

const gym = productos.find((p) => p.estado === "activo");
const proximamente = productos.filter((p) => p.estado === "proximamente");

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
          start: REVEAL_START,
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
          start: REVEAL_START,
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
          start: REVEAL_START,
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
      className="relative bg-black py-espacio-6 lg:py-espacio-7 overflow-hidden scroll-mt-20"
    >
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-4 space-y-6">
          <Etiqueta conPunto>
            Parte de STRING SaaS — sistemas por nicho con suscripción mensual
          </Etiqueta>

          <h2 className="font-anton text-titular-l text-white uppercase">
            Sistemas listos <span className="text-acido">para tu sector</span>
          </h2>

          <p className="text-tinta-suave text-cuerpo max-w-xl">
            Sin inversión de desarrollo. Sin contratos largos. Empieza en
            minutos.
          </p>

          <p className="text-tinta-suave text-cuerpo-s max-w-xl">
            STRING también tiene productos SaaS listos por nicho — para
            negocios que necesitan resultados ya sin esperar meses de
            desarrollo.
          </p>
        </div>

        {/* Card activa: STRING GYM */}
        <div ref={(el) => (cardsRef.current[0] = el)} className="mt-12">
          <TarjetaSistema
            kicker="SAAS · ACTIVO"
            precio="DESDE $799/MES"
            titulo={gym.nombre}
            frase={gym.desc}
            destacada
          >
            <Boton href="/saas" variante="primario">
              Ver sistema
              <FiArrowRight className="w-4 h-4" />
            </Boton>
          </TarjetaSistema>
        </div>

        {/* Cards próximamente */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {proximamente.map((p, i) => (
            <div key={p.id} ref={(el) => (cardsRef.current[i + 1] = el)}>
              <TarjetaSistema
                kicker="PRÓXIMAMENTE"
                titulo={p.nombre}
                frase={p.desc}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 text-center space-y-4">
          <p className="text-tinta-suave text-cuerpo-s">
            ¿Tu sector no está en la lista? Construimos sistemas a medida.
          </p>
          <Boton href="/cotizacion" variante="secundario">
            Diagnóstico gratuito
            <FiCheck className="w-4 h-4" />
          </Boton>
        </div>
      </div>
    </section>
  );
};

export default SaasSection;
