export default function QuoteBlock() {
  return (
    <section
      aria-label="Cita motivacional"
      className="mx-auto max-w-[1280px] px-6 py-8"
    >
      <div className="flex flex-col rounded-lg bg-neutral-100 p-8">
        <h2 className="font-script text-[32px] leading-tight text-primary-800">
          Juntos construimos grandes sueños
        </h2>
        <blockquote className="mt-4 max-w-[400px] text-[16px] italic leading-[1.7] text-neutral-700">
          “La educación es la herramienta más poderosa para transformar
          vidas y construir una mejor sociedad.”
        </blockquote>
        <footer className="mt-3 text-[14px] font-semibold text-primary-800">
          — Institución Educativa Nuestra Señora de la Candelaria
        </footer>
      </div>
    </section>
  );
}