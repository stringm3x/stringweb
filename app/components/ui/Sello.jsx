// Sello circular: texto en mono girando muy lento alrededor de la "S".
// Decorativo (aria-hidden); con movimiento reducido se queda quieto.
// El posicionamiento lo pone quien lo usa vía className.
export function Sello({
  texto = "STRING · SISTEMAS DIGITALES · CDMX · ",
  sobrePapel = false,
  className = "",
}) {
  const color = sobrePapel ? "text-tinta-papel" : "text-tinta-suave";
  const colorS = sobrePapel ? "text-tinta-papel" : "text-acido";
  return (
    <span aria-hidden="true" className={`pointer-events-none ${className}`.trim()}>
      <span className="relative inline-grid h-24 w-24 place-items-center">
        <svg
          viewBox="0 0 100 100"
          className={`absolute inset-0 h-full w-full animate-girar motion-reduce:animate-none ${color}`}
        >
          <defs>
            <path id="sello-arco" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
          </defs>
          <text fontSize="10.5" letterSpacing="1.6" className="fill-current font-mono uppercase">
            <textPath href="#sello-arco">{texto}</textPath>
          </text>
        </svg>
        <span className={`font-anton text-[34px] leading-none ${colorS}`}>S</span>
      </span>
    </span>
  );
}
