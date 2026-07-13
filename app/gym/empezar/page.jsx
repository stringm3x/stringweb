import Link from "next/link";
import { FiCheck, FiArrowRight, FiStar } from "react-icons/fi";

export const metadata = {
  title: "Empieza tu prueba gratis — STRING GYM",
  description:
    "Empieza tu prueba gratuita de 14 días de STRING GYM. Sin tarjeta de crédito.",
  alternates: {
    canonical: "https://www.stringwebs.com/gym/empezar",
  },
  openGraph: {
    title: "Empieza tu prueba gratis — STRING GYM",
    description:
      "Sistema completo de gestión para gimnasios. Desde $799/mes, 14 días gratis.",
    url: "https://www.stringwebs.com/gym/empezar",
  },
};

// El `id` es el valor interno del plan que viaja al CRM (?plan= y la solicitud):
// se mantiene "basico" aunque el plan se muestre como "Starter".
const PLANES = [
  {
    id: "basico",
    nombre: "Starter",
    precio: "$799",
    periodo: "/mes",
    destacado: false,
    features: [
      "Miembros ilimitados",
      "Check-in + QR + Kiosco self-service",
      "Caja + Inventario + POS",
      "Dashboard con gráficas",
      "Importación CSV con plantilla",
      "Onboarding guiado",
      "14 días gratis",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    precio: "$1,799",
    periodo: "/mes",
    destacado: true,
    features: [
      "Todo Starter, más:",
      "Sistema de clases con reservas",
      "Multiusuario con roles",
      "MercadoPago + OXXO + SPEI incluido",
      "API pública + SDK",
      "Portal del miembro",
      "Créditos y pagos a plazos",
      "Campañas masivas",
      "Saldo de productos",
      "Nutrición Nivel 1",
      "Retroalimentación de miembros",
    ],
  },
  {
    id: "escala",
    nombre: "Escala",
    precio: "$2,999",
    periodo: "/mes",
    destacado: false,
    features: [
      "Todo Pro, más:",
      "Web profesional conectada al CRM incluida",
      "WhatsApp automático",
      "Bot WhatsApp IA",
      "Inbox WhatsApp en el SaaS",
      "Kiosco de autoservicio",
      "Soporte prioritario",
    ],
  },
];

export default function EmpezarPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <span className="inline-flex items-center gap-2.5 rounded-sm border border-green/30 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
          14 días gratis
        </span>
        <h1 className="font-anton text-5xl uppercase leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl">
          Empieza tu prueba
          <br />
          <span className="text-green">gratuita de 14 días</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray">
          Elige el plan que mejor le queda a tu gimnasio. Sin compromisos, sin
          tarjeta de crédito.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 grid items-start gap-6 md:grid-cols-3">
        {PLANES.map((plan) => (
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
                Más popular
              </span>
            )}

            <div className="space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-gray">
                {plan.nombre}
              </p>
              <p className="flex items-baseline gap-1">
                <span className="font-anton text-5xl tracking-tight text-white">
                  {plan.precio}
                </span>
                <span className="font-mono text-sm text-gray">
                  {plan.periodo}
                </span>
              </p>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-white/80"
                >
                  <FiCheck className="mt-0.5 shrink-0 text-green" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/gym/registro?plan=${plan.id}`}
              className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                plan.destacado
                  ? "bg-green text-black hover:bg-white"
                  : "border border-white/15 text-white hover:border-green hover:text-green"
              }`}
            >
              Elegir {plan.nombre}
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      {/* Nota al pie */}
      <p className="mt-12 text-center font-mono text-xs text-gray">
        Sin tarjeta de crédito · Cancela cuando quieras
      </p>
    </section>
  );
}
