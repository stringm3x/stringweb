import Link from "next/link";
import { precioDe } from "@/app/lib/giros";
import { nivelPorSlug } from "@/app/lib/niveles";
import { CUERPO, ETIQUETA } from "../salas/estilos";
import { Entra } from "../ui/Entra";
import { IvaIncluido } from "../ui/IvaIncluido";
import { CuerdaFija } from "./CuerdaFija";

// La escalera de un giro con local (lote 11): cinco escalones, de Responde a
// Empresa, cada uno con lo que te pasa, lo que hace tu sistema, el enlace a
// la página de su nivel y su cuerda, que engorda escalón a escalón. En
// escritorio, tres columnas con sus encabezados; en celular, cada escalón se
// apila con sus propias etiquetas (las que lee siempre el lector de pantalla).
const COLUMNAS = "grid gap-space-2 lg:grid-cols-[220px_1fr_1fr] lg:gap-space-5";
const ROTULO = `${ETIQUETA} lg:sr-only`;

export function Escalera({ filas }) {
  return (
    <section aria-labelledby="escalera" className="flex flex-col gap-space-4">
      <div className={COLUMNAS}>
        <h2 id="escalera" className={ETIQUETA}>
          Tu escalera
        </h2>
        <p aria-hidden="true" className={`${ETIQUETA} hidden lg:block`}>
          Lo que te pasa
        </p>
        <p aria-hidden="true" className={`${ETIQUETA} hidden lg:block`}>
          Lo que hace tu sistema
        </p>
      </div>
      <Entra as="ol" className="flex flex-col">
        {filas.map((f, i) => {
          const nivel = nivelPorSlug(f.nivel);
          return (
            <li key={f.nivel} className="flex flex-col gap-space-4 pt-space-4">
              <CuerdaFija calibre={nivel.calibre} orden={i} />
              <div className={`${COLUMNAS} pb-space-2`}>
                <div className="flex flex-col gap-space-1">
                  <h3 className="text-subtitulo">
                    <Link href={`/sistemas/${nivel.slug}`} className="underline-offset-4 hover:underline">
                      {nivel.nombre}
                    </Link>
                  </h3>
                  <p className="font-mono text-cifra text-texto">
                    {precioDe(f.nivel)}
                    {f.nivel !== "empresa" && <> <IvaIncluido /></>}
                  </p>
                </div>
                <div className="flex flex-col gap-space-1">
                  <p className={ROTULO}>Lo que te pasa</p>
                  <p className="text-cuerpo text-texto">{f.pasa}</p>
                </div>
                <div className="flex flex-col gap-space-1">
                  <p className={ROTULO}>Lo que hace tu sistema</p>
                  <p className={CUERPO}>{f.hace}</p>
                </div>
              </div>
            </li>
          );
        })}
      </Entra>
      <p className={`${CUERPO} border-t border-hairline pt-space-4`}>
        Lo que hace cada sistema es un ejemplo para tu giro. El tuyo se define en la llamada de diagnóstico.
      </p>
    </section>
  );
}
