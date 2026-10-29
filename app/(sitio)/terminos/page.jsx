import { PaginaLegal } from "../../components/ui/PaginaLegal";
import { CORREO } from "../../lib/contacto";

export const metadata = {
  title: "Términos",
  alternates: {
    canonical: "https://www.stringwebs.com/terminos",
  },
  openGraph: {
    title: "Términos · STRING",
    url: "https://www.stringwebs.com/terminos",
  },
};

const APARTADOS = [
  {
    entrada: "Quién opera este sitio.",
    texto:
      "stringwebs.com es el sitio de STRING, operado por Carlos Avilés en la Ciudad de México. Al usarlo aceptas estos términos.",
  },
  {
    entrada: "Lo que dice el sitio es informativo.",
    texto:
      "Los precios “desde” son de referencia. El precio, el alcance y los tiempos de cada proyecto valen solo en una propuesta por escrito, con su vigencia.",
  },
  {
    entrada: "Lo que garantizamos.",
    texto:
      "Tiempos de respuesta y que el sistema funcione, según cada propuesta y contrato. No garantizamos ventas ni resultados de negocio.",
  },
  {
    entrada: "Lo que es de STRING.",
    texto:
      "El diseño, los textos, el arte y el logo de este sitio son de STRING. No se copian sin permiso. El arte de cada cliente en la galería se muestra con su permiso.",
  },
  {
    entrada: "Productos.",
    texto: "El sistema para gimnasios tiene sus propios términos dentro del producto.",
  },
  {
    entrada: "Ley aplicable.",
    texto:
      "Estos términos se rigen por las leyes de México, y cualquier diferencia se atiende en la Ciudad de México.",
  },
  {
    entrada: "Contacto.",
    texto: `${CORREO}.`,
  },
];

export default function TerminosPage() {
  return <PaginaLegal titulo="Términos" apartados={APARTADOS} />;
}
