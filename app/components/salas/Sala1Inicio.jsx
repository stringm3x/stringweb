import { Boton } from "../ui/Boton";
import { Ciudad } from "./Ciudad";
import { Estrellas } from "./Estrellas";
import { TitularTecleado } from "./TitularTecleado";

// Sala 1 · Inicio · Literatura (docs/textos.md). Arriba las estrellas; el
// texto al centro; abajo la ciudad y la luna, en su propia franja.
export function Sala1Inicio() {
  return (
    <section
      data-theme="noche"
      className="relative overflow-hidden bg-fondo text-texto"
    >
      <Estrellas className="absolute inset-x-0 top-0 h-[70%]" />

      <div
        className="relative mx-auto flex max-w-contenido flex-col items-center gap-space-4 px-4 pt-32 text-center sm:px-6 lg:pt-40"
      >
        <p className="font-mono text-etiqueta uppercase text-texto-suave">
          TALLER DE SOFTWARE · CIUDAD DE MÉXICO
        </p>
        <TitularTecleado
          texto="Software hecho con oficio. Y con arte."
          className="max-w-[16ch] text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[72px] lg:text-display"
        />
        <p className="max-w-[680px] text-[19px] leading-[1.45] text-texto-suave md:text-entrada">
          Sistemas que contestan, ordenan y trabajan por tu negocio. Desde un local en la Roma
          hasta una empresa grande, con la misma calidad. Cada uno con su propia obra.
        </p>
        <div className="mt-space-2 flex w-full flex-col items-stretch gap-space-3 sm:w-auto sm:flex-row sm:items-center">
          <Boton href="/diagnostico" variante="primario">
            Solicitar diagnóstico
          </Boton>
          <Boton href="/#niveles" variante="secundario">
            Ver los niveles
          </Boton>
        </div>
      </div>

      <Ciudad className="mt-space-6 h-[220px] sm:h-auto" />
    </section>
  );
}
