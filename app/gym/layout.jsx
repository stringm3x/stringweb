// Layout del flujo de pre-registro del gym. Reusa Header/Footer del sitio
// principal para mantener la navegación consistente con stringwebs.com.
import Header from "../header";
import Footer from "../Footer";

export const metadata = {
  title: { absolute: "Boaz · El sistema para gimnasios, by STRING" },
  description: "Socios, check-in, cobros y caja para tu gimnasio, probado en un gimnasio real.",
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
