"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Boton } from "./components/ui/Boton";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "STRING SaaS", href: "/saas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Cotización", href: "/cotizacion" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const microHover = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-fondo border-b border-linea"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/marca/string-wordmark-acido.png"
                alt="STRING"
                width={409}
                height={144}
                priority
                className="h-auto w-[120px]"
              />
            </Link>

            {/* Botones derecha */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <motion.div {...microHover}>
                <Link
                  href="https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="block bg-fondo-elevado p-2.5 rounded-full border border-green/30 hover:border-green hover:bg-green/20 transition-all duration-200"
                >
                  <FaWhatsapp className="text-green text-xl" />
                </Link>
              </motion.div>

              {/* Hamburguesa */}
              <motion.button
                {...microHover}
                onClick={() => setIsOpen(true)}
                className="bg-fondo-elevado p-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white/20 transition-all duration-200"
                aria-label="Abrir menú"
              >
                <FiMenu className="text-green text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="fixed inset-0 bg-fondo z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: shouldReduceMotion ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : "100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 25, stiffness: 200 }
              }
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-fondo-elevado z-50"
            >
              {/* Header del panel */}
              <div className="flex justify-between items-center p-6">
                <Image
                  src="/marca/string-wordmark-acido.png"
                  alt="STRING"
                  width={409}
                  height={144}
                  className="h-auto w-[120px]"
                />
                <motion.button
                  {...(shouldReduceMotion
                    ? {}
                    : { whileHover: { scale: 1.1, rotate: 90 }, whileTap: { scale: 0.95 } })}
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 min-w-[48px] min-h-[48px] bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <FiX className="text-white text-xl" />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="px-6 sm:px-8 py-4">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: shouldReduceMotion ? 1 : 0,
                        x: shouldReduceMotion ? 0 : 50,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center min-h-[48px] py-4 border-b border-white/10"
                      >
                        <div className="flex items-center justify-between w-full group">
                          <span
                            className={`font-mono uppercase text-etiqueta transition-colors duration-200 ${
                              isActive
                                ? "text-green"
                                : "text-white/60 group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                          <FiArrowRight
                            className={`text-lg transition-all duration-300 ${
                              isActive
                                ? "text-green translate-x-1"
                                : "text-white/20 group-hover:text-white group-hover:translate-x-1"
                            }`}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer del panel */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
                className="absolute bottom-8 left-6 sm:left-8 right-6 sm:right-8"
              >
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <p className="text-white/40 text-sm">
                    ¿Listo para construir tu sistema?
                  </p>
                  <Boton
                    href="/cotizacion"
                    variante="primario"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    Solicitar diagnóstico
                    <FiArrowRight />
                  </Boton>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
