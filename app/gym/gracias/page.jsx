import { FaWhatsapp } from "react-icons/fa";
import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TitularBrochada } from "@/app/components/ui/TitularBrochada";

export const metadata = {
  title: "¡Listo!",
  description: "Recibimos tu solicitud. Te contactamos pronto.",
  alternates: {
    canonical: "https://www.stringwebs.com/gym/gracias",
  },
  openGraph: {
    title: "¡Listo!",
    url: "https://www.stringwebs.com/gym/gracias",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "STRING — Sistemas Digitales Estratégicos",
      },
    ],
  },
  robots: "noindex, nofollow",
};

const DEMO_URL = "https://app.gym.stringwebs.com/gym-demo/hoy";
const WHATSAPP_URL =
  "https://wa.me/525545524847?text=Hola+Carlos,+me+registr%C3%A9+en+STRING+GYM";

export default function GraciasPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 pb-espacio-6 text-center md:pt-40 md:pb-espacio-7">
      <Etiqueta variante="linea">Solicitud recibida</Etiqueta>

      <div className="mt-6">
        <TitularBrochada
          lineas={["¡Listo! Nos ponemos en", "contacto contigo pronto"]}
          tamano="l"
          retraso={0.2}
        />
      </div>

      <p className="mt-6 max-w-md text-cuerpo-l text-tinta-suave">
        Revisa tu correo: te enviamos un mensaje de confirmación con los
        siguientes pasos.
      </p>

      <div className="mt-espacio-6 grid w-full gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-start border-2 border-linea bg-fondo-elevado p-6 text-left">
          <p className="font-mono uppercase text-etiqueta text-acido">
            Mientras esperas
          </p>
          <p className="mt-3 flex-1 text-cuerpo-s text-tinta-suave">
            Explora STRING GYM con datos reales en nuestra demo en vivo.
          </p>
          <Boton href={DEMO_URL} variante="primario" className="mt-6 w-full">
            Ver demo en vivo
          </Boton>
        </div>

        <div className="flex flex-col items-start border-2 border-linea bg-fondo-elevado p-6 text-left">
          <p className="font-mono uppercase text-etiqueta text-acido">
            ¿Tienes dudas?
          </p>
          <p className="mt-3 flex-1 text-cuerpo-s text-tinta-suave">
            Escríbenos por WhatsApp y con gusto te ayudamos.
          </p>
          <Boton href={WHATSAPP_URL} variante="secundario" className="mt-6 w-full">
            <FaWhatsapp className="text-base" />
            WhatsApp
          </Boton>
        </div>
      </div>
    </section>
  );
}
