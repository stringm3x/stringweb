import { Capas } from "./Capas";
import { Escenario } from "./Escenario";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 5 · La galería · Pintura (docs/textos.md), sobre pared. Las tres
// cartelas (STRING, el sistema para gimnasios y Tu negocio) ya vienen
// dibujadas en el arte. En celular conserva su tamaño y se recorre de lado,
// como la tira de cine. "Cada obra se ilumina en su turno": al entrar, una
// sola vez, la galería está en penumbra y los reflectores encienden cada
// cuadro, uno tras otro (app/salas.css, .galeria). En celular, cada cuadro
// se enciende cuando entra en la tira al deslizarla.
const CAPAS = ["galeria-1", "haz-1", "galeria-2", "haz-2", "galeria-3", "haz-3", "galeria-4"];

// La penumbra de cada cuadro: el marco completo (x = 80, 434, 788; 268 × 250).
const CUADROS = ["7.04%", "38.2%", "69.37%"];
export function Sala5Galeria() {
  return (
    <section id="galeria" data-theme="pared" className={`${SALA} scroll-mt-24`}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-5">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>LA GALERÍA</p>
          <h2 className={TITULAR}>Cada sistema tiene su arte.</h2>
          <p className={CUERPO}>
            Ningún sistema de STRING sale de una plantilla. Cada uno lleva una obra propia, que
            nace contigo en el boceto.
          </p>
        </div>
        <div
          role="region"
          aria-label="Cuadros de la galería"
          tabIndex={0}
          data-tira
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <Escenario modo="una-vez" cuadros className="galeria min-w-[720px]">
            <Capas
              carpeta="sala5"
              capas={CAPAS}
              ancho={1136}
              alto={500}
              alt="Tres cuadros con marco dorado en una galería: la ciudad de STRING, el plano del sistema para gimnasios y un lienzo en blanco para tu negocio."
            >
              {CUADROS.map((left, i) => (
                <div
                  key={left}
                  aria-hidden="true"
                  data-cuadro={i + 1}
                  className="penumbra absolute top-[18.4%] h-[50%] w-[23.6%] bg-texto/60"
                  style={{ left, "--i": i }}
                />
              ))}
            </Capas>
          </Escenario>
        </div>
      </div>
    </section>
  );
}
