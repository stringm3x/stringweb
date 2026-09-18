import Link from "next/link";

const BASE =
  "inline-flex items-center justify-center gap-2 min-h-[48px] font-mono uppercase text-etiqueta disabled:opacity-60 disabled:cursor-not-allowed";

function clasesVariante(variante, sobrePapel) {
  if (variante === "secundario") {
    return "px-6 border border-tinta text-tinta bg-transparent hover:bg-tinta hover:text-black";
  }

  if (variante === "texto") {
    return "underline text-acido hover:text-tinta";
  }

  // primario
  if (sobrePapel) {
    return "px-6 border border-acido-profundo bg-acido-profundo text-white hover:bg-tinta hover:text-acido-profundo";
  }

  return "px-6 border border-acido bg-acido text-black hover:bg-black hover:text-acido";
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
  const clases = `${BASE} ${clasesVariante(variante, sobrePapel)} ${className}`.trim();

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
    <button type={type} onClick={onClick} disabled={disabled} className={clases}>
      {children}
    </button>
  );
}
