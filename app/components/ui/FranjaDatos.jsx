export function FranjaDatos({ datos, sobrePapel = false, className = "" }) {
  const colorCifra = sobrePapel ? "text-acido-profundo" : "text-acido";
  const colorEtiqueta = sobrePapel ? "text-tinta-papel" : "text-tinta-tenue";

  return (
    <div
      className={`flex flex-wrap divide-x divide-linea border-t-2 border-t-acido border-b border-b-linea ${className}`.trim()}
    >
      {datos.map((dato) => (
        <div key={dato.label} className="flex-1 min-w-[120px] px-4 py-6 text-center">
          <p className={`font-anton text-titular-l ${colorCifra}`}>{dato.value}</p>
          <p
            className={`mt-espacio-2 font-mono uppercase text-etiqueta whitespace-pre-line ${colorEtiqueta}`}
          >
            {dato.label}
          </p>
        </div>
      ))}
    </div>
  );
}
