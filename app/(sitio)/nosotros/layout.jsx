// Título y descripción de docs/textos.md § Textos que faltaban.
const DESCRIPCION =
  "La historia de STRING: un taller de software que probó su primer sistema en el gimnasio de la familia de su fundador.";

export const metadata = {
  title: "Nosotros",
  description: DESCRIPCION,
  alternates: {
    canonical: "https://www.stringwebs.com/nosotros",
  },
  openGraph: {
    title: "Nosotros · STRING",
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/nosotros",
  },
};

export default function UsLayout({ children }) {
  return children;
}
