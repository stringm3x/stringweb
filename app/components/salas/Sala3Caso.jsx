import Image from "next/image";
import Link from "next/link";
import { SAAS_EN_PRODUCCION } from "@/app/lib/stats";
import { CUERPO, ENLACE, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 3 · El caso real · Cine (docs/textos.md). Versión quieta: la tira de
// tres fotogramas con la foto de Carlos en el primero y los créditos en
// Geist Mono. Sin cifras de socios hasta recontar.
const CREDITOS = `EN USO TODOS LOS DÍAS EN EL MOSTRADOR · ${SAAS_EN_PRODUCCION} PRODUCTO EN PRODUCCIÓN`;

// El primer fotograma dentro de la tira (sala3-cine.svg, 1136 × 300), en %,
// un poco hacia dentro para que se vea el borde del cuadro.
const FOTOGRAMA = { left: "3.6%", top: "17.2%", width: "28.85%", height: "65.6%" };

export function Sala3Caso() {
  return (
    <section data-theme="noche" className={SALA}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-5">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>EL CASO REAL</p>
          <h2 className={TITULAR}>Lo probamos en casa primero.</h2>
          <p className={CUERPO}>
            Soy Carlos Avilés, desarrollador y fundador de STRING. Evolution GYM es el gimnasio
            de mi familia: ahí construí su sistema y lo probamos en el mostrador, con socios de
            verdad. Funcionó, y se volvió un producto: el sistema para gimnasios de STRING. Cada
            sistema que hacemos lo reviso yo antes de entregarlo.{" "}
            <Link href="/nosotros" className={`font-semibold ${ENLACE}`}>
              Conoce la historia
            </Link>
          </p>
        </div>

        {/* En celular la tira conserva su tamaño y se recorre de lado. */}
        <div
          role="region"
          aria-label="Fotogramas del caso real"
          tabIndex={0}
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <div className="relative min-w-[720px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arte/sala3-cine.svg"
              width={1136}
              height={300}
              loading="lazy"
              decoding="async"
              alt="Tira de película con tres cuadros: el fundador, el mostrador del gimnasio y el sistema funcionando en una laptop."
              className="block h-auto w-full"
            />
            <div className="absolute overflow-hidden" style={FOTOGRAMA}>
              {/* TODO(dato): foto de respaldo hasta que Carlos mande la final. */}
              <Image
                src="/foto/carlos-respaldo.jpg"
                alt="Carlos Avilés, fundador de STRING."
                fill
                sizes="(min-width: 1024px) 360px, 210px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <p className="font-mono text-etiqueta uppercase text-texto-suave">{CREDITOS}</p>
      </div>
    </section>
  );
}
