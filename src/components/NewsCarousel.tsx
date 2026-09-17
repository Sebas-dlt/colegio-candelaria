import Link from "next/link";
import Image from "next/image";
import { IconCalendar } from "@tabler/icons-react";

type Noticia = {
  categoria: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
};

const NOTICIAS: Noticia[] = [
  {
    categoria: "Institucional",
    titulo: "Inicio del año escolar 2025",
    descripcion:
      "Con entusiasmo recibimos a nuestros estudiantes en este nuevo año académico.",
    fecha: "20 de enero de 2025",
    imagen: "/news/noticia-1.png",
  },
  {
    categoria: "Admisiones",
    titulo: "Proceso de matrículas 2025",
    descripcion:
      "Conoce los requisitos y pasos para realizar el proceso de matrícula.",
    fecha: "15 de enero de 2025",
    imagen: "/news/noticia-2.png",
  },
  {
    categoria: "Gestión Académica",
    titulo: "Entrega de informes académicos",
    descripcion:
      "Consulta aquí las fechas y modalidades de entrega de informes.",
    fecha: "10 de enero de 2025",
    imagen: "/news/noticia-3.png",
  },
  {
    categoria: "Eventos",
    titulo: "Olimpiadas deportivas 2025",
    descripcion:
      "Nuestros estudiantes brillaron en la jornada deportiva intercolegiada.",
    fecha: "5 de enero de 2025",
    imagen: "/news/noticia-4.png",
  },
];

export default function NewsCarousel() {
  return (
    <section
      aria-labelledby="noticias-title"
      className="mx-auto max-w-[1280px] px-6 py-12"
      id="seccion-noticias"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="noticias-title"
            className="text-2xl font-bold text-primary-800"
          >
            Noticias y novedades
          </h2>
          <p className="mt-1 text-[14px] text-neutral-500">
            Mantente informado sobre todo lo que pasa en nuestra institución.
          </p>
        </div>
        <Link
          href="/noticias"
          className="inline-flex min-h-11 items-center rounded-full border-2 border-primary-800 px-5 py-2 text-[14px] font-semibold text-primary-800 transition-colors hover:bg-neutral-100"
        >
          Ver todas las noticias →
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NOTICIAS.map((noticia) => (
          <li key={noticia.titulo}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card">
              {/* Imagen de la noticia */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-sm bg-primary-800 px-2 py-1 text-[12px] font-semibold text-white">
                  {noticia.categoria}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="mt-2 text-[16px] font-bold leading-snug text-primary-800">
                  {noticia.titulo}
                </h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-[1.6] text-neutral-500">
                  {noticia.descripcion}
                </p>
                <p className="mt-3 flex items-center gap-1.5 pt-2 text-[12px] text-neutral-500">
                  <IconCalendar size={14} aria-hidden="true" />
                  {noticia.fecha}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
