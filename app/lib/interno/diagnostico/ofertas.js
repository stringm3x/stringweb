import { BOAZ, BOAZ_FUNDADOR, BOCETO, CONTINUIDAD, DESDE, EMPRESA_MINIMO } from "@/app/lib/interno/precios-interno";

// Precio, continuidad y boceto de cada nivel de la herramienta del lote 20.
// Solo lo importa el servidor de /interno (después de exigirCarlos()) y llega
// como props: el boceto y el mínimo de Empresa no van en el JS del cliente
// (lote 25). `desde` es el precio del resumen; Empresa no lo tiene (se cotiza)
// y su mínimo solo va en pantalla.
export const OFERTAS = {
  responde: { desde: DESDE.responde, continuidad: { nombre: "Cuida", desde: CONTINUIDAD.cuida }, boceto: null },
  organiza: { desde: DESDE.organiza, continuidad: { nombre: "Cuida", desde: CONTINUIDAD.cuida }, boceto: null },
  automatiza: { desde: DESDE.automatiza, continuidad: { nombre: "Mejora", desde: CONTINUIDAD.mejora }, boceto: BOCETO.chico },
  controla: { desde: DESDE.controla, continuidad: { nombre: "Mejora", desde: CONTINUIDAD.mejora }, boceto: BOCETO.chico },
  empresa: {
    desde: null,
    minimo: EMPRESA_MINIMO,
    continuidad: { nombre: "Impulsa", desde: CONTINUIDAD.impulsa },
    boceto: `desde ${BOCETO.empresaDesde}`,
  },
  boaz: { mes: BOAZ.pro.mes, fundador: BOAZ_FUNDADOR, continuidad: null, boceto: null },
};
