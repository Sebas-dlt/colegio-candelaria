import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accesibilidad",
  description:
    "Declaración de accesibilidad del sitio web de la Institución Educativa Nuestra Señora de la Candelaria.",
};

export default function AccesibilidadPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Accesibilidad</h1>
          <p className="mt-4 text-lg text-white/80">
            Compromiso con la accesibilidad web universal
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Nuestro Compromiso
            </h2>
            <p className="text-neutral-700">
              La Institución Educativa Nuestra Señora de la Candelaria se 
              compromete a hacer que su sitio web sea accesible para todas 
              las personas, independientemente de sus capacidades o 
              tecnología que utilicen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Estándares de Accesibilidad
            </h2>
            <p className="text-neutral-700">
              Este sitio se esfuerza por cumplir con las directrices de 
              accesibilidad web:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li><strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines) nivel AA</li>
              <li><strong>Ley 1346 de 2009</strong> - Convención sobre los Derechos de las Personas con Discapacidad</li>
              <li><strong>Resolución 1519 de 2020</strong> - Lineamientos de accesibilidad web para el sector público</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Características de Accesibilidad
            </h2>
            <p className="text-neutral-700">
              Este sitio incluye las siguientes características:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li><strong>Contraste de colores:</strong> Colores que cumplen con ratios de contraste mínimos</li>
              <li><strong>Texto alternativo:</strong> Descripciones en imágenes significativas</li>
              <li><strong>Navegación por teclado:</strong> Todas las funcionalidades accesibles sin mouse</li>
              <li><strong>Estructura semántica:</strong> Encabezados y estructura lógica del contenido</li>
              <li><strong>Texto redimensionable:</strong> El contenido se adapta al zoom del navegador</li>
              <li><strong>Enlaces descriptivos:</strong> Textos que describen el destino del enlace</li>
              <li><strong>Formularios accesibles:</strong> Etiquetas y mensajes de error claros</li>
              <li><strong>Lenguaje claro:</strong> Contenido escrito de forma simple y directa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Navegación por Teclado
            </h2>
            <p className="text-neutral-700">
              Puede navegar por este sitio usando las siguientes teclas:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li><strong>Tab:</strong> Moverse entre elementos interactivos</li>
              <li><strong>Shift + Tab:</strong> Moverse en sentido inverso</li>
              <li><strong>Enter:</strong> Activar enlaces y botones</li>
              <li><strong>Espacio:</strong> Activar checkboxes y botones</li>
              <li><strong>Flechas:</strong> Navegar en menús y listas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
             _compatibilidad con Lectores de Pantalla
            </h2>
            <p className="text-neutral-700">
              Este sitio es compatible con los principales lectores de pantalla:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>JAWS (Job Access With Speech)</li>
              <li>NVDA (NonVisual Desktop Access)</li>
              <li>VoiceOver (macOS/iOS)</li>
              <li>TalkBack (Android)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Limitaciones Conocidas
            </h2>
            <p className="text-neutral-700">
              A pesar de nuestro compromiso, puede haber limitaciones en 
              algunas áreas del sitio. Estamos trabajando continuamente 
              para mejorar la accesibilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Retroalimentación
            </h2>
            <p className="text-neutral-700">
              Si encuentra problemas de accesibilidad o tiene sugerencias 
              para mejorar, por favor contáctenos:
            </p>
            <div className="rounded-lg bg-neutral-50 p-4 text-neutral-700">
              <p><strong>Correo:</strong> contacto@colegiolacandelaria.edu.co</p>
              <p><strong>Teléfono:</strong> +57 304 202 6613</p>
              <p><strong>Dirección:</strong> Calle 10 #6sur-01, Malambo, Atlántico</p>
            </div>
            <p className="mt-4 text-neutral-700">
              Nos comprometemos a responder a sus solicitudes de 
              accesibilidad en un plazo máximo de 15 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              Fecha de Declaración
            </h2>
            <p className="text-neutral-700">
              Esta declaración de accesibilidad fue actualizada por última 
              vez en septiembre de 2025.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}