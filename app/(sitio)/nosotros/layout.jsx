// Título y descripción de docs/textos.md § Nosotros · lote 10.
const DESCRIPCION =
  "STRING es un taller de software en Ciudad de México. La historia, el método, el equipo y la fe detrás de cada sistema.";

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
