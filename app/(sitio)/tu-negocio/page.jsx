import Link from "next/link";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "@/app/components/salas/estilos";
import { Tarjetas } from "@/app/components/tu-negocio/TarjetaGiro";
import { Boton } from "@/app/components/ui/Boton";
import { Entra } from "@/app/components/ui/Entra";
import { Hilo } from "@/app/components/ui/Hilo";
import { GIMNASIOS, GRANDES, LOCAL } from "@/app/lib/giros";

// /tu-negocio (lote 11, docs/textos.md § Tu negocio · lote 11): los giros en
// dos grupos. Los negocios con local van con la cuerda de 2 px y Gimnasios
// lleva a Boaz; las empresas, separadas por el hilo (lote 12), con la de 3 px.
const DESCRIPCION =
  "Sistemas para barberías, clínicas, restaurantes, tiendas en línea y empresas. Elige tu giro y ve tu escalera de niveles.";

export const metadata = {
  title: "Tu negocio",
  description: DESCRIPCION,
  alternates: { canonical: "https://www.stringwebs.com/tu-negocio" },
  openGraph: { title: "Tu negocio · STRING", description: DESCRIPCION, url: "https://www.stringwebs.com/tu-negocio" },
};

export default function TuNegocioPage() {
  return (
    <>
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-7">
          <header className="flex max-w-[760px] flex-col gap-space-4">
            <p className={ETIQUETA}>TU NEGOCIO</p>
            <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
              Elige tu giro. Te mostramos tu escalera.
            </h1>
            <p className="text-cuerpo-l text-texto-suave">
              De una barbería que no alcanza a contestar a una empresa con varias sucursales. Misma calidad en cada
              escalón; cambia el alcance.
            </p>
          </header>

          <section aria-labelledby="con-local" className="flex flex-col gap-space-5">
            <h2 id="con-local" className={ETIQUETA}>
              NEGOCIOS CON LOCAL
            </h2>
            <Tarjetas giros={[...LOCAL, GIMNASIOS]} />
          </section>

          <Entra as="section" aria-labelledby="empresas" className="relative flex flex-col gap-space-5 pt-space-6">
            <Hilo />
            <div className="flex flex-col gap-space-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="empresas" className={ETIQUETA}>
                EMPRESAS MEDIANAS Y GRANDES
              </h2>
              <Link
                href="/tu-negocio/empresas"
                className="inline-flex min-h-[44px] items-center text-cuerpo font-semibold text-acento underline-offset-4 hover:underline"
              >
                Ver cómo trabajamos con empresas&nbsp;<span aria-hidden="true">→</span>
              </Link>
            </div>
            <Tarjetas giros={GRANDES} cuerda={3} />
          </Entra>
        </div>
      </div>

      <section data-theme="noche" className={`${SALA} border-t border-hairline`}>
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-space-4 text-center">
          <h2 className={TITULAR}>¿No ves tu giro?</h2>
          <p className={CUERPO}>Trabajamos con cualquier negocio con local.</p>
          <Boton href="/diagnostico" variante="primario">
            Solicitar diagnóstico
          </Boton>
        </div>
      </section>
    </>
  );
}
