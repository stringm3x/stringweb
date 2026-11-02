import { Tarjeta } from "../ui/Tarjeta";

// La tarjeta de un giro (lote 11): nombre, su frase y, en mono, desde cuánto
// ("DESDE $8,000 →"), "SE COTIZA →" o "CONOCE BOAZ →". Los giros grandes van
// con la cuerda de 3 px.
export function TarjetaGiro({ giro, cuerda }) {
  return (
    <Tarjeta href={giro.href} cuerda={cuerda} className="flex h-full w-full flex-col gap-space-3">
      <h3 className="text-subtitulo">{giro.nombre}</h3>
      <p className="text-cuerpo text-texto-suave">{giro.frase}</p>
      <p className="mt-auto font-mono text-cifra uppercase text-texto">
        {giro.cta} <span aria-hidden="true">→</span>
      </p>
    </Tarjeta>
  );
}

// La cuadrícula de tarjetas de un grupo.
export function Tarjetas({ giros, cuerda }) {
  return (
    <ul className="grid gap-space-5 md:grid-cols-2 lg:grid-cols-3">
      {giros.map((giro) => (
        <li key={giro.href} className="flex">
          <TarjetaGiro giro={giro} cuerda={cuerda} />
        </li>
      ))}
    </ul>
  );
}
