"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle } from "react-icons/fi";
import { diagnosticoSchema } from "@/app/lib/validations/diagnostico-schema";
import { GIROS, OTRA_COSA, SITUACIONES } from "@/app/lib/diagnostico";
import { whatsappUrl } from "@/app/lib/contacto";
import { TurnstileWidget } from "@/app/gym/components/TurnstileWidget";
import { Boton } from "@/app/components/ui/Boton";
import { ENLACE } from "@/app/components/salas/estilos";

// Formulario de diagnóstico (docs/textos.md § Formulario de diagnóstico):
// cuatro preguntas, mensajes de error de § Mensajes de error y el aviso de
// privacidad corto debajo del botón. Sin animaciones: nada se mueve.
const ERROR_ENVIO = "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.";

const CAMPO =
  "w-full rounded-lg border bg-fondo px-4 py-3 text-cuerpo text-texto placeholder:text-texto-suave/70 hover:border-texto";

function borde(error) {
  return error ? "border-texto" : "border-texto-suave";
}

function Error({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="flex items-center gap-2 text-pequeno text-texto">
      <FiAlertCircle aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-acento" />
      {children}
    </p>
  );
}

// Grupo de opciones en píldora: un radio por opción, foco en la píldora.
function Opciones({ nombre, legenda, opciones, register, error }) {
  const errorId = `${nombre}-error`;
  return (
    <fieldset
      className="flex flex-col gap-space-3"
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="mb-space-3 text-cuerpo font-semibold text-texto">{legenda}</legend>
      <div className="flex flex-wrap gap-space-2">
        {opciones.map((opcion) => (
          <label
            key={opcion}
            className={`flex min-h-[44px] cursor-pointer items-center rounded-pill border px-[18px] py-2 text-cuerpo text-texto hover:border-texto has-[:checked]:border-acento has-[:checked]:bg-acento has-[:checked]:text-sobre-acento has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-[rgb(var(--foco))] ${borde(error)}`}
          >
            <input type="radio" value={opcion} {...register(nombre)} className="sr-only" />
            {opcion}
          </label>
        ))}
      </div>
      <Error id={errorId}>{error}</Error>
    </fieldset>
  );
}

// Confirmación (docs/textos.md): el foco pasa al mensaje para que se anuncie.
function Confirmacion() {
  const ref = useRef(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div role="status" className="flex flex-col items-start gap-space-4">
      <p ref={ref} tabIndex={-1} className="scroll-mt-32 text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-texto">
        Listo. Te respondemos en un día hábil.
      </p>
      <Boton href={whatsappUrl()} variante="secundario">
        Escríbenos por WhatsApp
      </Boton>
    </div>
  );
}

export function FormularioDiagnostico() {
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [token, setToken] = useState(null);
  // Cada token de Turnstile sirve una sola vez: si el envío falla, el widget
  // se vuelve a montar para dar otro.
  const [intento, setIntento] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(diagnosticoSchema),
    shouldFocusError: true,
    defaultValues: { nombre: "", whatsapp: "", giro: undefined, situacion: undefined, otraCosa: "" },
  });

  const esOtraCosa = watch("situacion") === OTRA_COSA;

  const enviar = async (datos) => {
    setErrorEnvio(null);
    try {
      const respuesta = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, turnstileToken: token }),
      });
      const resultado = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok) throw new Error(resultado.message || ERROR_ENVIO);
      setEnviado(true);
    } catch (error) {
      setErrorEnvio(error.message || ERROR_ENVIO);
      setToken(null);
      setIntento((n) => n + 1);
    }
  };

  if (enviado) return <Confirmacion />;

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-space-5">
      <div className="flex flex-col gap-space-2">
        <label htmlFor="nombre" className="text-cuerpo font-semibold text-texto">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          {...register("nombre")}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "nombre-error" : undefined}
          className={`${CAMPO} ${borde(errors.nombre)}`}
        />
        <Error id="nombre-error">{errors.nombre?.message}</Error>
      </div>

      <div className="flex flex-col gap-space-2">
        <label htmlFor="whatsapp" className="text-cuerpo font-semibold text-texto">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          {...register("whatsapp")}
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
          className={`${CAMPO} font-mono ${borde(errors.whatsapp)}`}
        />
        <Error id="whatsapp-error">{errors.whatsapp?.message}</Error>
      </div>

      <Opciones
        nombre="giro"
        legenda="Giro de tu negocio"
        opciones={GIROS}
        register={register}
        error={errors.giro?.message}
      />

      <Opciones
        nombre="situacion"
        legenda="¿Qué te pasa hoy?"
        opciones={SITUACIONES}
        register={register}
        error={errors.situacion?.message}
      />

      {esOtraCosa && (
        <div className="flex flex-col gap-space-2">
          <label htmlFor="otraCosa" className="text-cuerpo font-semibold text-texto">
            Otra cosa
          </label>
          <textarea
            id="otraCosa"
            rows={4}
            {...register("otraCosa")}
            aria-invalid={!!errors.otraCosa}
            aria-describedby={errors.otraCosa ? "otraCosa-error" : undefined}
            className={`${CAMPO} resize-y ${borde(errors.otraCosa)}`}
          />
          <Error id="otraCosa-error">{errors.otraCosa?.message}</Error>
        </div>
      )}

      <div className="flex flex-col gap-space-3">
        <TurnstileWidget key={intento} onVerify={setToken} onExpire={() => setToken(null)} />
        <Boton type="submit" variante="primario" disabled={isSubmitting || !token} className="w-full sm:w-auto sm:self-start">
          Enviar
        </Boton>
        <div role="alert">
          <Error id="envio-error">{errorEnvio}</Error>
        </div>
        <p className="text-pequeno text-texto-suave">
          Carlos Avilés (STRING) usa tu nombre, tu WhatsApp, el giro de tu negocio y lo que nos
          cuentas solo para responder tu solicitud, darte el diagnóstico y, si lo pides, una
          propuesta. No vendemos ni compartimos tus datos. Lee el{" "}
          <Link href="/aviso-de-privacidad" className={`underline ${ENLACE}`}>
            aviso de privacidad completo
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
