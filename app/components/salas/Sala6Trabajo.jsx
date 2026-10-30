import { Capas } from "./Capas";
import { Escenario } from "./Escenario";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 6 · Cómo trabajamos · Arquitectura (docs/textos.md), sobre pared.
// Los pasos, el edificio dibujado a mano y el estándar de servicio con sus
// cifras en Geist Mono. "El edificio crece al ritmo de los pasos": cada piso
// sube cuando su paso cruza la línea y el paso de ahora se marca en la lista
// (app/salas.css, .arquitectura). El dibujo va pegado bajo la barra, arriba
// de la lista en celular y en su columna en escritorio, para verlo crecer.
// Con menos movimiento, el edificio completo y sin paso marcado.
const CAPAS = ["suelo", "cimientos", "suelo-linea", "piso-1", "piso-2", "obra", "bandera", "rotulos"];
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
        {/* La línea de cada paso: al 74 % de la pantalla en celular (el centro
            de lo que queda bajo el dibujo) y al 70 % en escritorio, para que el
            dibujo siga entero cuando llega el último paso. */}
        <Escenario
          modo="etapas"
          activo
          linea={74}
          lineaAncha={70}
          className="arquitectura grid gap-space-6 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-space-4">
            <p className={ETIQUETA}>CÓMO TRABAJAMOS</p>
            <h2 className={TITULAR}>Primero los cimientos.</h2>
          </div>
          <div className="sticky top-[72px] z-10 bg-fondo py-space-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:top-[104px] lg:self-start">
            <Capas
              carpeta="sala6"
              capas={CAPAS}
              ancho={640}
              alto={590}
              alt="Dibujo de un edificio en construcción: cimientos, dos pisos terminados, un piso en obra y una bandera en lo alto."
              className="mx-auto w-full max-w-[520px]"
            />
          </div>
          {/* El número de cada paso vive en el dibujo (1 · Diagnóstico…); aquí
              no se repite. El <ol> guarda el orden para el lector. */}
          <ol className="flex flex-col gap-space-3 lg:col-start-1">
            {PASOS.map((paso) => (
              <li key={paso.nombre} data-centinela className={`relative ${CUERPO}`}>
                <span aria-hidden="true" className="paso-marca absolute -left-3 bottom-1 top-1 w-[2px] bg-acento" />
                <strong className="font-semibold text-texto">{paso.nombre}</strong> {paso.texto}
              </li>
            ))}
          </ol>
        </Escenario>

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
