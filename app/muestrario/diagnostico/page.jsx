import { notFound } from "next/navigation";
import { Banco } from "./Banco";

// Banco de pruebas de /interno/diagnostico (lote 20), solo en desarrollo:
// monta el mismo componente sin exigirCarlos() para las pruebas en navegador
// y las capturas. En producción da 404, no se indexa y no va en el sitemap.
export const metadata = {
  title: "Muestrario · Diagnóstico",
  robots: { index: false, follow: false },
};

export default function MuestrarioDiagnostico() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Banco />;
}
