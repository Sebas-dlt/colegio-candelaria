import Link from "next/link";
import Image from "next/image";
import {
  IconMapPin,
  IconClock,
  IconMail,
  IconPhone,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconExternalLink,
} from "@tabler/icons-react";

const ENLACES_SITIO = [
  { label: "Mapa del sitio", href: "/mapa-del-sitio" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de derechos de autor", href: "/politica-derechos-autor" },
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Accesibilidad", href: "/accesibilidad" },
];

const REDES_SOCIALES = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/colegiolacande/",
    icon: IconBrandFacebook,
  },
  {
    label: "Canal de WhatsApp",
    href: "https://whatsapp.com/channel/0029VaMH4m8KGGGA0qVXHE1V",
    icon: IconBrandWhatsapp,
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#3366cc]">
      {/* Barra decorativa superior */}
      <div className="h-1 bg-gradient-to-r from-accent-yellow via-accent-gold to-white/40" />

      {/* Contenido principal */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Columna 1: Logo e identidad */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Link href="/" aria-label="Ir al inicio">
            <Image
              src="/logo-candelaria.png"
              alt="Escudo de la Institución Educativa Nuestra Señora de la Candelaria"
              width={80}
              height={105}
              className="h-20 w-auto"
            />
          </Link>
          <h3 className="mt-4 text-lg font-bold text-white">
            Institución Educativa
            <br />
            Nuestra Señora de la Candelaria
          </h3>
          <p className="mt-2 font-script text-xl text-accent-yellow">
            Educamos para transformar vidas.
          </p>
          <div className="mt-4">
            <Link
              href="https://www.colombia.co/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir a colombia.co"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Image
                src="/colombia-co-logo.png"
                alt="Colombia.co"
                width={24}
                height={24}
                style={{ width: "auto", height: 24 }}
                className="rounded-sm"
              />
              Colombia.co
              <IconExternalLink size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Columna 2: Contacto */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
            Contacto
          </h3>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <IconMapPin size={18} className="mt-0.5 shrink-0 text-accent-yellow" aria-hidden="true" />
              <span>
                Calle 10 #6sur-01,
                <br />
                Malambo, Atlántico, Colombia.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <IconClock size={18} className="mt-0.5 shrink-0 text-accent-yellow" aria-hidden="true" />
              <span>
                Lunes a viernes
                <br />
                7:00 a.m. - 3:00 p.m.
                <br />
                <span className="text-white/60">Jornada Continua</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <IconMail size={18} className="shrink-0 text-accent-yellow" aria-hidden="true" />
              <a
                href="mailto:contacto@colegiolacandelaria.edu.co"
                className="transition-colors hover:text-accent-yellow"
              >
                contacto@colegiolacandelaria.edu.co
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IconPhone size={18} className="shrink-0 text-accent-yellow" aria-hidden="true" />
              <a
                href="tel:+573042026613"
                className="transition-colors hover:text-accent-yellow"
              >
                +57 304 202 6613
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IconPhone size={18} className="mt-0.5 shrink-0 text-white/40" aria-hidden="true" />
              <span className="text-white/60">
                Línea anticorrupción:
                <br />
                +57 01 8000 940 808
              </span>
            </li>
          </ul>
        </div>

        {/* Columna 3: Enlaces y redes */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
            Acerca del sitio
          </h3>
          <ul className="space-y-2">
            {ENLACES_SITIO.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="inline-flex min-h-5 text-sm text-white/80 transition-colors hover:text-accent-yellow"
                >
                  {enlace.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-6 text-sm font-bold uppercase tracking-wider text-white/60">
            Redes sociales
          </h3>
          <ul className="space-y-2">
            {REDES_SOCIALES.map((red) => (
              <li key={red.href}>
                <a
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-5 items-center gap-2 text-sm text-white/80 transition-colors hover:text-accent-yellow"
                >
                  <red.icon size={16} aria-hidden="true" />
                  {red.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Sede principal */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
            Sede principal
          </h3>
          <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border border-white/10">
            <Image
              src="/colegio-la-candelaria-malambo.webp"
              alt="Logo de la Institución Educativa Nuestra Señora de la Candelaria"
              fill
              sizes="200px"
              className="object-contain p-4"
            />
          </div>
          <p className="mt-3 text-xs text-white/60">Código Postal: 083027</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Institución Educativa Nuestra Señora de
            la Candelaria. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terminos-y-condiciones"
              className="transition-colors hover:text-accent-yellow"
            >
              Términos
            </Link>
            <span aria-hidden="true" className="text-white/20">
              |
            </span>
            <Link
              href="/politica-de-privacidad"
              className="transition-colors hover:text-accent-yellow"
            >
              Privacidad
            </Link>
            <span aria-hidden="true" className="text-white/20">
              |
            </span>
            <Link
              href="/politica-derechos-autor"
              className="transition-colors hover:text-accent-yellow"
            >
              Derechos de autor
            </Link>
            <span aria-hidden="true" className="text-white/20">
              |
            </span>
            <Link
              href="/accesibilidad"
              className="transition-colors hover:text-accent-yellow"
            >
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
