import { PaginaLegal } from "../../components/ui/PaginaLegal";
import { CORREO } from "../../lib/contacto";

export const metadata = {
  title: "Aviso de privacidad",
  alternates: {
    canonical: "https://www.stringwebs.com/aviso-de-privacidad",
  },
  openGraph: {
    title: "Aviso de privacidad · STRING",
    url: "https://www.stringwebs.com/aviso-de-privacidad",
  },
};

// TODO(domicilio): falta el domicilio del responsable (lo pide la ley).
// Carlos lo confirma antes de publicar.
const DOMICILIO = "[domicilio por confirmar]";

const APARTADOS = [
  {
    entrada: "Quién es responsable de tus datos.",
    texto: `Carlos Avilés, persona física que opera STRING, con domicilio en ${DOMICILIO}, Ciudad de México. Contacto: ${CORREO}.`,
  },
  {
    entrada: "Qué datos usamos.",
    texto:
      "Los que tú nos das en el formulario o por WhatsApp: nombre, número de WhatsApp, giro de tu negocio y lo que nos cuentes sobre él. No pedimos datos sensibles.",
  },
  {
    entrada: "Para qué los usamos.",
    texto:
      "Para responder tu solicitud, hacer tu diagnóstico, prepararte una propuesta si la pides y darle seguimiento a esa conversación. Estas finalidades son necesarias para atenderte. No usamos tus datos para nada más, ni para enviarte publicidad.",
  },
  {
    entrada: "Con quién se comparten.",
    texto:
      "Con nadie para su propio uso. Para funcionar, el sitio usa servicios de alojamiento y de correo que guardan la información por cuenta nuestra y no pueden usarla para otra cosa.",
  },
  {
    entrada: "Tus derechos.",
    texto: `Puedes pedir acceder a tus datos, corregirlos, borrarlos u oponerte a su uso, y retirar tu consentimiento. Escríbenos a ${CORREO} con tu nombre y lo que pides. Te respondemos en el plazo que marca la ley.`,
  },
  {
    entrada: "Cuánto tiempo los guardamos.",
    texto: "Mientras dure la conversación o el proyecto, y después solo lo que la ley exija.",
  },
  {
    entrada: "Cambios a este aviso.",
    texto: "Si cambia, lo publicamos en esta misma página con su nueva fecha.",
  },
];

export default function AvisoDePrivacidadPage() {
  return <PaginaLegal titulo="Aviso de privacidad" apartados={APARTADOS} />;
}
