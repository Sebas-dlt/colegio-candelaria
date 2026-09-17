import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

const ICON_SRC = {
  notas: "/iconos/notas.png",
  simat: "/iconos/simat.png",
  pqrsd: "/iconos/pqrsd.png",
  horarios: "/iconos/horarios.png",
  guias: "/iconos/gestion.png",
  admisiones: "/iconos/admisiones.png",
} as const;

type Acceso = {
  titulo: string;
  descripcion: string;
  href: string;
  icono: keyof typeof ICON_SRC;
};

const ACCESOS: Acceso[] = [
  {
    titulo: "Notas Académicas",
    descripcion: "Consulta tus calificaciones y desempeño.",
    href: "/gestion-academica",
    icono: "notas",
  },
  {
    titulo: "Horarios",
    descripcion: "Revisa tu horario de clases y actividades.",
    href: "/gestion-academica",
    icono: "horarios",
  },
  {
    titulo: "Guías Docentes",
    descripcion: "Material de apoyo por grado y área.",
    href: "/gestion-academica",
    icono: "guias",
  },
  {
    titulo: "SIMAT",
    descripcion: "Consulta y actualiza tu información.",
    href: "/admisiones",
    icono: "simat",
  },
  {
    titulo: "PQRSD",
    descripcion: "Radica tus solicitudes, quejas o reclamos.",
    href: "/atencion-ciudadana",
    icono: "pqrsd",
  },
  {
    titulo: "Admisiones y Cupos",
    descripcion: "Proceso SIMAT, requisitos de matrícula.",
    href: "/admisiones",
    icono: "admisiones",
  },
];

export default function QuickAccess() {
  return (
    <section
      aria-labelledby="accesos-rapidos-title"
      className="mx-auto max-w-[1280px] px-6 py-12"
      id="seccion-accesos"
    >
      <h2
        id="accesos-rapidos-title"
        className="text-[20px] font-bold text-primary-800"
      >
        Accesos rápidos
      </h2>
      <p className="mt-1 text-[14px] text-neutral-500">
        Encuentra aquí los servicios y plataformas que necesitas.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {ACCESOS.map((acceso) => (
          <li key={acceso.titulo}>
            <Link
              href={acceso.href}
              className="group flex min-h-11 flex-col items-center rounded-lg bg-white px-2 py-6 shadow-card transition-shadow hover:shadow-md"
            >
              <Image
                src={ICON_SRC[acceso.icono]}
                alt=""
                width={48}
                height={48}
                className="mb-3 h-12 w-12"
              />
              <span className="text-[14px] font-semibold text-primary-800">
                {acceso.titulo}
              </span>
              <span className="mt-1 line-clamp-2 text-center text-[12px] text-neutral-500">
                {acceso.descripcion}
              </span>
              <IconArrowRight
                size={16}
                aria-hidden="true"
                className="mt-2 text-primary-600 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}