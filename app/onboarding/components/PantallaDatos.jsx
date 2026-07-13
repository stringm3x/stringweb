"use client";

import { SECTORES_ONBOARDING } from "../data/preguntas";

// app/onboarding/components/PantallaDatos.jsx
// Campos prellenados por STRING — solo lectura para el cliente

export default function PantallaDatos({ cliente }) {
  const sector = SECTORES_ONBOARDING.find((s) => s.id === cliente.sector);
  const SectorIcon = sector?.icon;

  const campos = [
    { label: "Nombre del negocio", value: cliente.nombre_negocio },
    {
      label: "Sector",
      value: sector ? sector.label : cliente.sector,
      icon: SectorIcon,
    },
    { label: "Sistema contratado", value: cliente.sistema_contratado },
    { label: "Nombre del contacto", value: cliente.nombre_contacto },
    { label: "WhatsApp del contacto", value: cliente.whatsapp_contacto },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-green uppercase tracking-[0.3em]">
          Paso 2 · Datos del negocio
        </span>
        <h2 className="font-black text-white text-3xl uppercase leading-tight tracking-tight">
          Confirma tus datos
        </h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Estos datos fueron registrados por STRING. Si hay algún error, avísale
          a tu asesor antes de continuar.
        </p>
      </div>

      <div className="space-y-px">
        {campos.map((campo) => (
          <div
            key={campo.label}
            className="grid grid-cols-[140px_1fr] gap-4 px-4 py-4 bg-white/[0.02] border-l-2 border-white/5"
          >
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider leading-relaxed pt-0.5">
              {campo.label}
            </p>
            <p className="text-white text-sm font-medium leading-relaxed flex items-center gap-1.5">
              {campo.icon && <campo.icon className="text-green" />}
              {campo.value}
            </p>
          </div>
        ))}
      </div>

      <div className="border border-white/5 bg-white/[0.02] p-4">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">
          Nota
        </p>
        <p className="text-white/30 text-xs leading-relaxed">
          Estos campos son de solo lectura. Si necesitas corregir algún dato,
          avísale a tu asesor STRING antes de continuar.
        </p>
      </div>
    </div>
  );
}
