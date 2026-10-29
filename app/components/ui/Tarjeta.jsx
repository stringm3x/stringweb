import Link from "next/link";

// Tarjeta de docs/calidad.md § 3 (niveles, enlaces a páginas): un enlace
// completo con una cuerda de 2 px arriba. En hover el borde y la cuerda se
// encienden y la tarjeta sube 2 px: dice "esto se abre". Con menos
// movimiento no sube.
export function Tarjeta({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group/tarjeta relative block rounded-[16px] border border-hairline p-7 text-texto transition-transform duration-normal hover:-translate-y-0.5 hover:border-acento motion-reduce:hover:translate-y-0 ${className}`.trim()}
    >
      <span aria-hidden="true" className="absolute -top-px left-7 right-7 h-[2px] bg-borde">
        <span className="absolute inset-0 bg-acento opacity-0 transition-opacity duration-normal group-hover/tarjeta:opacity-100" />
      </span>
      {children}
    </Link>
  );
}
