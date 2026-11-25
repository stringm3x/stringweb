"use client";

import { llenar } from "@/app/lib/interno/llamada/llenar";
import { NOTA_NOTO, NOTA_PROBLEMA, valoresLlamada } from "@/app/lib/interno/llamada/resumen";
import { Pregunta } from "./Pregunta";

// El tramo 5, Siguiente paso (lote 25). Su problema con sus palabras, "Te
// digo lo que escuché…" llenado con lo anotado, las preguntas de cierre
// (exportar, solo si ya tiene sistema), la fecha y la hora de la propuesta,
// "¿Te queda el [día] a las [hora]?", "¿Puede estar [él/ella] también?" si
// alguien más decide, la despedida y "Algo que noté". Lo que falta se queda
// entre corchetes para decirlo a su modo.

const CAMPO =
  "min-h-[48px] w-full rounded-[12px] border border-borde bg-fondo px-4 py-3 font-mono text-[16px] text-texto [color-scheme:dark] hover:border-borde-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(var(--acento)/0.22)] focus-visible:outline-none";

function Frase({ children }) {
  return <p className="border-l-2 border-borde pl-space-3 text-cuerpo text-texto">{children}</p>;
}

export function Cierre({ tramo, nicho, llamada, guion, onNota, onCita }) {
  const T = guion.TEXTOS.cierre;
  const v = valoresLlamada(llamada, nicho, guion.TEXTOS);
  const nota = (id) => llamada.notas[id];
  const [escuche, cita] = tramo.frases;
  const conSistema = llamada.tipo === "uno" || llamada.tipo === "varios";
  const decide = String(nota("g-cierre-decide") ?? "").trim();

  return (
    <>
      <Pregunta id={NOTA_PROBLEMA} texto={T.problema} valor={nota(NOTA_PROBLEMA)} onCambiar={(x) => onNota(NOTA_PROBLEMA, x)} />
      <Frase>{llenar(escuche.texto, v)}</Frase>

      <section aria-label={T.preguntas} className="flex flex-col gap-space-4">
        <h3 className="font-mono text-etiqueta uppercase text-texto-suave">{T.preguntas}</h3>
        {guion.CIERRE.filter((p) => !p.soloConSistema || conSistema).map((p) => (
          <Pregunta
            key={p.id}
            id={`g-cierre-${p.id}`}
            texto={p.texto}
            valor={nota(`g-cierre-${p.id}`)}
            onCambiar={(x) => onNota(`g-cierre-${p.id}`, x)}
          />
        ))}
        <fieldset className="flex flex-col gap-space-3">
          <legend className="mb-space-2 text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-texto">{guion.CITA}</legend>
          <div className="grid grid-cols-2 gap-space-2">
            <div className="flex flex-col gap-space-2">
              <label htmlFor="cita-dia" className="text-[14px] font-medium text-texto">
                {T.dia}
              </label>
              <input id="cita-dia" type="date" value={llamada.cita.dia} onChange={(e) => onCita({ dia: e.target.value })} className={CAMPO} />
            </div>
            <div className="flex flex-col gap-space-2">
              <label htmlFor="cita-hora" className="text-[14px] font-medium text-texto">
                {T.hora}
              </label>
              <input id="cita-hora" type="time" value={llamada.cita.hora} onChange={(e) => onCita({ hora: e.target.value })} className={CAMPO} />
            </div>
          </div>
        </fieldset>
      </section>

      <Frase>{llenar(cita.texto, v)}</Frase>
      {decide && <Frase>{llenar(tramo.siDecideConAlguien, v)}</Frase>}
      <Frase>{llenar(tramo.despedida, v)}</Frase>

      <Pregunta id={NOTA_NOTO} texto={T.noto} valor={nota(NOTA_NOTO)} onCambiar={(x) => onNota(NOTA_NOTO, x)} />
    </>
  );
}
