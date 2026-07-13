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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_START } from "@/app/lib/scrollTriggerDefaults";

gsap.registerPlugin(ScrollTrigger);

const pages = [
  { id: "1", title: "Inicio", link: "/" },
  { id: "2", title: "Servicios", link: "/Services" },
  { id: "3", title: "STRING SaaS", link: "/saas" },
  { id: "4", title: "Proyectos", link: "/Proyects" },
  { id: "5", title: "Nosotros", link: "/Us" },
  { id: "6", title: "Cotización", link: "/quote" },
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
    color: "hover:text-green",
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
  { label: "Sistema de Conversión", id: "1" },
  { label: "Sistema de Captación", id: "2" },
  { label: "Sistema Automatizado", id: "3" },
  { label: "Sistema Especializado", id: "4" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRefs = useRef([]);
  const linksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: REVEAL_START,
            once: true,
          },
        }
      );

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: REVEAL_START,
            once: true,
          },
        }
      );

      gsap.fromTo(
        columnsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: REVEAL_START,
            once: true,
          },
        }
      );

      gsap.fromTo(
        socialRefs.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: REVEAL_START,
            once: true,
          },
        }
      );

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: REVEAL_START,
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white pt-20 pb-8 px-4 md:px-8 lg:px-12 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green rounded-full filter blur-3xl" />
      </div>

      {/* Línea superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-green opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Columna 1: Logo + descripción + contacto */}
          <div className="lg:col-span-4 space-y-6">
            <div ref={logoRef} style={{ opacity: 0 }}>
              <h2 className="font-anton text-5xl md:text-6xl lg:text-7xl tracking-tight">
                STRING
              </h2>
              <p className="text-green text-xs uppercase tracking-widest mt-1">
                Sistemas digitales estratégicos
              </p>
            </div>

            <p className="text-gray text-sm leading-relaxed">
              No necesitas más seguidores. Necesitas un sistema que convierta.
              Diseñamos sistemas digitales que transforman tu presencia en
              clientes reales.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 group">
                <FaEnvelope className="text-green group-hover:scale-110 transition-transform flex-shrink-0" />
                <a
                  href="mailto:hola@stringwebs.com"
                  className="text-sm text-gray hover:text-white transition-colors hover:underline"
                >
                  hola@stringwebs.com
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaPhone className="text-green group-hover:scale-110 transition-transform flex-shrink-0" />
                <a
                  href="tel:+525545524847"
                  className="text-sm text-gray hover:text-white transition-colors hover:underline"
                >
                  +52 55 4552 4847
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-green flex-shrink-0" />
                <span className="text-sm text-gray">Ciudad de México</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div
            ref={(el) => (columnsRef.current[0] = el)}
            className="lg:col-span-3 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green">
              Sistemas
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={service.id}
                  ref={(el) => (linksRef.current[index] = el)}
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={`/Services/${service.id}`}
                    className="text-gray hover:text-white transition-colors text-sm block hover:translate-x-1 transform duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Páginas */}
          <div
            ref={(el) => (columnsRef.current[1] = el)}
            className="lg:col-span-2 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green">
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
                    <FaArrowRight className="opacity-0 group-hover:opacity-100 mr-2 text-green text-xs transition-all duration-200" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div
            ref={(el) => (columnsRef.current[2] = el)}
            className="lg:col-span-3 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-green">
              Síguenos
            </h3>
            <div className="flex flex-wrap gap-3">
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
                    className={`flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 text-sm text-gray ${social.color}`}
                  >
                    <social.icon className="text-base" />
                    <span>{social.label}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA Footer */}
            <div className="mt-6 p-4 border border-green/20 rounded-xl bg-green/5">
              <p className="text-xs text-gray mb-3">
                ¿Listo para construir tu sistema?
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green hover:gap-3 transition-all duration-200"
              >
                Solicitar diagnóstico
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray">
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

          <div className="flex gap-3">
            <span className="px-2 py-1 bg-white/5 rounded text-xs">
              SSL Secure
            </span>
            <span className="px-2 py-1 bg-white/5 rounded text-xs">
              CDMX · MX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
