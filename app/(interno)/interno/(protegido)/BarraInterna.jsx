import { SalirConfirmado } from "./SalirConfirmado";

// La barra de /interno: "STRING · Interno" y "Salir".
export function BarraInterna({ salir }) {
  return (
    <header className="border-b border-borde">
      <div className="mx-auto flex min-h-[64px] w-full max-w-[640px] items-center justify-between gap-space-3 px-4">
        <p className="font-mono text-etiqueta uppercase text-texto">STRING · Interno</p>
        <SalirConfirmado accion={salir} />
      </div>
    </header>
  );
}
