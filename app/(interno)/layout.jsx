// /interno: herramienta privada de Carlos (CLAUDE.md § Rutas). Sin Header
// ni Footer del sitio, sin arte, en noche. No se indexa ni se comparte: se
// anulan el canonical, el Open Graph y el Twitter que vienen del layout
// raíz. proxy.js agrega X-Robots-Tag y Cache-Control.
//
// Aquí no se valida la sesión: este layout también envuelve a
// /interno/entrar. La segunda puerta (después de proxy.js) está en
// interno/(protegido)/layout.jsx y en cada página.
// Nada de /interno se prerenderiza: cada respuesta se arma en la petición
// (y así Next no le pone caché larga).
export const dynamic = "force-dynamic";

export const metadata = {
  title: { default: "Interno", template: "%s · STRING Interno" },
  description: null,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null, languages: null },
  openGraph: null,
  twitter: null,
};

export default function InternoLayout({ children }) {
  return (
    <div data-theme="noche" className="min-h-screen bg-fondo text-texto">
      {children}
    </div>
  );
}
