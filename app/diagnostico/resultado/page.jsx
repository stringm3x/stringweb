import { Suspense } from "react";
import ResultadoContent from "./ResultadoContent";

export default function ResultadoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-gray font-mono text-sm">Cargando diagnóstico...</p>
        </div>
      }
    >
      <ResultadoContent />
    </Suspense>
  );
}
