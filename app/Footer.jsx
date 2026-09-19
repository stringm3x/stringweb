"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaFacebookF, FaTiktok } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";

gsap.registerPlugin(ScrollTrigger);

const pages = [
  { title: "Inicio", link: "/" },
  { title: "Servicios", link: "/servicios" },
  { title: "STRING SaaS", link: "/saas" },
  { title: "Proyectos", link: "/proyectos" },
  { title: "Nosotros", link: "/nosotros" },
  { title: "Cotización", link: "/cotizacion" },
];

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/stringwebmx/", label: "Instagram" },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/525545524847?text=¡Hola!%20Quiero%20más%20info%20sobre%20STRING",
    label: "WhatsApp",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/profile.php?id=61576042750915",
    label: "Facebook",
  },
  { icon: FaTiktok, href: "https://www.tiktok.com/@stringmx", label: "TikTok" },
];

const services = [
  { label: "Sistema de Conversión", id: "1" },
  { label: "Sistema de Captación", id: "2" },
  { label: "Sistema Automatizado", id: "3" },
  { label: "Sistema Especializado", id: "4" },
];

const contacto = [
  { etiqueta: "Email", valor: "hola@stringwebs.com", href: "mailto:hola@stringwebs.com" },
  { etiqueta: "Tel", valor: "+52 55 4552 4847", href: "tel:+525545524847" },
  { etiqueta: "Ciudad", valor: "Ciudad de México" },
];

const enlace =
  "text-cuerpo-s text-tinta-suave transition-colors duration-200 hover:text-tinta";

function Encabezado({ children }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 font-mono uppercase text-etiqueta text-tinta-suave">
      <span className="h-[3px] w-6 bg-acido" aria-hidden="true" />
      {children}
    </h3>
  );
}

const Footer = () => {
  const footerRef = useRef(null);
  const bloquesRef = useRef([]);

  // Un solo reveal para todo el pie: los cuatro bloques suben en cascada.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bloquesRef.current.filter(Boolean), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: REVEAL_START, once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t-2 border-acido bg-fondo px-6 pb-8 pt-espacio-6 text-tinta lg:px-24 lg:pt-espacio-7"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Marca + contacto */}
          <div ref={(el) => (bloquesRef.current[0] = el)} className="lg:col-span-5">
            <Image
              src="/marca/string-wordmark-acido.png"
              alt="STRING"
              width={409}
              height={144}
              className="h-auto w-[180px]"
            />
            <p className="mt-4 font-mono uppercase text-etiqueta text-tinta-tenue">
              Sistemas digitales estratégicos
            </p>
            <p className="mt-6 max-w-sm text-cuerpo-s text-tinta-suave">
              No necesitas más seguidores. Necesitas un sistema que convierta.
              Diseñamos sistemas digitales que transforman tu presencia en
              clientes reales.
            </p>

            <dl className="mt-8 max-w-sm divide-y divide-linea border-y border-linea">
              {contacto.map((c) => (
                <div key={c.etiqueta} className="flex items-baseline gap-4 py-3">
                  <dt className="w-16 flex-shrink-0 font-mono uppercase text-etiqueta text-tinta-tenue">
                    {c.etiqueta}
                  </dt>
                  <dd className="min-w-0">
                    {c.href ? (
                      <a href={c.href} className={enlace}>
                        {c.valor}
                      </a>
                    ) : (
                      <span className="text-cuerpo-s text-tinta-suave">{c.valor}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sistemas */}
          <div ref={(el) => (bloquesRef.current[1] = el)} className="lg:col-span-3">
            <Encabezado>Sistemas</Encabezado>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/servicios/${service.id}`} className={enlace}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Páginas */}
          <div ref={(el) => (bloquesRef.current[2] = el)} className="lg:col-span-2">
            <Encabezado>Páginas</Encabezado>
            <ul className="space-y-3">
              {pages.map((item) => (
                <li key={item.link}>
                  <Link href={item.link} className={enlace}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div ref={(el) => (bloquesRef.current[3] = el)} className="lg:col-span-2">
            <Encabezado>Síguenos</Encabezado>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center border border-linea text-tinta-suave transition-colors duration-200 hover:border-acido hover:text-acido"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-espacio-6 flex flex-col gap-4 border-t border-linea pt-6 font-mono uppercase text-etiqueta text-tinta-tenue md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} STRING · Todos los derechos reservados</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-tinta">
              Aviso de privacidad
            </Link>
            <Link href="/terms" className="transition-colors hover:text-tinta">
              Términos y condiciones
            </Link>
            <span>CDMX · MX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
