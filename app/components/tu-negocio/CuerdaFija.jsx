// La cuerda de cada escalón de Tu negocio (lote 11): una línea a mano a lo
// ancho, con el calibre de su nivel (app/lib/niveles.js). No suena: las que
// suenan son las de la sala 4. Al llegar, se descubre de izquierda a derecha
// (app/salas.css, .giro-cuerda); con menos movimiento, ya dibujada.
export function CuerdaFija({ calibre = 1.2, verde = false, orden = 0 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 8"
      preserveAspectRatio="none"
      className="giro-cuerda block h-2 w-full overflow-visible"
      style={{ "--i": orden }}
    >
      <path
        d="M0 4Q250 3.2 500 4.3T1000 3.8"
        fill="none"
        className={verde ? "stroke-acento" : "stroke-texto-suave"}
        strokeWidth={calibre}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
