export function FranjaDatos({ datos, className = "" }) {
  return (
    <div
      className={`flex flex-wrap divide-x divide-linea border-t-2 border-acido ${className}`.trim()}
    >
      {datos.map((dato) => (
        <div key={dato.label} className="flex-1 min-w-[120px] px-4 py-6 text-center">
          <p className="font-anton text-titular-m text-acido">{dato.value}</p>
          <p className="mt-1 font-mono text-etiqueta text-tinta-tenue whitespace-pre-line">
            {dato.label}
          </p>
        </div>
      ))}
    </div>
  );
}
