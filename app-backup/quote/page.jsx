import { QuoteForm } from "../components/forms/QuoteForm";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Cotiza tu Proyecto Web | Desarrollo Personalizado",
  description:
    "Solicita una cotización profesional para tu proyecto web. Desarrollo a medida en Next.js, React y más.",
  openGraph: {
    title: "Cotiza tu Proyecto Web",
    description: "Desarrollo web profesional y personalizado",
    type: "website",
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#000",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
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
