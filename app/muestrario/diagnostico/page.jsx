import { notFound } from "next/navigation";
import { GUION } from "@/app/lib/interno/llamada/guion";
import { NICHOS } from "@/app/lib/interno/llamada/nichos";
import { Banco } from "./Banco";

// Banco de pruebas de /interno/diagnostico (lote 20), solo en desarrollo:
// monta el mismo componente sin exigirCarlos() para las pruebas en navegador
// y las capturas. En producción da 404, no se indexa y no va en el sitemap.
// Lote 25: el guion y las fichas llegan como props, igual que en /interno.
export const metadata = {
  title: "Muestrario · Diagnóstico",
  robots: { index: false, follow: false },
};

export default function MuestrarioDiagnostico() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Banco contenido={{ guion: GUION, nichos: NICHOS }} />;
}
