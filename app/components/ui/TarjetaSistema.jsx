export function TarjetaSistema({
  kicker,
  precio,
  titulo,
  frase,
  puntos = [],
  destacada = false,
  children,
}) {
  return (
    <div
      className={`flex flex-col bg-fondo-elevado border-2 p-espacio-4 ${
        destacada ? "border-acido shadow-acido" : "border-linea"
      }`}
    >
      <div className="flex items-baseline justify-between gap-espacio-3 mb-espacio-3">
        <span className="font-mono uppercase text-etiqueta text-tinta-tenue">{kicker}</span>
        {precio && <span className="font-mono text-dato text-acido">{precio}</span>}
      </div>

      <h3 className="font-anton uppercase text-titular-m text-tinta mb-espacio-2">{titulo}</h3>
      {frase && <p className="text-cuerpo-s text-tinta-suave mb-espacio-4">{frase}</p>}

      {puntos.length > 0 && (
        <ul className="divide-y divide-linea border-y border-linea">
          {puntos.map((punto) => (
            <li
              key={punto}
              className="flex gap-espacio-2 py-espacio-2 text-cuerpo-s text-tinta-suave"
            >
              <span className="text-acido" aria-hidden="true">
                —
              </span>
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      )}

      {children && <div className="mt-espacio-4">{children}</div>}
    </div>
  );
}
