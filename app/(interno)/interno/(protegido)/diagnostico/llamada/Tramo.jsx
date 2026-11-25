"use client";

import { llenar } from "@/app/lib/interno/llamada/llenar";
import { Elecciones } from "../piezas";
import { Pregunta } from "./Pregunta";
import { Recordatorios } from "./Recordatorios";

// Un tramo de la guía (lote 25): las frases del guion común y, según el
// tramo, las preguntas de la ficha del nicho. Debajo de cada pregunta, un
// campo para lo que dice, tal cual. Las notas se guardan por id: las del
// guion con "g-", las de la ficha con el id del nicho delante (si cambia de
// nicho, no se mezclan).

function Frase({ children }) {
  return <p className="border-l-2 border-borde pl-space-3 text-cuerpo text-texto">{children}</p>;
}

function Bloque({ titulo, children }) {
  return (
    <section aria-label={titulo} className="flex flex-col gap-space-4">
      <h3 className="font-mono text-etiqueta uppercase text-texto-suave">{titulo}</h3>
      {children}
    </section>
  );
}

export function Tramo({ tramo, nicho, llamada, guion, onNota, onTipo, tituloRef }) {
  const T = guion.TEXTOS.tramos;
  const valores = { dueño: llamada.dueno, negocio: llamada.negocio };
  const nota = (id) => llamada.notas[id];
  const preguntas = (lista, prefijo, extra) =>
    lista.map((texto, i) => {
      const id = `${nicho.id}-${prefijo}-${i}`;
      return <Pregunta key={id} id={id} texto={texto} valor={nota(id)} onCambiar={(v) => onNota(id, v)} nota={extra} />;
    });

  return (
    <div className="flex flex-col gap-space-5">
      <div className="flex flex-col gap-space-2">
        <p className="font-mono text-etiqueta uppercase text-texto-suave">
          {nicho.nombre} · {llenar(T.minutos, { desde: tramo.desde, hasta: tramo.hasta })}
        </p>
        <h2 ref={tituloRef} tabIndex={-1} id="titulo-tramo" className="text-subtitulo focus:outline-none">
          {tramo.nombre}
        </h2>
      </div>

      <Recordatorios titulo={T.recordatorios} lista={guion.RECORDATORIOS} />

      {tramo.frases.map((f) =>
        f.id ? (
          <div key={f.id} className="flex flex-col gap-space-4">
            <Pregunta
              id={`g-${f.id}`}
              texto={llenar(f.texto, valores)}
              valor={nota(`g-${f.id}`)}
              onCambiar={(v) => onNota(`g-${f.id}`, v)}
            />
            {f.tipoDueno && (
              <Elecciones
                nombre="tipo-tramo"
                legenda={guion.TEXTOS.inicio.tipo}
                opciones={guion.TIPOS_DUENO.map((t) => t.nombre)}
                valor={guion.TIPOS_DUENO.find((t) => t.id === llamada.tipo)?.nombre ?? ""}
                permiteVacio
                onCambiar={(nombre) => onTipo(guion.TIPOS_DUENO.find((t) => t.nombre === nombre)?.id ?? "")}
              />
            )}
          </div>
        ) : (
          <Frase key={f.texto}>{llenar(f.texto, valores)}</Frase>
        ),
      )}

      {tramo.preguntas?.map((p) => (
        <Pregunta key={p.id} id={`g-${p.id}`} texto={p.texto} valor={nota(`g-${p.id}`)} onCambiar={(v) => onNota(`g-${p.id}`, v)} />
      ))}

      {tramo.id === "negocio" && (
        <Bloque titulo={T.situacion}>
          {preguntas(nicho.situacion.todos, "sit-todos")}
          {llamada.tipo ? (
            preguntas(nicho.situacion[llamada.tipo], `sit-${llamada.tipo}`, llamada.tipo === "uno" ? nicho.situacion.unoNota : undefined)
          ) : (
            <p className="text-pequeno text-texto-suave">{T.eligeTipo}</p>
          )}
        </Bloque>
      )}

      {tramo.id === "cuesta" && (
        <>
          <Bloque titulo={T.problema}>{preguntas(nicho.problema, "prob")}</Bloque>
          <Bloque titulo={T.implicacion}>{preguntas(nicho.implicacion, "imp")}</Bloque>
        </>
      )}

      {tramo.soloSiAyuda && <p className="text-pequeno text-texto-suave">{tramo.soloSiAyuda}</p>}

      {tramo.siDecideConAlguien && <Frase>{llenar(tramo.siDecideConAlguien, valores)}</Frase>}
      {tramo.despedida && <Frase>{llenar(tramo.despedida, valores)}</Frase>}
    </div>
  );
}
