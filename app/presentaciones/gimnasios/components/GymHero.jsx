"use client";

// Slide 1 — Hero
// Imagen: Unsplash gym atmosphere, oscurecida con overlay
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
      <div className="absolute inset-0 bg-black/80" />
      {/* Glow verde */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Línea superior */}
      <div className="slide-line absolute top-0 left-0 right-0 h-px bg-green-400/40" />

      <div className="relative z-10 max-w-5xl mx-auto px-12 lg:px-20">
        {/* Tag */}
        <div className="slide-tag mb-8">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-green-400/30 text-green-400 text-xs font-mono uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            STRING para Gimnasios
          </span>
        </div>

        {/* Headline */}
        <h1
          className="slide-heading font-black text-white uppercase leading-[0.88] tracking-tighter mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          Tu gimnasio <span className="text-green-400">llena clases.</span>
          <br />
          Pero pierde prospectos
          <br />
          todos los días.
        </h1>

        {/* Sub */}
        <p className="slide-sub text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
          Un sistema que capta, organiza y da seguimiento a cada persona que
          pregunta — aunque tú estés entrenando.
        </p>

        {/* CTA */}
        <a
          href="#cta"
          className="slide-cta group inline-flex items-center gap-2 px-8 py-4 bg-green-400 text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          Quiero mi diagnóstico gratuito
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
        </a>
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
