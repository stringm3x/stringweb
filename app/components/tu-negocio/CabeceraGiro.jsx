import Link from "next/link";
import { ETIQUETA } from "../salas/estilos";
import { Entra } from "../ui/Entra";

const VOLVER =
  "inline-flex min-h-[44px] items-center self-start font-mono text-etiqueta uppercase text-texto-suave hover:text-texto";

// La cabecera de una página de giro (lote 11): el regreso, la etiqueta, el
// titular, la cita del dueño y el dibujo a la derecha (debajo en celular).
// El dibujo es decorativo: todo lo que dice ya está en el texto.
export function CabeceraGiro({ giro, volver, volverHref, coletilla, children }) {
  return (
    <Entra
      as="header"
      className="grid gap-space-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-x-space-8"
    >
      <div className="flex flex-col gap-space-4">
        <Link href={volverHref} className={VOLVER}>
          <span aria-hidden="true">←&nbsp;</span>
          {volver}
        </Link>
        <p className={ETIQUETA}>{giro.etiqueta}</p>
        <h1 className="text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[60px] lg:text-[72px]">
          {giro.titular}
        </h1>
        <p className="text-cuerpo-l text-texto">
          “{giro.cita}”{coletilla && <span className="text-texto-suave"> {coletilla}</span>}
        </p>
        {children}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={giro.dibujo} width={520} height={372} alt="" className="h-auto w-full max-w-[520px]" />
    </Entra>
  );
}
