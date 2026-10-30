import Link from "next/link";
import { Logo } from "./components/ui/Logo";
import { CORREO, whatsappUrl } from "./lib/contacto";

// Pie de docs/textos.md: logo chico · correo · WhatsApp · Hecho en la Ciudad
// de México · Aviso de privacidad · Términos. Las redes solo viven en el
// JSON-LD de app/layout.jsx.
const enlace =
  "inline-flex min-h-[44px] items-center text-pequeno text-texto-suave hover:text-texto";

const Footer = () => {
  return (
    <footer
      data-theme="noche"
      className="border-t border-hairline bg-fondo px-4 py-space-6 text-texto sm:px-6 lg:px-24"
    >
      <div className="mx-auto flex max-w-contenido flex-col gap-space-4 lg:flex-row lg:items-center lg:justify-between">
        <Logo className="text-[24px]" />

        <ul className="flex flex-col gap-x-space-4 sm:flex-row sm:flex-wrap sm:items-center">
          <li>
            <a href={`mailto:${CORREO}`} className={enlace}>
              {CORREO}
            </a>
          </li>
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={enlace}>
              WhatsApp
            </a>
          </li>
          <li className="inline-flex min-h-[44px] items-center text-pequeno text-texto-suave">
            Hecho en la Ciudad de México
          </li>
          <li>
            <Link href="/aviso-de-privacidad" className={enlace}>
              Aviso de privacidad
            </Link>
          </li>
          <li>
            <Link href="/terminos" className={enlace}>
              Términos
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
