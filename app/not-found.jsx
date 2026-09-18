import Header from "./header";
import Footer from "./Footer";
import { Etiqueta } from "./components/ui/Etiqueta";
import { Boton } from "./components/ui/Boton";
import { Mancha } from "./components/Mancha";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-fondo px-6 text-center">
        <Etiqueta variante="linea">ERROR 404</Etiqueta>
        <h1 className="sr-only">ESTA PÁGINA NO EXISTE</h1>
        <Mancha lineas={["ESTA PÁGINA NO EXISTE"]} className="w-full max-w-2xl" />
        <Boton href="/" variante="primario">
          Volver al inicio
        </Boton>
      </main>
      <Footer />
    </>
  );
}
