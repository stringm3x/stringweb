"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/Services" },
  { label: "Proyectos", href: "/Proyects" },
  { label: "Nosotros", href: "/Us" },
  { label: "Cotización", href: "/quote" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center gap-3">
            {/* WhatsApp Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="WhatsApp"
              >
                <div className="bg-green/10 backdrop-blur-sm p-2.5 rounded-full border border-green/30 hover:border-green transition-colors">
                  <FaWhatsapp className="text-green text-xl" />
                </div>
              </Link>
            </motion.div>

            {/* Hamburguer Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full border border-white/30 hover:border-white transition-colors"
              aria-label="Abrir menú"
            >
              <FiMenu className="text-green text-xl" />
            </motion.button>
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel del menú */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-black z-50 shadow-2xl"
            >
              {/* Header del menú */}
              <div className="flex justify-end p-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <FiX className="text-white text-xl" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="px-6 sm:px-8 py-8">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 border-b border-white/10"
                      >
                        <div className="flex items-center justify-between group">
                          <span
                            className={`text-2xl sm:text-3xl font-ubuntu font-bold transition-colors ${
                              isActive
                                ? "text-green"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>

                          <FiArrowRight
                            className={`text-lg transition-all duration-300 ${
                              isActive
                                ? "text-green translate-x-1"
                                : "text-white/30 group-hover:text-white group-hover:translate-x-1"
                            }`}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer del menú */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-6 sm:left-8 right-6 sm:right-8"
              >
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/50 text-sm mb-3">
                    ¿Tienes un proyecto?
                  </p>
                  <Link
                    href="/quote"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 text-green hover:text-green-400 transition-colors group"
                  >
                    <span className="font-semibold">Cotiza ahora</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
