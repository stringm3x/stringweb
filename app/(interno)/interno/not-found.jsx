import { ETIQUETA } from "@/app/components/salas/estilos";

// 404 de /interno: sin Header ni Footer del sitio. Etiqueta y titular de
// docs/textos.md § Página 404; sin el botón al inicio público.
export default function InternoNoEncontrado() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center px-4 py-space-6">
      <p className={ETIQUETA}>ERROR 404</p>
      <h1 className="mt-space-2 text-subtitulo">Esta sala no existe.</h1>
    </main>
  );
}
