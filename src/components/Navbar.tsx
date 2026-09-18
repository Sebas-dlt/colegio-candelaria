"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconMenu2,
  IconX,
  IconPhone,
  IconChevronDown,
} from "@tabler/icons-react";

const NAV_MAIN = [
  { label: "Inicio", href: "/" },
  { label: "Institucional", href: "/institucional" },
  { label: "Admisiones", href: "/admisiones" },
  { label: "Calendario", href: "/calendario" },
];

const NAV_SECONDARY = [
  { label: "Gestión Académica", href: "/gestion-academica" },
  { label: "PQRS", href: "/pqrs/radicar" },
  { label: "Consulta PQRS", href: "/pqrs/consultar" },
  { label: "Transparencia", href: "/transparencia" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Barra gov.co */}
      <div className="bg-[#3366cc]">
        <div className="mx-auto flex h-8 max-w-[1280px] items-center px-6">
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
              style={{ width: "auto", height: 18 }}
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
          <ul className="hidden items-center gap-1 lg:flex" role="menubar">
            {NAV_MAIN.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className="flex items-center rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Más dropdown */}
            <li role="none" className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-700"
              >
                Más
                <IconChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg">
                  {NAV_SECONDARY.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Acciones desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+573042026613"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-neutral-500 transition-colors hover:text-primary-700"
            >
              <IconPhone size={14} />
              304 202 6613
            </a>
            <Link
              href="/pqrs/radicar"
              className="rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-800 hover:shadow-md"
            >
              Radicar PQRS
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
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          {/* Links principales */}
          <ul className="flex flex-col">
            {NAV_MAIN.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center text-base font-medium text-neutral-700 transition-colors hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Separador */}
          <div className="my-3 border-t border-neutral-100" />

          {/* Links secundarios */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Más opciones
          </p>
          <ul className="flex flex-col">
            {NAV_SECONDARY.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center text-sm text-neutral-500 transition-colors hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="tel:+573042026613"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 text-sm font-medium text-neutral-600"
            >
              <IconPhone size={16} />
              304 202 6613
            </a>
            <Link
              href="/pqrs/radicar"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary-700 text-sm font-semibold text-white"
            >
              Radicar PQRS
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}