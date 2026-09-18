const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='grano'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch' />
    <feColorMatrix type='saturate' values='0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#grano)' />
</svg>`;

const NOISE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}`;

// Textura de grano pequeña y repetida, pre-renderizada como background-image.
// No es un filtro SVG en vivo sobre toda la pantalla (costoso); es una imagen
// de 200px que el navegador tilea, igual que cualquier textura de fondo.
export function Grano() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-30 mix-blend-overlay"
      style={{
        backgroundImage: `url("${NOISE_DATA_URI}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
