import { notFound } from "next/navigation";
import { exigirCarlos } from "@/app/lib/interno/exigirCarlos";

// /interno a secas y cualquier ruta de /interno que no exista: primero la
// puerta, luego el 404 de /interno (sin Header ni Footer del sitio).
export default async function RestoInternoPage() {
  await exigirCarlos();
  notFound();
}
