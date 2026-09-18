import { QuoteForm } from "../../components/forms/QuoteForm";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Solicitar Diagnóstico | STRING — Sistemas Digitales",
  description:
    "Solicita un diagnóstico gratuito de tu presencia digital. Descubre qué nivel del Sistema STRING necesita tu negocio.",
  alternates: {
    canonical: "https://www.stringwebs.com/cotizacion",
  },
  openGraph: {
    title: "Solicitar Diagnóstico | STRING",
    description:
      "Sistemas digitales estratégicos para convertir visitas en clientes reales.",
    url: "https://www.stringwebs.com/cotizacion",
    type: "website",
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-black py-24 px-6 sm:px-8 lg:px-12">
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
      <QuoteForm />
    </main>
  );
}
