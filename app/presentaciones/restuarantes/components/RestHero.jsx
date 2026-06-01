"use client";

export default function RestHero() {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/88" />
      {/* Textura sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-gold/40" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-24">
        <div className="slide-tag mb-8">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-gold/30 text-gold text-xs font-mono uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            STRING · Sistema Mesa
          </span>
        </div>

        <h1
          className="slide-heading font-black text-white uppercase leading-[0.88] tracking-tighter mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          Sistema Mesa —
          <br />
          el sistema digital
          <br />
          que <span className="text-green">llena tu restaurante</span>
        </h1>

        <p className="slide-sub text-white/50 text-base sm:text-lg leading-relaxed max-w-xl mb-3">
          <span className="text-gold">Reservaciones automáticas</span> · Base de
          clientes · Reactivación sin esfuerzo
        </p>

        <p className="slide-sub text-white/40 text-sm leading-relaxed max-w-xl mb-10">
          Un sistema que trabaja por tu restaurante mientras tú cocinas,
          atiendes y cierras mesas.
        </p>

        <button
          className="slide-cta group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Ver el sistema
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path
              d="M1 5h14M10 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute right-6 bottom-8 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
      >
        01
      </div>
    </div>
  );
}
