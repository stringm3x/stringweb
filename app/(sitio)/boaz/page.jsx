import Link from "next/link";
import { BotonBoaz } from "@/app/components/boaz/BotonBoaz";
import { DESCRIPCION, FILAS_PLANES, GRUPOS, NOTA_PRUEBA, PREGUNTAS, SELLOS } from "@/app/components/boaz/datos";
import { ARCHIVO, ETIQUETA_BOAZ, archivo, ubuntuMono } from "@/app/components/boaz/fuentes";
import { Logotipo } from "@/app/components/boaz/Logotipo";
import { Firma } from "@/app/components/productos/Firma";
import { LaminaBoaz } from "@/app/components/productos/LaminaBoaz";
import { whatsappUrl } from "@/app/lib/contacto";

// /boaz (lote 9b, camino A): la página de Boaz con su identidad (G) dentro
// del sitio. Papel, tinta, azul de botones y enlaces; #2979FF solo como
// mancha. Titulares en Archivo 900 al 62 %, texto en Geist, etiquetas y
// precios en Ubuntu Mono. Sin tarjetas ni sombras: reglas de 1 px. La
// lámina va quieta. Barra y pie del sitio, sin cambio.
const TITULO = "Boaz · El sistema para gimnasios, by STRING";

export const metadata = {
  title: { absolute: TITULO },
  description: DESCRIPCION,
  alternates: { canonical: "https://www.stringwebs.com/boaz" },
  openGraph: { title: TITULO, description: DESCRIPCION, url: "https://www.stringwebs.com/boaz" },
};

const ENVOLTURA = "mx-auto max-w-[1312px] px-5 sm:px-6 lg:px-16";
const TIT = `${archivo.className} leading-[0.92] tracking-[-0.005em] text-texto`;
const H2 = `${TIT} text-[44px] md:text-[60px] lg:text-[84px]`;
const SECCION = "border-t border-borde pb-space-7 pt-7 lg:pb-24";
const NOTA = "font-boaz-mono text-[13px] tracking-[0.06em] text-texto-suave";
const ENLACE = "font-semibold text-acento underline-offset-4 hover:text-acento-presionado hover:underline";

function Encabezado() {
  return (
    <section aria-labelledby="boaz-t1" className={ENVOLTURA}>
      <div className="grid items-end gap-space-6 pt-space-6 md:grid-cols-[7fr_5fr] lg:gap-12 lg:pt-[72px]">
        <div>
          <p className={ETIQUETA_BOAZ}>EL SISTEMA PARA GIMNASIOS</p>
          <h1 id="boaz-t1" className="mt-7">
            <Logotipo alt="Boaz." className="w-[200px] md:w-[242px]" />
            <span
              className={`${TIT} mt-6 block text-[56px] sm:text-[72px] lg:text-[112px]`}
              style={ARCHIVO}
            >
              Sabe cuánto entra. Ve quién se va.
            </span>
          </h1>
          <p className="mt-6 max-w-[560px] text-[19px] leading-[1.5] text-texto lg:mt-7 lg:text-[20px]">
            Boaz es el sistema con el que tu gimnasio sabe cuánto entra, ve quién se le va antes de que
            se vaya y le da a sus socios una razón para volver. En pesos, sin instalación y sin límite de
            socios.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BotonBoaz href="/gym/registro">Registra tu gimnasio</BotonBoaz>
            <a href="#planes" className={ENLACE}>
              Ver planes
            </a>
          </div>
          <p className={`${NOTA} mt-[18px]`}>{NOTA_PRUEBA}</p>
        </div>
        <div className="mx-auto w-full max-w-[280px] md:max-w-none">
          <LaminaBoaz className="block h-auto max-h-[640px] w-full text-texto" />
        </div>
      </div>
      <div className="mt-12 border-t border-hairline py-[18px] lg:mt-14">
        <Firma />
      </div>
    </section>
  );
}

function LoQueHace() {
  return (
    <section aria-labelledby="boaz-t2" className={`${ENVOLTURA} mt-space-6 lg:mt-[72px]`}>
      <div className={SECCION}>
        <div className="mb-space-6 grid gap-space-3 md:grid-cols-[4fr_8fr] md:gap-12 lg:mb-14">
          <p className={`${ETIQUETA_BOAZ} md:pt-3`}>LO QUE HACE HOY</p>
          <h2 id="boaz-t2" className={H2} style={ARCHIVO}>
            Todo el mostrador, en una pantalla.
          </h2>
        </div>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2 lg:gap-y-14">
          {GRUPOS.map((grupo) => (
            <div key={grupo.titulo}>
              <h3 className="border-b border-borde pb-3 text-[22px] font-semibold leading-tight">{grupo.titulo}</h3>
              <ul>
                {grupo.funciones.map(([nombre, frase, plan]) => (
                  <li key={nombre} className="grid grid-cols-[minmax(0,1fr)_72px] gap-4 border-b border-hairline py-4">
                    <div>
                      <h4 className="text-[18px] font-semibold leading-[1.25]">{nombre}</h4>
                      <p className="mt-1 text-[15px] text-texto-suave">{frase}</p>
                    </div>
                    <p
                      className={`pt-[3px] text-right font-boaz-mono text-[12px] tracking-[0.16em] ${
                        plan === "PRO" ? "font-bold text-texto" : "text-texto-suave"
                      }`}
                    >
                      {plan}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="mt-14 flex flex-wrap border-y border-borde">
          {SELLOS.map((sello, i) => (
            <li
              key={sello}
              className={`flex flex-[1_1_240px] items-center gap-3 py-5 font-boaz-mono text-[14px] uppercase tracking-[0.14em] ${
                i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0 sm:pl-6" : ""
              }`}
            >
              <span aria-hidden="true" className="h-[14px] w-[14px] flex-none rounded-full border-[1.4px] border-borde" />
              {sello}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ComoNacio() {
  return (
    <section aria-labelledby="boaz-t3" className={ENVOLTURA}>
      <div className={SECCION}>
        <div className="grid gap-space-5 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <p className={`${ETIQUETA_BOAZ} mb-5`}>CÓMO NACIÓ</p>
            <h2 id="boaz-t3" className={H2} style={ARCHIVO}>
              Nació en el mostrador de un gimnasio real.
            </h2>
          </div>
          <div className="md:pt-11">
            <p className="text-[19px] leading-[1.5]">
              Boaz empezó como un sistema a la medida para Evolution GYM, el gimnasio de mi familia. Lo
              construimos para su recepción: socios, cobros, entradas y caja. Lo corregimos con socios de
              verdad y lo convertimos en un producto que cualquier gimnasio puede usar. Se llama Boaz: en
              hebreo, “en él hay fuerza”.
            </p>
            <p className={`${ETIQUETA_BOAZ} mt-7 !text-texto`}>EN PRODUCCIÓN DESDE OCTUBRE DE 2026 · EVOLUTION GYM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Planes() {
  const CELDA = "border-b border-hairline py-[18px] pr-4 align-top text-[16px] sm:pr-6";
  const PRO = "bg-superficie pl-4 sm:pl-6";
  const ROTULO = `${CELDA} w-[22%] pt-[22px] text-left font-boaz-mono text-[12px] font-normal uppercase tracking-[0.16em] text-texto-suave`;
  const NOMBRE = `${archivo.className} text-[40px] leading-none sm:text-[56px]`;
  return (
    <section id="planes" aria-labelledby="boaz-t4" className={`${ENVOLTURA} scroll-mt-20`}>
      <div className={SECCION}>
        <div className="mb-space-6 grid gap-space-3 md:grid-cols-[4fr_8fr] md:gap-12 lg:mb-14">
          <p className={`${ETIQUETA_BOAZ} md:pt-3`}>PLANES</p>
          <h2 id="boaz-t4" className={H2} style={ARCHIVO}>
            Un precio al mes. Sin sorpresas.
          </h2>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="mt-2 w-full min-w-[350px] border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-[22%] border-b border-borde pb-5">
                  <span className="sr-only">Plan</span>
                </th>
                <th scope="col" className="border-b border-borde pb-5 pr-4 text-left align-top font-normal sm:pr-6">
                  <span className={`${NOMBRE} block`} style={ARCHIVO}>
                    Starter
                  </span>
                  <span className="mt-2.5 block text-[17px]">Sal del cuaderno.</span>
                </th>
                <th scope="col" className={`border-b border-borde pb-5 text-left align-top font-normal ${PRO}`}>
                  <span className={`${NOMBRE} block`} style={ARCHIVO}>
                    Pro
                  </span>
                  <span className="mt-2.5 block text-[17px]">Vende más en el mismo local.</span>
                  <span className="mt-2.5 inline-flex items-center gap-2 font-boaz-mono text-[12px] tracking-[0.16em]">
                    <i aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-boaz-azul" />★ RECOMENDADO
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className={ROTULO}>
                  Al mes
                </th>
                <td className={CELDA}>
                  <span className="font-boaz-mono text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-[44px]">$799</span>
                </td>
                <td className={`${CELDA} ${PRO}`}>
                  <span className="font-boaz-mono text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-[44px]">$1,799</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className={ROTULO}>
                  Al año
                </th>
                <td className={CELDA}>
                  <span className="font-boaz-mono text-[20px] sm:text-[22px]">$7,990</span>
                </td>
                <td className={`${CELDA} ${PRO}`}>
                  <span className="font-boaz-mono text-[20px] sm:text-[22px]">$17,990</span>
                </td>
              </tr>
              {FILAS_PLANES.map(([rotulo, starter, pro]) => (
                <tr key={rotulo}>
                  <th scope="row" className={ROTULO}>
                    {rotulo}
                  </th>
                  <td className={CELDA}>{starter}</td>
                  <td className={`${CELDA} ${PRO}`}>{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="text-texto-suave">Sin costo de instalación. Sin límite de socios en ningún plan.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <BotonBoaz href="/gym/registro">Registra tu gimnasio</BotonBoaz>
            <p className={NOTA}>{NOTA_PRUEBA}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Preguntas() {
  return (
    <section aria-labelledby="boaz-t5" className={ENVOLTURA}>
      <div className={SECCION}>
        <div className="grid gap-space-4 md:grid-cols-[4fr_8fr] md:gap-12">
          <h2 id="boaz-t5" className={`${ETIQUETA_BOAZ} md:pt-1.5`}>
            PREGUNTAS
          </h2>
          <div>
            {PREGUNTAS.map(([p, r], i) => (
              <div key={p} className={`border-b border-hairline pb-[22px] ${i === 0 ? "" : "pt-[22px]"}`}>
                <h3 className="mb-1.5 text-[20px] font-semibold leading-tight">{p}</h3>
                <p>{r}</p>
              </div>
            ))}
            <div className="border-b border-hairline py-[22px]">
              <h3 className="mb-1.5 text-[20px] font-semibold leading-tight">¿Quién está detrás?</h3>
              <p>
                STRING, un taller de software en Ciudad de México. Te atiende Carlos Avilés, con nombre.{" "}
                <Link href="/nosotros" className={ENLACE}>
                  Conoce STRING
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cierre() {
  return (
    <section aria-labelledby="boaz-t6" className={ENVOLTURA}>
      <div className="border-t border-borde pb-space-8 pt-7 lg:pb-[120px]">
        <h2 id="boaz-t6" className={`${TIT} mt-6 text-[48px] sm:text-[64px] lg:text-[112px]`} style={ARCHIVO}>
          Pruébalo 14 días en tu mostrador.
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <BotonBoaz href="/gym/registro">Registra tu gimnasio</BotonBoaz>
          <span className="text-texto-suave">¿Prefieres escribir?</span>
          <BotonBoaz href={whatsappUrl()} variante="secundario">
            Escríbenos por WhatsApp
          </BotonBoaz>
        </div>
      </div>
    </section>
  );
}

export default function BoazPage() {
  return (
    <div data-theme="boaz" className={`${ubuntuMono.variable} bg-fondo text-[17px] leading-[1.5] text-texto`}>
      {/* La barra del sitio es noche y transparente arriba: esta franja
          noche, de su alto, la deja leerse sobre el papel. */}
      <div aria-hidden="true" className="h-[72px] bg-black lg:h-20" />
      <Encabezado />
      <LoQueHace />
      <ComoNacio />
      <Planes />
      <Preguntas />
      <Cierre />
    </div>
  );
}
