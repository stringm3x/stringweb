"use client";

import { useEffect } from "react";

// Wake Lock (lote 20): la pantalla no se apaga mientras la herramienta está
// abierta. El navegador suelta el candado al ocultar la pestaña; se vuelve a
// pedir al regresar. Sin soporte o si lo niega, no pasa nada.
export function usePantallaEncendida() {
  useEffect(() => {
    let candado = null;
    let vivo = true;

    async function pedir() {
      if (!("wakeLock" in navigator) || document.visibilityState !== "visible") return;
      try {
        const nuevo = await navigator.wakeLock.request("screen");
        if (vivo) candado = nuevo;
        else nuevo.release().catch(() => {});
      } catch {
        // Sin permiso o sin batería: la herramienta sigue igual.
      }
    }

    const alVolver = () => {
      if (document.visibilityState === "visible") pedir();
    };

    pedir();
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      vivo = false;
      document.removeEventListener("visibilitychange", alVolver);
      candado?.release().catch(() => {});
    };
  }, []);
}
