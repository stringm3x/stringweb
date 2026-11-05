import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";
import { Diagnostico } from "./Diagnostico";

// La herramienta de las llamadas con prospectos (lote 20). No guarda datos:
// todo vive en el estado del componente (docs/textos.md § Interno).
export const metadata = { title: "Diagnóstico" };

export default async function DiagnosticoInternoPage() {
  await exigirCarlos();
  return <Diagnostico />;
}
