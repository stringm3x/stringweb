"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { obtenerDiagnostico } from "../lib/storage";
import { etiquetaScore } from "../lib/scoring";
import { colorSeveridad } from "../data/fricciones";
import { formatMXN } from "../lib/metricas";

export default function ResultadoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [diag, setDiag] = useState(null);
  const [tab, setTab] = useState("resumen");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!id) return;
    const data = obtenerDiagnostico(id);
    if (data) setDiag(data);
  }, [id]);

  if (!diag) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray font-mono text-sm">Cargando diagnóstico...</p>
      </div>
    );
  }

  const {
    sistema,
    metricas,
    fricciones,
    scoreCapt,
    scoreOp,
    bizName,
    ownerName,
    presupuesto,
    propuestaTexto,
    resumenWA,
    notas,
  } = diag;

  const etOp = etiquetaScore(scoreOp);
  const etCapt = scoreCapt !== null ? etiquetaScore(scoreCapt) : null;

  const alertaPresupuesto = () => {
    if (presupuesto === "bajo" && sistema?.precioMin > 15000) {
      return {
        tipo: "amarillo",
        msg: "Presupuesto por debajo del sistema recomendado. Enfoca la devolución en el costo del desorden antes de hablar de precio.",
      };
    }
    if (presupuesto === "alto") {
      return {
        tipo: "verde",
        msg: "Presupuesto alineado. Sin fricción de precio esperada.",
      };
    }
    return null;
  };
  const alerta = alertaPresupuesto();

  const copiarResumen = async () => {
    try {
      await navigator.clipboard.writeText(resumenWA);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {}
  };

  const imprimirPDF = () => window.print();

  const abrirWhatsApp = () => {
    window.open(
      `https://wa.me/525545524847?text=${encodeURIComponent(resumenWA)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-white/10 print:hidden">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-anton text-lg text-white tracking-tight">
              STRING <span className="text-green">Diagnóstico</span>
            </span>
            <p className="text-[10px] font-mono text-gray uppercase tracking-widest mt-0.5">
              {bizName} · {ownerName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/diagnostico/historial")}
              className="px-3 py-2 border border-white/10 text-gray text-xs font-mono uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-200"
            >
              Historial
            </button>
            <button
              onClick={() => router.push("/diagnostico")}
              className="px-3 py-2 bg-green text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
            >
              + Nuevo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Alerta presupuesto */}
        {alerta && (
          <div
            className={`border p-4 ${
              alerta.tipo === "amarillo"
                ? "border-yellow/30 bg-yellow/5"
                : "border-green/30 bg-green/5"
            }`}
          >
            <p
              className={`text-xs font-mono uppercase tracking-widest mb-1 ${
                alerta.tipo === "amarillo" ? "text-yellow" : "text-green"
              }`}
            >
              {alerta.tipo === "amarillo" ? "⚠ Atención" : "✓ Presupuesto"}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {alerta.msg}
            </p>
          </div>
        )}

        {/* Sistema recomendado */}
        <div className="border border-green/30 bg-green/5 p-6">
          <p className="text-[10px] font-mono text-green uppercase tracking-[0.3em] mb-3">
            Sistema recomendado
          </p>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight leading-tight mb-3">
            {sistema?.nombre}
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
            {[
              { label: "Inversión", value: `${sistema?.precio} MXN` },
              { label: "Anticipo", value: sistema?.anticipo },
              { label: "Tiempo", value: sistema?.tiempo },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-mono text-gray uppercase tracking-widest mb-1">
                  {label}
                </p>
                <p className="text-white font-bold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          <div className="bg-black px-5 py-5 text-center">
            <p className="font-anton text-2xl text-red leading-none mb-1">
              {formatMXN(metricas?.perdAnual || 0)}
            </p>
            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
              Costo del desorden / año
            </p>
          </div>
          {scoreCapt !== null && (
            <div className="bg-black px-5 py-5 text-center">
              <p
                className={`font-anton text-2xl leading-none mb-1 ${etCapt?.color}`}
              >
                {scoreCapt}
              </p>
              <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
                Score captación
              </p>
            </div>
          )}
          <div className="bg-black px-5 py-5 text-center">
            <p
              className={`font-anton text-2xl leading-none mb-1 ${etOp?.color}`}
            >
              {scoreOp}
            </p>
            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
              Score operación
            </p>
          </div>
        </div>

        {/* Barras de salud */}
        <div className="space-y-3">
          {scoreCapt !== null && (
            <BarraSalud label="Captación" score={scoreCapt} etiqueta={etCapt} />
          )}
          <BarraSalud label="Operación" score={scoreOp} etiqueta={etOp} />
        </div>

        {/* Fricciones */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono text-gray uppercase tracking-widest">
            Fricciones detectadas ({fricciones?.length || 0})
          </p>
          {fricciones?.map((f, i) => {
            const c = colorSeveridad[f.severidad];
            return (
              <div key={i} className={`border ${c.border} ${c.bg} p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest font-bold ${c.text}`}
                  >
                    {c.label}
                  </span>
                  <span className="text-[9px] font-mono text-gray uppercase tracking-widest">
                    · {f.area}
                  </span>
                </div>
                <p className="text-white text-sm font-semibold mb-1">
                  {f.titulo}
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  {f.descripcion}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div>
          <div className="grid grid-cols-3 gap-px bg-white/5 mb-px">
            {[
              { id: "resumen", label: "Devolución" },
              { id: "propuesta", label: "Propuesta" },
              { id: "notas", label: "Mis notas" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`py-3 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  tab === t.id
                    ? "bg-green text-black"
                    : "bg-black text-gray hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "resumen" && (
            <div className="border border-white/10 border-t-0 p-6 space-y-4">
              <p className="text-[10px] font-mono text-green uppercase tracking-widest">
                Qué decirle al cliente — palabra por palabra
              </p>
              <div className="space-y-4 text-sm text-white/80 leading-relaxed">
                <p>
                  <span className="text-white font-bold">
                    "{ownerName?.split(" ")[0]},
                  </span>{" "}
                  lo que vi en estos 30 minutos es que {bizName} no tiene un
                  problema de demanda. Tiene un problema de estructura."
                </p>
                <p>
                  "Están perdiendo aproximadamente{" "}
                  <span className="text-red font-bold">
                    {formatMXN(metricas?.perdAnual || 0)} al año
                  </span>{" "}
                  — no porque no lleguen prospectos, sino porque el sistema no
                  los está capturando ni dando seguimiento."
                </p>
                {fricciones
                  ?.filter((f) => f.severidad === "hi")
                  .slice(0, 2)
                  .map((f, i) => (
                    <p key={i}>"Por ejemplo: {f.descripcion}"</p>
                  ))}
                <p>
                  "Lo que propongo es implementar{" "}
                  <span className="text-green font-bold">
                    {sistema?.nombre}
                  </span>
                  . La inversión es de{" "}
                  <span className="text-white font-bold">
                    {sistema?.precio} MXN
                  </span>
                  , con un anticipo de{" "}
                  <span className="text-white font-bold">
                    {sistema?.anticipo}
                  </span>{" "}
                  para arrancar. El sistema estaría activo en{" "}
                  <span className="text-white font-bold">
                    {sistema?.tiempo}
                  </span>
                  ."
                </p>
                <p>
                  "¿Tienes alguna duda antes de que te mande la propuesta
                  completa?"
                </p>
              </div>
            </div>
          )}

          {tab === "propuesta" && (
            <div className="border border-white/10 border-t-0">
              <pre className="p-6 text-xs text-white/70 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {propuestaTexto}
              </pre>
            </div>
          )}

          {tab === "notas" && (
            <div className="border border-white/10 border-t-0 p-6">
              <p className="text-[10px] font-mono text-gray uppercase tracking-widest mb-3">
                Notas del vendedor — privadas
              </p>
              {notas ? (
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {notas}
                </p>
              ) : (
                <p className="text-white/20 text-sm italic">
                  Sin notas registradas.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 print:hidden">
          <button
            onClick={copiarResumen}
            className="px-4 py-3 border border-white/10 text-gray text-xs font-mono uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-200"
          >
            {copiado ? "✓ Copiado" : "Copiar resumen"}
          </button>
          <button
            onClick={abrirWhatsApp}
            className="px-4 py-3 border border-green/30 text-green text-xs font-mono uppercase tracking-wider hover:bg-green/10 transition-all duration-200"
          >
            Seguimiento WA ↗
          </button>
          <button
            onClick={imprimirPDF}
            className="px-4 py-3 bg-green text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
          >
            Descargar PDF ↓
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          pre {
            color: #333 !important;
          }
        }
      `}</style>
    </div>
  );
}

function BarraSalud({ label, score, etiqueta }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
          {label}
        </span>
        <span
          className={`text-[10px] font-mono font-bold uppercase tracking-widest ${etiqueta?.color}`}
        >
          {score} · {etiqueta?.label}
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            score >= 80
              ? "bg-green"
              : score >= 55
              ? "bg-yellow"
              : score >= 30
              ? "bg-orange"
              : "bg-red"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
