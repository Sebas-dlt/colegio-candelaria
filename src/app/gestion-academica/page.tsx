import type { Metadata } from "next";
import {
  IconBook,
  IconTrophy,
  IconSchool,
  IconClipboardList,
  IconLibrary,
  IconChevronDown,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Gestión Académica",
  description:
    "Conozca nuestra oferta académica, proyectos transversales y resultados educativos.",
};

const GRADES = [
  "Preescolar",
  "Primero",
  "Segundo",
  "Tercero",
  "Cuarto",
  "Quinto",
  "Sexto",
  "Séptimo",
  "Octavo",
  "Noveno",
  "Décimo",
  "Once",
];

const PROJECTS = [
  {
    title: "Proyecto de Vida",
    description:
      "Fortalecemos las competencias socioemocionales y el proyecto de vida de cada estudiante.",
    color: "bg-blue-500",
  },
  {
    title: "Inglés Intensivo",
    description:
      "Programa bilingüe con metodología comunicativa y tecnología integrada.",
    color: "bg-green-500",
  },
  {
    title: "Tecnología e Innovación",
    description:
      "Formación en pensamiento computacional, robótica y uso responsable de la tecnología.",
    color: "bg-purple-500",
  },
  {
    title: "Formación Ciudadana",
    description:
      "Educación en derechos, deberes y participación ciudadana activa.",
    color: "bg-orange-500",
  },
];

const RESULTS = [
  { year: "2023", saber11: "3.8", icfes: "Bueno" },
  { year: "2022", saber11: "3.6", icfes: "Bueno" },
  { year: "2021", saber11: "3.5", icfes: "Aceptable" },
];

export default function GestionAcademicaPage() {
  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Gestión Académica</h1>
          <p className="mt-4 text-lg text-white/80">
            Nuestra oferta educativa, proyectos transversales y resultados de
            aprendizaje.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Niveles educativos */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Niveles Educativos
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100">
                <IconSchool size={24} className="text-pink-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-neutral-900">
                Preescolar
              </h3>
              <p className="text-sm text-neutral-600">
                Atención integral a los primeros años de desarrollo, con
                metodologías lúdicas y activas.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <IconBook size={24} className="text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-neutral-900">
                Básica Primaria
              </h3>
              <p className="text-sm text-neutral-600">
                Grados 1° a 5°. Formación en competencias básicas con enfoque
                integral.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <IconClipboardList size={24} className="text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-neutral-900">
                Básica Secundaria
              </h3>
              <p className="text-sm text-neutral-600">
                Grados 6° a 9°. Profundización académica y orientación vocacional.
              </p>
            </div>
          </div>
        </div>

        {/* Proyectos transversales */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Proyectos Transversales
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div
                  className={`mb-4 h-2 w-16 rounded-full ${project.color}`}
                />
                <h3 className="mb-2 font-bold text-neutral-900">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario Académico */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Calendario Académico
          </h2>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <IconLibrary
              size={48}
              className="mx-auto mb-4 text-primary-600"
            />
            <h3 className="mb-2 text-xl font-bold text-neutral-900">
              Próximamente
            </h3>
            <p className="mb-6 text-neutral-600">
              El calendario académico 2025 estará disponible pronto.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800"
            >
              Descargar calendario anterior
            </a>
          </div>
        </div>

        {/* Resultados Saber */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Resultados ICFES
          </h2>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                    Año
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                    Promedio Saber 11
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">
                    Nivel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {RESULTS.map((row) => (
                  <tr key={row.year}>
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {row.year}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {row.saber11}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {row.icfes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Biblioteca */}
        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Biblioteca y Recursos
          </h2>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <IconLibrary
              size={48}
              className="mx-auto mb-4 text-primary-600"
            />
            <h3 className="mb-2 text-xl font-bold text-neutral-900">
              Recursos Digitales
            </h3>
            <p className="mb-6 text-neutral-600">
              Acceda a nuestro catálogo de recursos educativos digitales.
            </p>
            <p className="text-sm text-neutral-500">
              Próximamente podrá acceder a documentos, guías y material de
              apoyo desde esta sección.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}