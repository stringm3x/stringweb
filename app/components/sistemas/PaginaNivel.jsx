import { NIVELES, nivelPorSlug } from "@/app/lib/niveles";
import { Cierre } from "../salas/Cierre";
import { CUERPO, ETIQUETA } from "../salas/estilos";
import { Tarjeta } from "../ui/Tarjeta";
import { Ejemplo } from "./Ejemplo";
import { FichaObra } from "./FichaObra";

// La página de un nivel (docs/pagina-nivel.md, textos de docs/textos.md §
// Sistemas): una sola para los cinco, alimentada por app/lib/niveles.js.
// Dos columnas en escritorio, el contenido y la ficha de la obra pegada bajo
// la barra; en celular una sola, con la ficha justo después del dibujo. El
// orden del DOM es el del celular: cabecera, ficha, resto.
const SUBTITULO = "text-subtitulo";

function Seccion({ id, titulo, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-space-4 border-t border-hairline pt-space-6">
      <h2 id={id} className={SUBTITULO}>
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Crezcas({ nivel }) {
  if (!nivel.siguiente) {
    return (
      <Tarjeta href="/sistemas" className="flex items-center justify-between gap-space-3">
        <span className="text-[22px] font-semibold">Ver los cinco niveles</span>
        <span aria-hidden="true">→</span>
      </Tarjeta>
    );
  }
  const siguiente = nivelPorSlug(nivel.siguiente);
  return (
    <>
      {nivel.crezcas && <p className={CUERPO}>{nivel.crezcas}</p>}
      <Tarjeta href={`/sistemas/${siguiente.slug}`} className="flex flex-col gap-space-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={siguiente.vineta} width={300} height={44} alt="" className="h-auto w-[240px]" />
        <span className="flex items-center justify-between gap-space-3">
          <span className="text-[22px] font-semibold">
            {siguiente.nombre} + {siguiente.suma}
          </span>
          <span aria-hidden="true">→</span>
        </span>
        <span className="font-mono text-cifra text-texto-suave">{siguiente.precio}</span>
      </Tarjeta>
    </>
  );
}

export function PaginaNivel({ slug }) {
  const nivel = nivelPorSlug(slug);
  const cotiza = nivel.precio === "Se cotiza";
  const resumen = cotiza
    ? "SE COTIZA · SEGÚN SU PROPUESTA"
    : `${nivel.precio} · DE ${nivel.tiempo}`.toUpperCase();

  return (
    <>
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <div className="mx-auto grid max-w-contenido gap-space-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-x-space-8">
          <header className="flex flex-col gap-space-4 lg:col-start-1">
            <p className={ETIQUETA}>
              NIVEL {nivel.numero} · {nivel.nombre.toUpperCase()}
            </p>
            <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
              {nivel.titular}
            </h1>
            <p className="text-cuerpo-l text-texto">
              {nivel.cita ? (
                <>
                  “{nivel.dices}” <span className="text-texto-suave">Si eso te pasa, empieza aquí.</span>
                </>
              ) : (
                `${nivel.dices}.`
              )}
            </p>
            <p className="font-mono text-cifra text-texto">{resumen}</p>
            <figure className="nivel-dibujo mt-space-4 flex flex-col gap-space-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nivel.dibujo}
                width={520}
                height={372}
                alt={nivel.alt}
                fetchPriority="high"
                className="h-auto w-full max-w-[520px]"
              />
              <figcaption className={ETIQUETA}>{nivel.lineaDibujo}</figcaption>
            </figure>
          </header>

          <div className="lg:sticky lg:top-[104px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <FichaObra nivel={nivel} />
          </div>

          <div className="flex flex-col gap-space-6 lg:col-start-1">
            <Seccion id="incluye" titulo="Qué incluye">
              <ul className="flex flex-col gap-space-3">
                {nivel.incluye.map(({ fuerte, resto }) => (
                  <li key={fuerte} className={`flex gap-space-3 ${CUERPO}`}>
                    <span aria-hidden="true" className="text-acento">
                      ✓
                    </span>
                    <span>
                      <strong className="font-semibold text-texto">{fuerte}</strong>
                      {resto}
                    </span>
                  </li>
                ))}
              </ul>
            </Seccion>

            <Seccion id="como-se-ve" titulo="Cómo se ve">
              <div className="flex flex-col gap-space-5 sm:flex-row sm:items-start">
                <Ejemplo nivel={nivel} />
                <div className="flex flex-col gap-space-2">
                  <h3 className="text-cuerpo font-semibold text-texto">Para quién es</h3>
                  <p className={CUERPO}>{nivel.paraQuien}</p>
                </div>
              </div>
            </Seccion>

            <Seccion id="como-trabajamos" titulo="Cómo trabajamos">
              <ol className="flex flex-col">
                {nivel.pasos.map((paso, i) => (
                  <li key={paso} className="flex gap-space-3 border-t border-hairline py-space-2 first:border-t-0">
                    <span className="font-mono text-cifra text-texto-suave">{i + 1}</span>
                    <span className="text-cuerpo text-texto">{paso}</span>
                  </li>
                ))}
              </ol>
              <p className={CUERPO}>Te mandamos el avance cada viernes.</p>
            </Seccion>

            <Seccion id="crezcas" titulo="Cuando crezcas">
              <Crezcas nivel={nivel} />
            </Seccion>
          </div>
        </div>
      </div>
      <Cierre />
    </>
  );
}

export const SLUGS = NIVELES.map((n) => n.slug);
