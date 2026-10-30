import Image from "next/image";
import Link from "next/link";
import { SAAS_EN_PRODUCCION } from "@/app/lib/stats";
import { Escenario } from "./Escenario";
import { CUERPO, ENLACE, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 3 · El caso real · Cine (docs/textos.md). La tira de tres fotogramas
// con la foto de Carlos en el primero y los créditos en Geist Mono. Sin
// cifras de socios hasta recontar. "La historia se cuenta cuadro por
// cuadro": la tira entra desde la derecha y los cuadros se encienden con
// corte seco al bajar; luego los créditos (app/salas.css, .cine). Con menos
// movimiento, los tres encendidos.
const CREDITOS = `EN USO TODOS LOS DÍAS EN EL MOSTRADOR · ${SAAS_EN_PRODUCCION} PRODUCTO EN PRODUCCIÓN`;

// El primer fotograma dentro de la tira (sala3-cine.svg, 1136 × 300), en %,
// un poco hacia dentro para que se vea el borde del cuadro.
const FOTOGRAMA = { left: "3.6%", top: "17.2%", width: "28.85%", height: "65.6%" };

// Los tres cuadros completos, con su borde, para apagarlos (x = 32, 400, 764).
const CUADROS = ["3.0%", "35.3%", "67.2%"];

// Cuándo cruza cada centinela la línea (65 % de la pantalla), medido desde
// arriba de la tira: entra, cuadro 1, 2, 3 y créditos.
const CENTINELAS = ["-20svh", "0svh", "12svh", "24svh", "32svh"];

export function Sala3Caso() {
  return (
    <section data-theme="noche" className={`${SALA} overflow-x-clip`}>
      <div className="mx-auto flex max-w-contenido flex-col gap-space-5">
        <div className="flex max-w-[760px] flex-col gap-space-4">
          <p className={ETIQUETA}>EL CASO REAL</p>
          <h2 className={TITULAR}>Probado en un negocio real.</h2>
          <p className={CUERPO}>
            Soy Carlos Avilés, desarrollador y fundador de STRING. Evolution GYM es el gimnasio
            de mi familia: ahí construí su sistema y lo probamos en el mostrador, con socios de
            verdad. Funcionó, y se volvió un producto: Boaz, el sistema para gimnasios de STRING. Cada
            sistema que hacemos lo reviso yo antes de entregarlo.{" "}
            <Link href="/nosotros" className={`font-semibold ${ENLACE}`}>
              Conoce la historia
            </Link>
          </p>
        </div>

        <Escenario modo="etapas" activo centrar linea={65} className="cine relative flex flex-col gap-space-5">
          {/* En celular la tira conserva su tamaño y se recorre de lado; cada
              cuadro que se enciende se centra. */}
          <div className="cine-entra">
            <div
              role="region"
              aria-label="Fotogramas del caso real"
              tabIndex={0}
              data-tira
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
                {CUADROS.map((left, i) => (
                  <div
                    key={left}
                    aria-hidden="true"
                    data-cuadro={i + 2}
                    className="cine-oscuro absolute top-[15.6%] h-[68%] w-[29.6%] bg-fondo/80"
                    style={{ left }}
                  />
                ))}
              </div>
            </div>
          </div>
          {CENTINELAS.map((top) => (
            <span key={top} data-centinela aria-hidden="true" className="absolute inset-x-0 h-px" style={{ top }} />
          ))}
          <p className="cine-creditos font-mono text-etiqueta uppercase text-texto-suave">{CREDITOS}</p>
        </Escenario>
      </div>
    </section>
  );
}
