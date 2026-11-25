"use client";

import { useState } from "react";
import { IvaIncluido } from "@/app/components/ui/IvaIncluido";
import { ORDEN, conBoceto, nivelSiguiente } from "@/app/lib/interno/diagnostico/nivel";
import { llenar } from "@/app/lib/interno/llamada/llenar";
import { useDiagnostico } from "./contexto";
import { Elecciones, Interruptor } from "./piezas";

const MONO = "font-mono text-cifra text-texto";

// Paso 4: el nivel en una tarjeta con borde de acento y el siguiente paso.
export function PasoNivel({ nivel, sugerido, gimnasio, boceto, fundador, siguiente, onCambiar }) {
  const [cambiando, setCambiando] = useState(false);
  // Textos y precios por props desde el servidor (lote 25).
  const { contenido, ofertas } = useDiagnostico();
  const { NOMBRES, SIGUIENTES } = contenido;
  const T = contenido.TEXTOS.nivel;
  const oferta = ofertas[nivel];
  const crece = nivelSiguiente(nivel);

  return (
    <div className="flex flex-col gap-space-6">
      <section aria-label={NOMBRES[nivel]} className="flex flex-col gap-space-4 rounded-md border-2 border-acento p-space-4">
        <div aria-live="polite" aria-atomic="true" className="flex flex-col gap-space-2">
          <p className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-texto">{llenar(T.eso, { nivel: NOMBRES[nivel] })}</p>
          {nivel === sugerido.nivel && <p className="text-cuerpo text-texto-suave">{sugerido.razon}</p>}
        </div>

        <div className="flex flex-col gap-space-1">
          {nivel === "boaz" && (
            <p className={MONO}>
              {oferta.mes} al mes <IvaIncluido />
            </p>
          )}
          {nivel === "empresa" && <p className={MONO}>{llenar(T.empresaPrecio, { minimo: oferta.minimo })}</p>}
          {oferta.desde && (
            <p className={MONO}>
              Desde {oferta.desde} <IvaIncluido />
            </p>
          )}
          {oferta.continuidad && (
            <p className="font-mono text-cifra text-texto-suave">
              Continuidad: {oferta.continuidad.nombre}, desde {oferta.continuidad.desde} al mes
            </p>
          )}
          {crece && <p className="font-mono text-cifra text-texto-suave">{llenar(T.cuandoCrezca, { nivel: NOMBRES[crece] })}</p>}
        </div>

        {conBoceto(nivel, ofertas) && (
          <Interruptor encendido={boceto} onCambiar={(v) => onCambiar({ boceto: v })}>
            {llenar(T.boceto, { precio: oferta.boceto })}
          </Interruptor>
        )}

        {gimnasio && (
          <>
            <Interruptor encendido={fundador} onCambiar={(v) => onCambiar({ fundador: v })}>
              {llenar(T.fundador, oferta.fundador)}
            </Interruptor>
            <p className="text-cuerpo text-texto">{T.recordatorioGym}</p>
          </>
        )}

        {!gimnasio && (
          <div className="flex flex-col gap-space-3">
            <button
              type="button"
              aria-expanded={cambiando}
              aria-controls="cambiar-nivel"
              onClick={() => setCambiando((v) => !v)}
              className="min-h-[44px] self-start text-[16px] font-semibold text-texto underline decoration-borde decoration-1 underline-offset-[6px] hover:decoration-texto"
            >
              {T.cambiar}
            </button>
            <div id="cambiar-nivel" hidden={!cambiando}>
              <Elecciones
                nombre="nivel"
                legenda={T.cambiar}
                opciones={ORDEN.map((n) => NOMBRES[n])}
                valor={NOMBRES[nivel]}
                onCambiar={(nombre) => onCambiar({ nivelElegido: ORDEN.find((n) => NOMBRES[n] === nombre) })}
              />
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-space-4">
        <Elecciones
          nombre="siguiente"
          legenda={T.siguiente}
          opciones={SIGUIENTES}
          valor={siguiente.tipo}
          permiteVacio
          onCambiar={(tipo) => onCambiar({ siguiente: { ...siguiente, tipo } })}
        />
        <div className="flex flex-col gap-space-2">
          <label htmlFor="dia" className="text-[14px] font-medium text-texto">
            {T.dia}
          </label>
          <input
            id="dia"
            type="date"
            value={siguiente.dia}
            onChange={(e) => onCambiar({ siguiente: { ...siguiente, dia: e.target.value } })}
            className="min-h-[48px] w-full rounded-[12px] border border-borde bg-fondo px-4 py-3 font-sans text-[16px] text-texto [color-scheme:dark] hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
