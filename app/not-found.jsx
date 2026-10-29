import Header from "./header";
import Footer from "./Footer";
import { Boton } from "./components/ui/Boton";
import { CUERPO, ETIQUETA } from "./components/salas/estilos";

// Página 404 (docs/textos.md § Textos que faltaban): sobre noche, con la
// etiqueta, el titular y el botón verde de vuelta al inicio.
export default function NotFound() {
  return (
    <>
      <Header />
      <main
        data-theme="noche"
        className="flex min-h-screen items-center bg-fondo px-4 pb-space-8 pt-32 text-texto sm:px-6 lg:px-24 lg:pt-40"
      >
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-start gap-space-4">
          <p className={ETIQUETA}>ERROR 404</p>
          <h1 className="text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[56px] lg:text-titulo">
            Esta sala no existe.
          </h1>
          <p className={CUERPO}>La página que buscas no está en la galería.</p>
          <Boton href="/" variante="primario" className="mt-space-3">
            Volver al inicio
          </Boton>
        </div>
      </main>
      <Footer />
    </>
  );
}
