import { FiAlertCircle } from "react-icons/fi";

// Campo de texto de docs/calidad.md § 3: etiqueta visible arriba, 48 px de
// alto, radio 12 px. En foco, borde de acento con halo; con error, borde y
// mensaje en alerta, unidos con aria-describedby. Los colores cambian de
// golpe: no se anima nada.
const CAMPO =
  "w-full min-h-[48px] rounded-[12px] border bg-fondo px-4 py-3 font-sans text-[16px] text-texto placeholder:text-placeholder focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40";

export function MensajeError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="flex items-center gap-2 text-pequeno text-alerta">
      <FiAlertCircle aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
      {children}
    </p>
  );
}

// ref llega como prop (React 19) y va al input, para react-hook-form.
export function Campo({ id, etiqueta, error, multilinea = false, className = "", ref, ...props }) {
  const errorId = `${id}-error`;
  const Control = multilinea ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-space-2">
      <label htmlFor={id} className="text-[14px] font-medium text-texto">
        {etiqueta}
      </label>
      <Control
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${CAMPO} ${
          error ? "border-alerta" : "border-borde hover:border-borde-hover"
        } ${multilinea ? "resize-y" : ""} ${className}`
          .replace(/\s+/g, " ")
          .trim()}
        {...props}
      />
      <MensajeError id={errorId}>{error}</MensajeError>
    </div>
  );
}
