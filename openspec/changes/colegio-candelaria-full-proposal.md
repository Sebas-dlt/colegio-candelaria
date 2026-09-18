## Why
El sitio actual solo tiene Home page. Necesitamos implementar todas las funcionalidades institucionales requeridas por ley (transparencia Ley 1712/2014, protección datos Ley 1581/2012, atención ciudadano Ley 1755/2015) más PQRS dinámico, CMS para autonomía del rector, calendario moderno, y páginas internas completas. Todo sobre stack gratuito sostenible (Vercel + Supabase + Resend + Cloudflare).

## What Changes
Implementación completa end-to-end: base de datos Supabase (schema PQRS, noticias, documentos, eventos, auth), API routes (email, upload, PQRS), componentes UI (wizard PQRS, calendario, CMS editor, tabla transparencia), páginas Next.js App Router (todas las rutas del navbar + legales), panel admin protegido, CI/CD GitHub Actions, deploy Vercel producción.

## Capabilities

### New Capabilities
- `pqrs/radicar`: Wizard multi-paso radicación PQRS con adjuntos, validación colombiana, PDF comprobante
- `pqrs/consultar`: Consulta pública por radicado + email/cédula, timeline visual trazabilidad
- `pqrs/emails`: Emails automáticos usuario (confirmación, cambios estado) + rector (notificación, gestión)
- `pqrs/admin`: Panel rector gestión PQRS (lista, filtros, cambio estado, responder, exportar, dashboard KPIs)
- `cms/noticias`: CRUD noticias con editor Markdown, imagen cover optimizada, tags, ISR 60s
- `cms/documentos`: CRUD documentos categorizados, subida archivos, vista previa PDF, descarga directa
- `cms/eventos`: CRUD eventos con recurrencia básica, integración calendario, export iCal
- `calendar`: Componente calendario minimalista propio (mes, dots categoría, drawer día, realtime Supabase)
- `pages/institucional`: Misión/Visión/Valores, historia timeline, organigrama SVG, símbolos, directivos, sedes Leaflet
- `pages/gestion-academica`: Calendario académico, proyectos transversales, plan estudios, resultados Saber gráficos, biblioteca
- `pages/admisiones`: Stepper proceso, requisitos PDF, pre-inscripción form + email, FAQ, fechas clave
- `pages/atencion-ciudadana`: Hub PQRS, buzón quejas, derechos usuario, horarios, formularios, enlace SDP
- `transparencia`: Estructura 9 secciones Ley 1712, documentos CMS categoría transparencia, buscador global, metadatos, versiones accesibles
- `legal/pages`: Privacidad, derechos autor, términos, mapa sitio, accesibilidad WCAG 2.1 AA
- `infra/supabase`: Schema completo, RLS, Storage buckets, Realtime, Edge Functions, pg_cron
- `infra/email`: Resend + React Email templates, cola pg_cron, webhooks
- `infra/storage`: Supabase Storage transform on-the-fly, blur placeholders, fallback Cloudflare Images
- `a11y/wcag-aa`: Auditoría completa axe-core CI, semántica, contraste, teclado, ARIA, redución movimiento
- `seo/technical`: Metadata dinámico, JSON-LD, sitemap, Core Web Vitals, fonts optimizadas

## Impact
- **Nuevos archivos**: ~50+ componentes, ~20 páginas App Router, ~15 API routes, schema SQL, configs
- **Dependencias nuevas**: `@supabase/supabase-js`, `@react-pdf/renderer`, `react-hook-form`, `zod`, `@tanstack/react-table`, `framer-motion`, `date-fns`, `lucide-react` (o @tabler/icons existente), `resend`, `react-email`, `next-sitemap`, `axe-core`
- **Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `RECTOR_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`
- **Supabase**: 8 tablas, 3 buckets, 5 policies RLS, 3 edge functions, 2 cron jobs
- **Vercel**: ISR, Edge Functions, Analytics, Preview deployments