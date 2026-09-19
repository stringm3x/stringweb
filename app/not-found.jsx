import Header from "./header";
import Footer from "./Footer";
import { Etiqueta } from "./components/ui/Etiqueta";
import { Boton } from "./components/ui/Boton";
import { Mancha } from "./components/Mancha";
import { PintarAlScroll } from "./components/PintarAlScroll";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-fondo px-6 text-center">
        {/* Sello que hace un tic al cargar */}
        <span
          aria-hidden="true"
          className="grid h-12 w-12 place-items-center bg-acido font-anton text-[28px] leading-none text-black animate-tic motion-reduce:animate-none"
        >
          S
        </span>
        <Etiqueta variante="linea">ERROR 404</Etiqueta>
        <h1 className="sr-only">ESTA PÁGINA NO EXISTE</h1>
        <PintarAlScroll className="w-full max-w-2xl">
          <Mancha lineas={["ESTA PÁGINA NO EXISTE"]} className="w-full" />
        </PintarAlScroll>
        <Boton href="/" variante="primario">
          Volver al inicio
        </Boton>
      </main>
      <Footer />
    </>
  );
}
