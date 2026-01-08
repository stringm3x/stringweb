"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const pages = [
  { id: "1", title: "Inicio", link: "/" },
  { id: "2", title: "Servicios", link: "/Services" },
  { id: "3", title: "Proyectos", link: "/Proyects" },
  { id: "4", title: "Conócenos", link: "/Us" },
  { id: "5", title: "Cotizador", link: "/Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 border-t-[1px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Columna izquierda: redes y contacto */}
        <div className="flex flex-col items-center md:items-start space-y-10">
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61576042750915"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-2xl hover:text-green transition-colors" />
            </Link>
            <Link
              href="https://www.instagram.com/stringwebmx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-green transition-colors" />
            </Link>
          </div>
          <Link
            href="https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-3xl hover:text-green transition-colors" />
          </Link>
          <p className="text-lg">stringwebmx@gmail.com</p>
        </div>

        {/* Centro: logo STRING */}
        <div className="flex justify-center items-center">
          <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-green">
            STRING
          </h1>
        </div>

        {/* Columna derecha: menú de páginas y aviso */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h2 className="text-lg font-semibold uppercase text-green">
            Páginas
          </h2>
          <nav className="space-y-2 flex flex-col">
            {pages.map((item) => (
              <Link key={item.id} href={item.link}>
                <span className="text-base sm:text-lg hover:text-green transition-colors">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
          <Link href="/privacy-policy">
            <span className="mt-4 underline hover:text-green">
              Aviso de privacidad
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
