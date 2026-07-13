import Link from "next/link";
import { FiArrowRight, FiCheck, FiCheckCircle } from "react-icons/fi";
import WaitlistForm from "./WaitlistForm";
import {
  productos,
  problema,
  problemaCierre,
  planes,
  comparativa,
  casoEvolutionGym,
} from "./saas-data";

export const metadata = {
  title: "STRING SaaS — Sistemas listos por nicho",
  description:
    "Sistemas listos por nicho, sin desarrollo desde cero. STRING GYM ya está activo — sistema completo de gestión para gimnasios desde $799/mes. Próximamente: STRING RESTO, CLINIC y BARBER.",
  alternates: {
    canonical: "https://www.stringwebs.com/saas",
  },
};

export default function SaasPage() {
  return (
    <div className="bg-black">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 sm:px-8 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
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
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
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
                    <span className="text-2xl">{p.emoji}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
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
            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.2em] rounded-sm">
              🏋️ STRING GYM
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
                        ⭐ Recomendado
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="text-green" />
                      <p className="font-mono text-xs uppercase tracking-widest text-gray">
                        {plan.nombre}
                      </p>
                    </div>
                    <p className="flex items-baseline gap-1 mb-6">
                      <span className="font-anton text-4xl tracking-tight text-white">
                        {plan.precio}
                      </span>
                      <span className="font-mono text-sm text-gray">
                        {plan.periodo}
                      </span>
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
                      className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide rounded-sm transition-colors duration-200 ${
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
          </div>

          {/* Comparativa */}
          <div className="space-y-6">
            <p className="text-[10px] font-mono text-green uppercase tracking-widest text-center">
              vs. la competencia
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-[10px] font-mono text-gray uppercase tracking-widest">
                      Diferenciador
                    </th>
                    <th className="text-left py-3 pr-4 text-[10px] font-mono text-gray uppercase tracking-widest">
                      vs. quién
                    </th>
                    <th className="text-left py-3 text-[10px] font-mono text-gray uppercase tracking-widest">
                      Dato concreto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparativa.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 pr-4 text-white font-semibold align-top">
                        {row.diferenciador}
                      </td>
                      <td className="py-3 pr-4 text-gray align-top whitespace-nowrap">
                        {row.vsQuien}
                      </td>
                      <td className="py-3 text-white/70 align-top">
                        {row.dato}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

            <div className="grid grid-cols-3 gap-px bg-white/5">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {casoEvolutionGym.modulos.map((m) => (
                <div key={m} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-green text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 border border-green/30 bg-green/5 p-10 md:p-14">
            <h3 className="font-anton text-3xl md:text-4xl text-white uppercase tracking-tight">
              14 días gratis. <span className="text-green">Sin tarjeta. Sin compromiso.</span>
            </h3>
            <Link
              href="/gym/registro"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors duration-200"
            >
              Crear mi cuenta
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-xs text-gray font-mono">
              Acceso inmediato · Cancela cuando quieras
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
            href="/Services"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wide rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Ver Sistemas a Medida
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}
