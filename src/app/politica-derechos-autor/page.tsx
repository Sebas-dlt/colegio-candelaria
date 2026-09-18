import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Derechos de Autor",
  description:
    "Política de propiedad intelectual y derechos de autor de la Institución Educativa Nuestra Señora de la Candelaria.",
};

export default function PoliticaDerechosAutorPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Política de Derechos de Autor
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Propiedad intelectual conforme a la Ley 23 de 1982
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
              1. Propiedad Intelectual
            </h2>
            <p className="text-neutral-700">
              Todos los contenidos de este sitio web, incluyendo pero no 
              limitándose a textos, imágenes, gráficos, logotipos, íconos, 
              software, y cualquier otro material, están protegidos por las 
              leyes de propiedad intelectual vigentes en Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              2. Marco Legal
            </h2>
            <p className="text-neutral-700">
              Esta política se rige por la <strong>Ley 23 de 1982</strong> 
              (Ley sobre Derechos de Autor), el <strong>Código Penal</strong> 
              (artículos 270-271 sobre delitos contra derechos de autor), 
              y los tratados internacionales de los que Colombia es parte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              3. Usos Permitidos
            </h2>
            <p className="text-neutral-700">
              Se permite la reproducción total o parcial de los contenidos de 
              este sitio, siempre que:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>Se haga con fines educativos, sin ánimo de lucro</li>
              <li>Se cite la fuente: Institución Educativa Nuestra Señora de la Candelaria</li>
              <li>Se incluya el enlace al sitio original cuando sea posible</li>
              <li>No se modifique el contenido de manera que se distorsione su sentido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              4. Usos Prohibidos
            </h2>
            <p className="text-neutral-700">
              Queda prohibido sin autorización expresa y por escrito de la 
              institución:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>La reproducción con fines comerciales</li>
              <li>La distribución no autorizada de contenidos</li>
              <li>La modificación o creación de obras derivadas</li>
              <li>El uso de logotipos o marcas registradas</li>
              <li>La extracción sistemática de datos del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              5. Contenido de Terceros
            </h2>
            <p className="text-neutral-700">
              Algunos contenidos pueden ser de terceros y están sujetos a sus 
              propias licencias. En estos casos, se indica la fuente y se 
              respetan los términos de la licencia original.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              6. Marcas Registradas
            </h2>
            <p className="text-neutral-700">
              Los nombres, logotipos y demás signos distintivos son propiedad 
              de la Institución Educativa Nuestra Señora de la Candelaria o 
              de terceros que han autorizado su uso. Queda prohibido su uso 
              sin autorización.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              7. Contenido Generado por Usuarios
            </h2>
            <p className="text-neutral-700">
              El contenido enviado a través de formularios, PQRS u otros 
              canales, es responsabilidad de quien lo envía. La institución 
              se reserva el derecho de utilizarlo con fines institucionales 
              y educativos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              8. Contacto
            </h2>
            <p className="text-neutral-700">
              Para solicitudes de autorización o consultas sobre derechos 
              de autor:
            </p>
            <div className="rounded-lg bg-neutral-50 p-4 text-neutral-700">
              <p><strong>Correo:</strong> contacto@colegiolacandelaria.edu.co</p>
              <p><strong>Teléfono:</strong> +57 304 202 6613</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}