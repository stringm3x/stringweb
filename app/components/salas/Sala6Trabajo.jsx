import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 6 · Cómo trabajamos · Arquitectura (docs/textos.md), sobre pared.
// Versión quieta: los pasos, el edificio dibujado a mano y el estándar de
// servicio con sus cifras en Geist Mono.
const PASOS = [
  {
    nombre: "Diagnóstico.",
    texto:
      "Una llamada de 20 a 30 minutos para escucharte: cómo está hoy tu negocio. Es gratis, y el diagnóstico inicial lo tienes en 24 horas.",
  },
  {
    nombre: "Boceto.",
    texto:
      "De Automatiza en adelante: el mapa de tus procesos, la primera pantalla dibujada y tu obra en boceto. Se acredita completo si contratas el sistema.",
  },
  {
    nombre: "Propuesta.",
    texto: "Por escrito: qué incluye, qué no incluye, precio y continuidad. Vale 7 días.",
  },
  {
    nombre: "Construcción.",
    texto:
      "El alcance se firma antes de empezar. Lo nuevo se cotiza aparte o va en la siguiente versión. Te mandamos el avance por escrito cada viernes.",
  },
  {
    nombre: "Entrega.",
    texto: "Tu sistema funcionando, con su obra, y te acompañamos en el arranque.",
  },
];

const ESTANDAR = [
  { que: "Respuesta a tus mensajes", cuando: "1 día hábil" },
  { que: "Si tu sistema no cobra o no deja entrar", cuando: "4 horas hábiles" },
  { que: "Resumen de cada llamada", cuando: "El mismo día, por escrito" },
  { que: "Avance del proyecto", cuando: "Cada viernes, por escrito" },
  { que: "Propuesta después del diagnóstico", cuando: "2 días hábiles" },
];

export function Sala6Trabajo() {
  return (
    <section data-theme="pared" className={SALA}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-6">
        <div className="grid items-center gap-space-6 lg:grid-cols-2">
          <div className="flex flex-col gap-space-4">
            <p className={ETIQUETA}>CÓMO TRABAJAMOS</p>
            <h2 className={TITULAR}>Primero los cimientos.</h2>
            <ol className="flex flex-col gap-space-3">
              {PASOS.map((paso, i) => (
                <li key={paso.nombre} className={`flex gap-space-3 ${CUERPO}`}>
                  <span className="w-6 flex-shrink-0 font-mono text-cifra text-texto">{i + 1}.</span>
                  <p>
                    <strong className="font-semibold text-texto">{paso.nombre}</strong> {paso.texto}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arte/sala6-arquitectura.svg"
            width={640}
            height={590}
            loading="lazy"
            decoding="async"
            alt="Dibujo de un edificio en construcción: cimientos, dos pisos terminados, un piso en obra y una bandera en lo alto."
            className="mx-auto h-auto w-full max-w-[520px]"
          />
        </div>

        <div className="flex flex-col gap-space-4 rounded-lg border border-hairline bg-superficie p-space-4 lg:p-space-6">
          <h3 className="text-subtitulo">Nuestro estándar</h3>
          <dl className="flex flex-col">
            {ESTANDAR.map((fila) => (
              <div
                key={fila.que}
                className="flex flex-col gap-space-1 border-t border-hairline py-space-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-space-4"
              >
                <dt className={CUERPO}>{fila.que}</dt>
                <dd className="font-mono text-cifra text-texto">{fila.cuando}</dd>
              </div>
            ))}
          </dl>
          <p className="text-pequeno text-texto-suave">Días hábiles: lunes a viernes, de 9 a 19 h.</p>
          <p className="text-cuerpo text-texto">
            Garantizamos tiempos y que tu sistema funcione. Nunca prometemos ventas. Un responsable
            con nombre: Carlos Avilés.
          </p>
        </div>
      </div>
    </section>
  );
}
