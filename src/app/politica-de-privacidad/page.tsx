import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de tratamiento de datos personales de la Institución Educativa Nuestra Señora de la Candelaria.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Tratamiento de datos personales conforme a la Ley 1581 de 2012
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
              1. Responsable del Tratamiento
            </h2>
            <p className="text-neutral-700">
              La <strong>Institución Educativa Nuestra Señora de la Candelaria</strong>, 
              con domicilio en Calle 10 #6sur-01, Malambo, Atlántico, Colombia, 
              es responsable del tratamiento de los datos personales recopilados 
              a través de este sitio web y demás canales institucionales.
            </p>
            <p className="text-neutral-700">
              <strong>Contacto:</strong> contacto@colegiolacandelaria.edu.co | 
              +57 304 202 6613
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              2. Marco Legal
            </h2>
            <p className="text-neutral-700">
              Esta política se rige por la <strong>Ley 1581 de 2012</strong> 
              (Ley de Protección de Datos Personales) y el <strong>Decreto 
              1377 de 2013</strong>, que regulan el tratamiento de datos 
              personales en Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              3. Datos Personales Recopilados
            </h2>
            <p className="text-neutral-700">
              En el desarrollo de su actividad institucional, la entidad puede 
              recopilar los siguientes datos personales:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>Datos de identificación: nombre completo, número de documento, fecha de nacimiento</li>
              <li>Datos de contacto: dirección, correo electrónico, teléfono</li>
              <li>Datos académicos:歷史 escolar, calificaciones, observaciones</li>
              <li>Datos de salud: información médica relevante para la atención integral</li>
              <li>Datos de representantes: información de acudientes y representantes legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              4. Finalidad del Tratamiento
            </h2>
            <p className="text-neutral-700">
              Los datos personales serán utilizados para:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li>Gestión académica y administrativa del estudiante</li>
              <li>Comunicación institucional con representantes</li>
              <li>Gestión de PQRS (Peticiones, Quejas, Reclamos, Sugerencias, Denuncias)</li>
              <li>Cumplimiento de obligaciones legales y normativas</li>
              <li>Elaboración de informes estadísticos (datos anonimizados)</li>
              <li>Protección de la integridad del estudiante y la comunidad educativa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              5. Derechos del Titular
            </h2>
            <p className="text-neutral-700">
              Conforme a la Ley 1581 de 2012, usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-neutral-700">
              <li><strong>Conocer:</strong> Qué datos tenemos sobre usted y cómo los tratamos</li>
              <li><strong>Actualizar:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Solicitar supresión:</strong> Eliminar datos cuando ya no sean necesarios</li>
              <li><strong>Oponerse:</strong> Al tratamiento de sus datos para finalidades específicas</li>
              <li><strong>Revocar autorización:</strong> En cualquier momento, cuando considere que no se están tratando conforme a la ley</li>
              <li><strong>Presentar queja:</strong> Ante la Superintendencia de Industria y Comercio (SIC)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              6. Autorización
            </h2>
            <p className="text-neutral-700">
              El tratamiento de datos personales requiere la autorización previa, 
              expresa e inequívoca del titular, salvo las excepciones previstas 
              en el artículo 13 de la Ley 1581 de 2012.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              7. Medidas de Seguridad
            </h2>
            <p className="text-neutral-700">
              La entidad ha adoptado las medidas técnicas, humanas y administrativas 
              necesarias para garantizar la seguridad de los datos personales, 
              evitando su adulteración, pérdida, consulta, uso o acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              8. Transferencia Internacional
            </h2>
            <p className="text-neutral-700">
              Los datos personales no serán transferidos a países que no cuenten 
              con niveles adecuados de protección, salvo que exista autorización 
              expresa del titular o se trate de una excepción legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              9. Vigencia
            </h2>
            <p className="text-neutral-700">
              Esta política de privacidad rige a partir de su publicación y 
              permanecerá vigente mientras la entidad desarrolle su actividad 
              institucional. Cualquier cambio será comunicado oportunamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900">
              10. Contacto
            </h2>
            <p className="text-neutral-700">
              Para ejercer sus derechos o solicitar información adicional sobre 
              el tratamiento de sus datos personales, comuníquese a:
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