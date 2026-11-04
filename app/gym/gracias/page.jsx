import Link from "next/link";
import { BotonBoaz } from "@/app/components/boaz/BotonBoaz";
import { ARCHIVO, ETIQUETA_BOAZ, archivo } from "@/app/components/boaz/fuentes";
import { Logotipo } from "@/app/components/boaz/Logotipo";
import { LaminaBoaz } from "@/app/components/productos/LaminaBoaz";
import { whatsappUrl } from "@/app/lib/contacto";
import { compartir } from "@/app/lib/compartir";

export const metadata = {
  title: "¡Listo!",
  description: "Recibimos tu solicitud. Te contactamos pronto.",
  alternates: {
    canonical: "https://www.stringwebs.com/gym/gracias",
  },
  ...compartir({
    titulo: "¡Listo!",
    descripcion: "Recibimos tu solicitud. Te contactamos pronto.",
    url: "https://www.stringwebs.com/gym/gracias",
  }),
  robots: "noindex, nofollow",
};

// Lote 9b: identidad de Boaz (G). Textos de docs/textos.md § "Boaz · lote 9b".
const WHATSAPP_URL = whatsappUrl("Hola Carlos, me registré en Boaz");

export default function GraciasPage() {
  return (
    <div className="mx-auto grid max-w-[1312px] items-center gap-10 px-5 pb-[72px] pt-12 sm:px-6 lg:grid-cols-[7fr_4fr] lg:gap-20 lg:px-16 lg:pb-[120px] lg:pt-24">
      <div>
        <Logotipo className="w-[113px] lg:w-[151px]" />
        <p className={`${ETIQUETA_BOAZ} mt-10`}>BOAZ · REGISTRO RECIBIDO</p>
        <h1
          className={`${archivo.className} mt-7 text-[56px] leading-[0.92] tracking-[-0.005em] lg:text-[112px]`}
          style={ARCHIVO}
        >
          ¡Listo! Ya tenemos tu registro.
        </h1>
        <p className="mt-7 max-w-[560px] border-t border-borde pt-6 text-[19px] lg:text-[20px]">
          Te escribimos por WhatsApp en un día hábil para activar tu prueba.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <BotonBoaz href={WHATSAPP_URL} variante="secundario">
            Escríbenos por WhatsApp
          </BotonBoaz>
          <Link
            href="/boaz"
            className="font-semibold text-acento underline-offset-4 hover:text-acento-presionado hover:underline"
          >
            Volver a Boaz
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[280px] lg:max-w-none">
        <LaminaBoaz className="block h-auto w-full text-texto" />
      </div>
    </div>
  );
}
