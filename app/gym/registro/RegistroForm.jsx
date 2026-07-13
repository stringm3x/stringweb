"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import { solicitudSchema } from "../../lib/validations/solicitud-schema";
import { TurnstileWidget } from "../components/TurnstileWidget";

const ENDPOINT = "https://app.gym.stringwebs.com/api/solicitudes";

// El value es el id interno del plan (lo valida el SaaS): se mantiene "basico"
// aunque se muestre como "Starter".
const PLAN_OPTIONS = [
  { value: "basico", label: "Starter — $799/mes" },
  { value: "pro", label: "Pro — $1,799/mes" },
  { value: "escala", label: "Escala — $2,999/mes" },
];

const MIEMBROS_OPTIONS = [
  { value: "", label: "Prefiero no decir" },
  { value: "25", label: "Menos de 50" },
  { value: "100", label: "50 a 150" },
  { value: "300", label: "150 a 500" },
  { value: "500", label: "Más de 500" },
];

const inputClass = (error) =>
  `w-full px-4 py-3 bg-white/5 border text-white text-sm placeholder:text-white/20 transition-colors duration-200 focus:outline-none focus:border-green ${
    error ? "border-red/60" : "border-white/10 hover:border-white/20"
  }`;

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2350ff05' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.75rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.25em 1.25em",
};

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-mono text-gray uppercase tracking-widest"
    >
      {children} {required && <span className="text-green">*</span>}
    </label>
  );
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <p className="text-xs text-red flex items-center gap-1.5 font-mono">
      <span>↳</span>
      {children}
    </p>
  );
}

export function RegistroForm({ initialPlan = "" }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(solicitudSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      nombre_gym: "",
      plan_interes: initialPlan || "",
      ciudad: "",
      miembros_aprox: "",
      como_entero: "",
    },
  });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Completa la verificación de seguridad.");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        nombre_gym: data.nombre_gym,
        plan_interes: data.plan_interes,
        ciudad: data.ciudad || undefined,
        miembros_aprox: data.miembros_aprox
          ? Number(data.miembros_aprox)
          : undefined,
        como_entero: data.como_entero || undefined,
        turnstile_token: token,
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.error || "No se pudo enviar tu solicitud.");
      }

      router.push("/gym/gracias");
    } catch (err) {
      toast.error(err.message || "Error al enviar. Intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-white/10 bg-white/[0.02] p-8 md:p-10"
      noValidate
    >
      {/* Nombre + Email */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="nombre" required>
            Nombre completo
          </Label>
          <input
            id="nombre"
            type="text"
            placeholder="Juan Pérez"
            className={inputClass(errors.nombre)}
            {...register("nombre")}
          />
          <ErrorText>{errors.nombre?.message}</ErrorText>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" required>
            Email
          </Label>
          <input
            id="email"
            type="email"
            placeholder="juan@email.com"
            className={inputClass(errors.email)}
            {...register("email")}
          />
          <ErrorText>{errors.email?.message}</ErrorText>
        </div>
      </div>

      {/* Teléfono + Nombre gym */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="telefono" required>
            Teléfono
          </Label>
          <input
            id="telefono"
            type="tel"
            placeholder="+52 55 0000 0000"
            className={inputClass(errors.telefono)}
            {...register("telefono")}
          />
          <ErrorText>{errors.telefono?.message}</ErrorText>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nombre_gym" required>
            Nombre del gimnasio
          </Label>
          <input
            id="nombre_gym"
            type="text"
            placeholder="Iron Gym"
            className={inputClass(errors.nombre_gym)}
            {...register("nombre_gym")}
          />
          <ErrorText>{errors.nombre_gym?.message}</ErrorText>
        </div>
      </div>

      {/* Plan + Ciudad */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="plan_interes" required>
            Plan de interés
          </Label>
          <select
            id="plan_interes"
            className={`${inputClass(errors.plan_interes)} appearance-none cursor-pointer`}
            style={selectStyle}
            {...register("plan_interes")}
          >
            <option value="" className="bg-black text-white/50">
              Selecciona un plan
            </option>
            {PLAN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-black text-white">
                {o.label}
              </option>
            ))}
          </select>
          <ErrorText>{errors.plan_interes?.message}</ErrorText>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ciudad">Ciudad</Label>
          <input
            id="ciudad"
            type="text"
            placeholder="Ciudad de México"
            className={inputClass(errors.ciudad)}
            {...register("ciudad")}
          />
          <ErrorText>{errors.ciudad?.message}</ErrorText>
        </div>
      </div>

      {/* Miembros aprox */}
      <div className="space-y-1.5">
        <Label htmlFor="miembros_aprox">¿Cuántos miembros tienes?</Label>
        <select
          id="miembros_aprox"
          className={`${inputClass(errors.miembros_aprox)} appearance-none cursor-pointer`}
          style={selectStyle}
          {...register("miembros_aprox")}
        >
          {MIEMBROS_OPTIONS.map((o) => (
            <option key={o.label} value={o.value} className="bg-black text-white">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cómo se enteró */}
      <div className="space-y-1.5">
        <Label htmlFor="como_entero">¿Cómo te enteraste de STRING GYM?</Label>
        <input
          id="como_entero"
          type="text"
          placeholder="Instagram, un amigo, Google..."
          className={inputClass(errors.como_entero)}
          {...register("como_entero")}
        />
      </div>

      {/* Turnstile */}
      <div className="pt-2">
        <TurnstileWidget onVerify={setToken} onExpire={() => setToken("")} />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden rounded-sm bg-green px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Empezar mi prueba gratuita
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
        <p className="mt-4 text-center font-mono text-xs text-gray">
          Sin tarjeta de crédito · Te contactamos en menos de 24 horas
        </p>
      </div>
    </form>
  );
}
