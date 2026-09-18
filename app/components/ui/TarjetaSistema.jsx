import { Etiqueta } from "./Etiqueta";

export function TarjetaSistema({
  kicker,
  precio,
  titulo,
  frase,
  puntos = [],
  destacada = false,
  etiquetaDestacada,
  children,
}) {
  return (
    <div
      className={`relative flex flex-col gap-6 bg-fondo-elevado border p-8 ${
        destacada ? "border-acido shadow-acido" : "border-linea"
      }`}
    >
      {destacada && etiquetaDestacada && (
        <Etiqueta variante="chip" className="absolute -top-3 left-6 bg-fondo-elevado">
          {etiquetaDestacada}
        </Etiqueta>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono uppercase text-etiqueta text-tinta-tenue">{kicker}</span>
        {precio && <span className="font-mono text-dato text-acido">{precio}</span>}
      </div>

      <div className="space-y-2">
        <h3 className="font-anton uppercase text-titular-m text-tinta">{titulo}</h3>
        {frase && <p className="text-cuerpo-s text-tinta-suave">{frase}</p>}
      </div>

      {puntos.length > 0 && (
        <ul className="divide-y divide-linea border-t border-linea">
          {puntos.map((punto) => (
            <li key={punto} className="flex gap-3 py-3 text-cuerpo-s text-tinta-suave">
              <span className="text-acido" aria-hidden="true">
                –
              </span>
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}
