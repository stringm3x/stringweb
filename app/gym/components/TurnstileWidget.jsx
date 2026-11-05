"use client";

import { useEffect, useRef } from "react";
import { tokenSinClave } from "@/app/lib/turnstile-cliente";

// Widget de Cloudflare Turnstile (render explícito). Llama a onVerify(token)
// cuando el usuario pasa el reto y a onExpire() al expirar/fallar.
export function TurnstileWidget({ onVerify, onExpire }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      // Sin clave: token de prueba solo en desarrollo (app/lib/turnstile-cliente.js).
      const token = tokenSinClave();
      if (token) onVerifyRef.current?.(token);
      else console.error("Falta NEXT_PUBLIC_TURNSTILE_SITE_KEY: el formulario no se puede enviar.");
      return;
    }

    let cancelled = false;

    const render = () => {
      if (
        cancelled ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current !== null
      ) {
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token) => onVerifyRef.current?.(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onExpireRef.current?.(),
      });
    };

    if (!document.querySelector("script[data-turnstile]")) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-turnstile", "true");
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        render();
      }
    }, 200);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
