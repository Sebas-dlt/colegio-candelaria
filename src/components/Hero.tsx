import Link from "next/link";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section
      aria-label="Presentación de la institución"
      className="relative flex h-[100dvh] items-center overflow-hidden bg-primary-800"
    >
      <img
        src="/hero.svg"
        alt="Fachada de la Institución Educativa Nuestra Señora de la Candelaria"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Overlay blanco apenas notable, desde esquina superior-izquierda hasta poco más abajo de las letras */}
      <div
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.78) 35%, rgba(255,255,255,0.25) 52%, rgba(255,255,255,0) 62%)",
        }}
        className="absolute inset-0"
      />
      {/* Degradado sutil en esquina superior derecha para legibilidad del badge */}
      <div
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(225deg, rgba(13,43,82,0.45) 0%, rgba(13,43,82,0.18) 25%, transparent 50%)",
        }}
        className="absolute inset-0"
      />

      {/* Badge script sobre la imagen */}
      <div className="absolute right-8 top-20 z-10 hidden -rotate-2 select-none lg:block">
        <p className="font-script text-2xl leading-none text-white drop-shadow">
          Más que un colegio,
          <br />
          una familia
        </p>
        <svg
          aria-hidden="true"
          viewBox="0 0 220 12"
          className="mt-1 h-3 w-full"
          fill="none"
        >
          <path
            d="M4 8C60 2 150 2 216 6C186 8 70 10 4 8Z"
            stroke="#F2C94C"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Texto */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 lg:py-28">
        <div className="max-w-[600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary-600">
            Institución Educativa
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-primary-800 sm:text-5xl lg:text-[56px]">
            La Candelaria
          </h1>
          <h2 className="mt-2 text-2xl font-normal leading-[1.2] text-primary-800 sm:text-[28px] lg:text-[32px]">
            Educamos para transformar vidas.
          </h2>
          <p className="mt-4 max-w-[460px] text-base leading-[1.6] text-neutral-700">
            Formamos personas íntegras, competentes y comprometidas con su
            entorno, desde los valores del Evangelio.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/institucional"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-yellow px-6 py-3 text-base font-semibold text-primary-800 transition-colors hover:bg-accent-gold"
            >
              <IconArrowRight size={16} aria-hidden="true" />
              Conoce nuestra institución
            </Link>
            <Link
              href="/institucional"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-primary-800 bg-white px-6 py-3 text-base font-medium text-primary-800 transition-colors hover:bg-neutral-100"
            >
              <IconPlayerPlay size={16} aria-hidden="true" />
              Ver video
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}