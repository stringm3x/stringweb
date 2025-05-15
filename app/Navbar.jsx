"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";

const navLinks = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "precios", label: "Planes", href: "#precios" },
  { id: "contacto", label: "Contácto", href: "#contacto" },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <Navbar
      className="fixed w-full top-0 z-50"
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarMenuToggle
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        className="sm:hidden "
      />
      <NavbarBrand justify="start">
        <Image
          src="/assets/logononbg.png"
          alt="string"
          width={80}
          height={40}
          priority
          unoptimized={true}
        />
      </NavbarBrand>

      {/* Links de navegación */}
      <NavbarContent className="hidden sm:flex gap-1 xl:gap-4" justify="center">
        {navLinks.map((link, href) => (
          <NavbarItem key={link.id}>
            <Link
              href={link.href}
              className={`transition-all duration-300 px-1 xl:px-2 py-2 rounded-lg ${
                pathname === href
                  ? "bg-white text-green shadow-lg"
                  : "text-green hover:bg-white hover:text-bg"
              }`}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {typeof window !== "undefined" && (
        <NavbarMenu>
          {navLinks.map(({ label, href }, index) => (
            <NavbarMenuItem key={`${href}-${index}`}>
              <Link
                href={href}
                className="block w-full rounded-lg transition-all duration-300 hover:bg-blue"
              >
                <div className="p-6 border border-gray rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  <p className="text-xl text-gray">{label || ""}</p>
                </div>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
};

export default Nav;
