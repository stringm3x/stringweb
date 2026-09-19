"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Boton } from "./components/ui/Boton";
import { Logo } from "./components/ui/Logo";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "STRING SaaS", href: "/saas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
];

const WHATSAPP_URL =
  "https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING";

const BOTON_ICONO =
  "flex h-10 w-10 items-center justify-center rounded-full border border-linea bg-fondo-elevado text-acido transition-colors duration-200 hover:border-acido";

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
  const esActiva = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-linea bg-fondo/95" : "bg-transparent"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-6 lg:h-[80px] lg:px-24">
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
                      className={`group relative block py-2 font-mono uppercase text-etiqueta transition-colors duration-200 ${
                        activa ? "text-tinta" : "text-tinta-suave hover:text-tinta"
                      }`}
                    >
                      {item.label}
                      {/* La raya acido de Etiqueta linea, como subrayado: fija en la activa, crece al pasar en las demás */}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-0 h-[3px] bg-acido transition-[width] duration-300 ${
                          activa ? "w-7" : "w-0 group-hover:w-7"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={BOTON_ICONO}
            >
              <FaWhatsapp className="text-lg" />
            </a>
            <Boton href="/cotizacion" variante="primario" compacto className="hidden px-5 lg:inline-flex">
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
              <FiMenu className="text-lg" />
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
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-linea bg-fondo sm:w-[440px] lg:hidden"
      >
        <div className="flex h-[72px] items-center justify-between px-6">
          <Logo onClick={cerrar} />
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar menú"
            className={BOTON_ICONO}
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <nav aria-label="Principal, celular" className="flex-1 overflow-y-auto px-6">
          <ul className="border-t border-linea">
            {[...menuItems, { label: "Cotización", href: "/cotizacion" }].map((item, index) => {
              const activa = esActiva(item.href);
              return (
                <li
                  key={item.href}
                  ref={(el) => (filasRef.current[index] = el)}
                  className="border-b border-linea"
                >
                  <Link
                    href={item.href}
                    onClick={cerrar}
                    aria-current={activa ? "page" : undefined}
                    className="group flex min-h-[64px] items-center gap-5 py-3"
                  >
                    <span
                      className={`w-8 flex-shrink-0 font-mono text-etiqueta ${
                        activa ? "text-acido" : "text-tinta-tenue"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-anton uppercase text-titular-m transition-colors duration-200 ${
                        activa ? "text-acido" : "text-tinta group-hover:text-acido"
                      }`}
                    >
                      {item.label}
                    </span>
                    <FiArrowRight
                      aria-hidden="true"
                      className={`text-lg transition-all duration-200 ${
                        activa
                          ? "translate-x-1 text-acido"
                          : "text-linea group-hover:translate-x-1 group-hover:text-acido"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div ref={pieRef} className="border-t border-linea p-6">
          <p className="mb-4 font-mono uppercase text-etiqueta text-tinta-tenue">
            ¿Listo para construir tu sistema?
          </p>
          <Boton href="/cotizacion" variante="primario" onClick={cerrar} className="w-full">
            Solicitar diagnóstico
          </Boton>
        </div>
      </div>
    </>
  );
}
