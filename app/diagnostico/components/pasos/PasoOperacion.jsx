"use client";

const opcionesServicios = {
  pagos: [
    { value: "memoria", label: "De memoria / verbal" },
    { value: "papel", label: "Papel / libreta" },
    { value: "excel", label: "Excel / Sheets" },
    { value: "sistema", label: "Sistema / software" },
  ],
  agenda: [
    { value: "no", label: "No hay agenda" },
    { value: "manual", label: "Manual (agenda, calls)" },
    { value: "auto", label: "Sistema automático" },
  ],
  seguimiento: [
    { value: "no", label: "No hacemos seguimiento" },
    { value: "aveces", label: "A veces, sin sistema" },
    { value: "siempre", label: "Siempre, con sistema" },
  ],
};

const opcionesEcommerce = {
  inventario: [
    { value: "memoria", label: "De memoria" },
    { value: "papel", label: "Papel / libreta" },
    { value: "excel", label: "Excel / Sheets" },
    { value: "sistema", label: "Sistema / software" },
  ],
  "gestion-pedidos": [
    { value: "manual", label: "Manual (WhatsApp, papel)" },
    { value: "parcial", label: "Parcialmente automatizado" },
    { value: "sistema", label: "Sistema completo" },
  ],
  envios: [
    { value: "recoleccion", label: "Solo recolección" },
    { value: "local", label: "Envíos locales" },
    { value: "nacional", label: "Envíos nacionales" },
  ],
};

const opcionesMenu = {
  pagos: [
    { value: "memoria", label: "De memoria / verbal" },
    { value: "papel", label: "Papel / comanda" },
    { value: "excel", label: "Excel / app simple" },
    { value: "sistema", label: "Sistema / POS" },
  ],
  reactivacion: [
    { value: "no", label: "No reactivamos clientes" },
    { value: "manual", label: "Manual (llamadas, WhatsApp)" },
    { value: "auto", label: "Sistema automático" },
  ],
};

export default function PasoOperacion({ respuestas, flow, onChange }) {
  if (!flow) return null;

  if (flow === "servicios") {
    return (
      <PasoBase titulo="Operación — Interna">
        <Grupo
          label="¿Cómo registran los pagos de clientes?"
          campo="pagos"
          opciones={opcionesServicios.pagos}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cómo gestionan las citas o agenda?"
          campo="agenda"
          opciones={opcionesServicios.agenda}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Hacen seguimiento a prospectos que no cerraron?"
          campo="seguimiento"
          opciones={opcionesServicios.seguimiento}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  if (flow === "ecommerce") {
    return (
      <PasoBase titulo="Operación — Interna">
        <Grupo
          label="¿Cómo controlan el inventario?"
          campo="inventario"
          opciones={opcionesEcommerce.inventario}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cómo gestionan los pedidos actualmente?"
          campo="gestion-pedidos"
          opciones={opcionesEcommerce["gestion-pedidos"]}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Cómo hacen los envíos?"
          campo="envios"
          opciones={opcionesEcommerce.envios}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  if (flow === "menu") {
    return (
      <PasoBase titulo="Operación — Interna">
        <Grupo
          label="¿Cómo registran los pagos?"
          campo="pagos"
          opciones={opcionesMenu.pagos}
          respuestas={respuestas}
          onChange={onChange}
        />
        <Grupo
          label="¿Reactivan clientes que no han vuelto?"
          campo="reactivacion"
          opciones={opcionesMenu.reactivacion}
          respuestas={respuestas}
          onChange={onChange}
        />
      </PasoBase>
    );
  }

  return null;
}

function PasoBase({ titulo, children }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 4 · Operación
        </span>
        <h1 className="font-anton text-4xl text-white uppercase tracking-tight leading-tight">
          {titulo.split("—")[0]}
          <br />
          <span className="text-green">{titulo.split("—")[1]?.trim()}</span>
        </h1>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Grupo({ label, campo, opciones, respuestas, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono text-gray uppercase tracking-widest">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {opciones.map((op) => (
          <button
            key={op.value}
            onClick={() => onChange(campo, op.value)}
            className={`px-3 py-2.5 border text-xs font-bold uppercase tracking-wide text-left transition-all duration-150 ${
              respuestas[campo] === op.value
                ? "border-green bg-green/10 text-green"
                : "border-white/10 hover:border-white/30 text-white/70"
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}
