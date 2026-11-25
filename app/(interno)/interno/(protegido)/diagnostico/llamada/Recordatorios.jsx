// Los recordatorios fijos de la llamada (lote 25), arriba de cada tramo.
export function Recordatorios({ titulo, lista }) {
  return (
    <section aria-label={titulo} className="rounded-md border border-borde p-space-3">
      <ul className="flex flex-col gap-1 text-pequeno text-texto-suave">
        {lista.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden="true">·</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
