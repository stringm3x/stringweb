import Link from "next/link";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

// Botón de Boaz (lote 9b, G): solo en /boaz y /gym. Píldora de 48 px en
// Geist 600, sin el cursor ▍ (es la firma de STRING). Primario #1F5FD6 con
// texto blanco; hover y presionado #174AAA en --boaz-dur-color (120 ms, G;
// 0 con menos movimiento); presionado y foco, de golpe y sin scale; foco de
// 2 px #1F5FD6 a 2 px (tema boaz en globals.css). Los ocho estados de
// docs/calidad.md § 3: reposo, hover, presionado, foco, cargando,
// deshabilitado, éxito y error. Los colores salen del tema.
const BASE =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border font-sans text-[16px] font-semibold leading-[1.25] transition-colors duration-boaz-color ease-curva";

const TEXTOS = { exito: "Enviado", error: "Intenta de nuevo" };

function clases(variante, estado, interactivo) {
  if (variante === "texto") {
    return `border-transparent px-0 text-acento underline-offset-4 ${
      interactivo ? "hover:text-acento-presionado hover:underline active:text-acento-presionado active:transition-none" : ""
    }`;
  }
  if (estado === "error") return "border-alerta bg-transparent px-6 text-alerta";
  if (variante === "secundario") {
    if (estado === "exito") return "border-acento bg-transparent px-6 text-acento";
    return `border-borde bg-transparent px-6 text-texto ${
      interactivo ? "hover:bg-superficie active:bg-superficie active:transition-none" : ""
    }`;
  }
  return `border-transparent bg-acento px-6 text-sobre-acento ${
    interactivo ? "hover:bg-acento-presionado active:bg-acento-presionado active:transition-none" : ""
  }`;
}

function Contenido({ estado, textoCargando, children }) {
  if (estado === "cargando") return <span aria-live="polite">{textoCargando}</span>;
  if (estado === "exito" || estado === "error") {
    const Icono = estado === "exito" ? FiCheck : FiAlertCircle;
    return (
      <>
        <Icono aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
        <span aria-live="polite">{TEXTOS[estado]}</span>
      </>
    );
  }
  return children;
}

export function BotonBoaz({
  variante = "primario",
  estado = "reposo",
  href,
  children,
  type = "button",
  disabled = false,
  textoCargando = "Enviando",
  className = "",
}) {
  const estadoEfectivo = variante === "texto" ? "reposo" : estado;
  // Mientras se envía o ya se envió no repite la acción, pero conserva el foco.
  const ocupado = estadoEfectivo === "cargando" || estadoEfectivo === "exito";
  const interactivo = !disabled && !ocupado;
  const cls = `${BASE} ${clases(variante, estadoEfectivo, interactivo)} ${
    disabled ? "cursor-not-allowed opacity-40" : ""
  } ${className}`
    .replace(/\s+/g, " ")
    .trim();
  const contenido = (
    <Contenido estado={estadoEfectivo} textoCargando={textoCargando}>
      {children}
    </Contenido>
  );

  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {contenido}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {contenido}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} aria-disabled={ocupado || undefined} className={cls}>
      {contenido}
    </button>
  );
}
