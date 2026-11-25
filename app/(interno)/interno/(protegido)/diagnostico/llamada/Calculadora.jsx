"use client";

import { Campo } from "@/app/components/ui/Campo";
import { calcular, fraseNumero, horas, pesos } from "@/app/lib/interno/llamada/calculadora";
import { llenar } from "@/app/lib/interno/llamada/llenar";
import { Interruptor } from "../piezas";

// "Su número" (lote 25): los campos de la ficha del nicho, el desglose y la
// frase lista para decir. Solo usa lo que Carlos captura. Cifras en Geist Mono.

const MONO = "font-mono text-cifra";

function Fila({ nombre, valor, suave = false }) {
  return (
    <div className="flex items-baseline justify-between gap-space-3 border-b border-borde py-2 last:border-b-0">
      <dt className="text-pequeno text-texto-suave">{nombre}</dt>
      <dd className={`${MONO} text-right ${suave ? "text-texto-suave" : "text-texto"}`}>{valor}</dd>
    </div>
  );
}

export function Calculadora({ nicho, entradas, onCambiar, textos }) {
  const { cuenta } = nicho;
  const r = calcular(cuenta, entradas);
  const frase = fraseNumero(r, textos);
  const id = (campo) => `cuenta-${nicho.id}-${campo}`;

  return (
    <section aria-labelledby="titulo-cuenta" className="flex flex-col gap-space-4">
      <h3 id="titulo-cuenta" className="font-mono text-etiqueta uppercase text-texto-suave">
        {textos.titulo}
      </h3>

      {cuenta.campos.map((c) => {
        if (c.tipo === "casilla") {
          return (
            <Interruptor key={c.id} encendido={entradas[c.id] === true} onCambiar={(v) => onCambiar(c.id, v)}>
              {c.etiqueta}
            </Interruptor>
          );
        }
        if (c.tipo === "texto") {
          return (
            <Campo
              key={c.id}
              id={id(c.id)}
              etiqueta={c.etiqueta}
              multilinea
              rows={2}
              value={entradas[c.id] ?? ""}
              onChange={(e) => onCambiar(c.id, e.target.value)}
            />
          );
        }
        return (
          <Campo
            key={c.id}
            id={id(c.id)}
            etiqueta={c.etiqueta}
            inputMode="decimal"
            autoComplete="off"
            className="font-mono"
            value={entradas[c.id] ?? ""}
            onChange={(e) => onCambiar(c.id, e.target.value)}
          />
        );
      })}

      <dl aria-label={textos.titulo} className="rounded-md border border-borde px-space-3 py-1">
        {r.partidas.map((p) =>
          p.tipo === "texto" ? (
            <Fila key={p.id} nombre={p.nombre} valor={p.texto} suave />
          ) : (
            <Fila
              key={p.id}
              nombre={p.tipo === "deuda" ? `${p.nombre} · ${textos.hoyTeDeben}` : p.nombre}
              valor={p.tipo === "deuda" ? pesos(p.monto) : llenar(textos.partidaMes, { monto: pesos(p.monto) })}
            />
          ),
        )}
        <Fila nombre={textos.alMes} valor={pesos(r.alMes)} />
        <Fila nombre={textos.alAno} valor={pesos(r.alAno)} />
        {r.deuda > 0 && <Fila nombre={textos.hoyTeDeben} valor={pesos(r.deuda)} />}
        {r.horas.mes !== null && <Fila nombre={textos.horasMes} valor={horas(r.horas.mes)} />}
      </dl>

      <div aria-live="polite" className="rounded-md border-2 border-acento p-space-3">
        <p className="font-mono text-etiqueta uppercase text-texto-suave">{textos.frase}</p>
        <p className={`mt-space-2 text-[19px] font-semibold leading-[1.35] ${frase ? "text-texto" : "text-texto-suave"}`}>
          {frase ? `“${frase}”` : textos.vacia}
        </p>
      </div>
    </section>
  );
}
