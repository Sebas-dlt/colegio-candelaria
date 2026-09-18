import type { Metadata } from "next";
import {
  IconSchool,
  IconHeart,
  IconBulb,
  IconUsers,
  IconClock,
  IconMapPin,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "Conozca nuestra misión, visión, valores, historia y estructura organizacional.",
};

const VALUES = [
  {
    icon: IconHeart,
    title: "Amor",
    description: "Formamos personas desde el amor como motor de transformación.",
  },
  {
    icon: IconSchool,
    title: "Excelencia",
    description: "Buscamos la calidad en cada actividad educativa.",
  },
  {
    icon: IconBulb,
    title: "Innovación",
    description: "Incorporamos metodologías y tecnologías de vanguardia.",
  },
  {
    icon: IconUsers,
    title: "Comunidad",
    description: "Construimos en comunidad, fortaleciendo los lazos familiares.",
  },
  {
    icon: IconStar,
    title: "Valores",
    description: "Basamos nuestra educación en los valores del Evangelio.",
  },
];

const DIRECTIVES = [
  {
    name: "Rector/a",
    role: "Dirección General",
    description: "Lidera la institución y define la política educativa.",
  },
  {
    name: "Coordinador/a Académico",
    role: "Coordinación Académica",
    description: "Supervisa los procesos pedagógicos y curriculares.",
  },
  {
    name: "Coordinador/a Administrativo",
    role: "Gestión Administrativa",
    description: "Administra los recursos y procesos administrativos.",
  },
  {
    name: "Orientador/a",
    role: "Bienestar Estudiantil",
    description: "Acompaña el desarrollo integral de los estudiantes.",
  },
];

const TIMELINE = [
  {
    year: "Inicio",
    title: "Fundación",
    description:
      "La Institución Educativa Nuestra Señora de la Candelaria abrió sus puertas con el sueño de formar personas íntegras.",
  },
  {
    year: "Crecimiento",
    title: "Expansión",
    description:
      "Ampliamos nuestra oferta educativa y fortalecieron nuestros programas académicos.",
  },
  {
    year: "Presente",
    title: "Consolidación",
    description:
      "Somos una referencia educativa en Malambo, formando líderes comprometidos con su comunidad.",
  },
];

const SEDES = [
  {
    name: "Sede Principal",
    address: "Calle 10 #6sur-01, Malambo, Atlántico",
    schedule: "Lunes a viernes: 7:00 a.m. - 3:00 p.m.",
    phone: "+57 304 202 6613",
  },
];

export default function InstitucionalPage() {
  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Institucional</h1>
          <p className="mt-4 text-lg text-white/80">
            Conozca nuestra historia, misión, visión y el equipo que lidera la
            transformación educativa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Misión y Visión */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <IconSchool size={24} className="text-primary-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">
              Misión
            </h2>
            <p className="leading-relaxed text-neutral-600">
              La Institución Educativa Nuestra Señora de la Candelaria ofrece
              servicio educativo oficial humanista a niños, niñas y jóvenes del
              municipio de Malambo, a través de una propuesta académica
              cognitivo-social, una formación técnica y un proyecto espiritual
              que promuevan su desarrollo integral y le permitan generar
              transformaciones en su entorno.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-yellow/20">
              <IconBulb size={24} className="text-accent-gold" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">
              Visión
            </h2>
            <p className="leading-relaxed text-neutral-600">
              La Institución Educativa Nuestra Señora de la Candelaria del
              municipio de Malambo se visualiza a sí misma para el 2026 como
              una escuela líder, reconocida a nivel departamental por su
              disciplina, fortalecimiento del inglés como segunda lengua,
              mejoramiento continuo en los resultados de las pruebas saber y la
              utilización de ambientes que privilegien el uso de las TICS.emás,
              se proyecta como una escuela que fomenta el emprendimiento entre
              sus estudiantes y las relaciones cercanas con los padres de
              familia.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Nuestros Valores
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <h3 className="mb-2 font-bold text-neutral-900">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historia */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Nuestra Historia
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary-200" />
            <div className="space-y-8">
              {TIMELINE.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2" />
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="w-1/2 rounded-2xl border border-neutral-200 bg-white p-6">
                    <p className="mb-1 text-sm font-medium text-primary-600">
                      {item.year}
                    </p>
                    <h3 className="mb-2 font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directivos */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Equipo Directivo
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIRECTIVES.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="font-bold text-neutral-900">{person.name}</h3>
                <p className="text-sm font-medium text-primary-600">
                  {person.role}
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  {person.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sedes */}
        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Nuestras Sedes
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {SEDES.map((sede) => (
              <div
                key={sede.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <h3 className="mb-4 text-lg font-bold text-neutral-900">
                  {sede.name}
                </h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <IconMapPin size={18} className="mt-0.5 shrink-0 text-primary-600" />
                    {sede.address}
                  </div>
                  <div className="flex items-start gap-3">
                    <IconClock size={18} className="mt-0.5 shrink-0 text-primary-600" />
                    {sede.schedule}
                  </div>
                  <div className="flex items-center gap-3">
                    <IconPhone size={18} className="shrink-0 text-primary-600" />
                    {sede.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}