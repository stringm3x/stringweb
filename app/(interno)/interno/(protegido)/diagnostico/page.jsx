import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";
import { GUION } from "@/app/lib/interno/llamada/guion";
import { BOCETO, EMPRESA_MINIMO } from "@/app/lib/interno/precios-interno";
import { NICHOS } from "@/app/lib/interno/llamada/nichos";
import { Llamada } from "./llamada/Llamada";

// La herramienta de las llamadas con prospectos (lote 20; nichos nuevos desde
// el lote 25). No guarda nada en el servidor: las notas viven solo en la
// pestaña (useLlamada.js). El guion y las fichas se leen aquí, en el
// servidor y después de exigirCarlos(), y llegan como props: no van en
// ningún archivo estático de JS.
export const metadata = { title: "Diagnóstico" };

export default async function DiagnosticoInternoPage() {
  await exigirCarlos();
  return <Llamada contenido={{ guion: GUION, nichos: NICHOS, empresa: { boceto: BOCETO.empresaDesde, minimo: EMPRESA_MINIMO } }} />;
}
