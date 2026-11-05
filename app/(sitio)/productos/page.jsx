import { BloqueBoaz } from "@/app/components/productos/BloqueBoaz";
import { Encabezado } from "@/app/components/productos/Encabezado";
import { Medida } from "@/app/components/productos/Medida";
import { Siguientes } from "@/app/components/productos/Siguientes";
import { Cierre } from "@/app/components/salas/Cierre";
import { metadatosPagina } from "@/app/lib/compartir";

// /productos (lote 9a): las dos líneas de STRING. Encabezado con las dos
// anclas, Boaz (#boaz, sobre pared), los siguientes productos, a la medida
// con su vitrina de ejemplos (#medida) y el Cierre de las demás páginas.
const DESCRIPCION =
  "Boaz, el sistema para gimnasios, y sistemas a la medida para negocios con local y empresas. Hechos por STRING en Ciudad de México.";

export const metadata = metadatosPagina({
  titulo: "Productos: Boaz y sistemas a la medida · STRING",
  descripcion: DESCRIPCION,
  ruta: "/productos",
});

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
