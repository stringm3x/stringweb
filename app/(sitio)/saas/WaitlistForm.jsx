"use client";

import { useState } from "react";
import { FiCheck, FiAlertCircle } from "react-icons/fi";
import { Boton } from "@/app/components/ui/Boton";

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
      <p className="flex items-center gap-2 font-mono uppercase text-etiqueta text-acido">
        <FiCheck aria-hidden="true" />
        Te avisamos cuando esté listo
      </p>
    );
  }

  const inputId = `waitlist-${producto}`;
  const errorId = `${inputId}-error`;

  return (
    <form onSubmit={enviar} className="space-y-3" noValidate>
      <label htmlFor={inputId} className="sr-only">
        Correo electrónico
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        aria-invalid={estado === "error"}
        aria-describedby={estado === "error" ? errorId : undefined}
        className={`w-full rounded border-2 bg-fondo px-4 py-3 text-cuerpo-s text-tinta placeholder:text-tinta-tenue transition-colors duration-200 focus:border-acido focus:outline-none ${
          estado === "error" ? "border-tinta" : "border-linea hover:border-tinta-tenue"
        }`}
      />
      <Boton
        type="submit"
        variante="secundario"
        disabled={estado === "enviando"}
        className="w-full"
      >
        {estado === "enviando" ? "Enviando…" : "Avisarme"}
      </Boton>
      {estado === "error" && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 font-mono text-cuerpo-s text-tinta"
        >
          <FiAlertCircle className="h-3 w-3 flex-shrink-0" />
          Error al enviar, intenta de nuevo
        </p>
      )}
    </form>
  );
}
