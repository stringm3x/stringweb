import Link from "next/link";
import { CUERPO, ENLACE, SALA, TITULAR } from "./estilos";

// Preguntas frecuentes (docs/textos.md). <details> abre y cierra sin JS y
// se usa con teclado; precios y porcentajes en Geist Mono.
function Cifra({ children }) {
  return <span className="font-mono text-texto">{children}</span>;
}

const PREGUNTAS = [
  {
    p: "¿Cuánto cuesta?",
    r: (
      <>
        Depende del nivel: desde <Cifra>$8,000</Cifra>. El precio exacto sale del diagnóstico,
        por escrito.
      </>
    ),
  },
  {
    p: "¿Cuánto tarda?",
    r: "Responde y Organiza, de 2 a 3 semanas. Automatiza y Controla, de 4 a 6. Empresa, lo que diga su propuesta.",
  },
  {
    p: "¿Cómo se paga?",
    r: (
      <>
        Con anticipo. Responde y Organiza, <Cifra>50 %</Cifra> al empezar y <Cifra>50 %</Cifra>{" "}
        al entregar. Automatiza y Controla, en tres pagos: <Cifra>40, 30 y 30 %</Cifra>.
      </>
    ),
  },
  {
    p: "¿Me hacen descuento?",
    r: "No descontamos. Si el precio pesa, ajustamos el alcance.",
  },
  {
    p: "¿Me garantizan que voy a vender más?",
    r: "No. Garantizamos tiempos y que tu sistema funcione. Las ventas son de tu negocio; el sistema hace que no se te escapen.",
  },
  {
    p: "¿Qué es el boceto?",
    r: "El primer paso de Automatiza en adelante: el mapa de tus procesos, la primera pantalla y tu obra en boceto. Si contratas el sistema, se acredita completo.",
  },
  {
    p: "¿Qué pasa después de la entrega?",
    r: (
      <>
        Sigue la continuidad: cuidamos tu sistema cada mes, desde <Cifra>$1,800</Cifra>.
      </>
    ),
  },
  {
    p: "Tengo un gimnasio. ¿Me sirve?",
    r: (
      <>
        Para gimnasios ya existe un sistema hecho:{" "}
        <Link href="/saas" className={`font-semibold ${ENLACE}`}>
          Ver el sistema para gimnasios
        </Link>
        .
      </>
    ),
  },
];

export function Preguntas() {
  return (
    <section data-theme="noche" className={SALA}>
      <div className="mx-auto flex max-w-[860px] flex-col gap-space-5">
        <h2 className={TITULAR}>Preguntas frecuentes</h2>
        <div className="flex flex-col border-t border-hairline">
          {PREGUNTAS.map(({ p, r }) => (
            <details key={p} className="group border-b border-hairline">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-space-4 py-space-3 text-cuerpo font-semibold text-texto [&::-webkit-details-marker]:hidden">
                {p}
                <span
                  aria-hidden="true"
                  className="font-mono text-cifra text-texto-suave group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="hidden font-mono text-cifra text-texto-suave group-open:inline"
                >
                  −
                </span>
              </summary>
              <p className={`pb-space-4 ${CUERPO}`}>{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
