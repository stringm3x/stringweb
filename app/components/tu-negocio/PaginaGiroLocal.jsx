import { Cierre } from "../salas/Cierre";
import { CabeceraGiro } from "./CabeceraGiro";
import { Escalera } from "./Escalera";

// La página de un giro con local (lote 11, plantilla de docs/textos.md § Tu
// negocio · lote 11): cabecera, la escalera y el Cierre de siempre.
export function PaginaGiroLocal({ giro }) {
  return (
    <>
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-7">
          <CabeceraGiro
            giro={giro}
            volver="Tu negocio"
            volverHref="/tu-negocio"
            coletilla="Si eso te pasa, esta es tu escalera."
          />
          <Escalera filas={giro.filas} />
        </div>
      </div>
      <Cierre />
    </>
  );
}
