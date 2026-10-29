import Link from "next/link";

// Botón de docs/sistema/components/Boton: píldora, Geist 17 px, mínimo
// 44 px de alto. El foco (2 px, 3 px de separación) viene de globals.css.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill border font-sans text-cuerpo";

function clasesVariante(variante, sobrePapel) {
  if (variante === "desactivado") {
    return "px-[22px] border-hairline bg-transparent text-texto-suave cursor-not-allowed";
  }

  if (variante === "secundario") {
    return "px-[22px] border-hairline bg-transparent text-texto hover:border-texto";
  }

  // Enlace de texto: va en acento; el "›" lo pone quien lo usa.
  if (variante === "texto") {
    return "px-0 border-transparent text-acento hover:underline underline-offset-4";
  }

  // Legado: botón negro sobre una franja verde.
  if (variante === "sobreAcido") {
    return "px-[22px] border-black bg-black text-acento hover:bg-black/80";
  }

  // primario. Sobre pared el acento es el verde profundo, con texto blanco.
  if (sobrePapel) {
    return "px-[22px] border-transparent bg-[rgb(var(--verde-profundo))] text-white hover:opacity-90";
  }

  return "px-[22px] border-transparent bg-acento text-sobre-acento hover:opacity-90";
}

export function Boton({
  variante = "primario",
  href,
  onClick,
  children,
  type = "button",
  disabled = false,
  sobrePapel = false,
  compacto = false,
  barrido = false,
  className = "",
}) {
  const estaDesactivado = disabled || variante === "desactivado";
  const varianteEfectiva = estaDesactivado ? "desactivado" : variante;
  // compacto solo recorta el relleno: el alto mínimo siempre es 44 px.
  const altura = compacto ? "min-h-[44px] !px-[18px]" : "min-h-[44px]";
  // Barrido al pulsar: una brochada clara cruza el botón de izquierda a derecha.
  const clasesBarrido = barrido
    ? "relative overflow-hidden after:absolute after:inset-0 after:origin-left after:scale-x-0 after:bg-texto/25 after:transition-transform after:duration-normal after:content-[''] active:after:scale-x-100 [&>*]:relative [&>*]:z-10"
    : "";
  const clases = `${BASE} ${altura} ${clasesVariante(varianteEfectiva, sobrePapel)} ${clasesBarrido} ${className}`
    .replace(/\s+/g, " ")
    .trim();

  // Un enlace nunca se deshabilita (se vuelve span), pero un botón de
  // formulario sí: conserva la semántica de <button disabled>.
  if (estaDesactivado) {
    if (!href) {
      return (
        <button type={type} disabled className={clases}>
          {children}
        </button>
      );
    }
    return (
      <span aria-disabled="true" className={clases}>
        {children}
      </span>
    );
  }

  if (href) {
    const esExterno = /^https?:\/\//.test(href);

    if (esExterno) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={clases}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={clases}>
      {children}
    </button>
  );
}
