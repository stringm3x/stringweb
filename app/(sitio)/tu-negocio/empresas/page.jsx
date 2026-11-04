import Link from "next/link";
import { ETIQUETA } from "@/app/components/salas/estilos";
import { PasosEmpresas } from "@/app/components/tu-negocio/PasosEmpresas";
import { Tarjetas } from "@/app/components/tu-negocio/TarjetaGiro";
import { Boton } from "@/app/components/ui/Boton";
import { Entra } from "@/app/components/ui/Entra";
import { GRANDES, precioDe } from "@/app/lib/giros";
import { compartir } from "@/app/lib/compartir";

// /tu-negocio/empresas (lote 11, docs/textos.md § Tu negocio · lote 11): cómo
// trabajamos con empresas, en cuatro pasos; debajo, los cinco giros grandes y
// el nivel Empresa con el botón. Título y descripción, derivados como en los
// giros: "Empresas · Tu negocio · STRING" y la entrada.
const ENTRADA =
  "Para empresas con varias áreas o sucursales que necesitan un solo sistema. Se cotiza después de un mapa de procesos firmado.";

export const metadata = {
  title: "Empresas · Tu negocio",
  description: ENTRADA,
  alternates: { canonical: "https://www.stringwebs.com/tu-negocio/empresas" },
  ...compartir({
    titulo: "Empresas · Tu negocio · STRING",
    descripcion: ENTRADA,
    url: "https://www.stringwebs.com/tu-negocio/empresas",
    imagenPropia: true,
  }),
};

export default function EmpresasPage() {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-7">
        <header className="flex max-w-[760px] flex-col gap-space-4">
          <Link
            href="/tu-negocio"
            className="inline-flex min-h-[44px] items-center self-start font-mono text-etiqueta uppercase text-texto-suave hover:text-texto"
          >
            <span aria-hidden="true">←&nbsp;</span>Tu negocio
          </Link>
          <p className={ETIQUETA}>TU NEGOCIO · EMPRESAS</p>
          <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
            Toda la operación, conectada.
          </h1>
          <p className="text-cuerpo-l text-texto-suave">{ENTRADA}</p>
        </header>

        <div className="max-w-[760px]">
          <PasosEmpresas />
        </div>

        <Entra as="section" aria-labelledby="giros-grandes" className="flex flex-col gap-space-5 border-t border-hairline pt-space-6">
          <h2 id="giros-grandes" className={ETIQUETA}>
            EMPRESAS MEDIANAS Y GRANDES
          </h2>
          <Tarjetas giros={GRANDES} cuerda={3} />
        </Entra>

        <Entra as="section" aria-labelledby="nivel-empresa" className="flex flex-col items-start gap-space-3 border-t border-hairline pt-space-6">
          <h2 id="nivel-empresa" className="text-subtitulo">
            Empresa
          </h2>
          <p className="font-mono text-cifra text-texto">{precioDe("empresa")}</p>
          <Boton href="/diagnostico" variante="primario">
            Solicitar diagnóstico
          </Boton>
        </Entra>
      </div>
    </div>
  );
}
