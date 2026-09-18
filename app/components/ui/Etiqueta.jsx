export function Etiqueta({
  children,
  conPunto = false,
  variante = "chip",
  sobrePapel = false,
  className = "",
}) {
  if (variante === "linea") {
    const colorTexto = sobrePapel ? "text-tinta-papel" : "text-tinta-suave";
    return (
      <span className={`inline-flex items-center gap-3 sm:gap-4 ${className}`.trim()}>
        <span className="h-[3px] w-[28px] sm:w-10 bg-acido flex-shrink-0" aria-hidden="true" />
        <span className={`font-mono uppercase text-etiqueta ${colorTexto}`}>{children}</span>
      </span>
    );
  }

  const color = sobrePapel ? "text-acido-profundo" : "text-acido";
  const base = `inline-flex items-center gap-2 font-mono uppercase text-etiqueta ${color}`;
  const clasesVariante =
    variante === "chip"
      ? `px-3 py-1.5 border rounded ${sobrePapel ? "border-acido-profundo/30" : "border-acido/30"}`
      : "";
  const colorPunto = sobrePapel ? "bg-acido-profundo" : "bg-acido";

  return (
    <span className={`${base} ${clasesVariante} ${className}`.trim()}>
      {conPunto && <span className={`w-1.5 h-1.5 rounded-full ${colorPunto}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
