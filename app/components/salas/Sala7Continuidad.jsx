import { Capas } from "./Capas";
import { Escenario } from "./Escenario";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 7 · Continuidad · Danza (docs/textos.md), de vuelta en noche. Las
// cintas son decorativas porque el texto se entiende sin ellas. "El sistema
// sigue trabajando, a su ritmo": se mecen y se voltean despacio, sin parar,
// solo mientras la sala está en pantalla (app/salas.css, .danza). Con menos
// movimiento, quietas.
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
        <Escenario modo="visible" className="danza">
          <Capas carpeta="sala7" capas={["cinta-oro", "cinta-roja", "cinta-verde"]} ancho={1136} alto={360} alt="" />
        </Escenario>
      </div>
    </section>
  );
}
