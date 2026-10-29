import { FormularioDiagnostico } from "@/app/components/forms/FormularioDiagnostico";
import { CUERPO, ETIQUETA } from "@/app/components/salas/estilos";

// /diagnostico (docs/textos.md § Textos que faltaban): etiqueta, titular,
// intro y debajo el formulario de cuatro preguntas.
const DESCRIPCION =
  "Cuatro preguntas para saber qué necesita tu negocio. Te respondemos en un día hábil.";

export const metadata = {
  title: "Solicitar diagnóstico",
  description: DESCRIPCION,
  alternates: {
    canonical: "https://www.stringwebs.com/diagnostico",
  },
  openGraph: {
    title: "Solicitar diagnóstico · STRING",
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/diagnostico",
    type: "website",
  },
};

export default function DiagnosticoPage() {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <div className="mx-auto flex max-w-[760px] flex-col gap-space-6">
        <div className="flex flex-col gap-space-4">
          <p className={ETIQUETA}>DIAGNÓSTICO</p>
          <h1 className="text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[56px] lg:text-titulo">
            Cuéntanos qué necesita tu negocio.
          </h1>
          <p className={CUERPO}>
            Cuatro preguntas. Te respondemos en un día hábil, y el diagnóstico inicial lo tienes en
            24 horas.
          </p>
        </div>
        <FormularioDiagnostico />
      </div>
    </div>
  );
}
