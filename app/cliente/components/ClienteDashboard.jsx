"use client";

import { FiCheckCircle, FiRefreshCw, FiClock, FiTool, FiZap } from "react-icons/fi";

// app/cliente/components/ClienteDashboard.jsx

const ESTADOS_CONFIG = {
  "En diagnóstico": {
    color: "bg-blue/20 text-blue border-blue/30",
    dot: "bg-blue",
  },
  "Estudio de procesos": {
    color: "bg-orange/20 text-orange border-orange/30",
    dot: "bg-orange",
  },
  "En desarrollo": {
    color: "bg-green/20 text-green border-green/30",
    dot: "bg-green",
  },
  "En pruebas": {
    color: "bg-purple/20 text-purple border-purple/30",
    dot: "bg-purple",
  },
  "Capacitación pendiente": {
    color: "bg-yellow/20 text-yellow border-yellow/30",
    dot: "bg-yellow",
  },
  "Listo para entrega": {
    color: "bg-green/20 text-green border-green/30",
    dot: "bg-green",
  },
  Entregado: {
    color: "bg-green/20 text-green border-green/30",
    dot: "bg-green",
  },
  "En pausa": { color: "bg-red/20 text-red border-red/30", dot: "bg-red" },
};

const FASE_ICONS = {
  completado: { icon: FiCheckCircle, color: "text-green" },
  en_progreso: { icon: FiRefreshCw, color: "text-yellow" },
  pendiente: { icon: FiClock, color: "text-white/20" },
};

export default function ClienteDashboard({ proyecto }) {
  const {
    nombre_negocio,
    nombre_contacto,
    sistema_contratado,
    fecha_inicio,
    fecha_entrega_estimada,
    progreso_porcentaje,
    estado,
    fases,
    tareas_string,
    tareas_cliente,
    entregables,
    whatsapp_mensaje,
  } = proyecto;

  const estadoConfig =
    ESTADOS_CONFIG[estado] || ESTADOS_CONFIG["En desarrollo"];

  const diasRestantes = () => {
    const hoy = new Date();
    const entrega = new Date(fecha_entrega_estimada);
    const diff = Math.ceil((entrega - hoy) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Entrega pasada";
    if (diff === 0) return "Hoy";
    return `${diff} días restantes`;
  };

  const formatFecha = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const waUrl = `https://wa.me/525545524847?text=${encodeURIComponent(
    whatsapp_mensaje ||
      `Hola, soy ${nombre_negocio}, tengo una pregunta sobre mi proyecto`
  )}`;

  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg tracking-tight">
              STRING <span className="text-green">·</span> {nombre_negocio}
            </p>
            <p className="text-white/30 text-xs font-mono mt-0.5">
              {sistema_contratado}
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 bg-green text-black text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors duration-200"
          >
            Contactar a STRING →
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* ── Bloque 1 — Estado general ─────────────────────────────────── */}
        <div className="border border-white/10 p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
                Estado del proyecto
              </p>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-mono uppercase tracking-wider ${estadoConfig.color}`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${estadoConfig.dot}`}
                />
                {estado}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                Tiempo restante
              </p>
              <p className="font-bold text-white text-sm">{diasRestantes()}</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Avance general
              </span>
              <span className="font-bold text-green text-sm">
                {progreso_porcentaje}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-green rounded-full transition-all duration-1000"
                style={{ width: `${progreso_porcentaje}%` }}
              />
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                Iniciado
              </p>
              <p className="text-white text-sm">{formatFecha(fecha_inicio)}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                Entrega estimada
              </p>
              <p className="text-white text-sm">
                {formatFecha(fecha_entrega_estimada)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bloque 2 — Las 7 fases ────────────────────────────────────── */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            Las 7 fases del proyecto
          </p>
          <div className="space-y-px">
            {fases.map((fase) => {
              const config = FASE_ICONS[fase.estado] || FASE_ICONS.pendiente;
              return (
                <div
                  key={fase.numero}
                  className={`flex items-center gap-4 px-4 py-4 ${
                    fase.estado === "en_progreso"
                      ? "bg-green/5 border-l-2 border-green"
                      : fase.estado === "completado"
                      ? "bg-white/[0.02] border-l-2 border-white/10"
                      : "bg-white/[0.01] border-l-2 border-transparent"
                  }`}
                >
                  <config.icon className={`text-lg flex-shrink-0 ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-white/30">
                        0{fase.numero}
                      </span>
                      <p
                        className={`text-sm font-semibold ${
                          fase.estado === "pendiente"
                            ? "text-white/30"
                            : "text-white"
                        }`}
                      >
                        {fase.nombre}
                      </p>
                      {fase.estado === "en_progreso" && (
                        <span className="text-[9px] font-mono text-green border border-green/30 px-1.5 py-0.5 uppercase tracking-wider">
                          En progreso
                        </span>
                      )}
                    </div>
                    {fase.fecha_completado && (
                      <p className="text-[10px] font-mono text-white/20 mt-0.5">
                        Completado el {formatFecha(fase.fecha_completado)}
                      </p>
                    )}
                  </div>
                  {/* Barra de progreso individual */}
                  {fase.progreso_pct > 0 && fase.progreso_pct < 100 && (
                    <div className="w-16 flex-shrink-0">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green rounded-full"
                          style={{ width: `${fase.progreso_pct}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-mono text-white/30 text-right mt-0.5">
                        {fase.progreso_pct}%
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bloque 3 — Tareas ─────────────────────────────────────────── */}
        <div
          className={`grid gap-px bg-white/5 ${
            tareas_cliente?.length > 0
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* STRING trabajando en... */}
          <div className="bg-charcoal p-6 space-y-3">
            <p className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              <FiTool className="text-xs" />
              STRING está trabajando en
            </p>
            <ul className="space-y-2">
              {tareas_string?.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green mt-1 flex-shrink-0">·</span>
                  <span className="text-white/60 text-sm leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Necesitamos de ti — solo si hay tareas */}
          {tareas_cliente?.length > 0 && (
            <div className="bg-yellow/5 border border-yellow/20 p-6 space-y-3">
              <p className="flex items-center gap-1.5 text-[10px] font-mono text-yellow uppercase tracking-widest">
                <FiZap className="text-xs" />
                Necesitamos de ti
              </p>
              <ul className="space-y-2">
                {tareas_cliente.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow mt-1 flex-shrink-0">·</span>
                    <span className="text-white/80 text-sm leading-relaxed font-medium">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Bloque 4 — Entregables ────────────────────────────────────── */}
        {entregables?.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Documentos disponibles
            </p>
            <div className="space-y-px">
              {entregables.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 px-4 py-4 bg-white/[0.02]"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{e.nombre}</p>
                    <p className="text-white/30 text-[10px] font-mono mt-0.5">
                      {formatFecha(e.fecha)}
                    </p>
                  </div>
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-3 py-1.5 bg-green text-black text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200"
                    >
                      Descargar PDF →
                    </a>
                  ) : (
                    <span className="flex-shrink-0 px-3 py-1.5 border border-white/10 text-white/20 text-[10px] font-mono uppercase tracking-wider">
                      Próximamente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bloque 5 — Contacto ───────────────────────────────────────── */}
        <div className="border border-white/10 p-6 text-center space-y-4">
          <p className="text-white/40 text-sm">
            ¿Tienes una duda sobre el avance de tu proyecto?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
          >
            Escribir por WhatsApp →
          </a>
          <p className="text-white/20 text-[10px] font-mono">
            STRING · stringwebs.com · hola@stringwebs.com
          </p>
        </div>
      </div>
    </div>
  );
}
