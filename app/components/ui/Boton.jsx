import Link from "next/link";

const BASE =
  "inline-flex items-center justify-center gap-2 min-h-[48px] font-mono uppercase text-etiqueta transition-colors duration-200";

function clasesVariante(variante, sobrePapel) {
  if (variante === "desactivado") {
    return "py-espacio-2 px-[28px] border-2 bg-fondo-elevado text-tinta-tenue border-linea cursor-not-allowed";
  }

  if (variante === "secundario") {
    return "py-espacio-2 px-[28px] border-2 border-tinta text-tinta bg-transparent hover:bg-tinta hover:text-black";
  }

  if (variante === "texto") {
    return "py-espacio-2 px-0 underline decoration-2 underline-offset-[6px] text-acido hover:text-tinta";
  }

  if (variante === "sobreAcido") {
    return "py-espacio-2 px-[28px] border-2 border-black bg-black text-acido hover:bg-acido hover:text-black";
  }

  // primario
  if (sobrePapel) {
    return "py-espacio-2 px-[28px] border-2 border-acido-profundo bg-acido-profundo text-white hover:bg-tinta hover:text-acido-profundo";
  }

  return "py-espacio-2 px-[28px] border-2 border-acido bg-acido text-black hover:bg-black hover:text-acido";
}

export function Boton({
  variante = "primario",
  href,
  onClick,
  children,
  type = "button",
  disabled = false,
  sobrePapel = false,
  className = "",
}) {
  const estaDesactivado = disabled || variante === "desactivado";
  const varianteEfectiva = estaDesactivado ? "desactivado" : variante;
  const clases = `${BASE} ${clasesVariante(varianteEfectiva, sobrePapel)} ${className}`.trim();

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
