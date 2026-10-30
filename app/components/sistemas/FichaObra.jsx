import { Boton } from "../ui/Boton";
import { ETIQUETA } from "../salas/estilos";
import { ArtesQueSuma } from "./ArtesQueSuma";

// La ficha de la obra (docs/pagina-nivel.md y docs/textos.md): nombre,
// lugar entre los cinco, las artes que suma, el "Desde", tiempo, pago y
// continuidad, y el botón. En escritorio acompaña pegada bajo la barra; en
// celular va completa después del dibujo (PaginaNivel).
export function FichaObra({ nivel }) {
  const cuantas = nivel.artes === 7 ? "7 DE 7" : `${nivel.artes} DE 7 · EMPRESA LAS TIENE TODAS`;
  const cotiza = nivel.precio === "Se cotiza";
  return (
    <aside
      aria-label="Ficha de la obra"
      className="flex flex-col gap-space-4 rounded-lg border border-hairline bg-fondo p-7"
    >
      <p className={ETIQUETA}>FICHA DE LA OBRA</p>
      <div className="flex flex-col gap-space-1">
        <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em]">{nivel.nombre}</p>
        <p className={ETIQUETA}>
          NIVEL {nivel.numero} DE 5 · {nivel.arte.toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col gap-space-2">
        <p className="text-pequeno text-texto-suave">Artes que suma</p>
        <ArtesQueSuma vineta={nivel.vineta} />
        <p className={ETIQUETA}>{cuantas}</p>
      </div>

      <div className="flex flex-col gap-space-1 border-t border-hairline pt-space-4">
        {cotiza ? (
          <p className="font-mono text-[36px] leading-[1.1] text-texto">Se cotiza</p>
        ) : (
          <>
            <p className="text-pequeno text-texto-suave">Desde</p>
            <p className="font-mono text-[36px] leading-[1.1] text-texto">
              {nivel.precio.replace("Desde ", "")}
            </p>
          </>
        )}
      </div>

      <dl className="flex flex-col text-pequeno">
        {[
          ["Tiempo", nivel.tiempo],
          ["Pago", nivel.pago],
          ["Después", "Desde $1,800 al mes"],
        ].map(([que, cual]) => (
          <div key={que} className="flex items-baseline justify-between gap-space-3 border-t border-hairline py-space-2">
            <dt className="text-texto-suave">{que}</dt>
            <dd className="text-right font-mono text-texto">{cual}</dd>
          </div>
        ))}
      </dl>

      <Boton href="/diagnostico" variante="primario" className="w-full">
        Solicitar diagnóstico
      </Boton>
    </aside>
  );
}
