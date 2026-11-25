"use client";

import { useCallback, useEffect, useState } from "react";

// Las notas de la llamada (lote 25, ajuste A). Viven solo en esta pestaña,
// en sessionStorage, para que una recarga accidental no las borre. Nada en el
// almacenamiento que dura, en cookies ni en el servidor. Se borran al tocar "Terminar
// llamada" (con confirmación), al salir de /interno y al cerrar la pestaña.
// Es el ÚNICO archivo de /interno que toca sessionStorage
// (sin-guardar.test.js lo revisa).

const CLAVE = "interno-llamada";

export const LLAMADA_VACIA = {
  pantalla: "inicio", // "inicio" | "llamada"
  tramo: 0,
  nicho: "",
  negocio: "",
  dueno: "",
  tipo: "", // "sin" | "uno" | "varios"
  inicio: null, // cuándo empezó la llamada (ms), para el reloj
  notas: {}, // { [id de la pregunta]: lo que dijo, tal cual }
};

export function hayDatosLlamada(l) {
  return (
    !!l.nicho ||
    !!l.negocio.trim() ||
    !!l.dueno.trim() ||
    !!l.tipo ||
    Object.values(l.notas).some((v) => String(v ?? "").trim())
  );
}

function leer() {
  try {
    const texto = window.sessionStorage.getItem(CLAVE);
    if (!texto) return null;
    const datos = JSON.parse(texto);
    return datos && typeof datos === "object" ? { ...LLAMADA_VACIA, ...datos } : null;
  } catch {
    return null;
  }
}

// También lo usa "Salir" de la barra de /interno.
export function borrarLlamada() {
  try {
    window.sessionStorage.removeItem(CLAVE);
  } catch {
    // Sin sessionStorage (modo privado estricto): no había nada guardado.
  }
}

export function useLlamada() {
  const [llamada, setLlamada] = useState(LLAMADA_VACIA);
  // Hasta leer la pestaña no se escribe nada (y no se pisa lo guardado).
  const [lista, setLista] = useState(false);

  useEffect(() => {
    const guardada = leer();
    if (guardada) setLlamada(guardada);
    setLista(true);
  }, []);

  useEffect(() => {
    if (!lista) return;
    try {
      if (hayDatosLlamada(llamada)) window.sessionStorage.setItem(CLAVE, JSON.stringify(llamada));
      else window.sessionStorage.removeItem(CLAVE);
    } catch {
      // Sin sessionStorage la herramienta sigue funcionando, solo en memoria.
    }
  }, [llamada, lista]);

  const cambiar = useCallback((parcial) => setLlamada((prev) => ({ ...prev, ...parcial })), []);

  const terminar = useCallback(() => {
    borrarLlamada();
    setLlamada(LLAMADA_VACIA);
  }, []);

  return { llamada, cambiar, terminar, lista };
}
