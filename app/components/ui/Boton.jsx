import Link from "next/link";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

// Botón de docs/calidad.md § 3: primario, secundario y de texto, con sus
// ocho estados. Los colores salen del tema (noche o pared), así que sobre
// pared el primario es verde profundo sin pedirlo. El foco (2 px en el
// color del texto, 3 px de separación) viene de globals.css. Los colores
// cambian de golpe; solo se anima el transform.
const TEXTOS = {
  cargando: "Enviando",
  exito: "Enviado",
  error: "Intenta de nuevo",
};

const ALTO = {
  normal: "min-h-[48px]",
  compacto: "min-h-[44px]", // en la barra
  grande: "min-h-[52px]", // en el menú del celular
};

const BASE =
  "group/boton relative inline-flex items-center justify-center gap-2 rounded-pill border font-sans text-[16px] font-semibold leading-[1.25] transition-transform duration-rapido";

// Presionado: se hunde un poco. Con menos movimiento no hay scale.
const PRESIONA = "active:scale-[.97] motion-reduce:active:scale-100";

function clasesVariante(variante, estado, interactivo) {
  if (variante === "texto") {
    return `px-0 border-transparent text-texto ${interactivo ? "active:text-texto-suave" : ""}`;
  }

  // Legado de /saas y /gym: botón negro sobre una franja verde.
  if (variante === "sobreAcido") {
    return "px-6 border-black bg-black text-acento hover:bg-black/80";
  }

  if (estado === "error") {
    return `px-6 border-alerta bg-transparent text-alerta ${interactivo ? PRESIONA : ""}`;
  }

  if (variante === "secundario") {
    if (estado === "exito") return "px-6 border-acento bg-transparent text-acento";
    return `px-6 border-borde bg-transparent text-texto ${
      interactivo ? `hover:border-texto hover:bg-texto/[.06] ${PRESIONA}` : ""
    }`;
  }

  // primario
  return `px-6 border-transparent bg-acento text-sobre-acento ${
    interactivo ? `boton-firma active:bg-acento-presionado ${PRESIONA}` : ""
  }`;
}

// El cursor ▍ del logo: en hover, presionado y foco del primario, y
// mientras se envía. Va fuera
// del flujo, en el relleno, para que el texto no se mueva al aparecer.
function Cursor({ escribe = false }) {
  return (
    <span
      aria-hidden="true"
      className={`boton-cursor absolute left-full top-[0.1em] ml-[0.2em] h-[1em] w-[0.36em] bg-current ${
        escribe ? "boton-cursor-escribe" : ""
      }`}
    />
  );
}

function Contenido({ variante, estado, flecha, children }) {
  if (variante === "texto") {
    return (
      <>
        <span className="underline decoration-borde decoration-1 underline-offset-[6px] group-hover/boton:decoration-texto">
          {children}
        </span>
        {flecha && (
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-normal group-hover/boton:translate-x-1 motion-reduce:group-hover/boton:translate-x-0"
          >
            →
          </span>
        )}
      </>
    );
  }

  if (estado === "cargando") {
    return (
      <span aria-live="polite" className="relative">
        {TEXTOS.cargando}
        <Cursor escribe />
      </span>
    );
  }

  if (estado === "exito" || estado === "error") {
    const Icono = estado === "exito" ? FiCheck : FiAlertCircle;
    return (
      <>
        <Icono aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
        <span aria-live="polite">{TEXTOS[estado]}</span>
      </>
    );
  }

  if (variante === "primario") {
    return (
      <span className="relative">
        {children}
        <Cursor />
      </span>
    );
  }

  return children;
}

export function Boton({
  variante = "primario",
  estado = "reposo",
  href,
  onClick,
  children,
  type = "button",
  disabled = false,
  compacto = false,
  grande = false,
  flecha = true,
  className = "",
}) {
  // El de texto no tiene cargando ni éxito ni error (docs/calidad.md).
  const estadoEfectivo = variante === "texto" ? "reposo" : estado;
  // Mientras se envía o ya se envió, el botón no repite la acción, pero no
  // se deshabilita: conserva el foco y se anuncia el cambio.
  const ocupado = estadoEfectivo === "cargando" || estadoEfectivo === "exito";
  const interactivo = !disabled && !ocupado;

  const alto = ALTO[compacto ? "compacto" : grande ? "grande" : "normal"];
  const clases = `${BASE} ${variante === "texto" ? "min-h-[44px]" : alto} ${clasesVariante(
    variante,
    estadoEfectivo,
    interactivo
  )} ${disabled ? "cursor-not-allowed opacity-40" : ""} ${className}`
    .replace(/\s+/g, " ")
    .trim();

  const contenido = (
    <Contenido variante={variante} estado={estadoEfectivo} flecha={flecha}>
      {children}
    </Contenido>
  );

  // Un enlace nunca se deshabilita (se vuelve span), pero un botón de
  // formulario sí: conserva la semántica de <button disabled>.
  if (href) {
    if (!interactivo) {
      return (
        <span aria-disabled="true" className={clases}>
          {contenido}
        </span>
      );
    }

    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={clases}>
          {contenido}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} className={clases}>
        {contenido}
      </Link>
    );
  }

  if (disabled) {
    return (
      <button type={type} disabled className={clases}>
        {contenido}
      </button>
    );
  }

  // Ocupado, deja de ser de envío: así no manda dos veces.
  return (
    <button
      type={ocupado ? "button" : type}
      aria-disabled={ocupado || undefined}
      onClick={ocupado ? undefined : onClick}
      className={clases}
    >
      {contenido}
    </button>
  );
}
