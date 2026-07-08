import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { RegistroForm } from "./RegistroForm";

export const metadata = {
  title: "Registra tu gimnasio — STRING GYM",
  description:
    "Completa tus datos y empieza tu prueba gratuita de 14 días de STRING GYM.",
};

const PLANES_VALIDOS = ["basico", "pro", "escala"];

export default async function RegistroPage({ searchParams }) {
  const sp = await searchParams;
  const planRaw = typeof sp?.plan === "string" ? sp.plan : "";
  const plan = PLANES_VALIDOS.includes(planRaw) ? planRaw : "";

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 md:py-28">
      <Link
        href="/gym/empezar"
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
          Déjanos tus datos y activamos tu prueba gratuita de 14 días. Sin
          tarjeta de crédito.
        </p>
      </div>

      <RegistroForm initialPlan={plan} />
    </section>
  );
}
