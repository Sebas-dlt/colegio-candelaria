import type { Metadata } from "next";
import Link from "next/link";
import {
  IconMessageReport,
  IconSearch,
  IconClock,
  IconPhone,
  IconMail,
  IconFileText,
  IconShield,
  IconExternalLink,
  IconMap,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Atención al Ciudadano",
  description:
    "Canal de atención ciudadana, radicación de PQRS y derechos del usuario.",
};

const SERVICES = [
  {
    icon: IconMessageReport,
    title: "Radicar PQRS",
    description:
      "Presente sus Peticiones, Quejas, Reclamos, Sugerencias o Denuncias de forma rápida y segura.",
    href: "/pqrs/radicar",
    color: "bg-blue-500",
  },
  {
    icon: IconSearch,
    title: "Consultar PQRS",
    description:
      "Verifique el estado de su solicitud con el número de radicado.",
    href: "/pqrs/consultar",
    color: "bg-green-500",
  },
];

const RIGHTS = [
  {
    title: "Derecho a la información",
    description:
      "Recibir información clara, veraz y oportuna sobre los procesos académicos y administrativos.",
  },
  {
    title: "Derecho a la petición",
    description:
      "Presentar peticiones, quejas, reclamos, sugerencias y denuncias conforme a la Ley 1755 de 2015.",
  },
  {
    title: "Derecho a la privacidad",
    description:
      "Sus datos personales serán tratados conforme a la Ley 1581 de 2012 de protección de datos.",
  },
  {
    title: "Derecho a la educación",
    description:
      "Recibir educación de calidad sin discriminación alguna.",
  },
];

const HOURS = [
  { day: "Lunes a viernes", time: "7:00 a.m. - 3:00 p.m." },
  { day: "Sábados", time: "No hay atención" },
  { day: "Domingos y festivos", time: "No hay atención" },
];

export default function AtencionCiudadanaPage() {
  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Atención al Ciudadano
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Canales de atención, derechos del ciudadano y servicios
            disponibles.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Servicios principales */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Servicios Disponibles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-primary-200 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${service.color}`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-primary-700">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600">{service.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600">
                    Acceder
                    <IconExternalLink size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Derechos del ciudadano */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Sus Derechos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {RIGHTS.map((right) => (
              <div
                key={right.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <IconShield size={20} className="text-primary-600" />
                  <h3 className="font-bold text-neutral-900">{right.title}</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {right.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Información de contacto */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {/* Horarios */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <IconClock size={24} className="text-primary-600" />
              <h3 className="text-lg font-bold text-neutral-900">
                Horarios de Atención
              </h3>
            </div>
            <div className="space-y-3">
              {HOURS.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-neutral-600">{item.day}</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <IconPhone size={24} className="text-primary-600" />
              <h3 className="text-lg font-bold text-neutral-900">
                Canales de Contacto
              </h3>
            </div>
            <div className="space-y-4">
              <a
                href="tel:+573042026613"
                className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary-700"
              >
                <IconPhone size={16} className="text-primary-600" />
                +57 304 202 6613
              </a>
              <a
                href="mailto:contacto@colegiolacandelaria.edu.co"
                className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary-700"
              >
                <IconMail size={16} className="text-primary-600" />
                contacto@colegiolacandelaria.edu.co
              </a>
              <div className="flex items-start gap-3 text-sm text-neutral-700">
                <IconMap size={16} className="mt-0.5 text-primary-600" />
                Calle 10 #6sur-01, Malambo, Atlántico
              </div>
              <div className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-medium">Línea anticorrupción</p>
                <p className="mt-1">+57 01 8000 940 808</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marco legal */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Marco Legal
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <IconFileText
                size={32}
                className="mx-auto mb-3 text-primary-600"
              />
              <h3 className="mb-2 font-bold text-neutral-900">
                Ley 1755 de 2015
              </h3>
              <p className="text-sm text-neutral-600">
                Derecho fundamental de petición
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <IconFileText
                size={32}
                className="mx-auto mb-3 text-primary-600"
              />
              <h3 className="mb-2 font-bold text-neutral-900">
                Ley 1581 de 2012
              </h3>
              <p className="text-sm text-neutral-600">
                Protección de datos personales
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
              <IconFileText
                size={32}
                className="mx-auto mb-3 text-primary-600"
              />
              <h3 className="mb-2 font-bold text-neutral-900">
                Ley 1712 de 2014
              </h3>
              <p className="text-sm text-neutral-600">
                Transparencia y acceso a información pública
              </p>
            </div>
          </div>
        </div>

        {/* Formularios descargables */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Formularios Descargables
          </h2>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <IconFileText
              size={48}
              className="mx-auto mb-4 text-primary-600"
            />
            <h3 className="mb-2 text-xl font-bold text-neutral-900">
              Próximamente
            </h3>
            <p className="text-neutral-600">
              Los formularios de PQRS y solicitudes estarán disponibles para
              descarga en esta sección.
            </p>
          </div>
        </div>

        {/* Portal nacional */}
        <div className="rounded-2xl bg-primary-900 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">
            Portal Nacional de Quejas y Soluciones
          </h2>
          <p className="mb-6 text-white/80">
            Para quejas y reclamos ante entidades del Estado
          </p>
          <a
            href="https://www.gov.co/requejas-y-soluciones"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-neutral-100"
          >
            Ir al portal
            <IconExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}