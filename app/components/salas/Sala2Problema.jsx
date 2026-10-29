import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 2 · El problema · Escultura (docs/textos.md). Versión quieta del
// lanzamiento: el texto y el bloque tallado, sin animación.
const PERDIDAS = [
  "Alguien pregunta el precio y nadie contesta a tiempo.",
  "La conversación se pierde entre cientos de chats.",
  "El interesado no recibe seguimiento y se enfría.",
  "Los pagos viven en un Excel, sin historial.",
  "Nadie sabe cuántos clientes siguen y cuántos se fueron.",
  "Y tú no sabes cuánto ganas.",
];

export function Sala2Problema() {
  return (
    <section data-theme="noche" className={SALA}>
      <div className="mx-auto grid max-w-contenido items-center gap-space-6 lg:grid-cols-2">
        <div className="flex flex-col gap-space-4">
          <p className={ETIQUETA}>EL PROBLEMA</p>
          <h2 className={TITULAR}>No es falta de demanda. Es falta de sistema.</h2>
          <p className={CUERPO}>
            Tus clientes te escriben por Instagram y WhatsApp. En el camino se pierden:
          </p>
          <ul className="flex flex-col border-t border-hairline">
            {PERDIDAS.map((linea) => (
              <li key={linea} className={`border-b border-hairline py-space-3 ${CUERPO}`}>
                {linea}
              </li>
            ))}
          </ul>
          <p className="text-cuerpo font-semibold text-texto">
            Un sistema quita lo que sobra. Queda tu negocio.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arte/sala2-escultura.svg"
          width={560}
          height={470}
          loading="lazy"
          decoding="async"
          alt="Dibujo de un celular con una lista ordenada que sale tallado de un bloque de mármol."
          className="mx-auto h-auto w-full max-w-[460px]"
        />
      </div>
    </section>
  );
}
