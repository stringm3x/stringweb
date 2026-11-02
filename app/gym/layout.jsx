// Layout del flujo de registro de Boaz. Reusa Header/Footer del sitio
// principal para mantener la navegación consistente con stringwebs.com.
import Header from "../header";
import Footer from "../Footer";
import { ubuntuMono } from "../components/boaz/fuentes";

export const metadata = {
  title: { absolute: "Boaz · El sistema para gimnasios, by STRING" },
  description: "Socios, check-in, cobros y caja para tu gimnasio, probado en un gimnasio real.",
};

export default function GymLayout({ children }) {
  return (
    <>
      <Header />
      {/* Lote 9b: /gym con la identidad de Boaz (tema boaz, Ubuntu Mono).
          La franja noche, del alto de la barra, la deja leerse sobre el papel. */}
      <main data-theme="boaz" className={`${ubuntuMono.variable} min-h-screen bg-fondo text-[17px] leading-[1.5] text-texto`}>
        <div aria-hidden="true" className="h-[72px] bg-black lg:h-20" />
        {children}
      </main>
      <Footer />
    </>
  );
}
