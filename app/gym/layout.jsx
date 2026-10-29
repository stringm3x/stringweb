// Layout del flujo de pre-registro del gym. Reusa Header/Footer del sitio
// principal para mantener la navegación consistente con stringwebs.com.
import Header from "../header";
import Footer from "../Footer";

export const metadata = {
  title: "Prueba el sistema para gimnasios",
  description:
    "Empieza tu prueba gratuita de 14 días con Pro completo, sin tarjeta, en el sistema para gimnasios de STRING.",
};

export default function GymLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">{children}</main>
      <Footer />
    </>
  );
}
