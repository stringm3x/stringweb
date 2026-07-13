"use client";

// app/onboarding/components/PantallaConfirmacion.jsx
export default function PantallaConfirmacion({ cliente }) {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-lg">
        {/* Check */}
        <div className="w-20 h-20 bg-green flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Mensaje */}
        <div className="space-y-4">
          <h1 className="font-black text-white text-4xl uppercase leading-tight tracking-tight">
            ¡Listo!
          </h1>
          <p className="text-white font-bold text-xl">
            Tu mapa de procesos está aprobado.
          </p>
          <p className="text-white/50 text-base leading-relaxed">
            El equipo STRING arrancará el desarrollo de{" "}
            <span className="text-white font-semibold">
              {cliente.sistema_contratado}
            </span>{" "}
            para{" "}
            <span className="text-white font-semibold">
              {cliente.nombre_negocio}
            </span>{" "}
            en las próximas 24 horas.
          </p>
        </div>

        {/* Info adicional */}
        <div className="border border-green/20 bg-green/5 p-6 text-left space-y-3">
          <p className="text-[10px] font-mono text-green uppercase tracking-widest">
            ¿Qué sigue?
          </p>
          {[
            "Recibirás una copia del mapa de procesos por email.",
            "Tu asesor STRING te contactará en las próximas 24 horas.",
            "Puedes ver el avance de tu proyecto en tu dashboard de cliente.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-green font-mono text-xs mt-0.5">
                0{i + 1}
              </span>
              <p className="text-white/60 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/525545524847"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white/40 text-xs font-mono uppercase tracking-wider hover:border-white/30 hover:text-white transition-all duration-200"
        >
          ¿Tienes dudas? Escríbenos →
        </a>
      </div>
    </div>
  );
}
