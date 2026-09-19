"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Boton } from "./components/ui/Boton";
import { Etiqueta } from "./components/ui/Etiqueta";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "STRING SaaS", href: "/saas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Cotización", href: "/cotizacion" },
];

const WHATSAPP_URL =
  "https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING";

const BOTON_ICONO =
  "flex h-11 w-11 items-center justify-center rounded-full border border-linea bg-fondo-elevado text-acido transition-colors duration-200 hover:border-acido";

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El panel entra desde la derecha y sus filas suben en cascada; al cerrar
  // se reproduce en reversa. Con movimiento reducido GSAP lo resuelve al
  // instante (ver lib/motionPrefs).
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

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 py-5 transition-colors duration-300 ${
          scrolled ? "border-b border-linea bg-fondo" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="block" aria-label="STRING, inicio">
            <Image
              src="/marca/string-wordmark-acido.png"
              alt="STRING"
              width={409}
              height={144}
              priority
              className="h-auto w-[120px]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={BOTON_ICONO}
            >
              <FaWhatsapp className="text-xl" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isOpen}
              aria-controls="menu-principal"
              className={BOTON_ICONO}
            >
              <FiMenu className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Fondo del menú */}
      <div
        ref={fondoRef}
        onClick={cerrar}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-fondo/90"
      />

      {/* Panel del menú */}
      <div
        ref={panelRef}
        id="menu-principal"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-linea bg-fondo sm:w-[440px]"
      >
        <div className="flex items-center justify-between p-6">
          <Etiqueta variante="linea">Menú</Etiqueta>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar menú"
            className={BOTON_ICONO}
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 sm:px-8">
          <ul className="border-t border-linea">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={item.href}
                  ref={(el) => (filasRef.current[index] = el)}
                  className="border-b border-linea"
                >
                  <Link
                    href={item.href}
                    onClick={cerrar}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex min-h-[64px] items-center gap-5 py-3"
                  >
                    <span
                      className={`w-8 flex-shrink-0 font-mono text-etiqueta ${
                        isActive ? "text-acido" : "text-tinta-tenue"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-anton uppercase text-titular-m transition-colors duration-200 ${
                        isActive ? "text-acido" : "text-tinta group-hover:text-acido"
                      }`}
                    >
                      {item.label}
                    </span>
                    <FiArrowRight
                      aria-hidden="true"
                      className={`text-lg transition-all duration-200 ${
                        isActive
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

        <div ref={pieRef} className="border-t border-linea p-6 sm:p-8">
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
