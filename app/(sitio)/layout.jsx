// Este archivo va en: app/(sitio)/layout.jsx
// Aplica Header y Footer solo a las páginas del sitio principal

import Header from "../header";
import Footer from "../Footer";

export default function SitioLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
