// Layout del flujo de pre-registro del gym. Reusa Header/Footer del sitio
// principal para mantener la navegación consistente con stringwebs.com.
import Header from "../header";
import Footer from "../Footer";

export const metadata = {
  title: "Prueba STRING GYM",
  description:
    "Empieza tu prueba gratuita de 14 días de STRING GYM, el sistema operativo para tu gimnasio.",
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
