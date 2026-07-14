"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function WaitlistForm({ producto }) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("idle"); // idle | enviando | enviado | error

  const enviar = async (e) => {
    e.preventDefault();
    if (!email.trim() || estado === "enviando") return;

    setEstado("enviando");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ producto, email: email.trim() }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  };

  if (estado === "enviado") {
    return (
      <p className="flex items-center gap-1.5 text-[10px] font-mono text-green uppercase tracking-widest pt-1">
        <FiCheck className="text-xs" />
        Te avisamos cuando esté listo
      </p>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-1 pt-1">
      <div className="flex gap-1.5">
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
          disabled={estado === "enviando"}
          className="px-3 py-1.5 border border-white/20 text-white/70 text-[10px] font-mono uppercase tracking-wider hover:border-green hover:text-green transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
        >
          {estado === "enviando" ? "..." : "Avisarme"}
        </button>
      </div>
      {estado === "error" && (
        <p className="text-[10px] font-mono text-red uppercase tracking-widest">
          Error al enviar, intenta de nuevo
        </p>
      )}
    </form>
  );
}
