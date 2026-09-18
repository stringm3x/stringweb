const REPETICIONES_DEFECTO = 6;

export function Cinta({
  texto,
  variante = "solida",
  duracionSegundos = 30,
  repeticiones = REPETICIONES_DEFECTO,
  decorativo = true,
  className = "",
}) {
  const esInversa = variante === "inversa";
  const fondo = esInversa ? "bg-fondo border-t-2 border-b-2 border-acido" : "bg-acido";
  const colorTexto = esInversa ? "text-acido" : "text-black";

  const grupo = (oculto) => (
    <span className="inline-flex" aria-hidden={oculto || undefined}>
      {Array.from({ length: repeticiones }).map((_, i) => (
        <span key={i} className="inline-flex items-center">
          <span className={`font-anton uppercase text-titular-l px-espacio-4 ${colorTexto}`}>
            {texto}
          </span>
          <span className={`font-anton uppercase text-titular-l opacity-45 ${colorTexto}`}>
            S
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden={decorativo || undefined}
      className={`overflow-hidden whitespace-nowrap py-espacio-3 ${fondo} ${className}`.trim()}
    >
      <div
        className="inline-flex animate-cinta motion-reduce:animate-none"
        style={{ animationDuration: `${duracionSegundos}s` }}
      >
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
