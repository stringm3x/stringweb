import { Boton } from "./Boton";
import { CintasCierre } from "./CintasCierre";

// Bloque de cierre a sangre, acido, con Boton y nota como props.
// El H2 y el pie son fijos: aparecen igual en cada página que use Cierre.
export function Cierre({ ctaTexto, ctaHref, nota }) {
  return (
    <section className="relative overflow-hidden bg-acido">
      <CintasCierre />

      {/* pt-40: la cinta negra superior del fondo queda en el aire, sin cruzar el titular */}
      <div className="relative px-6 pt-40 pb-espacio-7 lg:px-24 text-center">
        <h2 className="mx-auto max-w-4xl font-anton uppercase text-black text-titular-m lg:text-[82px] lg:leading-[76px]">
          El sistema trabaja aunque tú no estés.
        </h2>

        <div className="mt-espacio-6">
          <Boton href={ctaHref} variante="sobreAcido">
            {ctaTexto}
          </Boton>
        </div>

        <p className="mt-espacio-4 font-mono uppercase text-etiqueta text-tinta-papel">
          {nota}
        </p>

        {/* bg-acido explícito: la cinta negra del fondo pasa por detrás y no toca el pie */}
        <div className="mx-auto mt-espacio-7 max-w-md border-t border-black/20 bg-acido pt-espacio-4">
          <p className="font-anton text-2xl text-black">STRING</p>
          <p className="mt-1 font-mono uppercase text-etiqueta text-tinta-papel">
            Sistemas digitales estratégicos · CDMX
          </p>
        </div>
      </div>
    </section>
  );
}
