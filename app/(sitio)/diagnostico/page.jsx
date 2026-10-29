import { QuoteForm } from "../../components/forms/QuoteForm";
import { Toaster } from "react-hot-toast";

// Título y descripción de docs/textos.md § Textos que faltaban. El
// formulario y su encabezado se rehacen en el lote 4.
const DESCRIPCION =
  "Cuatro preguntas para saber qué necesita tu negocio. Te respondemos en un día hábil.";

export const metadata = {
  title: "Solicitar diagnóstico",
  description: DESCRIPCION,
  alternates: {
    canonical: "https://www.stringwebs.com/diagnostico",
  },
  openGraph: {
    title: "Solicitar diagnóstico · STRING",
    description: DESCRIPCION,
    url: "https://www.stringwebs.com/diagnostico",
    type: "website",
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-black px-6 pt-32 pb-espacio-6 md:pt-40 md:pb-espacio-7 lg:px-24">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f1310",
            color: "#ffffff",
            border: "1px solid #242b24",
            borderRadius: "0",
            fontSize: "14px",
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: "#50ff05",
              secondary: "#000",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ffffff",
              secondary: "#0f1310",
            },
          },
        }}
      />
      <div className="mx-auto max-w-contenido">
        <QuoteForm />
      </div>
    </main>
  );
}
