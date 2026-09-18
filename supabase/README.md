# Supabase Setup - IE Nuestra Señora de la Candelaria

## 1. Crear proyecto Supabase

1. Ve a [supabase.com](https://supabase.com) → **Start your project**
2. Crea cuenta (GitHub recommended)
3. **New Project**:
   - Organization: crear nueva o usar existente
   - Project name: `colegio-candelaria`
   - Database password: **guárdala segura** (la necesitarás)
   - Region: `US East` (más cercano a Colombia)
   - Plan: **Free** (suficiente: 500MB DB, 1GB storage, 50k MAU)

## 2. Ejecutar schema SQL

1. En el Dashboard de tu proyecto, ve a **SQL Editor** (menú izquierdo)
2. Haz clic en **New query**
3. Copia y pega todo el contenido de `schema.sql`
4. Haz clic en **Run** (▶️)
5. Verifica que no haya errores en la consola

## 3. Configurar Auth

1. Ve a **Authentication** → **Providers**
2. Habilita **Email** (viene habilitado por defecto)
3. Opcional: Habilita **Magic Link** para login del rector
4. Ve a **Authentication** → **URL Configuration**:
   - Site URL: `https://www.colegiolacandelaria.edu.co`
   - Redirect URLs: `http://localhost:3000/**`

## 4. Crear usuario rector

1. Ve a **Authentication** → **Users** → **Add user**
2. Email: `rector@colegiolacandelaria.edu.co` (o el real)
3. Password: genera uno seguro
4. **Auto Confirm**: ✅ Yes
5. Después de crear el usuario:
   - Copia su UUID
   - Ve al **SQL Editor** y ejecuta:
   ```sql
   UPDATE public.profiles
   SET role = 'rector', full_name = 'Nombre del Rector'
   WHERE id = 'UUID_DEL_USUARIO';
   ```

## 5. Verificar buckets de Storage

Los buckets se crean con el schema SQL. Verifica en **Storage**:

| Bucket | Público | Límite | MIME Types |
|--------|---------|--------|------------|
| `cms-images` | ✅ Sí | 10MB | JPEG, PNG, WebP, GIF |
| `pqrs-attachments` | ❌ No | 10MB | JPEG, PNG, WebP, PDF, DOCX |
| `site-assets` | ✅ Sí | 5MB | JPEG, PNG, WebP, SVG, ICO |
| `preinscripciones` | ❌ No | 5MB | JPEG, PNG, WebP, PDF |

## 6. Obtener credenciales para Next.js

Ve a **Settings** → **API** (menú izquierdo) y copia:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOi...
service_role key: eyJhbGciOi... (⚠️ NUNCA en frontend)
```

## 7. Configurar variables de entorno

Crea archivo `.env.local` en la raíz del proyecto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...  # ⚠️ Solo server-side

# Email (Resend) - configurar después
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@colegiolacandelaria.edu.co
RECTOR_EMAIL=rector@colegiolacandelaria.edu.co

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 8. Verificar funcionamiento

```bash
# Instalar dependencias Supabase
npm install @supabase/supabase-js

# Arrancar dev
npm run dev
```

## Estructura de tablas

```
profiles          ← Perfiles de usuario (extiende auth.users)
├── id (UUID, FK → auth.users)
├── email
├── full_name
├── role (user | admin | rector)
└── phone

pqrs              ← PQRSD radicadas
├── id (UUID)
├── radicado (CND-YYYY-NNNNNN) ← auto-generado
├── type (peticion|queja|reclamo|sugerencia|denuncia)
├── status (recibida|en_estudio|en_curso|resuelta|cerrada|rechazada)
├── is_anonymous
├── full_name, document_*, email, phone, address, city
├── subject, description
├── dependency, event_date
├── response, responded_at, responded_by
└── created_at, updated_at

pqrs_timeline     ← Historial de cambios de estado
├── id, pqrs_id (FK → pqrs)
├── old_status, new_status
├── note, performed_by
└── created_at

pqrs_attachments  ← Archivos adjuntos PQRS
├── id, pqrs_id (FK → pqrs)
├── file_name, file_path, file_size, mime_type
└── created_at

news              ← Noticias CMS
├── id, slug (unique)
├── title, excerpt, content (markdown)
├── cover_image, cover_image_blur
├── tags[]
├── status (draft|published|archived)
├── published_at, created_by
└── created_at, updated_at

documents         ← Documentos CMS
├── id
├── title, category, description
├── file_path, file_name, file_size, mime_type
├── published_at, created_by
└── created_at, updated_at

events            ← Eventos CMS
├── id
├── title, description
├── start_at, end_at, is_all_day
├── location, cover_image
├── category (academico|cultural|administrativo|festivo|deportivo|general)
├── status (draft|published|cancelled)
└── created_at, updated_at

preinscripciones  ← Pre-inscripciones admisiones
├── id
├── student_* (nombre, doc, fecha_nac, grado)
├── guardian_* (nombre, doc, tel, email, parentesco)
├── previous_school, observations
├── status (pendiente|en_revision|aceptada|rechazada|matriculado)
└── created_at, updated_at
```

## Funciones SQL importantes

| Función | Descripción |
|---------|-------------|
| `search_pqrs(radicado, email)` | Consulta pública PQRS por radicado + email/cédula |
| `get_pqrs_timeline(radicado)` | Obtiene historial de estados de una PQRS |
| `pqrs_stats()` | Dashboard KPIs: total, por estado, tiempo promedio |

## Realtime

Habilitado para:
- `events` → Calendario se actualiza en tiempo real
- `pqrs` → Panel admin se actualiza al recibir nueva PQRS

## Próximos pasos

1. Instalar `@supabase/supabase-js`: `npm install @supabase/supabase-js`
2. Crear `src/lib/supabase.ts` con cliente configurado
3. Crear API routes para PQRS, CMS, Email
4. Implementar componentes UI según OpenSpec