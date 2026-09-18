## Purpose
Planificación completa del sitio web institucional IE Nuestra Señora de la Candelaria (Malambo, Atlántico): módulo PQRS dinámico con emails automáticos, CMS para rector (noticias, documentos, eventos), calendario renovado minimalista, páginas internas completas, transparencia y requisitos legales entidad pública Colombia, todo sobre stack gratuito (Vercel + Supabase + Resend + Cloudflare).

## Requirements

### Requirement: Módulo PQRS - Radicación interactiva
Wizard multi-paso (5 pasos) con validación tiempo real, guardado localStorage, recuperación sesión. Pasos: 1) Tipo PQRS (radio cards iconos), 2) Datos solicitante (anónimo opcional, validación colombiana), 3) Detalle caso (rich text + adjuntos drag-drop 10MB c/u, máx 3), 4) Datos adicionales condicionales, 5) Resumen + consentimiento legal (Ley 1581/2012, Ley 1755/2015). UX: animaciones sutiles, feedback háptico móvil, auto-focus, teclados contextuales.

#### Scenario: Usuario radica PQRS completa
- **WHEN** usuario completa los 5 pasos y envía
- **THEN** se genera radicado `CND-YYYY-NNNNNN`, guarda en Supabase con RLS, devuelve PDF comprobante, envía email confirmación a usuario y notificación completa a rector

### Requirement: PQRS - Consulta pública y trazabilidad
Página `/pqrs/consultar` con input radicado + email/cédula (hash). Muestra timeline visual: estado, fecha, tipo, dependencia, historial cambios, respuesta final.

#### Scenario: Ciudadano consulta estado
- **WHEN** ingresa radicado y email válido
- **THEN** ve timeline completo con iconos de estado, puede descargar respuesta final en PDF

### Requirement: PQRS - Emails automáticos (usuario + rector)
Resend (3k gratis/mes) vía API route `/api/email` con templates React Email. Usuario: confirmación con radicado, resumen, enlace consulta, plazo legal 15 días. Rector: notificación completa con adjuntos, enlace panel gestión. Cambios estado: email automático en cada transición. Cola: Supabase pg_cron + edge function.

#### Scenario: Cambio de estado a "Resuelto"
- **WHEN** rector marca PQRS como Resuelto en panel admin
- **THEN** se envía email automático a usuario con respuesta, actualiza timeline, registra auditoría

### Requirement: PQRS - Panel gestión rector (área privada)
Ruta `/admin/pqrs` protegida (Supabase Auth magic link). Tabla paginada, filtros (estado, tipo, fecha, dependencia), búsqueda full-text. Acciones: cambiar estado (flujo válido), asignar responsable, nota interna, responder (genera email + timeline), exportar CSV/PDF. Dashboard KPIs: total, por estado, SLA cumplimiento, tiempo promedio.

#### Scenario: Rector gestiona PQRS pendientes
- **WHEN** accede a `/admin/pqrs` autenticado
- **THEN** ve lista filtrable, puede responder y cambiar estado con trazabilidad completa

### Requirement: CMS Rector - Noticias, Documentos, Eventos
Tablas Supabase con RLS (role `admin` write): `news` (slug, title, excerpt, content markdown, cover_image, tags[], published_at, status), `documents` (title, category, file_path, mime_type, size, description, published_at), `events` (title, description, start_at, end_at, location, cover_image, is_all_day, status). Panel `/admin/cms` con pestañas, editor Markdown toolbar + preview, subida imágenes → Storage `cms-images` transform `w=1200,q=80,f=webp`, slug auto + editable, publicar/despublicar, soft delete.

#### Scenario: Rector publica noticia con imagen
- **WHEN** crea noticia en `/admin/cms`, sube imagen cover, marca publicada
- **THEN** imagen optimizada en Supabase Storage, noticia aparece en web <60s (ISR revalidate 60s)

### Requirement: Frontend público consumiendo CMS
`/noticias` grid paginado 12/tarjeta, filtro tags, búsqueda, SEO JSON-LD Article. `/noticias/[slug]` artículo completo, related posts mismos tags. `/documentos` tabla filtrable categoría, descarga directa, vista previa PDF. `/eventos` lista + vista calendario integrada, filtro mes/año, export iCal. Home: últimos 3 noticias + 2 eventos próximos. ISR/SSG con revalidate 60s + cache tags.

#### Scenario: Visitante ve últimas noticias en Home
- **WHEN** carga `/`
- **THEN** ve 3 noticias más recientes (ISR cached) y 2 eventos próximos del calendario

### Requirement: Calendario renovado minimalista
Componente `Calendar` propio (~2KB gzipped): vista mes grid 7x5-6, navegación mes/año, "hoy" destacado, eventos como dots color por categoría (académico, cultural, administrativo, festivo). Click día → drawer lista eventos (hora, título, lugar). Vista lista alternativa accesible. Filtros chips: categoría, sede, tipo. Integración CMS: lee tabla `events` vía Supabase realtime. Export .ics individual/rango. Tema: fondo blanco, bordes neutral-100, primary-700 hoy, accent-yellow eventos. Framer Motion solo mount/unmount (respecta prefers-reduced-motion).

#### Scenario: Usuario navega calendario eventos
- **WHEN** está en `/eventos` y cambia mes
- **THEN** ve dots de eventos por categoría, click día abre drawer con detalles, tiempo real si rector añade evento

### Requirement: Páginas internas completas
- **Institucional** (`/institucional`): Misión/Visión/Valores, Historia timeline, Organigrama SVG interactivo, Símbolos (himno, bandera, escudo modal), Directivos grid, Sedes cards con mapa Leaflet.
- **Gestión Académica** (`/gestion-academica`): Calendario académico PDF + vista calendario, Proyectos transversales cards, Plan estudios por grado acordeón, Resultados Saber gráficos Recharts, Biblioteca recursos (docs CMS categoría académico).
- **Admisiones** (`/admisiones`): Paso a paso stepper visual, requisitos por grado PDF, pre-inscripción (React Hook Form + Zod → Supabase `preinscripciones`, email confirmación), fechas clave (eventos tipo admisión), FAQ acordeón, contacto directo.
- **Atención al Ciudadano** (`/atencion-ciudadana`): Hub tarjetas PQRS (radicar, consultar), buzón quejas/sugerencias, derechos usuario Ley 1755, horarios, formularios descargables CMS, enlace portal nacional SDP, mapa del sitio.

#### Scenario: Padre de familia pre-inscribe a su hijo
- **WHEN** completa formulario `/admisiones` y envía
- **THEN** guarda en Supabase, recibe email confirmación, rector ve en panel admin

### Requirement: Transparencia y requisitos legales (Ley 1712/2014, Decreto 1581/2013)
Estructura obligatoria indexada/buscable/accesible: 1) Información institucional, 2) Gestión contractual (SECOP II embed/tabla sincronizada), 3) Presupuesto y finanzas, 4) Talento humano, 5) Planeación, 6) Atención al ciudadano (link PQRS), 7) Datos abiertos (catálogo CSV/JSON, API básica), 8) Protección datos (aviso privacidad, política tratamiento, DPO, habeas data), 9) Otros (actas, resoluciones, circulares). Cada sección: lista documentos CMS categoría "transparencia", metadatos (fecha, versión, responsable, clasificación), descarga directa, versión accesible HTML+PDF/ODT. Buscador global (pg_trgm o Meilisearch free en Vercel Functions).

#### Scenario: Ciudadano busca contrato específico
- **WHEN** usa buscador transparencia con término "contrato 2024"
- **THEN** ve resultados filtrados con metadatos, puede descargar PDF accesible

### Requirement: Páginas legales complementarias
`/politica-de-privacidad` (Ley 1581/2012 + Decreto 1377/2013), `/politica-derechos-autor` (Ley 23/1982), `/terminos-y-condiciones` (uso sitio, accesibilidad, cookies), `/mapa-del-sitio` (generado automático rutas), `/accesibilidad` (declaración conformidad WCAG 2.1 AA). Contenido migrado web actual, renovado tono y diseño consistente.

#### Scenario: Usuario accede a política de privacidad
- **WHEN** navega a `/politica-de-privacidad`
- **THEN** ve contenido completo legal, diseño consistente, accesible WCAG AA

### Requirement: Infraestructura servicios gratuitos con capacidad real
| Servicio | Plan Free | Uso |
|---|---|---|
| Vercel | Hobby | Hosting Next.js, Edge Functions, ISR, Analytics |
| Supabase | Free | Postgres 500MB, Auth, Storage 1GB, Realtime, Edge Functions, pg_cron |
| Resend | Free | 3,000 emails/mes transaccionales |
| Cloudflare | Free | DNS, WAF, Cache, Analytics, Turnstile captcha |
| GitHub | Free | Repo, Actions CI/CD, Pages docs |

Arquitectura: Next.js Vercel (standalone + static), Supabase DB+Auth+Storage+Realtime, Imágenes Storage buckets `cms-images`/`pqrs-attachments`/`site-assets` signed URLs TTL 1h, Email Resend Edge Functions, Captcha Turnstile invisible, Analytics Vercel + Supabase Logs (sin GA4).

#### Scenario: Deploy automático en push a main
- **WHEN** push a main en GitHub
- **THEN** GitHub Actions: lint, typecheck, test, build → deploy Vercel preview → promote producción

### Requirement: Supabase Storage CDN imágenes CMS
Buckets: `cms-images` (public) transform `w=1200,q=80,f=webp`, `pqrs-attachments` (private) signed URL TTL 1h RLS por radicado/email, `site-assets` (public) cache largo. Componente `OptimizedImage` wrapper Next/Image + Supabase transform. Placeholder blur Base64 20px generado en upload (edge function). Fallback Cloudflare Images free 100k/mes mirror.

#### Scenario: Rector sube imagen cover noticia
- **WHEN** arrastra imagen en editor CMS
- **THEN** sube a Supabase, genera blur placeholder, URL optimizada lista para usar

### Requirement: Accesibilidad WCAG 2.1 AA obligatorio
Semántica HTML5 correcta (landmarks, headings jerárquicos), contraste ≥4.5:1 textos / ≥3:1 UI (validado CI), navegación teclado completa (focus visible, skip links, focus trap modals), ARIA labels solo donde HTML nativo no basta, alt descriptivos todas imágenes, formularios: labels asociados, error messages `aria-live`, autocomplete, reducción movimiento respetada. Auditoría: axe-core CI + test manual NVDA/VoiceOver.

#### Scenario: Usuario navega solo con teclado
- **WHEN** usa Tab/Shift+Tab/Enter/Esc en cualquier página
- **THEN** foco visible siempre, orden lógico, skip links funcionan, modales trap focus

### Requirement: SEO técnico completo
Metadata dinámico por página (title, description, OG, Twitter, JSON-LD), sitemap.xml + robots.txt build (next-sitemap), canonical URLs, hreflang ES, Core Web Vitals objetivo: LCP <2.5s, CLS <0.1, INP <200ms. Imágenes Next/Image sizes correctos, priority above-fold. Fonts `next/font` `display: swap` preload crítico. Structured Data: Organization, WebSite, BreadcrumbList, Article, Event, FAQPage.

#### Scenario: Google indexa página noticia
- **WHEN** crawler visita `/noticias/mi-noticia`
- **THEN** encuentra JSON-LD Article completo, OG tags, canonical, sitemap reference

## Non-Goals
- App móvil nativa React Native (fase 2)
- Portal estudiantes/familias con notas/asistencia (fase 2)
- Pagos en línea matrícula/pensiones (fase 2)
- Multi-idioma (solo ES MVP)
- Chatbot/IA (evaluar post-MVP)
- SSO SAML/OIDC entidad territorial (no requerido aún)

## Milestones
- **M1 Fundación + PQRS MVP** (2025-10-15): Supabase schema, Vercel CI/CD, PQRS wizard + emails + panel admin, Calendar v1, deploy preview
- **M2 CMS + Páginas internas** (2025-11-15): Panel admin CMS, frontend público noticias/documentos/eventos, páginas institucional/académico/admisiones, integración Calendar, OptimizedImage
- **M3 Transparencia + Legal + Pulido** (2025-12-15): Transparencia completa, páginas legales, auditoría WCAG AA, SEO completo, documentación técnica, deploy producción
- **M4 Entrega y capacitación** (2026-01-15): Manuales rector/usuario, checklist entrega, capacitación virtual grabada, soporte 30 días

## Dependencies
- Supabase project (DB, Auth, Storage, Realtime, Edge Functions)
- Vercel project vinculado GitHub
- Resend account + domain verificado
- Cloudflare Turnstile keys
- Dominio configurado Vercel + DNS Cloudflare
- Cuenta GitHub repo + Actions

## Risks
- **RISK-001** Límites Supabase free (500MB DB, 1GB storage) → Mitigación: archivar PQRS >2 años CSV GitHub Releases, comprimir WebP 80%, monitoreo semanal
- **RISK-002** Email deliverability Resend IP compartida → Mitigación: DKIM/SPF/DMARC dominio propio, warm-up gradual, fallback Supabase Auth emails
- **RISK-003** Complejidad legal transparencia contenido extenso → Mitigación: plantillas pre-armadas, migración por fases, priorizar secciones más consultadas
- **RISK-004** Rector no técnico usabilidad CMS/PQRS → Mitigación: UX testing rector en M1, iterar, documentación capturas + video

## Acceptance Criteria
- PQRS: radicar <5 min, email <1 min, rector panel <30s, consulta pública funciona
- CMS: crear noticia con imagen <3 min, aparece web <60s (ISR)
- Calendario: carga <1s, navegación 60fps, eventos sync realtime <2s
- Páginas internas: WCAG AA, Lighthouse SEO >90
- Transparencia: 100% secciones legales, buscador <500ms
- Performance: LCP <2.5s, CLS <0.1, INP <200ms (3G throttled)
- Deploy: cero downtime, rollback <2 min, logs centralizados

## Tech Decisions
- **TD-001** Supabase sobre Firebase: Postgres real (RLS, triggers, pg_cron, full-text), Storage S3-compatible, Realtime nativo, Edge Functions Deno, pricing predecible
- **TD-002** Resend sobre Nodemailer/SendGrid: API React Email (templates TSX), 3k gratis vs 100/día, deliverability excelente, Edge-ready, webhooks nativos
- **TD-003** Calendario custom vs FullCalendar: bundle ~2KB vs 50-100KB, requisitos simples, control total diseño minimalista
- **TD-004** Zod + React Hook Form: TypeScript-first, inferencia tipos automática, bundle menor, performance mejor
- **TD-005** Framer Motion solo mount/unmount: respeta prefers-reduced-motion nativo, ~12KB
- **TD-006** ISR revalidate 60s vs SSG puro: contenido fresco sin rebuild, Vercel ISR gratis, cache tags invalidación selectiva

## Open Questions
- ¿Dominio definitivo confirmado? (colegiolacandelaria.edu.co)
- ¿Rector prefiere auth: magic link vs email/password?
- ¿Contenido actual en WordPress/otro CMS para migrar? (export XML/JSON)
- ¿Logo/imágenes fuentes vectoriales SVG disponibles?
- ¿Integración SECOP II: embed iframe vs API (credenciales entidad)?
- ¿Meilisearch Vercel Functions vs pg_trgm para buscador transparencia?