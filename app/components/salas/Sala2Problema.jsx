import { Capas } from "./Capas";
import { Escenario } from "./Escenario";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 2 · El problema · Escultura (docs/textos.md). "El sistema quita lo
// que sobra": al bajar, la piedra que tapa el hueco se agrieta, cae a
// pedazos y queda el celular con su lista (docs/movimiento-salas.md). El
// movimiento vive en app/salas.css (.escultura); sin él, el celular libre.
const PERDIDAS = [
  "Alguien pregunta el precio y nadie contesta a tiempo.",
  "La conversación se pierde entre cientos de chats.",
  "El interesado no recibe seguimiento y se enfría.",
  "Los pagos viven en un Excel, sin historial.",
  "Nadie sabe cuántos clientes siguen y cuántos se fueron.",
  "Y tú no sabes cuánto ganas.",
];

// La piedra que tapa el hueco, partida en cuatro por grietas que salen del
// centro (226, 402). Cada pedazo trae su cara, del color del frente del
// bloque, y su grieta: el contorno y una rama, que caen con él. `cae` es
// hacia dónde se va.
const PEDAZOS = [
  {
    cara: "M114.3 388 116.1 350.2 119.7 300.1 170.5 283 240 289.5 238 312 222 338 232 370 226 402 196 410 168 392 140 398Z",
    rama: "M222 338 205 326 198 330",
    cae: { dx: "-14px", dy: "70px", giro: "-18deg" },
  },
  {
    cara: "M240 289.5 250.7 290.6 318.2 300.4 340.7 350.6 337.6 390 312 388 290 404 258 396 226 402 232 370 222 338 238 312Z",
    rama: "M290 404 296 420",
    cae: { dx: "12px", dy: "80px", giro: "14deg" },
  },
  {
    cara: "M337.6 390 331.3 469.5 299.8 510.9 230 515.3 226 492 236 466 218 432 226 402 258 396 290 404 312 388Z",
    rama: "M236 466 256 474 262 470",
    cae: { dx: "10px", dy: "60px", giro: "22deg" },
  },
  {
    cara: "M230 515.3 209.6 516.6 131.6 500.4 112.7 421 114.3 388 140 398 168 392 196 410 226 402 218 432 236 466 226 492Z",
    rama: "M168 392 160 412",
    cae: { dx: "-8px", dy: "55px", giro: "-12deg" },
  },
];

function Piedra() {
  return (
    <svg
      viewBox="0 150 560 470"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      {/* Un poco más grande que el hueco, para tapar su borde. */}
      <g transform="translate(226 402) scale(1.03) translate(-226 -402)">
        {PEDAZOS.map(({ cara, rama, cae }, i) => (
          <g
            key={cara}
            className="piedra"
            style={{ "--i": i, "--dx": cae.dx, "--dy": cae.dy, "--giro": cae.giro }}
          >
            <path d={cara} fill="#DDD3C0" />
            <path
              className="piedra-grieta"
              d={`${cara} ${rama}`}
              fill="none"
              stroke="#3B352D"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Sala2Problema() {
  return (
    <section data-theme="noche" className={SALA}>
      <div className="mx-auto grid max-w-contenido items-center gap-space-6 lg:grid-cols-2">
        <div className="flex flex-col gap-space-4">
          <p className={ETIQUETA}>EL PROBLEMA</p>
          <h2 className={TITULAR}>No es falta de demanda. Es falta de sistema.</h2>
          <p className={CUERPO}>
            Tus clientes te escriben por Instagram y WhatsApp. En el camino se pierden:
          </p>
          <ul className="flex flex-col border-t border-hairline">
            {PERDIDAS.map((linea) => (
              <li key={linea} className={`border-b border-hairline py-space-3 ${CUERPO}`}>
                {linea}
              </li>
            ))}
          </ul>
          <p className="text-cuerpo font-semibold text-texto">
            Un sistema quita lo que sobra. Queda tu negocio.
          </p>
        </div>
        <Escenario modo="etapas" className="escultura relative mx-auto w-full max-w-[460px]">
          <Capas
            carpeta="sala2"
            capas={["bloque", "celular", "lascas", "herramientas"]}
            ancho={560}
            alto={470}
            alt="Dibujo de un celular con una lista ordenada que sale tallado de un bloque de mármol."
          >
            <Piedra />
          </Capas>
          {/* Respaldo sin animation-timeline: se agrieta al cruzar el borde de
              arriba la mitad de la pantalla y cae al cruzar el centro. */}
          <span data-centinela aria-hidden="true" className="absolute inset-x-0 top-0 h-px" />
          <span data-centinela aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px" />
        </Escenario>
      </div>
    </section>
  );
}
