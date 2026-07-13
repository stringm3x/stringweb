import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "¡Listo!",
  description: "Recibimos tu solicitud. Te contactamos pronto.",
  robots: "noindex, nofollow",
};

const DEMO_URL = "https://app.gym.stringwebs.com/gym-demo/hoy";
const WHATSAPP_URL =
  "https://wa.me/525545524847?text=Hola+Carlos,+me+registr%C3%A9+en+STRING+GYM";

export default function GraciasPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center md:py-32">
      {/* Check */}
      <div className="mb-8 flex h-16 w-16 items-center justify-center bg-green">
        <svg
          className="h-8 w-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-green">
        Solicitud recibida
      </span>
      <h1 className="mt-4 font-anton text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
        ¡Listo! Nos ponemos en
        <br />
        contacto contigo pronto
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-gray">
        Revisa tu correo: te enviamos un mensaje de confirmación con los
        siguientes pasos.
      </p>

      {/* Cards */}
      <div className="mt-12 grid w-full gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-start border border-white/10 bg-white/[0.02] p-6 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-green">
            Mientras esperas
          </p>
          <p className="mt-2 flex-1 text-sm text-white/80">
            Explora STRING GYM con datos reales en nuestra demo en vivo.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-sm bg-green px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-white"
          >
            Ver demo en vivo
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex flex-col items-start border border-white/10 bg-white/[0.02] p-6 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-green">
            ¿Tienes dudas?
          </p>
          <p className="mt-2 flex-1 text-sm text-white/80">
            Escríbenos por WhatsApp y con gusto te ayudamos.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-sm border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:border-green hover:text-green"
          >
            <FaWhatsapp className="text-base" />
            WhatsApp
            <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
