import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 5 · La galería · Pintura (docs/textos.md), sobre pared. Las tres
// cartelas (STRING, el sistema para gimnasios y Tu negocio) ya vienen
// dibujadas en sala5-galeria.svg. La galería no se mueve: es la pausa.
// En celular conserva su tamaño y se recorre de lado, como la tira de cine.
export function Sala5Galeria() {
  return (
    <section id="galeria" data-theme="pared" className={`${SALA} scroll-mt-24`}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-5">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>LA GALERÍA</p>
          <h2 className={TITULAR}>Cada sistema tiene su arte.</h2>
          <p className={CUERPO}>
            Ningún sistema de STRING sale de una plantilla. Cada uno lleva una obra propia, que
            nace contigo en el boceto.
          </p>
        </div>
        <div
          role="region"
          aria-label="Cuadros de la galería"
          tabIndex={0}
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arte/sala5-galeria.svg"
            width={1136}
            height={500}
            loading="lazy"
            decoding="async"
            alt="Tres cuadros con marco dorado en una galería: la ciudad de STRING, el plano del sistema para gimnasios y un lienzo en blanco para tu negocio."
            className="block h-auto w-full min-w-[720px]"
          />
        </div>
      </div>
    </section>
  );
}
