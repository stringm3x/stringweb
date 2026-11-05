import { IVA } from "@/app/lib/precios";

// La etiqueta "IVA incluido" junto a un precio (lote 17): tamaño de
// etiqueta y color secundario, en la misma familia mono que el precio que
// acompaña (Ubuntu Mono dentro de Boaz, Geist Mono en el resto).
export function IvaIncluido({ boaz = false, className = "" }) {
  const familia = boaz ? "font-boaz-mono" : "font-mono";
  return <span className={`${familia} whitespace-nowrap text-etiqueta text-texto-suave ${className}`.trim()}>{IVA}</span>;
}
