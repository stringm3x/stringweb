import { notFound } from "next/navigation";
import { Fundadores } from "@/app/components/boaz/Fundadores";
import { ubuntuMono } from "@/app/components/boaz/fuentes";
import { PlanEscala } from "@/app/components/boaz/PlanEscala";

// Banco de /boaz (lote 21), solo en desarrollo: Fundadores con 0, 1, 2 y 5
// lugares y Escala en sus dos estados, para las pruebas en navegador y las
// capturas. En producción da 404, no se indexa y no va en el sitemap.
export const metadata = {
  title: "Muestrario · Boaz",
  robots: { index: false, follow: false },
};

export const LUGARES = [0, 1, 2, 5];

export default function MuestrarioBoaz() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <div data-theme="boaz" className={`${ubuntuMono.variable} bg-fondo text-[17px] leading-[1.5] text-texto`}>
      <div aria-hidden="true" className="h-[72px] bg-black lg:h-20" />
      <h1 className="sr-only">Muestrario de Boaz</h1>
      {LUGARES.map((n) => (
        <section
          key={n}
          id={`lugares-${n}`}
          aria-labelledby={`fundadores-${n}`}
          className="mx-auto max-w-[1312px] border-b border-borde px-5 py-16 sm:px-6 lg:px-16"
        >
          <Fundadores lugares={n} idTitulo={`fundadores-${n}`} />
        </section>
      ))}
      {["desarrollo", "pruebas"].map((estado) => (
        <section key={estado} id={`escala-${estado}`} className="mx-auto max-w-[420px] px-5 py-16">
          <PlanEscala estado={estado} idTitulo={`escala-${estado}-t`} />
        </section>
      ))}
    </div>
  );
}
