import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mapa del Sitio",
  description:
    "Mapa de navegación del sitio web de la Institución Educativa Nuestra Señora de la Candelaria.",
};

const SITEMAP = [
  {
    title: "Páginas Principales",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Institucional", href: "/institucional" },
      { label: "Gestión Académica", href: "/gestion-academica" },
      { label: "Admisiones", href: "/admisiones" },
      { label: "Calendario", href: "/calendario" },
    ],
  },
  {
    title: "Atención al Ciudadano",
    links: [
      { label: "Atención al Ciudadano", href: "/atencion-ciudadana" },
      { label: "Radicar PQRS", href: "/pqrs/radicar" },
      { label: "Consultar PQRS", href: "/pqrs/consultar" },
    ],
  },
  {
    title: "Transparencia",
    links: [
      { label: "Transparencia", href: "/transparencia" },
    ],
  },
  {
    title: "Páginas Legales",
    links: [
      { label: "Política de Privacidad", href: "/politica-de-privacidad" },
      { label: "Política de Derechos de Autor", href: "/politica-derechos-autor" },
      { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
      { label: "Accesibilidad", href: "/accesibilidad" },
    ],
  },
  {
    title: "Acceso Rápido",
    links: [
      { label: "Mapa del Sitio", href: "/mapa-del-sitio" },
      { label: "Login Administrativo", href: "/login" },
    ],
  },
];

export default function MapaSitioPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Mapa del Sitio</h1>
          <p className="mt-4 text-lg text-white/80">
            Navegación completa del sitio web institucional
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SITEMAP.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <h2 className="mb-4 text-lg font-bold text-neutral-900">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-700 hover:text-primary-700 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}