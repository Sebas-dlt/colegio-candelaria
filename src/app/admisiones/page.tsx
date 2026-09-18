"use client";

import { useState } from "react";
import {
  IconSchool,
  IconClipboardCheck,
  IconCalendar,
  IconPhone,
  IconMail,
  IconChevronRight,
  IconChevronDown,
  IconFileText,
  IconUserPlus,
} from "@tabler/icons-react";

const STEPS = [
  {
    number: 1,
    title: "Información",
    description: "Conozca la institución y nuestro modelo educativo",
  },
  {
    number: 2,
    title: "Requisitos",
    description: "Verifique los documentos necesarios para la inscripción",
  },
  {
    number: 3,
    title: "Inscripción",
    description: "Realice el formulario de pre-inscripción",
  },
  {
    number: 4,
    title: "Resultado",
    description: "Reciba la respuesta y finalize la matrícula",
  },
];

const REQUIREMENTS = [
  {
    grade: "Preescolar",
    docs: [
      "Registro civil de nacimiento",
      "Fotocopia cédula del acudiente",
      "Certificado de salud",
      "Fotos tamaño carnet (4)",
      "Formulario de inscripción diligenciado",
    ],
  },
  {
    grade: "Primaria (1° - 5°)",
    docs: [
      "Registro civil de nacimiento",
      "Fotocopia cédula del acudiente",
      "Certificado de notas grado anterior",
      "Certificado de salud",
      "Fotos tamaño carnet (4)",
      "Formulario de inscripción diligenciado",
    ],
  },
  {
    grade: "Secundaria (6° - 9°)",
    docs: [
      "Registro civil de nacimiento",
      "Fotocopia cédula del acudiente",
      "Certificado de notas grado anterior",
      "Fotocopia de la libreta de notas",
      "Certificado de salud",
      "Fotos tamaño carnet (4)",
      "Formulario de inscripción diligenciado",
    ],
  },
  {
    grade: "Bachillerato (10° - 11°)",
    docs: [
      "Registro civil de nacimiento",
      "Fotocopia cédula del acudiente",
      "Certificado de notas grado anterior",
      "Fotocopia de la libreta de notas",
      "Certificado de salud",
      "Fotos tamaño carnet (4)",
      "Formulario de inscripción diligenciado",
    ],
  },
];

const FAQ = [
  {
    question: "¿Cuál es el valor de la matrícula?",
    answer:
      "Los valores se comunican oficialmente al inicio de cada año escolar. Contacte admisiones para información actualizada.",
  },
  {
    question: "¿Hay cupos disponibles?",
    answer:
      "Los cupos dependen de la disponibilidad por grado. Le recomendamos iniciar el proceso de inscripción temprano.",
  },
  {
    question: "¿Aceptan transferencias de otros colegios?",
    answer:
      "Sí, aceptamos estudiantes transferidos sujeto a disponibilidad de cupo y revisión de documentación.",
  },
  {
    question: "¿Cuál es el horario de clases?",
    answer:
      "Jornada continua de 7:00 a.m. a 3:00 p.m., de lunes a viernes.",
  },
];

export default function AdmisionesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Admisiones</h1>
          <p className="mt-4 text-lg text-white/80">
            Conozca el proceso de inscripción y los requisitos para formar
            parte de nuestra comunidad educativa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Proceso */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Proceso de Admisión
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-lg font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Requisitos por grado */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Requisitos por Grado
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.grade}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <IconFileText size={20} className="text-primary-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900">{req.grade}</h3>
                </div>
                <ul className="space-y-2">
                  {req.docs.map((doc, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <IconClipboardCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Fechas clave */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Fechas Clave
          </h2>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <IconCalendar
                  size={32}
                  className="mx-auto mb-3 text-primary-600"
                />
                <h3 className="mb-1 font-bold text-neutral-900">
                  Inscripciones
                </h3>
                <p className="text-sm text-neutral-600">
                  Fechas por comunicar oficialmente
                </p>
              </div>
              <div className="text-center">
                <IconSchool
                  size={32}
                  className="mx-auto mb-3 text-primary-600"
                />
                <h3 className="mb-1 font-bold text-neutral-900">
                  Evaluación
                </h3>
                <p className="text-sm text-neutral-600">
                  Pruebas de conocimiento y entrevista
                </p>
              </div>
              <div className="text-center">
                <IconUserPlus
                  size={32}
                  className="mx-auto mb-3 text-primary-600"
                />
                <h3 className="mb-1 font-bold text-neutral-900">
                  Matrícula
                </h3>
                <p className="text-sm text-neutral-600">
                  Formalización de la inscripción
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario pre-inscripción */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Formulario de Pre-inscripción
          </h2>
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <IconClipboardCheck
              size={48}
              className="mx-auto mb-4 text-primary-600"
            />
            <h3 className="mb-2 text-xl font-bold text-neutral-900">
              Disponible Próximamente
            </h3>
            <p className="mb-6 text-neutral-600">
              El formulario de pre-inscripción en línea estará disponible
              pronto. Mientras tanto, puede contactar admisiones para iniciar
              el proceso.
            </p>
            <a
              href="tel:+573042026613"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800"
            >
              <IconPhone size={16} />
              Contactar Admisiones
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-neutral-900">
            Preguntas Frecuentes
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQ.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-white"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-neutral-900">
                    {item.question}
                  </span>
                  <IconChevronDown
                    size={20}
                    className={`shrink-0 text-neutral-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="border-t border-neutral-100 px-6 pb-6 pt-4 text-sm text-neutral-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div className="rounded-2xl bg-primary-900 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">¿Necesita ayuda?</h2>
          <p className="mb-6 text-white/80">
            Comuníquese con nuestro equipo de admisiones
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+573042026613"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-neutral-100"
            >
              <IconPhone size={16} />
              +57 304 202 6613
            </a>
            <a
              href="mailto:admisiones@colegiolacandelaria.edu.co"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <IconMail size={16} />
              admisiones@colegiolacandelaria.edu.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}