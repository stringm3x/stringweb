"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { diagnosticoSchema } from "@/app/lib/validations/diagnostico-schema";
import { GIROS, OTRA_COSA, SITUACIONES } from "@/app/lib/diagnostico";
import { whatsappUrl } from "@/app/lib/contacto";
import { TurnstileWidget } from "@/app/gym/components/TurnstileWidget";
import { Boton } from "@/app/components/ui/Boton";
import { Campo, MensajeError } from "@/app/components/ui/Campo";
import { Opciones } from "@/app/components/ui/Opciones";
import { ENLACE } from "@/app/components/salas/estilos";

// Formulario de diagnóstico (docs/textos.md § Formulario de diagnóstico):
// cuatro preguntas, mensajes de error de § Mensajes de error y el aviso de
// privacidad corto debajo del botón. Sin animaciones: nada se mueve.
const ERROR_ENVIO = "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.";

// El botón dice "Enviado" durante --dur-lento antes de la confirmación: así
// se ve que el envío llegó. Con menos movimiento, la confirmación sale ya.
function esperaDeExito() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  // El CSS puede llegar minificado (".6s" en vez de "600ms").
  const valor = getComputedStyle(document.documentElement).getPropertyValue("--dur-lento").trim();
  const numero = parseFloat(valor) || 0;
  return valor.endsWith("ms") ? numero : numero * 1000;
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
  const [exito, setExito] = useState(false);
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
      setExito(true);
      setTimeout(() => setEnviado(true), esperaDeExito());
    } catch (error) {
      setErrorEnvio(error.message || ERROR_ENVIO);
      setToken(null);
      setIntento((n) => n + 1);
    }
  };

  if (enviado) return <Confirmacion />;

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-space-5">
      <Campo
        id="nombre"
        etiqueta="Nombre"
        type="text"
        autoComplete="name"
        {...register("nombre")}
        error={errors.nombre?.message}
      />

      <Campo
        id="whatsapp"
        etiqueta="WhatsApp"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        {...register("whatsapp")}
        error={errors.whatsapp?.message}
        className="font-mono"
      />

      <Opciones
        nombre="giro"
        legenda="Giro de tu negocio"
        opciones={GIROS}
        registrar={register}
        error={errors.giro?.message}
      />

      <Opciones
        nombre="situacion"
        legenda="¿Qué te pasa hoy?"
        opciones={SITUACIONES}
        registrar={register}
        error={errors.situacion?.message}
      />

      {esOtraCosa && (
        <Campo
          id="otraCosa"
          etiqueta="Otra cosa"
          multilinea
          rows={4}
          {...register("otraCosa")}
          error={errors.otraCosa?.message}
        />
      )}

      <div className="flex flex-col gap-space-3">
        <TurnstileWidget key={intento} onVerify={setToken} onExpire={() => setToken(null)} />
        <Boton
          type="submit"
          variante="primario"
          estado={exito ? "exito" : isSubmitting ? "cargando" : errorEnvio ? "error" : "reposo"}
          disabled={!token && !isSubmitting && !exito}
          className="w-full sm:w-auto sm:self-start"
        >
          Enviar
        </Boton>
        <div role="alert">
          <MensajeError id="envio-error">{errorEnvio}</MensajeError>
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
