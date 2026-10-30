// Un dibujo del arte partido en capas (scripts/capas-arte.mjs): las capas se
// apilan en una caja con la proporción del lienzo, así que apiladas se ven
// igual que el dibujo entero y el alto se reserva desde el inicio (CLS 0).
// El nombre del dibujo va en la caja; las capas son decorativas. Cada capa
// lleva data-capa para que app/salas.css la mueva. `children` va encima
// (pedazos, penumbras, cuadros apagados).
export function Capas({ carpeta, capas, ancho, alto, alt, className = "", children }) {
  const nombre = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
  return (
    <div
      {...nombre}
      className={`relative ${className}`.trim()}
      style={{ aspectRatio: `${ancho} / ${alto}` }}
    >
      {capas.map((capa) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={capa}
          src={`/arte/${carpeta}/${capa}.svg`}
          width={ancho}
          height={alto}
          alt=""
          loading="lazy"
          decoding="async"
          data-capa={capa}
          className="absolute inset-0 h-full w-full"
        />
      ))}
      {children}
    </div>
  );
}
