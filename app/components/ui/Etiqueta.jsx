export function Etiqueta({ children, conPunto = false, variante = "chip", className = "" }) {
  const base = "inline-flex items-center gap-2 font-mono uppercase text-etiqueta text-acido";
  const clasesVariante = variante === "chip" ? "px-3 py-1.5 border border-acido/30 rounded" : "";

  return (
    <span className={`${base} ${clasesVariante} ${className}`.trim()}>
      {conPunto && <span className="w-1.5 h-1.5 rounded-full bg-acido" aria-hidden="true" />}
      {children}
    </span>
  );
}
