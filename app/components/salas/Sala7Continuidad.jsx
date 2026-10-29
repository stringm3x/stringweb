import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 7 · Continuidad · Danza (docs/textos.md), de vuelta en noche.
// Versión quieta: las cintas son decorativas porque el texto se entiende
// sin ellas.
const PLANES = [
  { nombre: "Cuida:", texto: "hosting, mantenimiento y soporte." },
  { nombre: "Mejora:", texto: "lo de Cuida, más ajustes y mejoras cada mes." },
  { nombre: "Impulsa:", texto: "lo de Mejora, más análisis y soporte prioritario." },
];

export function Sala7Continuidad() {
  return (
    <section data-theme="noche" className={SALA}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-6">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>CONTINUIDAD</p>
          <h2 className={TITULAR}>El sistema trabaja aunque tu negocio no esté disponible.</h2>
          <p className={CUERPO}>
            Un sistema no se entrega y se olvida. Lo cuidamos cada mes: que funcione, que esté al
            día y que crezca contigo. Toda propuesta trae su continuidad, con precio.
          </p>
          <ul className="flex flex-col border-t border-hairline">
            {PLANES.map((plan) => (
              <li key={plan.nombre} className={`border-b border-hairline py-space-3 ${CUERPO}`}>
                <strong className="font-semibold text-texto">{plan.nombre}</strong> {plan.texto}
              </li>
            ))}
          </ul>
          <p className="font-mono text-cifra font-medium text-texto">Desde $1,800 al mes.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arte/sala7-danza.svg"
          width={1136}
          height={360}
          loading="lazy"
          decoding="async"
          alt=""
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
