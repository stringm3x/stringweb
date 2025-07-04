import React from "react";
import Image from "next/image";
import Link from "next/link";

const pages = [
  { id: "1", title: "Inicio", link: "/" },
  { id: "2", title: "Servicios", link: "/services" },
  { id: "3", title: "Proyectos", link: "/projects" },
  { id: "4", title: "Conócenos", link: "/about" },
  { id: "5", title: "Cotizador", link: "/quote" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Columna izquierda: redes, web, email */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
          </div>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Image src="/whatsapp.svg" alt="WhatsApp" width={32} height={32} />
          </Link>
          <p className="text-sm">stringweb.mx</p>
          <p className="text-sm">stringweb.mx@outlook.com</p>
        </div>

        {/* Centro: logo STRING */}
        <div className="flex justify-center md:justify-center items-center">
          <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-green">
            STRING
          </h1>
        </div>

        {/* Columna derecha: menú de páginas y aviso */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h2 className="text-lg font-semibold uppercase">Páginas</h2>
          <nav className="space-y-2 flex flex-col">
            {pages.map((item) => (
              <Link key={item.id} href={item.link}>
                <span className="text-base sm:text-lg hover:text-green transition-colors">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
          <Link
            href="/privacy-policy"
            className="mt-4 underline hover:text-green"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
