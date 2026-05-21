"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSector } from "../data/sectores";
import { calcularScoreCaptacion, calcularScoreOperacion } from "../lib/scoring";
import { calcularTier } from "../lib/recomendacion";
import { calcularMetricas } from "../lib/metricas";
import { detectarFricciones } from "../data/fricciones";
import { getSistema } from "../data/sistemas";
import { guardarDiagnostico } from "../lib/storage";
import { generarPropuesta, generarResumenWhatsApp } from "../lib/propuesta";

import PasoSector from "./pasos/PasoSector";
import PasoDatos from "./pasos/PasoDatos";
import PasoSituacion from "./pasos/PasoSituacion";
import PasoOperacion from "./pasos/PasoOperacion";
import PasoCierre from "./pasos/PasoCierre";

const PASOS = ["Sector", "Negocio", "Situación", "Operación", "Cierre"];

const estadoInicial = {
  // Paso 0
  sector: "",
  // Paso 1
  "biz-name": "",
  "owner-name": "",
  ticket: "",
  suc: "1",
  presupuesto: "",
  // Paso 2 — servicios
  canal: "",
  quien: "",
  respuesta: "",
  volumen: "",
  conversion: "",
  registro: "",
  // Paso 2 — ecommerce
  "canal-eco": "",
  compra: "",
  "pago-online": "",
  catalogo: "",
  // Paso 2 — menu
  pedidos: "",
  menu: "",
  operadores: "",
  domicilio: "",
  // Paso 3 — servicios
  pagos: "",
  agenda: "",
  seguimiento: "",
  // Paso 3 — ecommerce
  inventario: "",
  "gestion-pedidos": "",
  envios: "",
  // Paso 3 — menu
  reactivacion: "",
  // Paso 4
  prioridad: "",
  notas: "",
};

export default function DiagnosticoForm() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);

  const sector = getSector(respuestas.sector);
  const flow = sector?.flow || null;

  // Actualizar campo
  const set = (campo, valor) =>
    setRespuestas((prev) => ({ ...prev, [campo]: valor }));

  // Avanzar paso
  const siguiente = () => setPaso((p) => Math.min(p + 1, PASOS.length - 1));
  const anterior = () => setPaso((p) => Math.max(p - 1, 0));

  // Submit final
  const finalizar = async () => {
    setGuardando(true);
    try {
      const scoreCapt =
        flow === "servicios" ? calcularScoreCaptacion(respuestas) : null;
      const scoreOp = calcularScoreOperacion(respuestas, flow);
      const tier = calcularTier(respuestas, flow, scoreOp, scoreCapt);
      const sistema = getSistema(respuestas.sector, tier);
      const ticketNum = Number(
        sector?.tickets.find(
          (t) => String(t.value) === String(respuestas.ticket)
        )?.value || 0
      );
      const metricas = calcularMetricas(respuestas, flow, ticketNum);
      const fricciones = detectarFricciones(respuestas, flow);
      const propuestaTexto = generarPropuesta({
        bizName: respuestas["biz-name"],
        ownerName: respuestas["owner-name"],
        sector: respuestas.sector,
        flow,
        sistema,
        tier,
        metricas,
        fricciones,
        notas: respuestas.notas,
      });
      const resumenWA = generarResumenWhatsApp({
        bizName: respuestas["biz-name"],
        ownerName: respuestas["owner-name"],
        sistema,
        metricas,
      });

      const diagnostico = {
        sector: respuestas.sector,
        flow,
        bizName: respuestas["biz-name"],
        ownerName: respuestas["owner-name"],
        ticket: ticketNum,
        presupuesto: respuestas.presupuesto,
        scoreCapt,
        scoreOp,
        tier,
        sistema,
        metricas,
        fricciones,
        propuestaTexto,
        resumenWA,
        respuestas,
        notas: respuestas.notas,
      };

      const guardado = guardarDiagnostico(diagnostico);
      if (guardado) {
        router.push(`/diagnostico/resultado?id=${guardado.id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header con progreso */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-anton text-lg tracking-tight text-white">
              STRING <span className="text-green">Diagnóstico</span>
            </span>
            <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
              {paso + 1} / {PASOS.length}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="flex gap-1">
            {PASOS.map((nombre, i) => (
              <div key={nombre} className="flex-1 space-y-1">
                <div
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i <= paso ? "bg-green" : "bg-white/10"
                  }`}
                />
                <p
                  className={`text-[9px] font-mono uppercase tracking-wider hidden sm:block ${
                    i === paso ? "text-green" : "text-white/20"
                  }`}
                >
                  {nombre}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido del paso */}
      <div className="pt-24 pb-32 max-w-2xl mx-auto px-6">
        {paso === 0 && (
          <PasoSector
            valor={respuestas.sector}
            onChange={(v) => {
              set("sector", v);
              setTimeout(siguiente, 200);
            }}
          />
        )}
        {paso === 1 && (
          <PasoDatos
            respuestas={respuestas}
            sector={sector}
            flow={flow}
            onChange={set}
          />
        )}
        {paso === 2 && (
          <PasoSituacion respuestas={respuestas} flow={flow} onChange={set} />
        )}
        {paso === 3 && (
          <PasoOperacion respuestas={respuestas} flow={flow} onChange={set} />
        )}
        {paso === 4 && (
          <PasoCierre respuestas={respuestas} flow={flow} onChange={set} />
        )}
      </div>

      {/* Navegación fija en bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {paso > 0 ? (
            <button
              onClick={anterior}
              className="px-5 py-3 border border-white/10 text-gray text-sm font-mono uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-200"
            >
              ← Atrás
            </button>
          ) : (
            <div />
          )}

          {paso < PASOS.length - 1 ? (
            <button
              onClick={siguiente}
              className="flex-1 sm:flex-none px-8 py-3 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={finalizar}
              disabled={guardando}
              className="flex-1 sm:flex-none px-8 py-3 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {guardando ? "Generando..." : "Ver diagnóstico →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
