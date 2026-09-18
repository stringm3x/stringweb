import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiStar,
} from "react-icons/fi";
import { MdOutlineFitnessCenter } from "react-icons/md";
import WaitlistForm from "./WaitlistForm";
import {
  productos,
  problema,
  problemaCierre,
  planes,
  complementos,
  diferenciadores,
  casoEvolutionGym,
} from "./saas-data";

export const metadata = {
  title: "STRING SaaS — Sistemas listos por nicho",
  description:
    "Sistemas listos por nicho, sin desarrollo desde cero. STRING GYM ya está activo — sistema completo de gestión para gimnasios desde $799/mes. Próximamente: STRING BARBER, CLINIC y RESTO.",
  alternates: {
    canonical: "https://www.stringwebs.com/saas",
  },
  openGraph: {
    title: "STRING SaaS — Sistemas listos por nicho",
    description:
      "STRING GYM: sistema completo de gestión para gimnasios desde $799/mes. 14 días con Pro completo, sin tarjeta.",
    url: "https://www.stringwebs.com/saas",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "STRING GYM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.stringwebs.com/saas",
  description:
    "CRM y sistema de gestión para gimnasios mexicanos: socios, caja, inventario, WhatsApp automático y portal del socio.",
  offers: planes.map((p) => ({
    "@type": "Offer",
    name: p.nombre,
    price: p.precioMensual.replace(/[^0-9]/g, ""),
    priceCurrency: "MXN",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.precioMensual.replace(/[^0-9]/g, ""),
      priceCurrency: "MXN",
      billingDuration: "P1M",
    },
  })),
};

export default function SaasPage() {
  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 sm:px-8 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            STRING SaaS
          </span>
          <h1 className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-white uppercase">
            Sistemas listos <span className="text-green">para tu negocio</span>
          </h1>
          <p className="text-gray text-lg leading-relaxed max-w-xl mx-auto">
            Sin invertir en desarrollo desde cero. Sin contratos largos.
            Empieza en minutos.
          </p>
          <Link
            href="#productos"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
          >
            Ver productos
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* ── PRODUCTOS ────────────────────────────────────────────────────────── */}
      <section
        id="productos"
        className="px-6 sm:px-8 lg:px-12 py-20 md:py-28 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {productos.map((p) => {
              const activo = p.estado === "activo";
              return (
                <div
                  key={p.id}
                  className={`bg-black p-6 space-y-3 flex flex-col ${
                    activo ? "border border-green/40 bg-green/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p.icon className="text-2xl text-white/80" />
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                        activo
                          ? "bg-green text-black"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {activo ? "Activo" : "Próximamente"}
                    </span>
                  </div>
                  <h3
                    className={`font-anton text-xl tracking-tight ${
                      activo ? "text-white" : "text-white/50"
                    }`}
                  >
                    {p.nombre}
                  </h3>
                  <p className="text-gray text-xs leading-relaxed flex-1">
                    {p.desc}
                  </p>

                  {activo ? (
                    <>
                      <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                        {p.modulos}
                      </p>
                      <p className="text-white font-bold text-sm">
                        {p.precio}
                      </p>
                      <Link
                        href="#gym-detalle"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3 transition-all duration-200"
                      >
                        Conocer STRING GYM
                        <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </>
                  ) : (
                    <WaitlistForm producto={p.id} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETALLE STRING GYM ───────────────────────────────────────────────── */}
      <section
        id="gym-detalle"
        className="px-6 sm:px-8 lg:px-12 py-20 md:py-28 border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em]">
              <MdOutlineFitnessCenter className="text-sm" />
              STRING GYM
            </span>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl leading-[0.9] tracking-tighter text-white uppercase">
              El sistema completo <span className="text-green">para tu gimnasio</span>
            </h2>
          </div>

          {/* El problema */}
          <div className="space-y-6">
            <p className="text-[10px] font-mono text-green uppercase tracking-widest text-center">
              El problema
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
              {problema.map((p, i) => (
                <div key={i} className="bg-black p-5 flex items-start gap-3">
                  <span className="font-anton text-2xl text-white/10 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white/70 text-sm leading-relaxed pt-1">
                    {p}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center font-anton text-xl md:text-2xl text-white uppercase tracking-tight">
              {problemaCierre}
            </p>
          </div>

          {/* Planes */}
          <div className="space-y-8">
            <p className="text-[10px] font-mono text-green uppercase tracking-widest text-center">
              Planes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {planes.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col border p-8 ${
                      plan.destacado
                        ? "border-green bg-green/5"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    {plan.destacado && (
                      <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-green px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                        <FiStar className="text-xs" />
                        Recomendado
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="text-green" />
                      <p className="font-mono text-xs uppercase tracking-widest text-gray">
                        {plan.nombre}
                      </p>
                    </div>
                    <p className="text-white/60 text-xs mb-4">{plan.tagline}</p>
                    <p className="flex items-baseline gap-1">
                      <span className="font-anton text-4xl tracking-tight text-white">
                        {plan.precioMensual}
                      </span>
                      <span className="font-mono text-sm text-gray">/mes</span>
                    </p>
                    <p className="font-mono text-xs text-gray mb-6">
                      {plan.precioAnual}/año
                    </p>
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs text-white/80"
                        >
                          <FiCheck className="mt-0.5 shrink-0 text-green" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/gym/registro?plan=${plan.id}`}
                      className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                        plan.destacado
                          ? "bg-green text-black hover:bg-white"
                          : "border border-white/15 text-white hover:border-green hover:text-green"
                      }`}
                    >
                      Elegir {plan.nombre}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Complementos */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
              {complementos.map((c) => (
                <p key={c.nombre} className="font-mono text-xs text-gray">
                  <span className="text-white">{c.nombre}:</span> {c.precio}
                </p>
              ))}
            </div>
          </div>

          {/* Diferenciadores */}
          <div className="space-y-6">
            <p className="text-[10px] font-mono text-green uppercase tracking-widest text-center">
              Diferenciadores
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-white/10 p-6 md:p-8">
              {diferenciadores.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Caso real */}
          <div className="border border-white/10 p-8 md:p-10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="font-anton text-2xl text-white tracking-tight">
                Caso real: {casoEvolutionGym.nombre}
              </h3>
              <span className="px-3 py-1 bg-green/10 border border-green/30 text-green text-[10px] font-mono uppercase tracking-widest">
                {casoEvolutionGym.badge}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/5">
              {casoEvolutionGym.stats.map((s) => (
                <div key={s.label} className="bg-black px-4 py-6 text-center">
                  <p className="font-anton text-3xl text-green leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-gray uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-mono text-green uppercase tracking-widest">
                Activo hoy
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {casoEvolutionGym.activoHoy.map((m) => (
                  <div key={m} className="flex items-start gap-2.5">
                    <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {casoEvolutionGym.enDesarrollo.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray uppercase tracking-widest">
                  En desarrollo
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {casoEvolutionGym.enDesarrollo.map((m) => (
                    <div key={m} className="flex items-start gap-2.5">
                      <FiClock className="text-white/40 text-sm mt-0.5 flex-shrink-0" />
                      <span className="text-white/50 text-sm leading-relaxed">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 border border-green/30 bg-green/5 p-10 md:p-14">
            <h3 className="font-anton text-3xl md:text-4xl text-white uppercase tracking-tight">
              14 días con Pro completo. <span className="text-green">Sin tarjeta.</span>
            </h3>
            <Link
              href="/gym/registro"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Crear mi cuenta
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-xs text-gray font-mono">
              Te contactamos en menos de 24 horas · Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL — Sistemas a medida ────────────────────────────────────── */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 md:py-28 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="font-anton text-3xl md:text-4xl text-white uppercase tracking-tight">
            ¿Tu negocio necesita algo más específico?
          </h3>
          <p className="text-gray text-sm leading-relaxed max-w-xl mx-auto">
            Construimos sistemas a medida para negocios con requerimientos
            personalizados.
          </p>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wide hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Ver Sistemas a Medida
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}
