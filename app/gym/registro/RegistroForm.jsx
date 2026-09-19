"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { solicitudSchema } from "../../lib/validations/solicitud-schema";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { FormField } from "@/app/components/forms/FormField";
import { FormSelect } from "@/app/components/forms/FormSelect";
import { Boton } from "@/app/components/ui/Boton";

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
    if (isSubmitting) return;
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
      className="space-y-6 border-2 border-linea bg-fondo-elevado p-8 md:p-10"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Nombre completo"
          name="nombre"
          register={register}
          error={errors.nombre?.message}
          placeholder="Juan Pérez"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="juan@email.com"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Teléfono"
          name="telefono"
          type="tel"
          register={register}
          error={errors.telefono?.message}
          placeholder="+52 55 0000 0000"
          required
        />
        <FormField
          label="Nombre del gimnasio"
          name="nombre_gym"
          register={register}
          error={errors.nombre_gym?.message}
          placeholder="Iron Gym"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormSelect
          label="Plan de interés"
          name="plan_interes"
          register={register}
          error={errors.plan_interes?.message}
          opciones={PLAN_OPTIONS}
          placeholder="Selecciona un plan"
          required
        />
        <FormField
          label="Ciudad"
          name="ciudad"
          register={register}
          error={errors.ciudad?.message}
          placeholder="Ciudad de México"
        />
      </div>

      <FormSelect
        label="¿Cuántos miembros tienes?"
        name="miembros_aprox"
        register={register}
        error={errors.miembros_aprox?.message}
        opciones={MIEMBROS_OPTIONS}
        placeholder={null}
      />

      <FormField
        label="¿Cómo te enteraste de STRING GYM?"
        name="como_entero"
        register={register}
        error={errors.como_entero?.message}
        placeholder="Instagram, un amigo, Google..."
      />

      <div className="pt-2">
        <TurnstileWidget onVerify={setToken} onExpire={() => setToken("")} />
      </div>

      <div className="pt-2">
        <Boton type="submit" variante="primario" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Enviando…" : "Empezar mi prueba gratuita"}
        </Boton>
        <p className="mt-4 text-center font-mono uppercase text-etiqueta text-tinta-tenue">
          Sin tarjeta de crédito · Te contactamos en menos de 24 horas
        </p>
      </div>
    </form>
  );
}
