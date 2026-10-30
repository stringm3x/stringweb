import Link from "next/link";
import { NIVELES } from "@/app/lib/niveles";
import { BotonSonido, Cuerda, SonidoProvider } from "./Cuerdas";
import { Escenario } from "./Escenario";
import { CUERPO, ENLACE, ETIQUETA, SALA, TITULAR } from "./estilos";

// Sala 4 · Los niveles · Música (docs/textos.md). Cada nivel es una cuerda
// con su viñeta de artes acumuladas; las cuerdas engordan nivel a nivel,
// como cuerdas de distinto calibre. "Mismo instrumento, más cuerdas": al
// entrar, una sola vez y sin sonido, se afinan en cascada y cada viñeta se
// enciende; en Empresa vibran todas (app/salas.css, .afinacion).
const CALIBRES = [1.2, 1.5, 1.8, 2.1, 2.4];

export function Sala4Niveles() {
  return (
    <section id="niveles" data-theme="noche" className={`${SALA} scroll-mt-24`}>
      <SonidoProvider>
        <div className="mx-auto flex max-w-contenido flex-col gap-space-5">
          <div className="flex max-w-[760px] flex-col gap-space-4">
            <p className={ETIQUETA}>LOS NIVELES</p>
            <h2 className={TITULAR}>Arte y calidad no están peleados.</h2>
            <p className={CUERPO}>Todos los niveles reciben la misma calidad. Cambia el alcance.</p>
          </div>

          <Escenario as="ol" modo="una-vez" className="afinacion flex flex-col">
            {NIVELES.map((nivel, i) => (
              <li key={nivel.nombre} className="flex flex-col gap-space-3 pt-space-4">
                <div className="grid gap-space-3 lg:grid-cols-[240px_1fr_240px] lg:items-start lg:gap-space-5">
                  <div className="flex flex-col gap-space-1">
                    <h3 className="text-subtitulo">{nivel.nombre}</h3>
                    <p className="font-mono text-cifra text-texto">{nivel.precio}</p>
                  </div>
                  <div className="flex flex-col gap-space-2">
                    <p className="text-cuerpo text-texto">
                      {nivel.cita ? `“${nivel.dices}”` : nivel.dices}
                    </p>
                    <p className={CUERPO}>{nivel.hace}</p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nivel.vineta}
                    width={300}
                    height={44}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="vineta h-auto w-[240px]"
                    style={{ "--i": i }}
                  />
                </div>
                <Cuerda nombre={nivel.nombre} notas={nivel.notas} calibre={CALIBRES[i]} orden={i} />
              </li>
            ))}
          </Escenario>

          <div className="flex flex-col gap-space-4">
            <p className="flex flex-wrap items-center gap-space-3 text-cuerpo text-texto">
              Toca una cuerda. <BotonSonido />
            </p>
            <p className={CUERPO}>Cada nivel suma un arte. Este sitio tiene las siete.</p>
            <p className={CUERPO}>
              ¿Tienes un gimnasio? Ya existe tu sistema.{" "}
              <Link href="/saas" className={`font-semibold ${ENLACE}`}>
                Ver el sistema para gimnasios
              </Link>
            </p>
          </div>
        </div>
      </SonidoProvider>
    </section>
  );
}
