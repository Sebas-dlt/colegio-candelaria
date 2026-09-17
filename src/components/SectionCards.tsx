import Link from "next/link";
import Image from "next/image";

type Seccion = {
  titulo: string;
  descripcion: string;
  href: string;
  icono: string;
  imagen: string;
  color: string;
};

const SECCIONES: Seccion[] = [
  {
    titulo: "Institucional",
    descripcion:
      "Conoce nuestro PEI, historia, equipo directivo, sedes y manual de convivencia.",
    href: "/institucional",
    icono: "/iconos/seccion_institucional.png",
    imagen: "/sections/institucional.jpg",
    color: "text-card-blue",
  },
  {
    titulo: "Transparencia y Ley",
    descripcion:
      "Informes de gestión, ejecución presupuestal, contratación pública y Habeas Data (Ley 1712).",
    href: "/transparencia",
    icono: "/iconos/seccion_transparencia.png",
    imagen: "/sections/transparencia.jpg",
    color: "text-card-green",
  },
  {
    titulo: "Gestión Académica",
    descripcion:
      "Plataforma de calificaciones, horarios, guías docentes y calendario escolar.",
    href: "/gestion-academica",
    icono: "/iconos/seccion_gestion.png",
    imagen: "/sections/gestion-academica.jpg",
    color: "text-card-purple",
  },
  {
    titulo: "Admisiones y Cupos",
    descripcion:
      "Proceso SIMAT, requisitos de matrícula y formulario de solicitud de cupo.",
    href: "/admisiones",
    icono: "/iconos/seccion_admisiones.png",
    imagen: "/sections/admisiones.jpg",
    color: "text-card-orange",
  },
  {
    titulo: "Atención al Ciudadano",
    descripcion:
      "Módulo PQRSD, datos de contacto por sede, horario de atención y WhatsApp.",
    href: "/atencion-ciudadana",
    icono: "/iconos/seccion_ciudadano.png",
    imagen: "/sections/atencion-ciudadana.jpg",
    color: "text-card-teal",
  },
];

export default function SectionCards() {
  return (
    <section
      aria-labelledby="secciones-title"
      className="mx-auto max-w-[1280px] px-6 py-8"
      id="seccion-secciones"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SECCIONES.map((seccion) => (
          <article
            key={seccion.titulo}
            className="group overflow-hidden rounded-lg bg-white shadow-card"
          >
            {/* Imagen de la sección */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={seccion.imagen}
                alt={seccion.titulo}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="relative p-4 pb-5 pl-5">
              <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
                <Image
                  src={seccion.icono}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </span>

              <h3 className="mt-6 text-[18px] font-bold text-primary-800">
                {seccion.titulo}
              </h3>
              <p className="mt-2 line-clamp-3 text-[14px] leading-[1.5] text-neutral-500">
                {seccion.descripcion}
              </p>
              <Link
                href={seccion.href}
                className="mt-3 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-primary-600 transition-colors hover:underline"
              >
                Ver más →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}