import { BloqueBoaz } from "@/app/components/productos/BloqueBoaz";
import { Encabezado } from "@/app/components/productos/Encabezado";
import { Medida } from "@/app/components/productos/Medida";
import { Siguientes } from "@/app/components/productos/Siguientes";
import { Cierre } from "@/app/components/salas/Cierre";

// /productos (lote 9a): las dos líneas de STRING. Encabezado con las dos
// anclas, Boaz (#boaz, sobre pared), los siguientes productos, a la medida
// con su vitrina de ejemplos (#medida) y el Cierre de las demás páginas.
const DESCRIPCION =
  "Boaz, el sistema para gimnasios, y sistemas a la medida para negocios con local y empresas. Hechos por STRING en Ciudad de México.";

export const metadata = {
  title: "Productos",
  description: DESCRIPCION,
  alternates: { canonical: "https://www.stringwebs.com/productos" },
  openGraph: {
    title: "Productos · STRING",
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/productos",
  },
};

export default function ProductosPage() {
  return (
    <>
      <Encabezado />
      <BloqueBoaz />
      <Siguientes />
      <Medida />
      <Cierre />
    </>
  );
}
