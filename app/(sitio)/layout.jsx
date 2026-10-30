// Este archivo va en: app/(sitio)/layout.jsx
// Aplica Header y Footer solo a las páginas del sitio principal

import { ViewTransition } from "react";
import Header from "../header";
import Footer from "../Footer";

export default function SitioLayout({ children }) {
  return (
    <>
      <Header />
      {/* Al cambiar de página, la sala nueva entra con un fundido corto. */}
      <ViewTransition>
        <main className="min-h-screen">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
