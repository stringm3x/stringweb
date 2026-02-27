"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaTiktok,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import gsap from "gsap";

const pages = [
  { id: "1", title: "Inicio", link: "/" },
  { id: "2", title: "Servicios", link: "/Services" },
  { id: "3", title: "Proyectos", link: "/Proyects" },
  { id: "4", title: "Nosotros", link: "/Us" },
  { id: "5", title: "Cotización", link: "/Quote" },
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/stringwebmx/",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING",
    label: "WhatsApp",
    color: "hover:text-green-500",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/profile.php?id=61576042750915",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@stringmx",
    label: "TikTok",
    color: "hover:text-gray-300",
  },
];

const services = [
  "Diseño Web",
  "Desarrollo Web",
  "SEO",
  "Mantenimiento",
  "Branding",
];

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRefs = useRef([]);
  const linksRef = useRef([]);

  useEffect(() => {
    // Crear timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Footer aparece
    tl.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Logo animado
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6 },
      "-=0.4"
    );

    // Columnas (servicios y páginas)
    tl.fromTo(
      columnsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
      "-=0.3"
    );

    // Social icons
    tl.fromTo(
      socialRefs.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4 },
      "-=0.2"
    );

    // Links individuales
    tl.fromTo(
      linksRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.03, duration: 0.3 },
      "-=0.1"
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white pt-20 pb-8 px-4 md:px-8 lg:px-12 overflow-hidden"
      style={{ opacity: 0 }} // Empieza invisible
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green rounded-full filter blur-3xl" />
      </div>

      {/* Línea superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-green to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Columna 1: Logo y descripción */}
          <div className="lg:col-span-4 space-y-6">
            <div ref={logoRef} style={{ opacity: 0 }}>
              <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl">
                STRING
              </h2>
            </div>

            <p className="text-gray text-sm leading-relaxed">
              Transformamos ideas en experiencias digitales excepcionales.
              Desarrollo web profesional con enfoque humano y resultados
              medibles.
            </p>

            {/* Contacto directo */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors group">
                <FaEnvelope className="text-green group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:stringwebmx@gmail.com"
                  className="text-sm hover:underline"
                >
                  stringwebmx@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors group">
                <FaPhone className="text-green group-hover:scale-110 transition-transform" />
                <a href="tel:+525545524847" className="text-sm hover:underline">
                  +52 55 4552 4847
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-green" />
                <span className="text-sm">Ciudad de México</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Servicios Rápidos */}
          <div
            ref={(el) => (columnsRef.current[0] = el)}
            className="lg:col-span-3 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-semibold uppercase tracking-wider text-green">
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  ref={(el) => (linksRef.current[index] = el)}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={`/Services#${service.toLowerCase()}`}
                    className="text-gray hover:text-white transition-colors text-sm block hover:translate-x-1 transform duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Enlaces Rápidos */}
          <div
            ref={(el) => (columnsRef.current[1] = el)}
            className="lg:col-span-2 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-semibold uppercase tracking-wider text-green">
              Páginas
            </h3>
            <ul className="space-y-3">
              {pages.map((item, index) => (
                <li
                  key={item.id}
                  ref={(el) => (linksRef.current[services.length + index] = el)}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={item.link}
                    className="text-gray hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <FaArrowRight className="opacity-0 group-hover:opacity-100 mr-2 text-green text-xs transition-all" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Social */}
          <div
            ref={(el) => (columnsRef.current[2] = el)}
            className="lg:col-span-3 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-semibold uppercase tracking-wider text-green">
              Síguenos
            </h3>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  ref={(el) => (socialRefs.current[index] = el)}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`block p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="text-xl" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} STRING. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-green transition-colors"
            >
              Aviso de privacidad
            </Link>
            <Link href="/terms" className="hover:text-green transition-colors">
              Términos y condiciones
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3">
            <span className="px-2 py-1 bg-white/5 rounded text-xs">
              SSL Secure
            </span>
            <span className="px-2 py-1 bg-white/5 rounded text-xs">
              MX 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
