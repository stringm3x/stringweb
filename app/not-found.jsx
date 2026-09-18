import Header from "./header";
import Footer from "./Footer";
import { Etiqueta } from "./components/ui/Etiqueta";
import { Boton } from "./components/ui/Boton";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-fondo px-6 text-center">
        <Etiqueta>ERROR 404</Etiqueta>
        <h1 className="font-anton uppercase text-titular-l text-tinta">
          ESTA PÁGINA NO EXISTE
        </h1>
        <Boton href="/" variante="primario">
          Volver al inicio
        </Boton>
      </main>
      <Footer />
    </>
  );
}
