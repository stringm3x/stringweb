"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiInbox } from "react-icons/fi";
import { obtenerDiagnosticos, eliminarDiagnostico } from "../lib/storage";
import { formatMXN } from "../lib/metricas";
import { SECTORES } from "../data/sectores";

export default function HistorialPage() {
  const router = useRouter();
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [filtroSector, setFiltroSector] = useState("todos");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    setDiagnosticos(obtenerDiagnosticos());
  }, []);

  const filtrados =
    filtroSector === "todos"
      ? diagnosticos
      : diagnosticos.filter((d) => d.sector === filtroSector);

  const handleEliminar = (id) => {
    eliminarDiagnostico(id);
    setDiagnosticos(obtenerDiagnosticos());
    setConfirmDelete(null);
  };

  const formatFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSectorIcon = (id) => SECTORES.find((s) => s.id === id)?.icon || FiBriefcase;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-anton text-lg text-white tracking-tight">
            STRING <span className="text-green">Historial</span>
          </span>
          <button
            onClick={() => router.push("/diagnostico")}
            className="px-4 py-2 bg-green text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
          >
            + Nuevo diagnóstico
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          <div className="bg-black px-4 py-4 text-center">
            <p className="font-anton text-3xl text-green leading-none mb-1">
              {diagnosticos.length}
            </p>
            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
              Diagnósticos
            </p>
          </div>
          <div className="bg-black px-4 py-4 text-center">
            <p className="font-anton text-3xl text-white leading-none mb-1">
              {new Set(diagnosticos.map((d) => d.sector)).size}
            </p>
            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
              Sectores
            </p>
          </div>
          <div className="bg-black px-4 py-4 text-center">
            <p className="font-anton text-xl text-red leading-none mb-1">
              {formatMXN(
                diagnosticos.reduce(
                  (sum, d) => sum + (d.metricas?.perdAnual || 0),
                  0
                )
              )}
            </p>
            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
              Oportunidad total
            </p>
          </div>
        </div>

        {/* Filtro por sector */}
        {diagnosticos.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltroSector("todos")}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-all duration-150 ${
                filtroSector === "todos"
                  ? "border-green bg-green/10 text-green"
                  : "border-white/10 text-gray hover:border-white/30"
              }`}
            >
              Todos
            </button>
            {[...new Set(diagnosticos.map((d) => d.sector))].map((s) => {
              const SectorIcon = getSectorIcon(s);
              return (
                <button
                  key={s}
                  onClick={() => setFiltroSector(s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-all duration-150 ${
                    filtroSector === s
                      ? "border-green bg-green/10 text-green"
                      : "border-white/10 text-gray hover:border-white/30"
                  }`}
                >
                  <SectorIcon className="text-xs" />
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {/* Lista */}
        {filtrados.length === 0 ? (
          <div className="border border-white/10 p-12 text-center space-y-3">
            <FiInbox className="text-4xl text-white/20 mx-auto" />
            <p className="text-white font-bold">Sin diagnósticos aún</p>
            <p className="text-gray text-sm">
              Completa tu primera llamada de diagnóstico y aparecerá aquí.
            </p>
            <button
              onClick={() => router.push("/diagnostico")}
              className="mt-4 px-6 py-3 bg-green text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
            >
              Hacer primer diagnóstico
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtrados.map((d) => (
              <div
                key={d.id}
                className="border border-white/10 hover:border-white/20 transition-colors duration-200 group"
              >
                <div className="p-5 flex items-start justify-between gap-4">
                  {/* Info */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      router.push(`/diagnostico/resultado?id=${d.id}`)
                    }
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const SectorIcon = getSectorIcon(d.sector);
                        return <SectorIcon className="text-lg text-green" />;
                      })()}
                      <span className="text-[10px] font-mono text-gray uppercase tracking-widest">
                        {d.sector} · {formatFecha(d.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base group-hover:text-green transition-colors duration-200">
                      {d.bizName}
                    </h3>
                    <p className="text-gray text-xs mt-0.5">{d.ownerName}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-[9px] font-mono text-gray uppercase tracking-widest">
                          Sistema
                        </p>
                        <p className="text-green text-xs font-bold">
                          {d.sistema?.nombre}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-gray uppercase tracking-widest">
                          Inversión
                        </p>
                        <p className="text-white text-xs font-bold">
                          {d.sistema?.precio} MXN
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-gray uppercase tracking-widest">
                          Oportunidad
                        </p>
                        <p className="text-red text-xs font-bold">
                          {formatMXN(d.metricas?.perdAnual || 0)}/año
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        router.push(`/diagnostico/resultado?id=${d.id}`)
                      }
                      className="px-3 py-1.5 bg-green text-black text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
                    >
                      Ver →
                    </button>
                    {confirmDelete === d.id ? (
                      <button
                        onClick={() => handleEliminar(d.id)}
                        className="px-3 py-1.5 bg-red/20 border border-red/30 text-red text-[10px] font-bold uppercase tracking-wider"
                      >
                        ¿Seguro?
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(d.id)}
                        className="px-3 py-1.5 border border-white/10 text-gray text-[10px] font-mono uppercase tracking-wider hover:border-red/30 hover:text-red transition-all duration-200"
                      >
                        Borrar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
