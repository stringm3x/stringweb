"use client";

// Slide 1 — Hero
export default function GymHero() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-black">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />
      {/* Glow verde */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Línea superior */}
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green-400/40" />

      <div className="relative z-10 max-w-5xl mx-auto px-12 lg:px-20">
        {/* Tag */}
        <div className="slide-tag mb-8">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green/30 text-green text-xs font-mono uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            STRING para Gimnasios
          </span>
        </div>

        {/* Headline */}
        <h1
          className="slide-heading font-black text-white uppercase leading-[0.88] tracking-tighter mb-8"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
        >
          Cada día que tu gimnasio
          <br />
          opera sin sistema, hay
          <br />
          <span className="text-green">dinero que se va</span>
          <br />
          sin que nadie lo vea.
        </h1>

        {/* Subheadline */}
        <p className="slide-sub text-gray text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
          Prospectos que preguntan por Instagram y nunca reciben respuesta.
          Pagos registrados en papel. Miembros que vencen sin seguimiento.{" "}
          <span className="text-white/70">
            No es culpa del equipo — es falta de estructura.
          </span>
        </p>

        {/* CTA */}
        <button
          className="slide-cta group inline-flex items-center gap-2 px-8 py-4 bg-green text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          Quiero ver cómo funciona
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

      {/* Número decorativo */}
      <div
        className="absolute right-12 bottom-12 font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontSize: "20vw" }}
      >
        01
      </div>
    </div>
  );
}
