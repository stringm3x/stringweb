import Link from "next/link";

const BASE =
  "group/tarjeta relative rounded-[16px] border border-hairline text-texto transition-transform duration-normal hover:-translate-y-0.5 hover:border-acento motion-reduce:hover:translate-y-0";

// La cuerda de la tarjeta: en hover se enciende en luz.
function Cuerda({ calibre, className }) {
  return (
    <span aria-hidden="true" className={`${className} bg-borde ${calibre === 3 ? "h-[3px]" : "h-[2px]"}`}>
      <span className="absolute inset-0 bg-acento opacity-0 transition-opacity duration-normal group-hover/tarjeta:opacity-100" />
    </span>
  );
}

// Tarjeta de docs/calidad.md § 3 (niveles, enlaces a páginas): un enlace
// completo con una cuerda de 2 px arriba (3 px en las empresas de Tu negocio). En hover el borde y la cuerda se
// encienden y la tarjeta sube 2 px: dice "esto se abre". Con menos
// movimiento no sube.
//
// Con `dibujo` (lote 12) la tarjeta tiene dos partes: arriba la zona de
// dibujo, 180 px sobre noche, con su número en mono y una línea de suelo; abajo
// la cuerda y el texto. `papel` pone la zona en pared: solo para Boaz.
export function Tarjeta({ href, cuerda = 2, dibujo, numero, papel = false, children, className = "" }) {
  if (!dibujo) {
    return (
      <Link href={href} className={`${BASE} block p-7 ${className}`.trim()}>
        <Cuerda calibre={cuerda} className="absolute -top-px left-7 right-7" />
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={`${BASE} flex flex-col overflow-hidden ${className}`.trim()}>
      <span
        aria-hidden="true"
        data-theme={papel ? "pared" : undefined}
        className="relative block h-[180px] shrink-0 overflow-hidden bg-fondo"
      >
        {dibujo}
        {!papel && <span className="absolute inset-x-6 bottom-[22px] h-px bg-[#2E2E32]" />}
        {numero && (
          <span className="absolute left-5 top-4 font-mono text-etiqueta uppercase text-texto-suave">{numero}</span>
        )}
      </span>
      <Cuerda calibre={cuerda} className="relative block shrink-0" />
      <div className="flex flex-1 flex-col gap-space-3 p-7">{children}</div>
    </Link>
  );
}

// Un dibujo de línea de public/arte (520 × 372, suelo en y = 312), apoyado en
// la línea de suelo de la zona: 170 px de alto y 14 px desde arriba ponen su
// suelo a 157 px, sobre la línea. Lo que queda debajo se recorta.
export function DibujoTarjeta({ src }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={520}
      height={372}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute left-1/2 top-[14px] h-[170px] w-auto max-w-none -translate-x-1/2"
    />
  );
}

// "01", "02"… para el número de la zona.
export const dosCifras = (n) => String(n).padStart(2, "0");
