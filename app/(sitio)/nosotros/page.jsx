import Image from "next/image";
import localFont from "next/font/local";
import { Cierre } from "@/app/components/salas/Cierre";
import { CUERPO, ENLACE, ETIQUETA, SALA, TITULAR } from "@/app/components/salas/estilos";
import { Entra } from "@/app/components/ui/Entra";

// /nosotros (lote 10, docs/textos.md § Nosotros · lote 10): un recorrido de
// cuatro paradas (historia, método, equipo y fe) con la foto de Carlos, la
// única del sitio. El encabezado entra con la página y solo sube; en cada
// parada, el texto y el dibujo suben y aparecen cada uno al llegar (Entra):
// en celular el dibujo va debajo y se anima cuando se ve, no antes. La línea de tiempo se dibuja y
// los planos se completan uno a uno (app/salas.css, .nosotros-*). Con menos
// movimiento, todo quieto y ya dibujado. Después, el Cierre de las demás
// páginas.

// La cita va en Geist itálica de verdad, solo aquí y sin precarga: no es el
// LCP. Geist Italic 400 (OFL, paquete geist 1.9.0), recortada al rango latin.
const geistItalica = localFont({
  src: "../../fonts/Geist-Italic-latin.woff2",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});

const INDICE = [
  { numero: "01", nombre: "HISTORIA", href: "#historia" },
  { numero: "02", nombre: "MÉTODO", href: "#metodo" },
  { numero: "03", nombre: "EQUIPO", href: "#equipo" },
  { numero: "04", nombre: "FE", href: "#fe" },
];

const LINEA_DE_TIEMPO = [
  { cuando: "EL INICIO", que: "Sistemas a la medida para negocios." },
  { cuando: "EVOLUTION GYM", que: "Un sistema para el gimnasio de mi familia, probado en su mostrador." },
  { cuando: "OCTUBRE DE 2026", que: "Boaz entra a producción." },
  { cuando: "HOY", que: "Dos líneas: productos propios y sistemas a la medida." },
];

const METODO = [
  {
    numero: "01",
    paso: "Escucho.",
    texto: "Una llamada de 20 a 30 minutos, gratis, para entender cómo se siente tu negocio. No es una venta.",
  },
  {
    numero: "02",
    paso: "Propongo por escrito.",
    texto: "En 2 días hábiles: qué incluye, qué no incluye, cuánto cuesta y cuánto tarda.",
  },
  {
    numero: "03",
    paso: "Firmamos el alcance.",
    texto: "Nada se construye sin un documento firmado. Lo nuevo se cotiza aparte.",
  },
  { numero: "04", paso: "Construyo y te cuento.", texto: "Avance por escrito cada viernes." },
  {
    numero: "05",
    paso: "Entrego revisado.",
    texto: "Cada sistema lo reviso yo antes de entregarlo. Después, la continuidad lo cuida.",
  },
];

const EQUIPO = [
  "El código vive en STRING, nunca en la cuenta de otra persona.",
  "La calidad es la misma: el mismo sistema de diseño y mi revisión final.",
  "El trato es siempre conmigo. Nadie subcontrata tu proyecto.",
];

const PARADA = `${SALA} scroll-mt-24`;
const MONO = "font-mono text-etiqueta uppercase";

// Un nodo dibujado a mano; el último va relleno en verde.
function Nodo({ ultimo }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="nosotros-nodo relative h-5 w-5 shrink-0">
      <path
        d="M10 3.2Q14.1 3 16.6 6.1 17.4 10.3 15.9 13.8 12.6 17.2 9.6 16.9 5.6 16.6 3.6 13.2 2.8 9.4 4.4 6.2 6.6 3.3 10 3.2"
        className={ultimo ? "fill-acento stroke-acento" : "fill-fondo stroke-texto"}
        strokeWidth="1.6"
      />
    </svg>
  );
}

// La línea que une los nodos, a mano. Desde md va horizontal, de un nodo
// al último, sobre las cuatro columnas. En celular va vertical, a la
// izquierda de la lista: un tramo por hito, de su nodo al siguiente.
function Linea({ vertical }) {
  return (
    <div
      aria-hidden="true"
      className={
        vertical
          ? "nosotros-linea nosotros-linea-v absolute -bottom-[42px] left-2 top-2.5 w-1 md:hidden"
          : "nosotros-linea absolute left-[12.5%] top-2 hidden h-1 w-3/4 md:block"
      }
    >
      <svg viewBox={vertical ? "0 0 4 100" : "0 0 100 4"} preserveAspectRatio="none" className="block h-full w-full">
        <path
          d={vertical ? "M2 0Q1.4 25 2.2 50T1.8 100" : "M0 2Q25 1.4 50 2.2T100 1.8"}
          fill="none"
          className="stroke-texto-suave"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function NosotrosPage() {
  return (
    <>
      {/* Encabezado */}
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <div className="entra-carga mx-auto grid max-w-contenido items-start gap-space-7 lg:grid-cols-[minmax(0,1fr)_400px]">
          <header className="flex max-w-[760px] flex-col gap-space-4">
            <p className={ETIQUETA}>NOSOTROS</p>
            <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
              Un taller de software en Ciudad de México.
            </h1>
            <p className="text-cuerpo-l text-texto-suave">
              Soy Carlos Avilés, desarrollador y fundador de STRING. Hago sistemas con oficio y con arte,
              y reviso cada uno antes de entregarlo. Este es el recorrido: de dónde venimos, cómo
              trabajamos, quién construye y qué nos sostiene.
            </p>
            <nav aria-label="Recorrido" className="mt-space-2">
              <ol className="grid grid-cols-2 gap-x-space-4 sm:flex sm:flex-wrap sm:gap-x-space-5">
                {INDICE.map((parada) => (
                  <li key={parada.href}>
                    <a
                      href={parada.href}
                      className={`${MONO} inline-flex min-h-11 items-center gap-space-2 text-texto-suave hover:text-texto`}
                    >
                      <span>{parada.numero}</span>
                      <span className="text-texto">{parada.nombre}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>

          <figure className="flex w-full max-w-[400px] flex-col gap-space-3">
            <div className="relative aspect-[5/6] w-full overflow-hidden border border-hairline">
              <Image
                src="/foto/carlos.jpg"
                alt="Carlos Avilés, fundador de STRING"
                fill
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 448px) 400px, calc(100vw - 32px)"
                className="object-cover"
              />
            </div>
            <figcaption className={`${MONO} text-texto-suave`}>CARLOS AVILÉS · FUNDADOR · CDMX</figcaption>
          </figure>
        </div>
      </div>

      {/* 01 · La historia */}
      <section id="historia" data-theme="noche" className={`${PARADA} border-t border-hairline`}>
        <div className="mx-auto grid max-w-contenido gap-space-7 lg:grid-cols-2">
          <Entra className="flex max-w-[640px] flex-col gap-space-4">
            <p className={ETIQUETA}>01 · LA HISTORIA</p>
            <h2 className={TITULAR}>Empezamos haciendo sistemas para negocios.</h2>
            <div className={`flex flex-col gap-space-4 ${CUERPO}`}>
              <p>
                STRING empezó construyendo sistemas para negocios con local. Luego hice uno para
                Evolution GYM, el gimnasio de mi familia. Lo usamos en recepción, lo corregimos con
                socios de verdad y se volvió Boaz, nuestro primer producto.
              </p>
              <p>
                Hoy STRING hace dos cosas: sistemas a la medida para negocios y empresas, y productos
                propios para un giro. Lo que aprendemos en uno mejora al otro.
              </p>
            </div>
          </Entra>

          <Entra className="relative self-center">
            <Linea />
            <ol className="relative grid gap-space-5 md:grid-cols-4 md:gap-space-3">
              {LINEA_DE_TIEMPO.map((hito, i) => {
                const ultimo = i === LINEA_DE_TIEMPO.length - 1;
                return (
                  <li
                    key={hito.cuando}
                    style={{ "--i": i }}
                    className="relative flex gap-space-3 md:flex-col md:items-center md:text-center"
                  >
                    {!ultimo && <Linea vertical />}
                    <Nodo ultimo={ultimo} />
                    <div className="flex flex-col gap-space-1">
                      <p className={`${MONO} ${ultimo ? "text-acento" : "text-texto"}`}>{hito.cuando}</p>
                      <p className="text-pequeno text-texto-suave">{hito.que}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Entra>
        </div>
      </section>

      {/* 02 · El método */}
      <section id="metodo" data-theme="pared" className={PARADA}>
        <div className="mx-auto grid max-w-contenido items-start gap-space-7 lg:grid-cols-2">
          <Entra className="flex flex-col gap-space-4">
            <p className={ETIQUETA}>02 · EL MÉTODO</p>
            <h2 className={TITULAR}>Primero escucho. Luego dibujo. Luego construyo.</h2>
            <ol className="mt-space-2 flex flex-col border-b border-hairline">
              {METODO.map((paso) => (
                <li key={paso.numero} className="grid grid-cols-[40px_1fr] gap-space-3 border-t border-hairline py-space-4">
                  <span className="font-mono text-cifra text-texto-suave">{paso.numero}</span>
                  <p className={CUERPO}>
                    <span className="font-semibold text-texto">{paso.paso}</span> {paso.texto}
                  </p>
                </li>
              ))}
            </ol>
            <p className={CUERPO}>
              <span className="text-texto">Lo que garantizo:</span> tiempos y funcionamiento, por escrito.{" "}
              <span className="text-texto">Lo que no garantizo:</span> ventas. Nadie puede.
            </p>
            <p className="text-cuerpo">
              <a href="/#como-trabajamos" className={`font-semibold ${ENLACE}`}>
                Nuestro estándar de servicio <span aria-hidden="true">→</span>
              </a>
            </p>
          </Entra>

          <Entra as="ol" aria-hidden="true" className="grid grid-cols-2 gap-space-4">
            {[1, 2, 3, 4, 5].map((k) => (
              <li key={k} style={{ "--i": k - 1 }} className={`nosotros-plano ${k === 5 ? "col-span-2" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/arte/nosotros/plano-${k}.svg`}
                  width={200}
                  height={150}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`block h-auto w-full ${k === 5 ? "mx-auto max-w-[66%]" : ""}`}
                />
              </li>
            ))}
          </Entra>
        </div>
      </section>

      {/* 03 · El equipo */}
      <section id="equipo" data-theme="noche" className={PARADA}>
        <div className="mx-auto grid max-w-contenido items-center gap-space-7 lg:grid-cols-2">
          <Entra className="flex max-w-[640px] flex-col gap-space-4">
            <p className={ETIQUETA}>03 · EL EQUIPO</p>
            <h2 className={TITULAR}>Hablas conmigo, de principio a fin.</h2>
            <p className={CUERPO}>
              Como fundador, respondo por cada sistema. Cuando un proyecto lo pide, sumo desarrolladores
              de confianza, con contrato por proyecto.
            </p>
            <ul className="flex flex-col border-b border-hairline">
              {EQUIPO.map((punto) => (
                <li key={punto} className={`border-t border-hairline py-space-3 ${CUERPO}`}>
                  {punto}
                </li>
              ))}
            </ul>
          </Entra>
          <Entra className="w-full max-w-[560px] justify-self-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arte/nosotros/mesa.svg"
              width={424}
              height={284}
              alt="Una mesa de trabajo dibujada en línea, con una laptop abierta, una lámpara y dos sillas"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </Entra>
        </div>
      </section>

      {/* 04 · La fe */}
      <section id="fe" data-theme="noche" className={`${PARADA} border-t border-hairline`}>
        <Entra as="figure" className="mx-auto flex max-w-[880px] flex-col items-center gap-space-5 text-center">
          <p className={ETIQUETA}>04 · LA FE</p>
          <blockquote className={`${geistItalica.className} text-[26px] leading-[1.35] tracking-[-0.01em] text-texto md:text-[36px]`}>
            <p>
              ¿A quién tengo yo en los cielos? Y fuera de ti nada deseo en la tierra. Mi carne y mi
              corazón desfallecen: mas la roca de mi corazón y mi porción es Dios para siempre.
            </p>
          </blockquote>
          <figcaption className={`${MONO} text-texto-suave`}>
            <cite className="not-italic">SALMOS 73:25–26</cite>
          </figcaption>
        </Entra>
      </section>

      <Cierre />
    </>
  );
}
