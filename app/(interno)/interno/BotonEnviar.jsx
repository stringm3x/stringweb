"use client";

import { useFormStatus } from "react-dom";
import { Boton } from "@/app/components/ui/Boton";

// El botón principal de los formularios de /interno: ancho completo y, mientras
// la acción corre, el estado "cargando" del Boton (docs/calidad.md § 3). Es el
// único JS de cliente de /interno; sin JS el formulario se envía igual.
export function BotonEnviar({ children }) {
  const { pending } = useFormStatus();
  return (
    <Boton type="submit" estado={pending ? "cargando" : "reposo"} className="w-full">
      {children}
    </Boton>
  );
}
