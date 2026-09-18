import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web de la Institución Educativa Nuestra Señora de la Candelaria.",
};

export default function TerminosCondicionesPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Condiciones de uso del sitio web institucional
          </p>
          <p className="mt-2 text-sm text-white/60">
            Última actualización: Septiembre 2025
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              1. Aceptación de los Términos
            </h2>
            <p className="text-neutral-700">
              El acceso y uso de este sitio web implica la aceptación de los 
              presentes términos y condiciones. Si no está de acuerdo con 
              alguno de ellos, le solicitamos no utilizar este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              2. Objeto
            </h2>
            <p className="text-neutral-700">
              Este sitio web tiene como finalidad proporcionar información 
              institucional, servicios educativos y canales de atención al 
              ciudadano de la Institución Educativa Nuestra Señora de la Candelaria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              3. Uso del Sitio
            </h2>
            <p className="text-neutral-700">
              El usuario se compromete a utilizar este sitio de manera 
              responsable, respetando la legislación vigente y los derechos 
              de terceros. Queda prohibido:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>Utilizar el sitio para fines ilícitos o no autorizados</li>
              <li>Intentar acceder a áreas restringidas sin autorización</li>
              <li>Interferir en el funcionamiento del sitio</li>
              <li>Envíar contenido ofensivo, difamatorio o ilegal</li>
              <li>Recopilar datos de otros usuarios sin autorización</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              4. Contenido del Sitio
            </h2>
            <p className="text-neutral-700">
              La información publicada tiene carácter informativo y 
              educativo. Aunque nos esforzamos por mantenerla actualizada, 
              no garantizamos su exactitud o vigencia. La información 
              oficial se publica en los canales institucionales autorizados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              5. Formularios y PQRS
            </h2>
            <p className="text-neutral-700">
              Al utilizar los formularios de este sitio, el usuario declara 
              que la información proporcionada es veraz y completa. Las PQRS 
              radicadas serán gestionadas conforme a la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              6. Enlaces Externos
            </h2>
            <p className="text-neutral-700">
              Este sitio puede contener enlaces a páginas de terceros. La 
              institución no se hace responsable por el contenido, políticas 
              de privacidad o prácticas de dichos sitios externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              7. Cookies
            </h2>
            <p className="text-neutral-700">
              Este sitio puede utilizar cookies técnicas para mejorar la 
              experiencia de navegación. No se utilizan cookies de 
              rastreo o publicitarias. El usuario puede configurar su 
              navegador para bloquearlas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              8. Limitación de Responsabilidad
            </h2>
            <p className="text-neutral-700">
              La institución no será responsable por daños directos o 
              indirectos derivados del uso de este sitio web, incluyendo 
              pero no limitándose a pérdidas de datos, interrupciones del 
              servicio o errores en el contenido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              9. Propiedad Intelectual
            </h2>
            <p className="text-neutral-700">
              Los contenidos de este sitio están protegidos por las leyes 
              de propiedad intelectual. Para más información, consulte 
              nuestra <a href="/politica-derechos-autor" className="text-primary-700 hover:underline">Política de Derechos de Autor</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              10. Protección de Datos
            </h2>
            <p className="text-neutral-700">
              El tratamiento de datos personales se rige por nuestra 
              <a href="/politica-de-privacidad" className="text-primary-700 hover:underline"> Política de Privacidad</a>, 
              conforme a la Ley 1581 de 2012.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              11. Modificaciones
            </h2>
            <p className="text-neutral-700">
              La institución se reserva el derecho de modificar estos 
              términos y condiciones en cualquier momento. Las 
              modificaciones serán publicadas en este sitio y entrarán 
              en vigor desde su publicación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              12. Legislación Aplicable
            </h2>
            <p className="text-neutral-700">
              Estos términos se rigen por la legislación colombiana. 
              Cualquier controversia será sometida a los tribunales 
              competentes de la República de Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              13. Contacto
            </h2>
            <p className="text-neutral-700">
              Para consultas sobre estos términos y condiciones:
            </p>
            <div className="rounded-lg bg-neutral-50 p-4 text-neutral-700">
              <p><strong>Correo:</strong> contacto@colegiolacandelaria.edu.co</p>
              <p><strong>Teléfono:</strong> +57 304 202 6613</p>
              <p><strong>Dirección:</strong> Calle 10 #6sur-01, Malambo, Atlántico</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}