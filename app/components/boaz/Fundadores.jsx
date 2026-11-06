import { BotonBoaz } from "@/app/components/boaz/BotonBoaz";
import { FUNDADORES } from "@/app/components/boaz/datos";
import { ARCHIVO, ETIQUETA_BOAZ, archivo } from "@/app/components/boaz/fuentes";
import { LUGARES_FUNDADORES, TOTAL_FUNDADORES, textoLugares, validarLugares } from "@/app/lib/boaz-lanzamiento";
import { whatsappUrl } from "@/app/lib/contacto";
import { BOAZ_FUNDADOR } from "@/app/lib/precios";

// Programa Fundadores en /boaz (lote 21, decisión del 6 nov): el Pro fundador
// es público solo aquí. Dos columnas desde 1024 px (5fr / 7fr): a la
// izquierda la cifra y los lugares; a la derecha el título, la lista y la
// acción. El DOM va en el orden de celular (título, intro, cifra, lugares,
// lista, a cambio, botón), así el lector de pantalla empieza por el título.
// Las casillas son decorativas; se lee "QUEDAN… LUGARES". El único botón azul
// de la pantalla es "Quiero ser fundador"; sin lugares, se cambia por uno
// secundario a /gym/registro. Nada escrito a mano: cifras de precios.js y
// lugares de app/lib/boaz-lanzamiento.js.
const MONO = "font-boaz-mono text-[13px] uppercase leading-[1.4] tracking-[0.14em]";
const NOTA = "font-boaz-mono text-[11px] uppercase leading-[1.4] tracking-[0.14em] text-texto-suave";

function Cota() {
  return (
    <span aria-hidden="true" className="relative block h-3">
      <span className="absolute inset-x-0 top-1/2 h-px bg-texto" />
      <span className="absolute left-0 top-0 h-3 w-px bg-texto" />
      <span className="absolute right-0 top-0 h-3 w-px bg-texto" />
    </span>
  );
}

function Casillas({ lugares }) {
  const tomadas = TOTAL_FUNDADORES - lugares;
  return (
    <ol aria-hidden="true" className="flex gap-2">
      {Array.from({ length: TOTAL_FUNDADORES }, (_, i) => {
        // Número en negro sobre #2979FF: la tinta da 4.4:1 ahí; el negro, 5.3:1.
        const estilo =
          i < tomadas
            ? "border-texto bg-texto text-fondo"
            : i === tomadas
              ? "border-texto bg-boaz-azul text-black"
              : "border-campo text-texto";
        return (
          <li
            key={i}
            data-casilla={i < tomadas ? "tomada" : i === tomadas ? "siguiente" : "libre"}
            className={`flex h-11 w-11 items-center justify-center border font-boaz-mono text-[13px] font-bold lg:h-10 lg:w-10 ${estilo}`}
          >
            {String(i + 1).padStart(2, "0")}
          </li>
        );
      })}
    </ol>
  );
}

export function Fundadores({ lugares = LUGARES_FUNDADORES, idTitulo = "boaz-fundadores" }) {
  validarLugares(lugares);
  const f = FUNDADORES;
  return (
    <div
      data-fundadores={lugares}
      className="grid gap-y-6 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_auto_auto_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:[grid-template-areas:'etiqueta_titulo''izq_titulo''izq_intro''izq_lista''izq_cambio''izq_accion']"
    >
      <p className={`${ETIQUETA_BOAZ} lg:pt-3 lg:[grid-area:etiqueta]`}>{f.etiqueta}</p>
      <h2
        id={idTitulo}
        className={`${archivo.className} text-[44px] leading-[0.92] tracking-[-0.005em] md:text-[60px] lg:text-[72px] lg:leading-[64px] lg:[grid-area:titulo]`}
        style={ARCHIVO}
      >
        {f.titulo}
      </h2>
      <p className="max-w-[560px] text-[19px] leading-[1.5] lg:mt-6 lg:text-[20px] lg:[grid-area:intro]">{f.intro}</p>

      <div className="mt-4 lg:mt-10 lg:[grid-area:izq]">
        <p className="inline-block">
          <Cota />
          <span className="mt-3 block font-boaz-mono text-[112px] font-bold leading-none tracking-[-0.04em] lg:text-[160px]">
            {BOAZ_FUNDADOR.mes}
          </span>
        </p>
        <p className={`${MONO} mt-4`}>{f.plazo}</p>
        <p className={`${MONO} mt-1 text-texto-suave`}>{f.enVezDe}</p>
        <div className="mt-8">
          <Casillas lugares={lugares} />
          <p className={`${MONO} mt-4 font-bold`}>{textoLugares(lugares)}</p>
        </div>
      </div>

      <ol className="mt-4 border-t border-borde lg:mt-10 lg:[grid-area:lista]">
        {f.puntos.map((punto, i) => (
          <li key={punto} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-hairline py-4 text-[17px] leading-[1.45] lg:text-[18px]">
            <span className="pt-[3px] font-boaz-mono text-[13px] tracking-[0.14em] text-texto-suave">
              {String(i + 1).padStart(2, "0")}
            </span>
            {punto}
          </li>
        ))}
      </ol>

      <p className="text-[16px] leading-[1.5] lg:mt-6 lg:[grid-area:cambio]">
        <span className={MONO}>{f.aCambio}</span> <span className="text-texto-suave">{f.aCambioTexto}</span>
      </p>

      <div className="mt-2 lg:mt-8 lg:[grid-area:accion]">
        {lugares > 0 ? (
          <>
            <BotonBoaz href={whatsappUrl(f.mensaje)} className="!min-h-[52px]">
              {f.boton}
            </BotonBoaz>
            <p className={`${NOTA} mt-3`}>{f.nota}</p>
          </>
        ) : (
          <>
            <p className="text-[19px] font-semibold">{f.sinLugares}</p>
            <BotonBoaz href="/gym/registro" variante="secundario" className="mt-4">
              {f.registro}
            </BotonBoaz>
          </>
        )}
      </div>
    </div>
  );
}
