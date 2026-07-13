"use client";

const presupuestos = [
  { value: "bajo", label: "Bajo", sub: "Menos de $15,000 MXN" },
  { value: "medio", label: "Medio", sub: "$15,000 – $35,000 MXN" },
  { value: "medio-alto", label: "Medio-alto", sub: "$35,000 – $70,000 MXN" },
  { value: "alto", label: "Alto", sub: "Más de $70,000 MXN" },
  { value: "nose", label: "Prefiero no decirlo", sub: "Por definir" },
];

const sucursales = [
  { value: "1", label: "1 sola" },
  { value: "2", label: "2 – 3" },
  { value: "4", label: "4 o más" },
];

export default function PasoDatos({ respuestas, sector, flow, onChange }) {
  if (!sector) return null;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 2 · Negocio
        </span>
        <h1 className="font-anton text-4xl text-white uppercase tracking-tight leading-tight">
          Datos del <span className="text-green">negocio</span>
        </h1>
      </div>

      <div className="space-y-5">
        {/* Nombre del negocio */}
        <Field label="Nombre del negocio">
          <input
            type="text"
            value={respuestas["biz-name"]}
            onChange={(e) => onChange("biz-name", e.target.value)}
            placeholder="Evolution GYM"
            className="input-base"
          />
        </Field>

        {/* Nombre del dueño */}
        <Field label="Nombre del dueño / contacto">
          <input
            type="text"
            value={respuestas["owner-name"]}
            onChange={(e) => onChange("owner-name", e.target.value)}
            placeholder="Carlos Rodríguez"
            className="input-base"
          />
        </Field>

        {/* Ticket promedio — opciones dinámicas por sector */}
        <Field label={sector.ticketLabel}>
          <div className="grid grid-cols-2 gap-2">
            {sector.tickets.map((t) => (
              <OptionBtn
                key={t.value}
                label={t.label}
                active={String(respuestas.ticket) === String(t.value)}
                onClick={() => onChange("ticket", String(t.value))}
              />
            ))}
          </div>
        </Field>

        {/* Sucursales — oculto para ecommerce */}
        {flow !== "ecommerce" && (
          <Field label="¿Cuántas sucursales o ubicaciones?">
            <div className="grid grid-cols-3 gap-2">
              {sucursales.map((s) => (
                <OptionBtn
                  key={s.value}
                  label={s.label}
                  active={respuestas.suc === s.value}
                  onClick={() => onChange("suc", s.value)}
                />
              ))}
            </div>
          </Field>
        )}

        {/* Presupuesto */}
        <Field label="Presupuesto estimado del cliente">
          <div className="grid grid-cols-2 gap-2">
            {presupuestos.map((p) => (
              <button
                key={p.value}
                onClick={() => onChange("presupuesto", p.value)}
                className={`p-3 border text-left transition-all duration-150 ${
                  respuestas.presupuesto === p.value
                    ? "border-green bg-green/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${
                    respuestas.presupuesto === p.value
                      ? "text-green"
                      : "text-white/80"
                  }`}
                >
                  {p.label}
                </p>
                <p className="text-[10px] text-gray mt-0.5">{p.sub}</p>
              </button>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}

// ── Componentes auxiliares ─────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

function OptionBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2.5 border text-xs font-bold uppercase tracking-wide text-left transition-all duration-150 ${
        active
          ? "border-green bg-green/10 text-green"
          : "border-white/10 hover:border-white/30 text-white/70"
      }`}
    >
      {label}
    </button>
  );
}

// CSS global requerido en globals.css:
// .input-base { @apply w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200; }
