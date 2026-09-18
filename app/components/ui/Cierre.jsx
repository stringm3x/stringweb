import { Boton } from "./Boton";

// Bloque de cierre a sangre, acido, con Boton y nota como props.
// El H2 y el pie son fijos: aparecen igual en cada página que use Cierre.
export function Cierre({ ctaTexto, ctaHref, nota }) {
  return (
    <section className="relative overflow-hidden bg-acido">
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M 0 96 C 260 84 520 78 780 82 C 1000 86 1220 96 1440 112 L 1440 126 C 1220 110 1000 100 780 96 C 520 92 260 98 0 110 Z"
          className="fill-black"
        />
        <path
          d="M 0 548 C 300 536 620 530 940 536 C 1140 540 1300 548 1440 558 L 1440 570 C 1300 560 1140 552 940 548 C 620 542 300 548 0 560 Z"
          className="fill-black"
        />
        <path
          d="M 980 300 C 1120 292 1260 288 1400 290 L 1400 300 C 1260 298 1120 302 980 310 Z"
          className="fill-black"
        />
      </svg>

      <div className="relative px-6 py-espacio-7 lg:px-24 text-center">
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

        <div className="mt-espacio-7 border-t border-black/20 pt-espacio-4">
          <p className="font-anton text-2xl text-black">STRING</p>
          <p className="mt-1 font-mono uppercase text-etiqueta text-tinta-papel">
            Sistemas digitales estratégicos · CDMX
          </p>
        </div>
      </div>
    </section>
  );
}
