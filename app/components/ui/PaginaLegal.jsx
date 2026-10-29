// Página legal: título, apartados con su entrada en negritas y la fecha.
// El texto sale de docs/textos.md, palabra por palabra.
export const FECHA_LEGALES = "7 de noviembre de 2026";

export function PaginaLegal({ titulo, apartados }) {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <article className="mx-auto max-w-[680px]">
        <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] lg:text-titulo">
          {titulo}
        </h1>
        <div className="mt-space-6 flex flex-col gap-space-4 text-cuerpo text-texto-suave">
          {apartados.map(({ entrada, texto }) => (
            <p key={entrada}>
              <strong className="font-semibold text-texto">{entrada}</strong> {texto}
            </p>
          ))}
          <p>
            <strong className="font-semibold text-texto">Última actualización:</strong>{" "}
            {FECHA_LEGALES}.
          </p>
        </div>
      </article>
    </div>
  );
}
