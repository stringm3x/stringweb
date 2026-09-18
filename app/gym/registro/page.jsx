import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { RegistroForm } from "./RegistroForm";

export const metadata = {
  title: "Registra tu gimnasio — STRING GYM",
  description:
    "Completa tus datos y empieza tu prueba gratuita de 14 días con Pro completo, sin tarjeta.",
  alternates: {
    canonical: "https://www.stringwebs.com/gym/registro",
  },
  openGraph: {
    title: "Registra tu gimnasio — STRING GYM",
    url: "https://www.stringwebs.com/gym/registro",
  },
  robots: {
    index: true,
    follow: false,
  },
};

// El id interno del plan Starter sigue siendo "basico": lo valida el SaaS
// externo (app.gym.stringwebs.com/api/solicitudes), no se puede cambiar acá.
// "starter" es el slug nuevo que usan los botones de /saas; "basico" se queda
// como alias para no romper enlaces viejos.
const PLAN_URL_A_INTERNO = {
  starter: "basico",
  basico: "basico",
  pro: "pro",
  escala: "escala",
};

export default async function RegistroPage({ searchParams }) {
  const sp = await searchParams;
  const planRaw = typeof sp?.plan === "string" ? sp.plan : "";
  const plan = PLAN_URL_A_INTERNO[planRaw] || "";

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 md:py-28">
      <Link
        href="/saas#gym-detalle"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray transition-colors hover:text-green"
      >
        <FiArrowLeft className="h-3.5 w-3.5" />
        Ver planes
      </Link>

      <div className="mb-10 mt-6 space-y-4">
        <h1 className="font-anton text-4xl uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl">
          Crea tu cuenta
        </h1>
        <p className="text-lg leading-relaxed text-gray">
          Déjanos tus datos y activamos tu prueba gratuita de 14 días con Pro
          completo. Sin tarjeta de crédito.
        </p>
      </div>

      <RegistroForm initialPlan={plan} />
    </section>
  );
}
