import { Escenario } from "./Escenario";
import { CUERPO, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 6 · Cómo trabajamos · Arquitectura (docs/textos.md), en noche (lote 11).
// Los pasos, el dibujo de la obra y el estándar de servicio con sus cifras en
// Geist Mono. El dibujo (lote 19, scripts/dibujos/sala6.mjs) es un edificio
// que se completa de izquierda a derecha en cinco tramos, uno por paso; está
// quieto. Va pegado bajo la barra, arriba de la lista en celular y en su
// columna en escritorio. El paso de ahora se marca en la lista (app/salas.css,
// .paso-marca); con menos movimiento, sin paso marcado.
//
// Las etiquetas de los tramos van en HTML, en una fila alineada con el
// dibujo: los tramos ocupan del 7.8 % al 92.2 % de su ancho (px-[7.8%]). En
// escritorio ancho (1280 px o más), número, nombre y subtítulo; abajo de eso,
// donde no caben sin encimarse, solo el número y, debajo, la lista: en
// celular, fuera de lo pegado; de 1024 a 1279 px, bajo el dibujo en su
// columna. Son aria-hidden: el dibujo lleva su descripción y los
// nombres ya se leen en la lista de pasos.
const TRAMOS = [
  { nombre: "Diagnóstico", que: "Cimientos" },
  { nombre: "Boceto", que: "Plano" },
  { nombre: "Propuesta", que: "Estructura" },
  { nombre: "Construcción", que: "Muros" },
  { nombre: "Entrega", que: "Luz" },
];
const DESCRIPCION =
  "Dibujo de un edificio que se completa de izquierda a derecha en cinco tramos: el cimiento con dos estacas y cinta de obra; el plano en línea punteada; la estructura de madera; los muros con andamio; y el tramo terminado, con las ventanas encendidas y una bandera verde.";
const NUMERO = "font-mono text-etiqueta text-acento";
const SUBTITULO = "font-mono text-etiqueta uppercase text-texto-suave";
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
    <section id="como-trabajamos" data-theme="noche" className={`${SALA} scroll-mt-24`}>
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
            <div className="mx-auto max-w-[592px]">
              <div role="img" aria-label={DESCRIPCION}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/arte/sala6-obra.svg"
                  width={592}
                  height={320}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <ol aria-hidden="true" className="grid grid-cols-5 px-[7.8%] pt-space-2 text-center">
                {TRAMOS.map((t, i) => (
                  <li key={t.nombre} className="flex flex-col items-center gap-space-1 whitespace-nowrap">
                    <span className={NUMERO}>{i + 1}</span>
                    <span className="hidden text-pequeno font-semibold text-texto xl:block">{t.nombre}</span>
                    <span className={`hidden xl:block ${SUBTITULO}`}>{t.que}</span>
                  </li>
                ))}
              </ol>
              <Leyenda className="mt-space-3 hidden lg:flex xl:hidden" />
            </div>
          </div>
          <Leyenda className="-mt-space-3 flex lg:hidden" />
          {/* El número de cada paso vive en las etiquetas del dibujo; aquí no
              se repite. El <ol> guarda el orden para el lector. */}
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

// La lista de los tramos, para cuando la fila solo lleva el número.
function Leyenda({ className }) {
  return (
    <ol aria-hidden="true" className={`flex-col gap-space-1 ${className}`}>
      {TRAMOS.map((t, i) => (
        <li key={t.nombre} className="text-pequeno">
          <span className={NUMERO}>{i + 1}</span>{" "}
          <span className="font-semibold text-texto">{t.nombre}</span>{" "}
          <span className="text-texto-suave">·</span> <span className={SUBTITULO}>{t.que}</span>
        </li>
      ))}
    </ol>
  );
}
