import { Etiqueta } from "@/app/components/ui/Etiqueta";
import { TarjetaSistema } from "@/app/components/ui/TarjetaSistema";

const continuidad = [
  {
    nombre: "Base",
    precio: "$1,800–$2,500/mes",
    incluye: "Hosting, mantenimiento y soporte",
  },
  {
    nombre: "Crecimiento",
    precio: "$3,000–$4,500/mes",
    incluye: "Optimización mensual y ajustes",
  },
  {
    nombre: "Escalamiento",
    precio: "$5,000–$8,000/mes",
    incluye: "Análisis, mejoras y soporte prioritario",
  },
];

const PlanesContinuidad = () => {
  return (
    <section className="bg-black px-6 lg:px-24 py-espacio-6 lg:py-espacio-7">
      <div className="max-w-contenido mx-auto">
        <div className="mb-2">
          <Etiqueta variante="linea">Planes de continuidad</Etiqueta>
        </div>
        <p className="mt-4 text-tinta-suave text-cuerpo max-w-xl mb-8">
          Tu sistema no termina el día de la entrega. Un plan de continuidad
          lo mantiene funcionando y, según el plan, lo optimiza cada mes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {continuidad.map((plan) => (
            <TarjetaSistema
              key={plan.nombre}
              kicker="CONTINUIDAD"
              precio={plan.precio}
              titulo={plan.nombre}
              frase={plan.incluye}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanesContinuidad;
