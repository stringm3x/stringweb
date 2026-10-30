// La fila de las siete artes de la ficha (docs/pagina-nivel.md): la viñeta
// del nivel encima de la de Empresa, que va apagada (gris y tenue). Las viñetas comparten
// lienzo y posiciones, así que las artes que el nivel todavía no suma se ven
// apagadas y las suyas encendidas (la última, en verde), sin arte nuevo.
// Decorativa: el texto "N DE 7" lo dice.
export function ArtesQueSuma({ vineta, className = "" }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[300/44] w-full max-w-[300px] ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/arte/sala4-vineta-empresa.svg"
        width={300}
        height={44}
        alt=""
        className="absolute inset-0 h-full w-full opacity-30 grayscale"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={vineta} width={300} height={44} alt="" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
