import { NIVELES_GRANDES, precioDe } from "@/app/lib/giros";
import { nivelPorSlug } from "@/app/lib/niveles";
import { CUERPO, ETIQUETA } from "../salas/estilos";
import { Boton } from "../ui/Boton";
import { Entra } from "../ui/Entra";
import { IvaIncluido } from "../ui/IvaIncluido";
import { Tarjeta } from "../ui/Tarjeta";
import { CabeceraGiro } from "./CabeceraGiro";
import { CuerdaFija } from "./CuerdaFija";
import { PasosEmpresas } from "./PasosEmpresas";

// La página de un giro grande (lote 11, plantilla de docs/textos.md § Tu
// negocio · lote 11): cabecera, lo que haría su sistema (el 04 con la cuerda
// verde), sus dos niveles y cómo trabajamos con empresas.
function Seccion({ id, titulo, children }) {
  return (
    <Entra as="section" aria-labelledby={id} className="flex flex-col gap-space-4 border-t border-hairline pt-space-6">
      <h2 id={id} className={ETIQUETA}>
        {titulo}
      </h2>
      {children}
    </Entra>
  );
}

export function PaginaGiroGrande({ giro }) {
  return (
    <div data-theme="noche" className="bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40">
      <div className="mx-auto flex max-w-contenido flex-col gap-space-7">
        <CabeceraGiro giro={giro} volver="Tu negocio · Empresas" volverHref="/tu-negocio/empresas" />

        <Seccion id="haria" titulo="Lo que haría tu sistema">
          <ol className="flex flex-col">
            {giro.puntos.map((punto, i) => (
              <li key={punto} className="flex flex-col gap-space-3 pt-space-4">
                <CuerdaFija calibre={i === 3 ? 2.4 : 1.2} verde={i === 3} orden={i} />
                <p className="grid grid-cols-[40px_1fr] gap-space-3 text-cuerpo-l text-texto">
                  <span className="font-mono text-cifra text-texto-suave">0{i + 1}</span>
                  {punto}
                </p>
              </li>
            ))}
          </ol>
          <p className={CUERPO}>Son ejemplos. Tu sistema se define en el mapa de procesos.</p>
          <ul className="mt-space-2 grid gap-space-5 md:grid-cols-2">
            {NIVELES_GRANDES.map(({ nivel: slug, texto }) => {
              const nivel = nivelPorSlug(slug);
              return (
                <li key={slug} className="flex">
                  <Tarjeta href={`/sistemas/${slug}`} cuerda={3} className="flex w-full flex-col gap-space-3">
                    <h3 className="text-subtitulo">{nivel.nombre}</h3>
                    <p className="font-mono text-cifra text-texto">
                      {precioDe(slug)}
                      {slug !== "empresa" && <> <IvaIncluido /></>}
                    </p>
                    <p className={CUERPO}>{texto}</p>
                    <p className="mt-auto flex items-center gap-space-2 text-cuerpo font-semibold text-texto">
                      Ver el nivel <span aria-hidden="true">→</span>
                    </p>
                  </Tarjeta>
                </li>
              );
            })}
          </ul>
        </Seccion>

        <Seccion id="con-empresas" titulo="Cómo trabajamos con empresas">
          <PasosEmpresas />
          <div>
            <Boton href="/diagnostico" variante="primario">
              Solicitar diagnóstico
            </Boton>
          </div>
        </Seccion>
      </div>
    </div>
  );
}
