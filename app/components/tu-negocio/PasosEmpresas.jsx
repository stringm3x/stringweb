import { PASOS_EMPRESAS } from "@/app/lib/giros";
import { CUERPO } from "../salas/estilos";

// Los cuatro pasos con empresas (lote 11): /tu-negocio/empresas y cada giro
// grande. Número en mono, el paso en negritas y su texto, separados por líneas.
export function PasosEmpresas() {
  return (
    <ol className="flex flex-col border-b border-hairline">
      {PASOS_EMPRESAS.map((paso) => (
        <li key={paso.numero} className="grid grid-cols-[40px_1fr] gap-space-3 border-t border-hairline py-space-4">
          <span className="font-mono text-cifra text-texto-suave">{paso.numero}</span>
          <p className={CUERPO}>
            <span className="font-semibold text-texto">{paso.nombre}.</span> {paso.texto}
          </p>
        </li>
      ))}
    </ol>
  );
}
