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
} from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Inicio", href: "/", dropdown: false },
  { label: "Institucional", href: "/institucional", dropdown: true },
  { label: "Transparencia y Ley", href: "/transparencia", dropdown: true },
  { label: "Gestión Académica", href: "/gestion-academica", dropdown: true },
  { label: "Admisiones y Cupos", href: "/admisiones", dropdown: true },
  { label: "Atención al Ciudadano", href: "/atencion-ciudadana", dropdown: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-100 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
    >
      {/* Barra superior gov.co */}
      <div className="bg-[#3366cc] py-2">
        <div className="mx-auto flex max-w-[1280px] items-center px-6">
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
              style={{ width: "auto", height: 28 }}
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Header principal */}
      <nav
        aria-label="Navegación principal"
        className="h-[72px] mx-auto flex max-w-[1280px] items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center transition-transform hover:scale-[1.02]"
          aria-label="Ir al inicio"
        >
          <Image
            src="/logo-navbar.png"
            alt="Institución Educativa Nuestra Señora de la Candelaria"
            width={2035}
            height={773}
            priority
            style={{ width: "auto", height: 48 }}
            className="h-12 w-auto shrink-0"
          />
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 lg:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                role="menuitem"
                className="relative flex min-h-11 items-center gap-1 rounded-md px-3 text-[14px] font-medium text-primary-800 transition-colors hover:bg-primary-600/10 hover:text-primary-600"
              >
                {link.label}
                {link.dropdown && (
                  <IconChevronDown
                    aria-hidden="true"
                    size={14}
                    className="text-neutral-400 transition-transform group-hover:rotate-180"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="tel:+573042026613"
            className="flex min-h-10 items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-[13px] font-medium text-neutral-600 transition-colors hover:border-primary-600 hover:text-primary-600"
          >
            <IconPhone size={16} aria-hidden="true" />
            <span className="hidden xl:inline">304 202 6613</span>
          </Link>
          <Link
            href="/atencion-ciudadana"
            className="flex min-h-10 items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-[14px] font-medium text-white transition-all hover:bg-primary-700 hover:shadow-md"
          >
            <IconUser size={16} aria-hidden="true" />
            Acceso rápido
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex min-w-11 min-h-11 items-center justify-center rounded-lg text-primary-800 transition-colors hover:bg-neutral-100 lg:hidden"
        >
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-neutral-200 bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between rounded-lg px-4 text-[15px] font-medium text-primary-800 transition-colors hover:bg-primary-600/10"
                >
                  {link.label}
                  {link.dropdown && (
                    <IconChevronDown
                      aria-hidden="true"
                      size={16}
                      className="text-neutral-400"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="tel:+573042026613"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-[14px] font-medium text-neutral-600"
            >
              <IconPhone size={18} aria-hidden="true" />
              Llamar: 304 202 6613
            </Link>
            <Link
              href="/atencion-ciudadana"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-3 text-[15px] font-medium text-white"
            >
              <IconUser size={18} aria-hidden="true" />
              Acceso rápido
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
