import { QuoteForm } from "../../components/forms/QuoteForm";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Solicitar Diagnóstico | STRING — Sistemas Digitales",
  description:
    "Solicita un diagnóstico gratuito de tu presencia digital. Descubre qué nivel del Sistema STRING necesita tu negocio.",
  alternates: {
    canonical: "https://www.stringwebs.com/quote",
  },
  openGraph: {
    title: "Solicitar Diagnóstico | STRING",
    description:
      "Sistemas digitales estratégicos para convertir visitas en clientes reales.",
    url: "https://www.stringwebs.com/quote",
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
            background: "#000",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "2px",
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
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <QuoteForm />
    </main>
  );
}
