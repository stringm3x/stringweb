import { CUERPO, ETIQUETA, SALA } from "../salas/estilos";
import { Boton } from "../ui/Boton";
import { archivo } from "./archivo";
import { Entra } from "./Entra";
import { Firma } from "./Firma";

// Bloque 2 de /productos (lote 9a): Boaz, la única sala clara de la página.
// Texto a la izquierda y su lámina a la derecha (en celular, debajo). Listas
// y planes sin tarjetas, entre reglas. La mancha azul de la lámina es la
// única nota de color; el botón es el primario de pared (verde profundo).
const BOAZ = { fontStretch: "62%" };

const HACE = [
  { nombre: "Socios sin límite.", frase: "Altas, planes y vencimientos al día, solos." },
  { nombre: "Entrada con QR.", frase: "Check-in en recepción o en kiosco, sin equipo especial." },
  { nombre: "Caja que cuadra.", frase: "Cobros, recibos y corte del día. Un cobro nunca se registra dos veces." },
  { nombre: "Quién se te va.", frase: "Avisa qué socios llevan 14 días sin venir.", pro: true },
  {
    nombre: "Tu negocio en una pantalla.",
    frase: "El Marcador: cuánto entra, cuántos se quedan, cuántos se van.",
    pro: true,
  },
];

const PLANES = [
  { nombre: "Starter", frase: "Sal del cuaderno.", mes: "$799", anual: "$7,990" },
  { nombre: "Pro", frase: "Vende más en el mismo local.", mes: "$1,799", anual: "$17,990", recomendado: true },
];

const SUBTITULO = "font-mono text-etiqueta uppercase text-texto";

export function BloqueBoaz() {
  return (
    <section id="boaz" data-theme="pared" aria-labelledby="boaz-titulo" className={`${SALA} scroll-mt-16`}>
      <Entra className="mx-auto flex max-w-contenido flex-col gap-space-7">
        <div className="grid items-start gap-space-6 lg:grid-cols-2">
          <div className="flex flex-col gap-space-4">
            <p className={ETIQUETA}>01 · PRODUCTOS</p>
            <h2 id="boaz-titulo" className="flex flex-col gap-space-2">
              <span
                className={`${archivo.className} block text-[104px] leading-[0.9] md:text-[144px] lg:text-[168px]`}
                style={BOAZ}
              >
                Boaz,
              </span>
              <span className="block text-[32px] font-semibold leading-[1.1] tracking-[-0.035em] md:text-[44px]">
                el sistema para gimnasios.
              </span>
            </h2>
            <Firma />
            <p className="text-cuerpo-l text-texto-suave">
              Con Boaz, tu gimnasio sabe cuánto entra, ve quién se le va antes de que se vaya y le da a
              sus socios una razón para volver. En pesos, sin instalación y sin límite de socios.
            </p>
          </div>

          <figure className="flex flex-col gap-space-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arte/productos/lamina-boaz.svg"
              width={224}
              height={206}
              alt="Lámina de Boaz: una columna con un disco colgado, dibujada como plano técnico, con la mancha azul en el disco."
              loading="lazy"
              className="h-auto w-full border border-texto"
            />
            <figcaption className="font-mono text-etiqueta uppercase text-texto-suave">
              LA LÁMINA DE BOAZ · PLANO TÉCNICO SOBRE PAPEL
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-space-5 border-t border-texto pt-space-5 md:grid-cols-2">
          <div className="flex flex-col gap-space-3">
            <h3 className={SUBTITULO}>CÓMO NACIÓ</h3>
            <p className={CUERPO}>
              Boaz empezó como un sistema a la medida para Evolution GYM, el gimnasio de mi familia. Lo
              construimos para su recepción: socios, cobros, entradas y caja. Lo corregimos con socios de
              verdad, en un negocio real, y lo convertimos en un producto que cualquier gimnasio puede
              usar.
            </p>
          </div>
          <div className="flex flex-col gap-space-3">
            <p className="text-cuerpo text-texto">Se llama Boaz: en hebreo, “en él hay fuerza”.</p>
            <p className="font-mono text-etiqueta uppercase text-texto-suave">
              EN PRODUCCIÓN DESDE OCTUBRE DE 2026 · EVOLUTION GYM
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-space-3">
          <h3 className={SUBTITULO}>LO QUE HACE HOY</h3>
          <ol className="border-b border-hairline">
            {HACE.map((fila, i) => (
              <li
                key={fila.nombre}
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-space-3 border-t border-hairline py-space-3"
              >
                <span className="font-mono text-cifra text-texto-suave">{String(i + 1).padStart(2, "0")}</span>
                <p className="flex flex-col gap-1 md:flex-row md:gap-space-3">
                  <span className="text-cuerpo font-semibold text-texto">{fila.nombre}</span>
                  <span className="text-cuerpo text-texto-suave">{fila.frase}</span>
                </p>
                {fila.pro ? (
                  <span className="font-mono text-etiqueta uppercase text-texto">PRO</span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-space-3">
          <h3 className={SUBTITULO}>PLANES</h3>
          <ul className="grid border-y border-texto md:grid-cols-2">
            {PLANES.map((plan, i) => (
              <li
                key={plan.nombre}
                className={`flex flex-col gap-space-2 py-space-5 ${
                  i > 0 ? "border-t border-hairline md:border-l md:border-t-0 md:pl-space-5" : "md:pr-space-5"
                }`}
              >
                <p className="flex flex-wrap items-baseline gap-x-space-3">
                  <span className={`${archivo.className} text-[56px] leading-none`} style={BOAZ}>
                    {plan.nombre}
                  </span>
                  {plan.recomendado && (
                    <span className="font-mono text-etiqueta uppercase text-texto">★ RECOMENDADO</span>
                  )}
                </p>
                <p className="text-cuerpo text-texto">{plan.frase}</p>
                <p className="font-mono text-texto">
                  <span className="text-[28px] leading-tight">{plan.mes}</span>{" "}
                  <span className="text-etiqueta uppercase">AL MES</span>
                </p>
                <p className="font-mono text-etiqueta uppercase text-texto-suave">O {plan.anual} AL AÑO</p>
              </li>
            ))}
          </ul>
          <p className={CUERPO}>Sin costo de instalación. Sin límite de socios en ningún plan.</p>
        </div>

        <div>
          <Boton href="/gym/registro" variante="primario">
            Registra tu gimnasio
          </Boton>
        </div>
      </Entra>
    </section>
  );
}
