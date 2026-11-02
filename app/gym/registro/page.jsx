import { RegistroForm } from "./RegistroForm";
import { ARCHIVO, ETIQUETA_BOAZ, archivo } from "@/app/components/boaz/fuentes";
import { Logotipo } from "@/app/components/boaz/Logotipo";
import { LaminaBoaz } from "@/app/components/productos/LaminaBoaz";

export const metadata = {
  title: { absolute: "Boaz · El sistema para gimnasios, by STRING" },
  description: "Socios, check-in, cobros y caja para tu gimnasio, probado en un gimnasio real.",
  alternates: {
    canonical: "https://www.stringwebs.com/gym/registro",
  },
  openGraph: {
    title: "Boaz · El sistema para gimnasios, by STRING",
    description: "Socios, check-in, cobros y caja para tu gimnasio, probado en un gimnasio real.",
    url: "https://www.stringwebs.com/gym/registro",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Boaz · El sistema para gimnasios, by STRING",
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
// "starter" es el slug que usan los enlaces; "basico" se queda como alias
// para no romper enlaces viejos. Escala ya no se ofrece (lote 9b): cae en
// Pro, el plan recomendado.
const PLAN_URL_A_INTERNO = {
  starter: "basico",
  basico: "basico",
  pro: "pro",
};

export default async function RegistroPage({ searchParams }) {
  const sp = await searchParams;
  const planRaw = typeof sp?.plan === "string" ? sp.plan : "";
  const plan = PLAN_URL_A_INTERNO[planRaw] || "";

  // Lote 9b: identidad de Boaz (G). Texto y formulario; en escritorio, la
  // lámina quieta debajo del titular. Textos de docs/textos.md § "Boaz · lote 9b".
  return (
    <div className="mx-auto grid max-w-[1312px] items-start gap-10 px-5 pb-[72px] pt-10 sm:px-6 lg:grid-cols-[5fr_6fr] lg:gap-24 lg:px-16 lg:pb-[120px] lg:pt-[72px]">
      <div>
        <Logotipo className="w-[113px] lg:w-[151px]" />
        <p className={`${ETIQUETA_BOAZ} mt-7 lg:mt-10`}>BOAZ · PRUEBA DE 14 DÍAS</p>
        <h1
          id="registro-t1"
          className={`${archivo.className} mt-5 text-[56px] leading-[0.92] tracking-[-0.005em] lg:mt-7 lg:text-[112px]`}
          style={ARCHIVO}
        >
          Registra tu gimnasio.
        </h1>
        <p className="mt-4 text-[18px] lg:mt-6 lg:text-[20px]">14 días con Pro completo, sin tarjeta.</p>
        <div className="mt-14 hidden max-w-[380px] border-t border-borde pt-6 lg:block">
          <LaminaBoaz className="block h-auto w-full text-texto" />
        </div>
      </div>
      <div className="border-t border-borde pt-6 lg:pt-8">
        <RegistroForm initialPlan={plan} />
      </div>
    </div>
  );
}
