"use client";

import { createContext, useContext, useState } from "react";

// Si la herramienta tiene datos capturados (lote 20). La barra de /interno
// lo lee para pedir confirmación antes de "Salir". Solo vive en memoria.
const Contexto = createContext({ hayDatos: false, setHayDatos: () => {} });

export function Captura({ children }) {
  const [hayDatos, setHayDatos] = useState(false);
  return <Contexto.Provider value={{ hayDatos, setHayDatos }}>{children}</Contexto.Provider>;
}

export const useCaptura = () => useContext(Contexto);
