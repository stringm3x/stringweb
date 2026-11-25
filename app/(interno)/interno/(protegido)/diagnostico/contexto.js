"use client";

import { createContext, useContext } from "react";

// El contenido y las ofertas de la herramienta del lote 20 (lote 25): llegan
// por props desde el servidor y las piezas los leen de aquí. Así ningún
// componente de cliente importa contenido.js ni precios-interno.js.
export const ContextoDiagnostico = createContext(null);
export const useDiagnostico = () => useContext(ContextoDiagnostico);
