// Este archivo va en: app/onboarding/not-found.jsx
import { FiLock } from "react-icons/fi";

export default function OnboardingNotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto">
          <FiLock className="text-2xl text-white/60" />
        </div>
        <p className="text-white font-bold text-xl leading-tight">
          Esta página no está disponible.
        </p>
        <p className="text-white/40 text-sm leading-relaxed">
          Contacta a tu equipo STRING para obtener el link correcto de tu
          proyecto.
        </p>
        <a
          href="https://wa.me/525545524847"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#50ff05] text-black font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors duration-200"
        >
          Contactar a STRING →
        </a>
      </div>
    </div>
  );
}
