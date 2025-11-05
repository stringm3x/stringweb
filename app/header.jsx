"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/Services" },
  { label: "Proyectos", href: "/Proyects" },
  { label: "Conócenos", href: "/Us" },
  { label: "Cotizador", href: "/Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-end items-center p-4 space-x-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-green text-2xl"
          aria-label="Abrir menú"
        >
          <FaBars size={30} />
        </button>

        <Link
          href="https://wa.me/522222000418?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray hover:text-white text-2xl"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={30}  />
        </Link>
      </div>

      <div
        className={`fixed inset-0 bg-black text-right transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl"
            aria-label="Cerrar menú"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-12 flex flex-col items-end space-y-8 pr-10">
          {menuItems.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`uppercase font-bold text-3xl md:text-6xl transition-colors ${
                  active
                    ? "text-green"
                    : "text-white hover:text-green hover:text-5xl hover:md:text-8xl"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
