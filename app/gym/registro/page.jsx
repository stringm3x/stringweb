import { FiArrowLeft } from "react-icons/fi";
import { RegistroForm } from "./RegistroForm";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
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
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-espacio-6 md:pt-40 md:pb-espacio-7">
      <Boton href="/saas#planes" variante="texto">
        <FiArrowLeft className="h-3.5 w-3.5" />
        Ver planes
      </Boton>

      <div className="mb-10 mt-6 space-y-4">
        <Etiqueta variante="linea">STRING GYM</Etiqueta>
        <div>
          <TitularBrochada lineas={["Crea", "tu cuenta"]} retraso={0.2} />
        </div>
        <p className="text-cuerpo-l text-tinta-suave">
          Déjanos tus datos y activamos tu prueba gratuita de 14 días con Pro
          completo. Sin tarjeta de crédito.
        </p>
      </div>

      <RegistroForm initialPlan={plan} />
    </section>
  );
}
