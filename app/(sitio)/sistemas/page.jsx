import { Cierre } from "@/app/components/salas/Cierre";
import { CUERPO, ETIQUETA } from "@/app/components/salas/estilos";
import { Boton } from "@/app/components/ui/Boton";
import { Tarjeta } from "@/app/components/ui/Tarjeta";
import { NIVELES } from "@/app/lib/niveles";

// /sistemas (docs/pagina-nivel.md, textos de docs/textos.md § Sistemas): la
// puerta a los cinco niveles. Solo componentes ya aprobados: las cinco
// Tarjetas, el botón de diagnóstico y el Cierre de la portada.
const INCLUYEN = [
  "El mismo sistema de diseño y el mismo cuidado en cada pantalla.",
  "Su propia obra, que nace contigo.",
  "Nuestro estándar de servicio: respuesta en un día hábil y avance por escrito cada viernes.",
  "Continuidad para que tu sistema siga funcionando, desde $1,800 al mes.",
];

export default function SistemasPage() {
  return (
    <>
      <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
        <div className="mx-auto flex max-w-contenido flex-col gap-space-7">
          <header className="flex max-w-[760px] flex-col gap-space-4">
            <p className={ETIQUETA}>SISTEMAS</p>
            <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[76px]">
              Cinco niveles. La misma calidad.
            </h1>
            <p className="text-cuerpo-l text-texto-suave">
              Empieza por lo que te pasa hoy. Cada nivel incluye todo lo del anterior y suma
              alcance; ninguno es la versión barata de otro.
            </p>
          </header>

          {/* Empresa cierra la cuadrícula: dos columnas junto a Controla en
              escritorio, todo el ancho en tableta. */}
          <ul className="grid gap-space-5 md:grid-cols-2 lg:grid-cols-3">
            {NIVELES.map((nivel) => (
              <li key={nivel.slug} className={`flex ${nivel.siguiente ? "" : "md:col-span-2"}`}>
                <Tarjeta href={`/sistemas/${nivel.slug}`} className="flex w-full flex-col gap-space-3">
                  <h2 className="text-subtitulo">{nivel.nombre}</h2>
                  <p className="text-cuerpo text-texto">
                    {nivel.cita ? `“${nivel.dices}”` : nivel.dices}
                  </p>
                  <p className={CUERPO}>{nivel.hace}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={nivel.vineta} width={300} height={44} alt="" className="mt-auto h-auto w-[240px]" />
                  <p className="font-mono text-cifra text-texto">{nivel.precio}</p>
                  <p className="flex items-center gap-space-2 text-cuerpo font-semibold text-texto">
                    Ver el nivel <span aria-hidden="true">→</span>
                  </p>
                </Tarjeta>
              </li>
            ))}
          </ul>

          <section aria-labelledby="cual" className="flex max-w-[760px] flex-col items-start gap-space-4 border-t border-hairline pt-space-6">
            <h2 id="cual" className="text-subtitulo">
              ¿Cuál es el mío?
            </h2>
            <p className={CUERPO}>
              Si no sabes por dónde empezar, cuéntanos qué te pasa y te decimos qué nivel te toca.
            </p>
            <Boton href="/diagnostico" variante="primario">
              Solicitar diagnóstico
            </Boton>
          </section>

          <section aria-labelledby="incluyen" className="flex max-w-[760px] flex-col gap-space-4 border-t border-hairline pt-space-6">
            <h2 id="incluyen" className="text-subtitulo">
              Todos los niveles incluyen:
            </h2>
            <ul className="flex flex-col gap-space-3">
              {INCLUYEN.map((punto) => (
                <li key={punto} className={`flex gap-space-3 ${CUERPO}`}>
                  <span aria-hidden="true" className="text-acento">
                    ✓
                  </span>
                  {punto}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Cierre />
    </>
  );
}
