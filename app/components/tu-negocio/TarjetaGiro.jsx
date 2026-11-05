import { DibujoTarjeta, Tarjeta, dosCifras } from "../ui/Tarjeta";

// La tarjeta de un giro (lote 11): nombre, su frase y, en mono, desde cuánto
// ("DESDE $9,500 →"), "SE COTIZA →" o "CONOCE BOAZ →". Los giros grandes van
// con la cuerda de 3 px. Arriba, su dibujo y su número (lote 12).
export function TarjetaGiro({ giro, cuerda, numero }) {
  return (
    <Tarjeta
      href={giro.href}
      cuerda={cuerda}
      dibujo={<DibujoTarjeta src={giro.dibujo} />}
      numero={numero}
      className="h-full w-full"
    >
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
      {giros.map((giro, i) => (
        <li key={giro.href} className="flex">
          <TarjetaGiro giro={giro} cuerda={cuerda} numero={dosCifras(i + 1)} />
        </li>
      ))}
    </ul>
  );
}
