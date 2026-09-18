"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconChevronDown,
  IconMenu2,
  IconUser,
  IconX,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Institucional", href: "/institucional" },
  { label: "Transparencia", href: "/transparencia" },
  { label: "Gestión Académica", href: "/gestion-academica" },
  { label: "Admisiones", href: "/admisiones" },
  { label: "Atención al Ciudadano", href: "/atencion-ciudadana" },
  { label: "Calendario", href: "/calendario" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Barra gov.co */}
      <div className="bg-[#3366cc]">
        <div className="mx-auto flex h-10 max-w-[1280px] items-center px-6">
          <Link
            href="https://www.gov.co/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a gov.co"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/govco.png"
              alt="gov.co"
              width={200}
              height={47}
              priority
              style={{ width: "auto", height: 22 }}
            />
          </Link>
        </div>
      </div>

      {/* Header principal */}
      <div className="border-b border-neutral-100 bg-white">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Ir al inicio">
            <Image
              src="/logo-navbar.png"
              alt="IE Nuestra Señora de la Candelaria"
              width={2035}
              height={773}
              priority
              style={{ width: "auto", height: 44 }}
              className="shrink-0"
            />
          </Link>

          {/* Links desktop */}
          <ul className="hidden items-center gap-0.5 lg:flex" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className="flex items-center rounded-md px-3 py-2 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-primary-600/8 hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="tel:+573042026613"
              className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[12px] font-medium text-neutral-500 transition-colors hover:text-primary-700"
            >
              <IconPhone size={14} />
              304 202 6613
            </a>
            <div className="mx-1 h-4 w-px bg-neutral-200" />
            <Link
              href="/atencion-ciudadana"
              className="flex items-center gap-1.5 rounded-full bg-primary-700 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-primary-800 hover:shadow-sm"
            >
              <IconUser size={14} />
              Acceso rápido
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
          >
            {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </nav>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-b border-neutral-100 bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center border-b border-neutral-50 text-[15px] font-medium text-neutral-700 transition-colors hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="tel:+573042026613"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 text-[14px] font-medium text-neutral-600"
            >
              <IconPhone size={16} />
              304 202 6613
            </a>
            <Link
              href="/atencion-ciudadana"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary-700 text-[14px] font-semibold text-white"
            >
              <IconUser size={16} />
              Acceso rápido
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
