import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";

// La herramienta de las llamadas con prospectos. En el lote 16 solo el
// título: no guarda datos (docs/textos.md § Interno).
export const metadata = { title: "Diagnóstico" };

export default async function DiagnosticoInternoPage() {
  await exigirCarlos();
  return <h1 className="text-subtitulo">Diagnóstico</h1>;
}
