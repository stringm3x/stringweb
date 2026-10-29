"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { Boton } from "./components/ui/Boton";
import { Logo } from "./components/ui/Logo";

// Barra superior de docs/textos.md: logo · Sistemas · Productos · Galería ·
// Nosotros · Solicitar diagnóstico.
const menuItems = [
  { label: "Sistemas", href: "/#niveles" },
  { label: "Productos", href: "/saas" },
  { label: "Galería", href: "/#galeria" },
  { label: "Nosotros", href: "/nosotros" },
];

const BOTON_ICONO =
  "flex h-11 w-11 items-center justify-center rounded-pill border border-hairline text-texto hover:border-texto";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const abrirRef = useRef(null);
  const cerrarRef = useRef(null);
  const panelRef = useRef(null);
  const estuvoAbierto = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menú como diálogo modal: al abrir, el foco entra al botón de cerrar y no
  // sale del panel con Tab; al cerrar, vuelve al botón que lo abrió.
  useEffect(() => {
    if (isOpen) {
      estuvoAbierto.current = true;
      cerrarRef.current?.focus();
    } else if (estuvoAbierto.current) {
      abrirRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") return setIsOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const enfocables = panelRef.current.querySelectorAll("a[href], button");
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const cerrar = () => setIsOpen(false);
  // Los enlaces a salas de la portada (/#…) no se marcan como página actual.
  const esActiva = (href) => !href.includes("#") && pathname.startsWith(href);

  // El panel (solo celular) entra desde la derecha y sus filas con él, con
  // transiciones CSS; con menos movimiento aparece de golpe.
  const FILA = `transition-[opacity,transform] duration-normal motion-reduce:transition-none ${
    isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
  }`;

  return (
    <>
      <header
        data-theme="noche"
        className={`fixed left-0 right-0 top-0 z-50 text-texto ${
          scrolled ? "border-b border-hairline bg-fondo/95" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-pagina items-center justify-between px-4 sm:px-6 lg:h-[80px] lg:px-24">
          <Logo />

          {/* Nav de escritorio */}
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {menuItems.map((item) => {
                const activa = esActiva(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activa ? "page" : undefined}
                      className={`block py-2 text-pequeno ${
                        activa ? "text-texto" : "text-texto-suave hover:text-texto"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Boton href="/diagnostico" variante="primario" compacto className="hidden lg:inline-flex">
              Solicitar diagnóstico
            </Boton>
            <button
              ref={abrirRef}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isOpen}
              aria-controls="menu-principal"
              className={`${BOTON_ICONO} lg:hidden`}
            >
              <FiMenu className="text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fondo del menú */}
      <div
        onClick={cerrar}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-fondo/90 transition-[opacity,visibility] duration-normal motion-reduce:transition-none lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Panel del menú (celular) */}
      <div
        ref={panelRef}
        id="menu-principal"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        aria-hidden={!isOpen}
        inert={!isOpen}
        data-theme="noche"
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-hairline bg-fondo text-texto duration-normal motion-reduce:transition-none sm:w-[440px] lg:hidden ${
          // Al abrir, visible al instante (para poder recibir el foco); al
          // cerrar, se oculta cuando termina de salir.
          isOpen
            ? "visible translate-x-0 opacity-100 transition-[transform,opacity]"
            : "invisible translate-x-full opacity-0 transition-[transform,opacity,visibility]"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
          <Logo onClick={cerrar} />
          <button
            ref={cerrarRef}
            type="button"
            onClick={cerrar}
            aria-label="Cerrar menú"
            className={BOTON_ICONO}
          >
            <FiX className="text-lg" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Principal, celular" className="flex-1 overflow-y-auto px-4 sm:px-6">
          <ul className="border-t border-hairline">
            {menuItems.map((item, index) => {
              const activa = esActiva(item.href);
              return (
                <li
                  key={item.href}
                  className={`border-b border-hairline ${FILA}`}
                >
                  <Link
                    href={item.href}
                    onClick={cerrar}
                    aria-current={activa ? "page" : undefined}
                    className="flex min-h-[64px] items-center gap-5 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="w-8 flex-shrink-0 font-mono text-etiqueta text-texto-suave"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-subtitulo ${
                        activa ? "text-acento" : "text-texto hover:text-acento"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`border-t border-hairline p-4 sm:p-6 ${FILA}`}
        >
          <Boton href="/diagnostico" variante="primario" onClick={cerrar} className="w-full">
            Solicitar diagnóstico
          </Boton>
        </div>
      </div>
    </>
  );
}
