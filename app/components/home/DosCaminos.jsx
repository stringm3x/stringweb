import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { Boton } from "@/app/components/ui/Boton";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";

const CAMINOS = [
  {
    kicker: "CAMINO 01",
    titulo: "Sistemas a medida",
    precio: "DESDE $8,000",
    frase:
      "Para negocios con presupuesto para desarrollo. Proyecto único en 4 niveles, más continuidad mensual.",
    ctaTexto: "Ver Sistemas a Medida",
    ctaHref: "/servicios",
  },
  {
    kicker: "CAMINO 02",
    titulo: "STRING SaaS",
    precio: "DESDE $799/MES",
    frase:
      "Para negocios que necesitan un sistema ya, sin invertir en desarrollo. Suscripción mensual por nicho.",
    ctaTexto: "Ver STRING GYM",
    ctaHref: "/saas",
  },
];

const DosCaminos = () => {
  return (
    <section className="bg-black px-6 lg:px-24 py-espacio-6 lg:py-espacio-7">
      <div className="max-w-contenido mx-auto">
        <div className="mb-6">
          <Etiqueta variante="linea">Dos caminos</Etiqueta>
        </div>
        <h2 className="font-anton uppercase text-titular-l text-white mb-espacio-6 max-w-2xl">
          Sistema a medida o listo por nicho
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAMINOS.map((camino) => (
            <TarjetaSistema
              key={camino.kicker}
              kicker={camino.kicker}
              precio={camino.precio}
              titulo={camino.titulo}
              frase={camino.frase}
            >
              <Boton href={camino.ctaHref} variante="texto">
                {camino.ctaTexto}
              </Boton>
            </TarjetaSistema>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DosCaminos;
