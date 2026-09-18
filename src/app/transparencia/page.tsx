import type { Metadata } from "next";
import Link from "next/link";

import {
  IconBuilding,
  IconScale,
  IconFileText,
  IconPlane,
  IconUsers,
  IconClipboardList,
  IconShield,
  IconExternalLink,
  IconChevronRight,
  IconPhone,
  IconMail,
  IconMap,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Transparencia y Acceso a la Información Pública",
  description:
    "Información pública de la Institución Educativa Nuestra Señora de la Candelaria conforme a la Ley 1712 de 2014.",
};

const SECTIONS = [
  { id: "entidad", icon: IconBuilding, title: "Información de la Entidad", description: "Información institucional, estructura y servicios." },
  { id: "normatividad", icon: IconScale, title: "Normatividad", description: "Normativa, reglamentos y proyectos de normas." },
  { id: "contratacion", icon: IconFileText, title: "Contratación", description: "Procesos contractuales, ejecución y manuales." },
  { id: "planeacion", icon: IconPlane, title: "Planeación y Presupuesto", description: "Presupuesto, ejecución, planes e informes de gestión." },
  { id: "tramites", icon: IconClipboardList, title: "Trámites", description: "Procedimientos y formularios institucionales." },
  { id: "participacion", icon: IconUsers, title: "Participación Ciudadana", description: "Mecanismos de participación y veeduría." },
];

const MARCO_LEGAL = [
  { title: "Ley 1712 de 2014", description: "Ley de Transparencia y Acceso a la Información Pública." },
  { title: "Ley 1581 de 2012", description: "Ley de Protección de Datos Personales." },
  { title: "Ley 1755 de 2015", description: "Derecho Fundamental de Petición." },
  { title: "Decreto 1083 de 2015", description: "Decreto Único Reglamentario del Sector Función Pública." },
];

const ENTIDADES_NACIONALES = [
  { label: "Presidencia de la República de Colombia", href: "https://www.presidencia.gov.co/" },
  { label: "Ministerio de Educación Nacional", href: "https://www.mineducacion.gov.co/portal/" },
  { label: "Procuraduría General de la Nación", href: "https://www.procuraduria.gov.co/" },
  { label: "Contraloría General de la República", href: "https://www.contraloria.gov.co/" },
  { label: "Colombia Compra Eficiente", href: "https://www.colombiacompra.gov.co/" },
  { label: "Portal Único del Estado Colombiano", href: "https://www.gov.co/" },
  { label: "Directorio de Establecimientos Educativos", href: "https://sineb.mineducacion.gov.co/bcol/app" },
  { label: "ICBF", href: "https://www.icbf.gov.co/" },
  { label: "INCI", href: "https://www.inci.gov.co/" },
  { label: "INSOR", href: "https://educativo.insor.gov.co/" },
  { label: "ICETEX", href: "https://www.icetex.gov.co" },
];

const ENTIDADES_TERRITORIALES = [
  { label: "Gobernación del Atlántico", href: "https://www.atlantico.gov.co/" },
  { label: "Alcaldía Municipal de Malambo", href: "https://www.malambo-atlantico.gov.co" },
];

const NORMATIVIDAD_LEYES = [
  { label: "Ley 115 de 1994 – Ley General de Educación", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=292" },
  { label: "Ley 715 de 2001 – Distribución de recursos del SGP", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4452" },
  { label: "Ley 1098 de 2006 – Código de la Infancia y Adolescencia", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=22106" },
  { label: "Decreto Ley 2277 de 1979 – Antiguo Estatuto Docente", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1216" },
  { label: "Decreto Ley 1278 de 2002 – Nuevo Estatuto Docente", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5353" },
  { label: "Ley 1620 de 2013 – Sistema Nacional de Convivencia Escolar", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=52287" },
  { label: "Decreto 1965 de 2013 – Reglamenta Ley 1620", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=54537" },
  { label: "Decreto 1421 de 2017 – Atención educativa con discapacidad", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=87040" },
  { label: "Ley 594 de 2000 – Ley General de Archivos", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4275" },
  { label: "Ley 1618 de 2013 – Derechos personas con discapacidad", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=52081" },
  { label: "Ley 1523 de 2012 – Gestión del riesgo de desastres", href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=47141" },
];

const NORMATIVIDAD_MANUALES = [
  { label: "Manual de Convivencia Vigente 2025", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/MANUAL-DE-CONVIVENCIA-2025.pdf" },
  { label: "Lineamientos Constitución Política y Democracia", href: "http://www.mineducacion.gov.co/1759/articles-339975_recurso_3.pdf" },
  { label: "Lineamientos Ciencias Sociales", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_1.pdf" },
  { label: "Lineamientos Cátedra Estudios Afrocolombianos", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_2.pdf" },
  { label: "Lineamientos Educación Artística", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_4.pdf" },
  { label: "Lineamientos Ciencias Naturales y Educación Ambiental", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_5.pdf" },
  { label: "Lineamientos Matemáticas", href: "https://www.mineducacion.gov.co/1759/articles-339975_matematicas.pdf" },
  { label: "Lineamientos Lengua Castellana", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_6.pdf" },
  { label: "Lineamientos Idiomas Extranjeros", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_7.pdf" },
  { label: "Lineamientos Ética y Valores", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_9.pdf" },
  { label: "Lineamientos Educación Física", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_10.pdf" },
  { label: "Lineamientos Educación Preescolar", href: "https://www.mineducacion.gov.co/1759/articles-339975_recurso_11.pdf" },
  { label: "Lineamientos Indicadores de Logros Curriculares", href: "https://www.mineducacion.gov.co/1621/articles-89869_archivo_pdf11.pdf" },
];

const CIRCULARES_2025 = [
  { num: "004", fecha: "21 de mayo de 2025", tema: "Orientaciones para la redacción de observaciones en el corte preventivo", desc: "Guía para docentes sobre redacción de observaciones concretas y respetuosas en SISMAC para estudiantes con dificultades académicas o de comportamiento.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/004-ORIENTACION-SOBRE-OBSERVACIONES-CORTE-PREVENTIVO.pdf" },
  { num: "003", fecha: "06 de mayo de 2025", tema: "Conformación del COPASST 2025-2027", desc: "Inicio del proceso de conformación del Comité Paritario de Seguridad y Salud en el Trabajo. Inscripción de candidatos 7-9 de mayo, votación 14 de mayo.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/003-CIRCULAR-CONFOMACION-COMITE-COPASST.pdf" },
  { num: "002", fecha: "20 de febrero de 2025", tema: "Entrega de Kits Escolares por parte de la OIM", desc: "Donación de 150 kits escolares por la Organización Internacional para las Migraciones a estudiantes focalizados en situación de vulnerabilidad.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/002-CIRCULAR-ENTREGA-DE-KITS-ESCOLARES.pdf" },
  { num: "001", fecha: "13 de febrero de 2025", tema: "Distribución de rubros para actividades de carnaval", desc: "Distribución de $1.200.000 recaudados por la Rifa 2024 para actividades de Carnaval, asignados equitativamente por número de estudiantes.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/001-CIRCULAR-A-DOCENTES-13-DE-FEBRERO-2025.pdf" },
];

const VIGILANTES_NACIONAL = [
  { entidad: "Ministerio de Educación Nacional (MEN)", tipo: "Regulatorio y Sectorial", funcion: "Define políticas, planes y proyectos para asegurar acceso, calidad y pertinencia de la educación.", dir: "Calle 43 No. 57 – 14, Bogotá D.C.", tel: "(+57) 601 222 2800", email: "soytransparente@mineducacion.gov.co", web: "https://www.mineducacion.gov.co/portal/" },
  { entidad: "Procuraduría General de la Nación", tipo: "Disciplinario", funcion: "Ejerce control disciplinario sobre servidores públicos, incluyendo directivos y docentes.", dir: "Carrera 5 # 15-80, Bogotá D.C.", tel: "(+57 1) 587 8750", email: "https://www.procuraduria.gov.co/", web: "https://www.procuraduria.gov.co/" },
  { entidad: "Contraloría General de la República", tipo: "Fiscal", funcion: "Vigila la gestión de los recursos y bienes públicos de la institución.", dir: "Carrera 69 No 44 – 35", tel: "(+57 1) 518 7000", email: "cgr@contraloria.gov.co", web: "https://www.contraloria.gov.co/" },
  { entidad: "Comisión Nacional del Servicio Civil (CNSC)", tipo: "Administrativo (Carrera Pública)", funcion: "Administra y vigila las carreras de los servidores públicos.", dir: "Carrera 16 No. 96 – 64 Piso 7, Bogotá D.C.", tel: "(+57) 601 325 9700", email: "atencionalciudadano@cnsc.gov.co", web: "https://www.cnsc.gov.co/" },
];

const VIGILANTES_MUNICIPAL = [
  { entidad: "Alcaldía de Malambo – Secretaría de Educación Municipal", tipo: "Administrativo y Pedagógico", funcion: "Primera línea de supervisión y control. Administra y gestiona el servicio educativo en el municipio.", dir: "Calle 11 #15-10, Malambo, Atlántico.", tel: "(+57) 5 3767522", email: "educacion@malambo-atlantico.gov.co", web: "https://www.malambo-atlantico.gov.co/" },
  { entidad: "Personería Municipal de Malambo", tipo: "Disciplinario y de Derechos Ciudadanos", funcion: "Control disciplinario sobre funcionarios y defensa de los derechos de los ciudadanos.", dir: "Calle 10 No. 15-10 Centro, Malambo, Atlántico.", tel: "(+57) 5 3764660", email: "personeriademalambo@hotmail.com", web: "#" },
];

const TRAMITES = [
  { num: "1", nombre: "Certificado de Notas", desc: "Certifica las calificaciones obtenidas por un estudiante en un determinado grado o periodo académico.", norma: "Decreto 180 de 1981.", requisitos: "Fotocopia del documento del estudiante, egresado o alumno antiguo. Fotocopia del documento del solicitante.", canales: "Digital (correo electrónico) o Presencial (secretaría académica).", costo: "$5.000" },
  { num: "2", nombre: "Constancia de Estudio", desc: "Certifica que un estudiante se encuentra debidamente matriculado en la institución para el año lectivo en curso.", norma: "Decreto 180 de 1981.", requisitos: "Fotocopia del documento del estudiante. Fotocopia del documento del solicitante.", canales: "Digital (correo electrónico) o Presencial (secretaría académica).", costo: "Gratuito" },
  { num: "3", nombre: "Retiro del Estudiante del SIMAT", desc: "Proceso para oficializar el retiro del Sistema Integrado de Matrícula, por traslado o motivos de fuerza mayor.", norma: "Ley 715 de 2001. Directivas del MEN sobre SIMAT.", requisitos: "Fotocopia del documento del estudiante. Fotocopia del documento del solicitante.", canales: "Digital (correo electrónico) o Presencial (secretaría académica).", costo: "Gratuito" },
  { num: "4", nombre: "Duplicado de Diploma de Grado", desc: "Expedición de una copia del diploma de bachiller en caso de pérdida, destrucción o deterioro.", norma: "Decreto 1075 de 2015, Art. 2.3.3.3.5.14. Decreto 180 de 1981.", requisitos: "Fotocopia del documento del egresado. Fotocopia del documento del solicitante.", canales: "Digital (correo electrónico) o Presencial (secretaría académica).", costo: "$40.000" },
  { num: "5", nombre: "Duplicado de Acta de Grado", desc: "Expedición de una copia del acta de grado que reposa en los libros oficiales de la institución.", norma: "Decreto 1075 de 2015, Art. 2.3.3.3.5.7. Decreto 180 de 1981.", requisitos: "Fotocopia del documento del egresado. Fotocopia del documento del solicitante.", canales: "Digital (correo electrónico) o Presencial (secretaría académica).", costo: "$5.000" },
];

const PROCESOS_DIRECTIVOS = [
  { nombre: "Consejo Directivo", desc: "Máxima autoridad en la toma de decisiones. Responsable de asuntos estratégicos, financieros, administrativos y de convivencia. Adopta el manual de convivencia, aprueba el presupuesto y resuelve conflictos.", integrantes: "El Rector (preside), dos representantes docentes, dos representantes padres de familia, un representante estudiantes, un representante exalumnos, un representante sectores productivos.", reglamento: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERD1.pdf" },
  { nombre: "Consejo Académico", desc: "Instancia superior de orientación pedagógica. Responsable del plan de estudios, estrategias de mejoramiento, evaluación institucional y reclamaciones sobre evaluaciones.", integrantes: "El Rector (preside), coordinadores académicos, un docente representante por cada área del plan de estudios.", reglamento: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERD2.pdf" },
];

export default function TransparenciaPage() {
  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Transparencia y Acceso a la Información Pública</h1>
          <p className="mt-4 text-lg text-white/80">Información pública conforme a la Ley 1712 de 2014</p>
          <p className="mt-2 text-sm text-white/60">Última actualización: 30 de septiembre de 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Navegación rápida */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.id} href={`#${s.id}`} className="group flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100"><Icon size={24} className="text-primary-600" /></div>
                <div><h3 className="font-bold text-neutral-900 group-hover:text-primary-700">{s.title}</h3><p className="mt-1 text-sm text-neutral-500">{s.description}</p></div>
              </a>
            );
          })}
        </div>

        {/* Marco Legal */}
        <div className="mb-12 rounded-2xl border border-neutral-200 bg-white p-8">
          <div className="mb-6 flex items-center gap-3"><IconShield size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">Marco Legal</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARCO_LEGAL.map((m) => (<div key={m.title} className="rounded-xl bg-neutral-50 p-4"><h3 className="font-semibold text-neutral-900">{m.title}</h3><p className="mt-1 text-sm text-neutral-600">{m.description}</p></div>))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ 1. INFORMACIÓN DE LA ENTIDAD ═══════════════════════════════════════════════════ */}
        <section id="entidad" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconBuilding size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">1. Información de la Entidad</h2></div>

          {/* 1.1 Misión, Visión */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.1 Misión, Visión, Funciones y Deberes</summary>
            <div className="space-y-4 text-sm text-neutral-700">
              <div><h4 className="font-semibold text-neutral-900">Misión</h4><p>La Institución Educativa Nuestra Señora de la Candelaria ofrece servicio educativo oficial humanista a niños, niñas y jóvenes del municipio de Malambo, a través de una propuesta académica cognitivo-social, una formación técnica y un proyecto espiritual que promuevan su desarrollo integral y le permitan generar transformaciones en su entorno.</p></div>
              <div><h4 className="font-semibold text-neutral-900">Visión</h4><p>La Institución Educativa Nuestra Señora de la Candelaria del municipio de Malambo se visualiza a sí misma para el 2026 como una escuela líder, reconocida a nivel departamental por su disciplina, fortalecimiento del inglés como segunda lengua, mejoramiento continuo en los resultados de las pruebas saber y la utilización de ambientes que privilegien el uso de las TICS. Además, se proyecta como una escuela que fomenta el emprendimiento entre sus estudiantes y las relaciones cercanas con los padres de familia.</p></div>
              <div><h4 className="font-semibold text-neutral-900">Funciones</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Garantizar el acceso, permanencia y cobertura del servicio educativo a la comunidad malambera.</li>
                  <li>Brindar una formación integral que desarrolle competencias académicas, éticas y sociales.</li>
                  <li>Fomentar un ambiente inclusivo, democrático y seguro que respete la diversidad cultural y los derechos humanos.</li>
                  <li>Organizar, ejecutar y evaluar los procesos pedagógicos basados en el PEI.</li>
                  <li>Implementar estrategias de innovación pedagógica y el uso de tecnologías.</li>
                  <li>Promover la participación activa y responsable de estudiantes, docentes, familias y comunidad.</li>
                  <li>Fomentar el respeto, la convivencia pacífica y la corresponsabilidad.</li>
                  <li>Velar por el cumplimiento de las normativas educativas y la actualización de los reglamentos internos.</li>
                </ol>
              </div>
              <div><h4 className="font-semibold text-neutral-900">Deberes</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Cumplir y hacer cumplir las leyes, decretos y reglamentos vigentes del servicio público educativo.</li>
                  <li>Brindar condiciones adecuadas de infraestructura, recursos didácticos y apoyo pedagógico.</li>
                  <li>Garantizar la protección integral de los derechos de niños, niñas y adolescentes.</li>
                  <li>Promover la convivencia pacífica y democrática, previniendo la discriminación.</li>
                  <li>Facilitar la formación y capacitación continua del personal.</li>
                  <li>Estimular la participación comunitaria y la articulación con las familias.</li>
                  <li>Mantener una gestión transparente y eficaz con gobierno escolar democrático.</li>
                  <li>Implementar y actualizar los manuales de convivencia y protocolos institucionales.</li>
                </ol>
              </div>
            </div>
          </details></div>

          {/* 1.2 Organigrama */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.2 Estructura Orgánica – Organigrama</summary>
            <div className="flex justify-center">
              <img src="https://www.colegiolacandelaria.edu.co/wp-content/uploads/ORGANIGRAMA.png" alt="Organigrama IE Nuestra Señora de la Candelaria" className="h-auto w-full max-w-2xl rounded-lg" />
            </div>
          </details></div>

          {/* 1.3 Mapa de procesos */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.3 Mapas y Cartas Descriptivas de los Procesos</summary>
            <div className="flex justify-center mb-6">
              <img src="https://www.colegiolacandelaria.edu.co/wp-content/uploads/MAPA-DE-PROCESOS.png" alt="Mapa de Procesos" className="h-auto w-full max-w-2xl rounded-lg" />
            </div>
            <div className="space-y-4 text-sm">
              {[
                { cat: "Gestión Académica", items: ["GA-P01 Diseño Actualización y Articulación Curricular","GA-P02 Prácticas Pedagógicas de Aula","GA-P03 Gestión del Aula y Clima Escolar","GA-P04 Proceso de Admisión y Matrícula","GA-P05 Seguimiento Evaluación y Promoción","GA-P06 Apoyo Pedagógico a Estudiantes con Dificultades","GA-P07 Uso Pedagógico de Recursos","GA-P08 Formación y Capacitación Docente","GA-P09 Gestión de Proyectos Pedagógicos Transversales","GA-P10 Servicio Social Estudiantil Obligatorio","GA-P11 Articulación con Educación Superior y Mundo Laboral"] },
                { cat: "Gestión Comunitaria", items: ["GC-P01 Inclusión y Atención a la Diversidad","GC-P02 Gestión de la Convivencia Escolar","GC-P03 Participación de las Familias y Escuela de Padres","GC-P04 Atención de PQRS","GC-P05 Proyección a la Comunidad","GC-P06 Prevención de Riesgos Psicosociales","GC-P07 Plan Escolar de Gestión del Riesgo","GC-P08 Uso de la Planta Física por la Comunidad Externa","GC-P09 Seguimiento a Egresados"] },
                { cat: "Gestión Directiva", items: ["GD-P01 Direccionamiento Estratégico","GD-P02 Autoevaluación Institucional","GD-P03 Plan de Mejoramiento Institucional","GD-P04 Gobierno Escolar e instancias de participación","GD-P05 Comunicación Institucional y Clima Organizacional","GD-P06 Relaciones Interinstitucionales","GD-P07 Gestión de la Calidad Educativa","GD-P08 Cumplimiento Normativo y Legal","GD-P09 Adopción y Uso de Tecnologías de la Información"] },
                { cat: "Gestión Administrativa y Financiera", items: ["GF-P01 Administración y Ejecución Presupuestal","GF-P02 Proceso de Contratación Compras y Adquisiciones","GF-P03 Administración del Talento Humano","GF-P04 Administración de la Infraestructura","GF-P05 Mantenimiento de Equipos y Recursos","GF-P06 Gestión Documental Archivo y Correspondencia","GF-P07 Supervisión de Servicios Complementarios","GF-P08 Gestión de Inventarios de Bienes","GF-P09 Sistema de Gestión de la Seguridad y Salud en el Trabajo"] },
              ].map((g) => (
                <div key={g.cat}><h4 className="font-semibold text-neutral-900 mb-2">{g.cat}</h4><ol className="list-decimal pl-5 space-y-1 text-neutral-600">{g.items.map((i) => <li key={i}>{i}</li>)}</ol></div>
              ))}
            </div>
          </details></div>

          {/* 1.4 Directorio institucional */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.4 Directorio Institucional</summary>
            <div className="space-y-3 text-sm text-neutral-700">
              <div><strong>Sede Principal:</strong> Calle 10 #6sur-01, Malambo, Atlántico. (Barrio Miraflores)</div>
              <div><strong>Sede Roberto Mendoza:</strong> Calle 10 #1C-24, Malambo, Atlántico. (Barrio Bellavista)</div>
              <div><strong>Horario:</strong> Lunes a viernes de 7:00 a.m. a 03:00 p.m. Jornada Continua.</div>
              <div><strong>Correo:</strong> contacto@colegiolacandelaria.edu.co</div>
              <div><strong>Teléfono:</strong> +57 304 202 6613</div>
              <div><strong>Línea anticorrupción:</strong> +57 01 8000 940 808</div>
              <div><strong>Código Postal:</strong> 083027</div>
            </div>
          </details></div>

          {/* 1.5 Directorio entidades del sector */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.5 Directorio de Entidades del Sector</summary>
            <div className="space-y-4 text-sm">
              <div><h4 className="font-semibold text-neutral-900 mb-2">Entidades del orden Nacional</h4>
                <ul className="space-y-1">{ENTIDADES_NACIONALES.map((e) => <li key={e.href}><a href={e.href} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">{e.label} ↗</a></li>)}</ul>
              </div>
              <div><h4 className="font-semibold text-neutral-900 mb-2">Entidades del orden Territorial</h4>
                <ul className="space-y-1">{ENTIDADES_TERRITORIALES.map((e) => <li key={e.href}><a href={e.href} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">{e.label} ↗</a></li>)}</ul>
              </div>
            </div>
          </details></div>

          {/* 1.6 Directorio agremiaciones */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.6 Directorio de Agremiaciones, Asociaciones y Otros Grupos de Interés</summary>
            <div className="space-y-4 text-sm">
              <div><h4 className="font-semibold text-neutral-900 mb-2">Entidades del orden Nacional</h4><a href="https://fecode.edu.co/" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Federación Colombiana de Educadores (FECODE) ↗</a></div>
              <div><h4 className="font-semibold text-neutral-900 mb-2">Entidades del orden Territorial</h4><a href="https://www.adeatlantico.org/" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Asociación de Educadores del Atlántico (ADEA) ↗</a></div>
            </div>
          </details></div>

          {/* 1.7 Servicio al público */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.7 Servicio al Público, Normas, Formularios y Protocolos de Atención</summary>
            <div className="space-y-4 text-sm text-neutral-700">
              <p>La Institución Educativa Nuestra Señora de la Candelaria está comprometida con la prestación de un servicio de atención inclusivo, transparente y eficiente. El modelo de atención se fundamenta en principios de respeto, equidad, imparcialidad y diligencia.</p>
              <div><h4 className="font-semibold text-neutral-900">Políticas y Protocolos</h4>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Horario de Atención:</strong> Lunes a viernes de 7:00 a.m. a 3:00 p.m. (jornada continua). Canales virtuales permanentes.</li>
                  <li><strong>Trato Digno:</strong> Todo ciudadano recibirá trato respetuoso, cortés y equitativo.</li>
                  <li><strong>Atención Preferencial:</strong> Prioritaria para personas con discapacidad, adultos mayores, mujeres gestantes y veteranos de la Fuerza Pública.</li>
                  <li><strong>Tiempos de Respuesta:</strong> Conforme a la Ley 1755 de 2015 (Derecho de Petición).</li>
                  <li><strong>Confidencialidad:</strong> Información personal tratada con confidencialidad (Ley 1581 de 2012).</li>
                </ul>
              </div>
              <div><h4 className="font-semibold text-neutral-900">Canales de Atención</h4>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Presencial:</strong> Sede Principal – Calle 10 #6sur-01, Malambo. Lunes a viernes 7:00 a.m. a 3:00 p.m.</li>
                  <li><strong>Telefónico:</strong> +57 304 202 6613 (llamadas y WhatsApp)</li>
                  <li><strong>Virtual:</strong> contacto@colegiolacandelaria.edu.co | www.colegiolacandelaria.edu.co</li>
                </ul>
              </div>
            </div>
          </details></div>

          {/* 1.8 Procedimientos de decisión */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.8 Procedimientos para Tomar Decisiones</summary>
            <div className="space-y-6 text-sm text-neutral-700">
              <p>La gestión se encuentra formalmente estructurada a través de los órganos del Gobierno Escolar, garantizando decisiones organizadas y democráticas.</p>
              {PROCESOS_DIRECTIVOS.map((p) => (
                <div key={p.nombre} className="rounded-xl bg-neutral-50 p-4">
                  <h4 className="font-semibold text-neutral-900">{p.nombre}</h4>
                  <p className="mt-1">{p.desc}</p>
                  <p className="mt-1"><strong>Integración:</strong> {p.integrantes}</p>
                  <a href={p.reglamento} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-primary-700 hover:underline">Ver reglamento ↗</a>
                </div>
              ))}
            </div>
          </details></div>

          {/* 1.9 Formulario PQRSF */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.9 Mecanismo de Presentación Directa de Solicitudes, Quejas y Reclamos</summary>
            <p className="text-sm text-neutral-700">Canal oficial para que la comunidad educativa y la ciudadanía presenten solicitudes formales, expresen inconformidades, propongan mejoras o reconozcan aspectos positivos de la gestión institucional.</p>
            <a href="/pqrs/radicar" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">Ir a radicar PQRS</a>
          </details></div>

          {/* 1.10 Calendario */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.10 Calendario de Actividades</summary>
            <p className="text-sm text-neutral-700">Consulte el calendario institucional de eventos y actividades académicas, administrativas y comunitarias.</p>
            <a href="https://www.colegiolacandelaria.edu.co/calendario-actividades/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-primary-700 text-sm hover:underline">Ver calendario de actividades ↗</a>
          </details></div>

          {/* 1.11 Decisiones que afectan al público */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.11 Información sobre Decisiones que Afectan al Público</summary>
            <p className="mb-4 text-sm text-neutral-700">Canal oficial donde se publican todas las decisiones, directrices y novedades que impactan directamente a la comunidad educativa. A través de las circulares informativas, la Rectoría socializa ajustes al calendario, políticas institucionales, cronogramas y procesos importantes.</p>
            <div className="space-y-3">
              {CIRCULARES_2025.map((c) => (
                <div key={c.num} className="rounded-xl bg-neutral-50 p-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-neutral-900">Circular {c.num} ({c.fecha})</p>
                      <p className="text-neutral-700">{c.tema}</p>
                      <p className="mt-1 text-neutral-500">{c.desc}</p>
                    </div>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-primary-700 hover:underline text-xs">Ver PDF ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </details></div>

          {/* 1.12 Entes vigilantes */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">1.12 Entes y Autoridades que Nos Vigilan</summary>
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Nivel Nacional</h4>
                <div className="space-y-3">
                  {VIGILANTES_NACIONAL.map((v) => (
                    <div key={v.entidad} className="rounded-xl bg-neutral-50 p-4">
                      <p className="font-semibold text-neutral-900">{v.entidad}</p>
                      <p className="text-neutral-500">Tipo: {v.tipo}</p>
                      <p className="text-neutral-700 mt-1">{v.funcion}</p>
                      <div className="mt-2 text-xs text-neutral-500 space-y-0.5">
                        <p>Dirección: {v.dir}</p>
                        <p>Teléfono: {v.tel}</p>
                        <p>Email: {v.email}</p>
                        <a href={v.web} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Sitio web ↗</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Nivel Municipal</h4>
                <div className="space-y-3">
                  {VIGILANTES_MUNICIPAL.map((v) => (
                    <div key={v.entidad} className="rounded-xl bg-neutral-50 p-4">
                      <p className="font-semibold text-neutral-900">{v.entidad}</p>
                      <p className="text-neutral-500">Tipo: {v.tipo}</p>
                      <p className="text-neutral-700 mt-1">{v.funcion}</p>
                      <div className="mt-2 text-xs text-neutral-500 space-y-0.5">
                        <p>Dirección: {v.dir}</p>
                        <p>Teléfono: {v.tel}</p>
                        <p>Email: {v.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Mecanismos Internos de Supervisión</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                  <li><strong>Gobierno Escolar:</strong> Consejo Directivo y Consejo Académico.</li>
                  <li><strong>Instancias de Participación:</strong> Consejo de Padres, Consejo Estudiantil, Personero Estudiantil.</li>
                  <li><strong>Comités de Apoyo:</strong> Comité de Convivencia Escolar, COPASST, CAE.</li>
                  <li><strong>Gestión Ejecutiva:</strong> Rectoría, Departamentos y Coordinaciones.</li>
                  <li><strong>Rendición de Cuentas:</strong> Jornada anual de informe público a la comunidad.</li>
                </ul>
              </div>
            </div>
          </details></div>

          {/* Nota hojas de vida */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="mb-2 font-bold text-amber-900">Nota sobre Hojas de Vida</h3>
            <p className="text-sm text-amber-800">La Institución Educativa Nuestra Señora de la Candelaria no está obligada a la publicación de hojas de vida para cargos de libre nombramiento y remoción, por cuanto no se enmarca en el ámbito de aplicación del Artículo 2.2.13.2.3 del Decreto 1083 de 2015.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ 2. NORMATIVIDAD ═══════════════════════════════════════════════════ */}
        <section id="normatividad" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconScale size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">2. Normatividad de la Entidad</h2></div>

          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">Leyes y Normatividad Aplicable</summary>
            <ul className="space-y-2 text-sm">{NORMATIVIDAD_LEYES.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">{l.label} ↗</a></li>)}</ul>
          </details></div>

          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">Decreto Único Reglamentario</summary>
            <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77913" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-700 hover:underline">Decreto 1075 de 2015 ↗</a>
          </details></div>

          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">Diario o Gaceta Oficial</summary>
            <a href="https://svrpubindc.imprenta.gov.co/diario/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-700 hover:underline">Consultar Gaceta Oficial ↗</a>
          </details></div>

          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">Políticas, Lineamientos y Manuales</summary>
            <ul className="space-y-2 text-sm">{NORMATIVIDAD_MANUALES.map((m) => <li key={m.href}><a href={m.href} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">{m.label} ↗</a></li>)}</ul>
          </details></div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-neutral-900">Agenda Regulatoria</h3>
            <p className="text-sm text-neutral-700">De conformidad con el Decreto 1273 de 2020, la Institución Educativa Nuestra Señora de la Candelaria no es un sujeto obligado a elaborar, adoptar ni publicar una Agenda Regulatoria. Dicha norma circunscribe esta responsabilidad a los Ministerios y Departamentos Administrativos del nivel central de la Rama Ejecutiva del orden nacional.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ 3. CONTRATACIÓN ═══════════════════════════════════════════════════ */}
        <section id="contratacion" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconFileText size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">3. Contratación</h2></div>
          <div className="rounded-2xl border border-neutral-200 bg-white divide-y divide-neutral-100">
            {[
              { label: "Plan Anual de Adquisiciones 2025", desc: "Plan anual de compras y contratación (SECOP).", href: "https://community.secop.gov.co/Public/App/AnnualPurchasingPlanEditPublic/View?id=635362" },
              { label: "Publicación de la Información Contractual", desc: "Contratos vigentes y sus modificaciones.", href: "https://www.colegiolacandelaria.edu.co/publicacion-contractual/" },
              { label: "Ejecución de los Contratos", desc: "Seguimiento a la ejecución contractual.", href: "https://docs.google.com/spreadsheets/d/12Ww_tR2pnjJszzmXeAgWQtb_lSnYjL9UJtEKO5jAXdE/edit?usp=sharing" },
              { label: "Manual de Contratación Vigente", desc: "Manual de contratación de la entidad.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/MANUAL-DE-CONTRATACION-2023.pdf" },
              { label: "Formato Modelo de Contratos", desc: "Plantillas de contratos tipo.", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/MODELO-CONTRATOS.docx" },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 transition-colors hover:bg-neutral-50">
                <div><p className="font-medium text-neutral-900">{item.label}</p><p className="text-sm text-neutral-500">{item.desc}</p></div>
                <IconExternalLink size={18} className="shrink-0 text-neutral-400" />
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ 4. PLANEACIÓN Y PRESUPUESTO ═══════════════════════════════════════════════════ */}
        <section id="planeacion" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconPlane size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">4. Planeación y Presupuesto</h2></div>
          <div className="space-y-6">
            {/* Presupuesto */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-6 py-4"><h3 className="font-bold text-neutral-900">Presupuesto</h3></div>
              <div className="divide-y divide-neutral-100">
                {[
                  { label: "Presupuesto General de Ingresos, Gastos e Inversión 2025", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERDO-006-DE-2024-PRESUPUESTO-2025.pdf" },
                  { label: "Acuerdo 001 de 2025: Adición presupuestal por superávit de la vigencia 2024", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERDO-001-DE-2025_merged.pdf" },
                  { label: "Acuerdo 002 de 2025: Adición presupuestal por gratuidad y otros convenios", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERDO-002-DE-2025_merged.pdf" },
                  { label: "Acuerdo 003 de 2025: Traslado presupuestal para compra de aires acondicionados", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ACUERDO-003-DE-2025_merged.pdf" },
                ].map((i) => (
                  <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 transition-colors hover:bg-neutral-50"><p className="font-medium text-neutral-900">{i.label}</p><IconExternalLink size={18} className="shrink-0 text-neutral-400" /></a>
                ))}
              </div>
            </div>
            {/* Ejecución */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-6 py-4"><h3 className="font-bold text-neutral-900">Ejecución Presupuestal</h3></div>
              <div className="divide-y divide-neutral-100">
                {[
                  { label: "Ejecución Primer Trimestre 2025", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/INFORME-FINANCIERO-PRIMER-TRIMESTRE-2025.pdf" },
                  { label: "Ejecución Segundo Trimestre 2025", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/INFORME-FINANCIERO-SEGUNDO-TRIMESTRE-2025.pdf" },
                ].map((i) => (
                  <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 transition-colors hover:bg-neutral-50"><p className="font-medium text-neutral-900">{i.label}</p><IconExternalLink size={18} className="shrink-0 text-neutral-400" /></a>
                ))}
              </div>
            </div>
            {/* Planes e Informes */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-6 py-4"><h3 className="font-bold text-neutral-900">Planes e Informes</h3></div>
              <div className="divide-y divide-neutral-100">
                {[
                  { label: "Plan de Acción y de Inversiones", href: "https://www.colegiolacandelaria.edu.co/plan-accion-inversiones/" },
                  { label: "Informes de Gestión, Evaluación y Auditoría", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/INFORME-DE-GESTION-Y-RENDICION-DE-CUENTAS-2024.pdf" },
                  { label: "Informe sobre Defensa Pública y Prevención del Daño Antijurídico", href: "https://ekogui.defensajuridica.gov.co/Pages/NEW/index.aspx" },
                  { label: "Informes trimestrales sobre acceso a información, quejas y reclamos", href: "https://www.colegiolacandelaria.edu.co/informes-trimestrales-pqrsf/" },
                ].map((i) => (
                  <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 transition-colors hover:bg-neutral-50"><p className="font-medium text-neutral-900">{i.label}</p><IconExternalLink size={18} className="shrink-0 text-neutral-400" /></a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ 5. TRÁMITES ═══════════════════════════════════════════════════ */}
        <section id="tramites" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconClipboardList size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">5. Trámites</h2></div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 mb-6">
            <p className="text-sm text-neutral-700 mb-4">La Institución ha iniciado las gestiones ante la Secretaría de Educación de Malambo para formalizar los procedimientos en el <strong>Sistema Único de Información de Trámites (SUIT)</strong>. Mientras culmina el proceso, presentamos la siguiente guía:</p>
            <div className="rounded-xl bg-neutral-50 p-4 text-sm">
              <p className="font-semibold text-neutral-900">Guía de Trámites</p>
              <p className="mt-1 text-neutral-700"><strong>Paso 1:</strong> Descargue el <a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/FORMULARIO-TRAMITES.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Formato Único de Solicitud</a>.</p>
              <p className="mt-1 text-neutral-700"><strong>Paso 2:</strong> Diligencie y radique por correo (contacto@colegiolacandelaria.edu.co) o presencialmente en la Secretaría Académica.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white divide-y divide-neutral-100">
            {TRAMITES.map((t) => (
              <div key={t.num} className="p-5">
                <p className="font-semibold text-neutral-900">{t.num}. {t.nombre}</p>
                <p className="text-sm text-neutral-700 mt-1">{t.desc}</p>
                <div className="mt-2 grid gap-2 text-xs text-neutral-500 sm:grid-cols-2">
                  <p><strong>Normatividad:</strong> {t.norma}</p>
                  <p><strong>Requisitos:</strong> {t.requisitos}</p>
                  <p><strong>Canales:</strong> {t.canales}</p>
                  <p><strong>Costo:</strong> {t.costo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ 6. PARTICIPACIÓN CIUDADANA ═══════════════════════════════════════════════════ */}
        <section id="participacion" className="mb-16 scroll-mt-20">
          <div className="mb-6 flex items-center gap-3"><IconUsers size={24} className="text-primary-600" /><h2 className="text-2xl font-bold text-neutral-900">6. Participación Ciudadana</h2></div>

          {/* 6.1 Pilares estratégicos */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">6.1 Pilares Estratégicos</summary>
            <div className="space-y-3 text-sm">
              {[
                { label: "Estrategia de Participación Ciudadana", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ESTRATEGIA-DE-PARTICIPACION-CIUDADANA.pdf", desc: "Plan para fomentar la participación activa de toda la comunidad educativa." },
                { label: "Estrategia Anual de Rendición de Cuentas", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/ESTRATEGIA-DE-RENDICION-DE-CUENTAS.pdf", desc: "Metodología y cronograma para informar sobre la gestión." },
                { label: "Plan Anticorrupción y de Atención al Ciudadano (PAAC)", href: "https://www.colegiolacandelaria.edu.co/wp-content/uploads/PLAN-ANTICORRUPCION-ATENCION-CIUDADANO.pdf", desc: "Plan para prevenir la corrupción y fortalecer la atención al ciudadano." },
              ].map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-neutral-50 p-4 hover:bg-neutral-100 transition-colors">
                  <p className="font-semibold text-neutral-900">{p.label} ↗</p>
                  <p className="text-neutral-500">{p.desc}</p>
                </a>
              ))}
            </div>
          </details></div>

          {/* 6.2 Transparencia y resultados */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">6.2 Transparencia y Resultados</summary>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-neutral-900">Informes de Rendición de Cuentas</h4>
                <a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/INFORME-DE-GESTION-Y-RENDICION-DE-CUENTAS-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Descargar Informe de gestión y rendición de cuentas 2024 ↗</a>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Mecanismos Formales de Participación</h4>
                <ul className="space-y-2">
                  <li><strong>Consejo Directivo:</strong> Máxima autoridad. Decisiones administrativas y financieras. Representantes de todos los estamentos.</li>
                  <li><strong>Consejo Académico:</strong> Orientación pedagógica, plan de estudios, criterios de evaluación.</li>
                  <li><strong>Consejo de Padres:</strong> Participación de padres y acudientes en el proceso educativo.</li>
                  <li><strong>Consejo Estudiantil:</strong> Representación del alumnado. Voceros de cada grado.</li>
                  <li><strong>Personero Estudiantil:</strong> Estudiante del último grado elegido democráticamente. Defensor de los derechos estudiantiles.</li>
                  <li><strong>Comité de Convivencia Escolar:</strong> Promoción de convivencia y rutas de atención.</li>
                  <li><strong>CAE:</strong> Supervisión del Programa de Alimentación Escolar.</li>
                  <li><strong>COPASST:</strong> Seguridad y Salud en el Trabajo.</li>
                </ul>
              </div>
            </div>
          </details></div>

          {/* 6.3 Estructura de participación */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6">
            <details><summary className="cursor-pointer py-2 text-lg font-bold text-neutral-900 select-none hover:text-primary-700">6.3 Estructura de Participación Ciudadana</summary>
            <div className="space-y-6 text-sm">
              {/* Diagnóstico */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Diagnóstico e Identificación de Problemas</h4>
                <p className="mt-1 text-neutral-700"><strong>Tema priorizado 2026:</strong> Prevención del Bullying. Enfocaremos esfuerzos en fortalecer un ambiente escolar seguro y respetuoso.</p>
                <div className="mt-2 space-y-1 text-neutral-600">
                  <p><a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/MANUAL-DE-CONVIVENCIA-2025.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Manual de Convivencia 2025 ↗</a></p>
                  <p><a href="https://forms.gle/FN1JmDhagbq1kaNa9" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Formulario Prevención Bullying 2026 ↗</a></p>
                  <p><a href="https://docs.google.com/spreadsheets/d/11EDXLkrnCX-1wGW26p8PuSgagPD2gbX6TzRwNEsTyIg/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Ver comentarios y respuestas ↗</a></p>
                </div>
              </div>
              {/* Presupuesto participativo */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Planeación y Presupuesto Participativo</h4>
                <p className="mt-1 text-neutral-700">Para 2026, el Colegio ha asignado <strong>$2.000.000</strong> para proyectos priorizados por la comunidad.</p>
                <div className="mt-2 space-y-1 text-neutral-600">
                  <p><strong>Caso de éxito:</strong> Murales sobre Inclusión en el patio principal.</p>
                  <p><a href="https://forms.gle/LU5AZjd4kbyLxZEMA" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Formulario para proponer ideas ↗</a></p>
                  <p><a href="https://docs.google.com/spreadsheets/d/1vkNRdYXBzF8A240O7bykU7I-2iOV1evtQyVdF-pkh7M/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Ver comentarios y respuestas ↗</a></p>
                </div>
              </div>
              {/* Consulta ciudadana */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Consulta Ciudadana</h4>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="font-medium text-neutral-900">Consulta 1: Política de Comunicaciones Institucionales</p>
                    <p className="text-neutral-600">Establecer canales más claros, efectivos y oportunos.</p>
                    <div className="mt-1 space-y-1">
                      <p><a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/PROYECTO-DE-ACUERDO-POLITICA-DE-COMUNICACION.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline text-xs">Descargar proyecto ↗</a></p>
                      <p><a href="https://forms.gle/azgzmMPq1DtZz3J27" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline text-xs">Enviar comentarios ↗</a></p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Consulta 2: Política de Inclusión</p>
                    <p className="text-neutral-600">Establecer una política clara de atención a las particularidades de la comunidad educativa.</p>
                    <div className="mt-1 space-y-1">
                      <p><a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/PROYECTO-DE-ACUERDO-POLITICA-DE-INCLUSION.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline text-xs">Descargar proyecto ↗</a></p>
                      <p><a href="https://forms.gle/YpFNsyrgHqxz6bjR8" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline text-xs">Enviar comentarios ↗</a></p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Retos */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Retos Candelaria: ¡Presentismo que Inspira!</h4>
                <p className="mt-1 text-neutral-700">¿Cómo podemos mejorar la asistencia de los estudiantes? Buscamos ideas innovadoras y positivas.</p>
                <div className="mt-2 space-y-1 text-neutral-600">
                  <p><a href="https://forms.gle/FTmTpqS6aAt5dPiV9" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Formulario Reto Asistencia ↗</a></p>
                  <p><a href="https://docs.google.com/spreadsheets/d/1hEySlmCTy7l2EaVZDPxrX_McqKzxl_5HpGh5XzgjW9I/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Ver comentarios y respuestas ↗</a></p>
                </div>
              </div>
              {/* Rendición de cuentas */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Rendición de Cuentas</h4>
                <div className="mt-1 space-y-1 text-neutral-600 text-sm">
                  <p><strong>Última audiencia:</strong> Febrero de 2025.</p>
                  <p><strong>Próxima audiencia:</strong> Febrero de 2026.</p>
                  <p><a href="https://www.colegiolacandelaria.edu.co/wp-content/uploads/INFORME-DE-GESTION-Y-RENDICION-DE-CUENTAS-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Memorias Febrero 2025 ↗</a></p>
                  <p><a href="https://forms.gle/3LQph9bhQv7GDucJ6" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Sugerir temas para próxima rendición ↗</a></p>
                </div>
              </div>
              {/* Control social */}
              <div className="rounded-xl bg-neutral-50 p-4">
                <h4 className="font-semibold text-neutral-900">Control Social</h4>
                <p className="mt-1 text-neutral-700">Modalidades activas: Consejo de Padres (evaluación PEI, Manual de Convivencia) y CAE (vigilancia del PAE).</p>
                <p className="mt-1 text-sm"><a href="https://chat.whatsapp.com/HiW7DAEiX5D6cPshXTzKb4" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">Canal de WhatsApp para la Participación ↗</a></p>
              </div>
            </div>
          </details></div>
        </section>

        {/* Contacto */}
        <div className="rounded-2xl bg-primary-900 p-8 text-white">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Contacto y Quejas</h2>
              <p className="mb-6 text-white/80">Para solicitudes de información, quejas o reclamos relacionados con la transparencia.</p>
              <div className="space-y-4">
                <a href="tel:+573042026613" className="flex items-center gap-3 text-primary-100 hover:text-white"><IconPhone size={18} />+57 304 202 6613</a>
                <a href="mailto:contacto@colegiolacandelaria.edu.co" className="flex items-center gap-3 text-primary-100 hover:text-white"><IconMail size={18} />contacto@colegiolacandelaria.edu.co</a>
                <div className="flex items-start gap-3 text-primary-100"><IconMap size={18} className="mt-0.5" />Calle 10 #6sur-01, Malambo, Atlántico</div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <Link href="/pqrs/radicar" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-900 hover:bg-neutral-100">Radicar PQRS<IconChevronRight size={16} /></Link>
              <div className="rounded-lg bg-white/10 p-4 text-sm"><p className="font-medium">Línea anticorrupción</p><p className="mt-1 text-white/80">+57 01 8000 940 808</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}