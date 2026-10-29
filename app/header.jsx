"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
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
  "flex h-11 w-11 items-center justify-center rounded-pill border border-hairline text-texto transition-colors duration-200 hover:border-texto";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const panelRef = useRef(null);
  const fondoRef = useRef(null);
  const filasRef = useRef([]);
  const pieRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El panel (solo celular) entra desde la derecha y sus filas suben en
  // cascada; al cerrar se reproduce en reversa.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(fondoRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { xPercent: 100, autoAlpha: 0 });

      tlRef.current = gsap
        .timeline({ paused: true })
        .to(fondoRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
        .to(
          panelRef.current,
          { xPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
          "<"
        )
        .from(
          filasRef.current.filter(Boolean),
          { opacity: 0, x: 32, duration: 0.4, stagger: 0.06, ease: "power3.out" },
          "-=0.25"
        )
        .from(pieRef.current, { opacity: 0, y: 12, duration: 0.3 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) tlRef.current.play();
    else tlRef.current.reverse();
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const cerrar = () => setIsOpen(false);
  // Los enlaces a salas de la portada (/#…) no se marcan como página actual.
  const esActiva = (href) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header
        data-theme="noche"
        className={`fixed left-0 right-0 top-0 z-50 text-texto transition-colors duration-300 ${
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
                      className={`block py-2 text-pequeno transition-colors duration-200 ${
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
        ref={fondoRef}
        onClick={cerrar}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-fondo/90 lg:hidden"
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
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-hairline bg-fondo text-texto sm:w-[440px] lg:hidden"
      >
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
          <Logo onClick={cerrar} />
          <button
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
                  ref={(el) => (filasRef.current[index] = el)}
                  className="border-b border-hairline"
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
                      className={`flex-1 text-subtitulo transition-colors duration-200 ${
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

        <div ref={pieRef} className="border-t border-hairline p-4 sm:p-6">
          <Boton href="/diagnostico" variante="primario" onClick={cerrar} className="w-full">
            Solicitar diagnóstico
          </Boton>
        </div>
      </div>
    </>
  );
}
