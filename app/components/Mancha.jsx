// Mancha decorativa acido con trazos negros y texto Anton negro incrustado.
// Se usa en Problema (home) y en la página 404. El texto real y accesible
// vive aparte (párrafo sr-only o h1 sr-only) porque este SVG es aria-hidden.
export function Mancha({ lineas, className = "" }) {
  const startY = lineas.length === 1 ? 135 : 112;

  return (
    <svg viewBox="0 0 1248 220" aria-hidden="true" className={className}>
      {/* Todo va dentro del grupo pintable: la mancha aparece con su texto */}
      <g data-brochada>
        <path
          d="M 58 58 C 158 18 318 6 518 12 C 718 18 898 4 1058 24 C 1178 40 1228 96 1178 140 C 1118 182 938 176 758 170 C 558 163 338 182 178 168 C 68 158 18 108 58 58 Z"
          className="fill-acido"
        />
        <g className="fill-black">
          <path d="M 640 26 C 760 22 880 20 990 26 L 990 36 C 880 30 760 32 640 36 Z" />
          <path d="M 160 148 C 280 158 410 162 530 162 L 530 170 C 410 170 280 166 158 156 Z" />
        </g>
        <text fontFamily="var(--font-anton-sans)" fontSize="44" className="fill-black">
          {lineas.map((linea, i) => (
            <tspan key={linea} x="118" y={startY + i * 46}>
              {linea}
            </tspan>
          ))}
        </text>
      </g>
    </svg>
  );
}
