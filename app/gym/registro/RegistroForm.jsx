"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle } from "react-icons/fi";
import { solicitudSchema } from "../../lib/validations/solicitud-schema";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { BotonBoaz } from "@/app/components/boaz/BotonBoaz";
import { CampoBoaz } from "@/app/components/boaz/CampoBoaz";
import { BOAZ, IVA } from "@/app/lib/precios";

const ENDPOINT = "https://app.gym.stringwebs.com/api/solicitudes";

// El value es el id interno del plan (lo valida el SaaS): se mantiene "basico"
// aunque se muestre como "Starter". Escala sale del selector (lote 9b).
const PLAN_OPTIONS = [
  { value: "basico", label: `Starter · ${BOAZ.starter.mes} al mes` },
  { value: "pro", label: `Pro · ${BOAZ.pro.mes} al mes (recomendado)` },
];

const MIEMBROS_OPTIONS = [
  { value: "", label: "Prefiero no decir" },
  { value: "25", label: "Menos de 50" },
  { value: "100", label: "50 a 150" },
  { value: "300", label: "150 a 500" },
  { value: "500", label: "Más de 500" },
];

// Textos de docs/textos.md § "Boaz · lote 9b". "Completa la verificación de
// seguridad." es el aviso que ya existía cuando falta Turnstile.
const ERROR_ENVIO =
  "No pudimos registrar tu gimnasio. Revisa tu conexión e intenta de nuevo; lo que escribiste se queda.";
const SIN_VERIFICACION = "Completa la verificación de seguridad.";

const ENLACE = "font-semibold text-acento underline-offset-4 hover:text-acento-presionado hover:underline";

export function RegistroForm({ initialPlan = "" }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [aviso, setAviso] = useState("");

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
      plan_interes: initialPlan || "pro",
      ciudad: "",
      miembros_aprox: "",
      como_entero: "",
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    if (!token) {
      setAviso(SIN_VERIFICACION);
      return;
    }

    setAviso("");
    setIsSubmitting(true);
    try {
      const body = {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        nombre_gym: data.nombre_gym,
        plan_interes: data.plan_interes,
        ciudad: data.ciudad || undefined,
        miembros_aprox: data.miembros_aprox ? Number(data.miembros_aprox) : undefined,
        como_entero: data.como_entero || undefined,
        turnstile_token: token,
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();

      router.push("/gym/gracias");
    } catch {
      // Lo que escribieron se queda: el formulario no se limpia.
      setAviso(ERROR_ENVIO);
      setIsSubmitting(false);
    }
  };

  const campo = (name) => ({ register: register(name), error: errors[name]?.message });

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="registro-t1" className="flex max-w-[560px] flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <CampoBoaz id="nombre" etiqueta="Tu nombre" placeholder="Ana Ruiz" autoComplete="name" {...campo("nombre")} />
        <CampoBoaz
          id="email"
          etiqueta="Correo"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          {...campo("email")}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <CampoBoaz
          id="telefono"
          etiqueta="WhatsApp"
          type="tel"
          inputMode="tel"
          placeholder="55 1234 5678"
          autoComplete="tel"
          mono
          {...campo("telefono")}
        />
        <CampoBoaz id="nombre_gym" etiqueta="Nombre de tu gimnasio" autoComplete="organization" {...campo("nombre_gym")} />
      </div>
      <CampoBoaz
        id="plan_interes"
        etiqueta="¿Qué plan te interesa?"
        opciones={PLAN_OPTIONS}
        ayuda={
          <>
            La prueba es con Pro completo.
            <span className="block">Precios con {IVA}.</span>
          </>
        }
        {...campo("plan_interes")}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <CampoBoaz id="ciudad" etiqueta="Ciudad" autoComplete="address-level2" {...campo("ciudad")} />
        <CampoBoaz
          id="miembros_aprox"
          etiqueta="¿Cuántos socios tienes hoy?"
          opciones={MIEMBROS_OPTIONS}
          {...campo("miembros_aprox")}
        />
      </div>
      <CampoBoaz id="como_entero" etiqueta="¿Cómo supiste de Boaz?" opcional="(opcional)" {...campo("como_entero")} />

      <TurnstileWidget onVerify={setToken} onExpire={() => setToken("")} />

      {aviso && (
        <p role="alert" className="flex items-start gap-2.5 border-t border-alerta pt-3 text-[14px] text-alerta">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {aviso}
        </p>
      )}

      <div>
        <BotonBoaz type="submit" estado={isSubmitting ? "cargando" : "reposo"} textoCargando="Registrando">
          Registrar mi gimnasio
        </BotonBoaz>
      </div>
      <p className="text-[13px] text-texto-suave">
        Al enviar aceptas nuestro{" "}
        <Link href="/aviso-de-privacidad" className={ENLACE}>
          aviso de privacidad
        </Link>
        .
      </p>
      <p className="text-[15px] text-texto-suave">
        ¿Tienes dudas?{" "}
        <Link href="/boaz#planes" className={ENLACE}>
          Ver planes
        </Link>
      </p>
    </form>
  );
}
