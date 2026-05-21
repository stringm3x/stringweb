"use client";

const prioridadesPorFlow = {
  servicios: [
    {
      value: "prospectos",
      label: "Captar más prospectos",
      sub: "El problema es de captación",
    },
    {
      value: "organizar",
      label: "Organizar los que llegan",
      sub: "Llegan pero se pierden",
    },
    {
      value: "operacion",
      label: "Mejorar operación interna",
      sub: "El caos es adentro",
    },
    { value: "todo", label: "Todo lo anterior", sub: "Captación + operación" },
  ],
  ecommerce: [
    {
      value: "catalogo",
      label: "Poner catálogo en línea",
      sub: "No tienen presencia digital",
    },
    {
      value: "ventas",
      label: "Aumentar ventas online",
      sub: "Quieren escalar",
    },
    {
      value: "operacion",
      label: "Organizar operación",
      sub: "Pedidos e inventario",
    },
    {
      value: "todo",
      label: "Todo lo anterior",
      sub: "Catálogo + ventas + operación",
    },
  ],
  menu: [
    { value: "menu", label: "Tener menú digital", sub: "Digitalizar el menú" },
    {
      value: "pedidos",
      label: "Organizar pedidos",
      sub: "Reducir errores en hora pico",
    },
    {
      value: "reactivar",
      label: "Reactivar clientes",
      sub: "Los que ya no vuelven",
    },
    {
      value: "todo",
      label: "Todo lo anterior",
      sub: "Menú + pedidos + reactivación",
    },
  ],
};

export default function PasoCierre({ respuestas, flow, onChange }) {
  const prioridades = prioridadesPorFlow[flow] || [];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 5 · Cierre
        </span>
        <h1 className="font-anton text-4xl text-white uppercase tracking-tight leading-tight">
          ¿Cuál es la <span className="text-green">prioridad</span>
          <br />
          del cliente?
        </h1>
      </div>

      {/* Prioridad */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
          ¿Qué quiere resolver primero?
        </label>
        <div className="grid grid-cols-1 gap-2">
          {prioridades.map((p) => (
            <button
              key={p.value}
              onClick={() => onChange("prioridad", p.value)}
              className={`flex items-center justify-between px-4 py-3.5 border text-left transition-all duration-150 ${
                respuestas.prioridad === p.value
                  ? "border-green bg-green/10"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-bold uppercase tracking-wide ${
                    respuestas.prioridad === p.value
                      ? "text-green"
                      : "text-white/80"
                  }`}
                >
                  {p.label}
                </p>
                <p className="text-[10px] text-gray mt-0.5">{p.sub}</p>
              </div>
              {respuestas.prioridad === p.value && (
                <span className="text-green text-lg">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notas del vendedor */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
          Notas del vendedor{" "}
          <span className="text-white/20">(solo visible para ti)</span>
        </label>
        <textarea
          value={respuestas.notas}
          onChange={(e) => onChange("notas", e.target.value)}
          placeholder="Observaciones de la llamada, actitud del cliente, objeciones escuchadas, contexto adicional..."
          rows={5}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200 resize-none"
        />
      </div>

      {/* Aviso final */}
      <div className="border border-green/20 bg-green/5 p-4">
        <p className="text-[10px] font-mono text-green uppercase tracking-widest mb-1">
          Listo para generar
        </p>
        <p className="text-white/60 text-xs leading-relaxed">
          Al presionar "Ver diagnóstico" se calculan los scores, las fricciones
          detectadas, el sistema recomendado y la propuesta completa. Todo se
          guarda automáticamente en el historial.
        </p>
      </div>
    </div>
  );
}
