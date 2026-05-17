export const metadata = {
  robots: "noindex, nofollow",
};

// Layout limpio — sin Header ni Footer del sitio principal
// Las presentaciones son páginas privadas independientes
export default function PresentacionesLayout({ children }) {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">{children}</div>
  );
}
