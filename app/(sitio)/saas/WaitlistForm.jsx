"use client";

import { useState } from "react";

const STORAGE_KEY = "string_saas_waitlist";

export default function WaitlistForm({ producto }) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const guardar = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existentes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existentes.push({
        producto,
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existentes));
      setEnviado(true);
    } catch {
      setEnviado(true);
    }
  };

  if (enviado) {
    return (
      <p className="text-[10px] font-mono text-green uppercase tracking-widest pt-1">
        ✓ Te avisamos cuando esté listo
      </p>
    );
  }

  return (
    <form onSubmit={guardar} className="flex gap-1.5 pt-1">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="min-w-0 flex-1 px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-green transition-colors duration-200"
      />
      <button
        type="submit"
        className="px-3 py-1.5 border border-white/20 text-white/70 text-[10px] font-mono uppercase tracking-wider hover:border-green hover:text-green transition-colors duration-200 whitespace-nowrap"
      >
        Avisarme
      </button>
    </form>
  );
}
