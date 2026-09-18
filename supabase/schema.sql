-- ============================================================
-- IE Nuestra Señora de la Candelaria - Schema Supabase
-- Versión: 1.0
-- Fecha: 2025-09-17
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- búsqueda full-text

-- ============================================================
-- 1. AUTENTICACIÓN / ROLES
-- ============================================================

-- Tabla de perfiles (extiende auth.users de Supabase)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'rector')),
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger: auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. PQRS (Peticiones, Quejas, Reclamos, Sugerencias, Denuncias)
-- ============================================================

-- Enum de estados PQRS
CREATE TYPE pqrs_status AS ENUM (
  'recibida',        -- Radicada, esperando revisión
  'en_estudio',      -- En análisis por dependencia
  'en_curso',        -- En proceso de respuesta
  'resuelta',        -- Respondida
  'cerrada',         -- Cerrada por usuario o sistema
  'rechazada'        -- No procede (con fundamentación)
);

CREATE TYPE pqrs_type AS ENUM (
  'peticion',
  'queja',
  'reclamo',
  'sugerencia',
  'denuncia'
);

-- Tabla principal PQRS
CREATE TABLE public.pqrs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  radicado TEXT UNIQUE NOT NULL, -- CND-YYYY-NNNNNN
  type pqrs_type NOT NULL,
  status pqrs_status NOT NULL DEFAULT 'recibida',

  -- Datos solicitante (opcional si anónimo)
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  full_name TEXT,
  document_type TEXT, -- CC, CE, TI, RC, PA
  document_number TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,

  -- Detalle del caso
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  dependency TEXT, -- Dependencia involucrada
  event_date DATE, -- Fecha del hecho
  evidence_description TEXT,

  -- Metadata
  source TEXT DEFAULT 'web', -- web, presencial, telefonico
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Respuesta final
  response TEXT,
  responded_at TIMESTAMPTZ,
  responded_by UUID REFERENCES public.profiles(id)
);

-- Índices PQRS
CREATE INDEX idx_pqrs_radicado ON public.pqrs(radicado);
CREATE INDEX idx_pqrs_status ON public.pqrs(status);
CREATE INDEX idx_pqrs_type ON public.pqrs(type);
CREATE INDEX idx_pqrs_created ON public.pqrs(created_at DESC);
CREATE INDEX idx_pqrs_email ON public.pqrs(email);
CREATE INDEX idx_pqrs_document ON public.pqrs(document_number);
CREATE INDEX idx_pqrs_search ON public.pqrs USING gin(
  to_tsvector('spanish', subject || ' ' || description || ' ' || COALESCE(radicado, ''))
);

-- Historial de estados PQRS
CREATE TABLE public.pqrs_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pqrs_id UUID NOT NULL REFERENCES public.pqrs(id) ON DELETE CASCADE,
  old_status pqrs_status,
  new_status pqrs_status NOT NULL,
  note TEXT, -- Nota interna o pública
  performed_by UUID REFERENCES public.profiles(id),
  is_internal BOOLEAN DEFAULT FALSE, -- Nota solo visible para admin
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pqrs_timeline_pqrs ON public.pqrs_timeline(pqrs_id, created_at DESC);

-- Adjuntos PQRS
CREATE TABLE public.pqrs_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pqrs_id UUID NOT NULL REFERENCES public.pqrs(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- ruta en Supabase Storage
  file_size INTEGER, -- bytes
  mime_type TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pqrs_attachments_pqrs ON public.pqrs_attachments(pqrs_id);

-- Función para generar radicado secuencial
CREATE OR REPLACE FUNCTION generate_radicado()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
  year_part TEXT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(radicado FROM 'CND-\d{4}-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO next_num
  FROM public.pqrs
  WHERE radicado LIKE 'CND-' || year_part || '-%';
  
  NEW.radicado := 'CND-' || year_part || '-' || LPAD(next_num::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_generate_radicado
  BEFORE INSERT ON public.pqrs
  FOR EACH ROW EXECUTE FUNCTION generate_radicado();

-- Función para registrar cambio de estado en timeline
CREATE OR REPLACE FUNCTION log_pqrs_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.pqrs_timeline (pqrs_id, old_status, new_status, performed_by)
    VALUES (NEW.id, OLD.status, NEW.status, NEW.responded_by);
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_pqrs_status_change
  BEFORE UPDATE ON public.pqrs
  FOR EACH ROW EXECUTE FUNCTION log_pqrs_status_change();

-- ============================================================
-- 3. CMS - NOTICIAS
-- ============================================================

CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT, -- Markdown
  cover_image TEXT, -- URL en Supabase Storage
  cover_image_blur TEXT, -- Base64 placeholder
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_published ON public.news(published_at DESC);
CREATE INDEX idx_news_tags ON public.news USING gin(tags);
CREATE INDEX idx_news_search ON public.news USING gin(
  to_tsvector('spanish', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content, ''))
);

-- ============================================================
-- 4. CMS - DOCUMENTOS
-- ============================================================

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- transparencia, academico, administrativo, legal, otro
  description TEXT,
  file_path TEXT NOT NULL, -- URL en Supabase Storage
  file_name TEXT NOT NULL,
  file_size INTEGER, -- bytes
  mime_type TEXT, -- application/pdf, image/png, etc.
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_category ON public.documents(category);
CREATE INDEX idx_documents_published ON public.documents(published_at DESC);
CREATE INDEX idx_documents_search ON public.documents USING gin(
  to_tsvector('spanish', title || ' ' || COALESCE(description, ''))
);

-- ============================================================
-- 5. CMS - EVENTOS
-- ============================================================

CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  location TEXT,
  cover_image TEXT,
  cover_image_blur TEXT,
  is_all_day BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL DEFAULT 'general' CHECK (
    category IN ('academico', 'cultural', 'administrativo', 'festivo', 'deportivo', 'general')
  ),
  status event_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_start ON public.events(start_at);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_published ON public.events(start_at DESC) WHERE status = 'published';

-- ============================================================
-- 6. ADMISIONES - PRE-INSCRIPCIONES
-- ============================================================

CREATE TABLE public.preinscripciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Datos estudiante
  student_full_name TEXT NOT NULL,
  student_document_type TEXT NOT NULL,
  student_document_number TEXT NOT NULL,
  student_birth_date DATE NOT NULL,
  student_grade_requested TEXT NOT NULL, -- Grado al que aspira
  
  -- Datos acudiente
  guardian_full_name TEXT NOT NULL,
  guardian_document_type TEXT NOT NULL,
  guardian_document_number TEXT NOT NULL,
  guardian_phone TEXT NOT NULL,
  guardian_email TEXT NOT NULL,
  guardian_relationship TEXT NOT NULL, -- padre, madre, acudiente
  
  -- Datos adicionales
  previous_school TEXT,
  observations TEXT,
  
  -- Estado
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (
    status IN ('pendiente', 'en_revision', 'aceptada', 'rechazada', 'matriculado')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_preinscripciones_status ON public.preinscripciones(status);
CREATE INDEX idx_preinscripciones_grade ON public.preinscripciones(student_grade_requested);
CREATE INDEX idx_preinscripciones_created ON public.preinscripciones(created_at DESC);

-- ============================================================
-- 7. RLS (Row Level Security)
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pqrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pqrs_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pqrs_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preinscripciones ENABLE ROW LEVEL SECURITY;

-- ---------- PROFILES ----------
-- Cualquiera puede ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admin/rector puede ver todos los perfiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ---------- PQRS ----------
-- Público: crear PQRS (cualquiera, incluyendo anónimos via service role)
CREATE POLICY "Anyone can create PQRS"
  ON public.pqrs FOR INSERT
  WITH CHECK (true);

-- Público: consultar su propia PQRS por radicado + email
CREATE POLICY "Users can view own PQRS by radicado"
  ON public.pqrs FOR SELECT
  USING (
    -- Si está autenticado, ve las suyas
    auth.uid() IS NOT NULL AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'rector')
      )
      OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Anónimos pueden consultar por radicado (vía API route con service role)
-- La API route verifica radicado + email hash antes de devolver datos

-- Admin/rector puede ver todas las PQRS
CREATE POLICY "Admins can view all PQRS"
  ON public.pqrs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Admin/rector puede actualizar PQRS (cambiar estado, responder)
CREATE POLICY "Admins can update PQRS"
  ON public.pqrs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- PQRS TIMELINE ----------
-- Solo admin/rector ve el historial
CREATE POLICY "Admins can view PQRS timeline"
  ON public.pqrs_timeline FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Admin puede insertar en timeline
CREATE POLICY "Admins can insert PQRS timeline"
  ON public.pqrs_timeline FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- PQRS ATTACHMENTS ----------
-- Ver adjuntos de propias PQRS (autenticados)
CREATE POLICY "Users can view own PQRS attachments"
  ON public.pqrs_attachments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pqrs p
      WHERE p.id = pqrs_attachments.pqrs_id
      AND (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE id = auth.uid() AND role IN ('admin', 'rector')
        )
        OR p.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

-- Admin puede insertar adjuntos
CREATE POLICY "Admins can insert PQRS attachments"
  ON public.pqrs_attachments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- NEWS ----------
-- Público: ver noticias publicadas
CREATE POLICY "Anyone can view published news"
  ON public.news FOR SELECT
  USING (status = 'published');

-- Admin/rector: ver todas las noticias (incluyendo drafts)
CREATE POLICY "Admins can view all news"
  ON public.news FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Admin/rector: CRUD noticias
CREATE POLICY "Admins can insert news"
  ON public.news FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can update news"
  ON public.news FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete news"
  ON public.news FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- DOCUMENTS ----------
-- Público: ver documentos publicados
CREATE POLICY "Anyone can view published documents"
  ON public.documents FOR SELECT
  USING (published_at IS NOT NULL);

-- Admin/rector: CRUD documentos
CREATE POLICY "Admins can view all documents"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can insert documents"
  ON public.documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can update documents"
  ON public.documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete documents"
  ON public.documents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- EVENTS ----------
-- Público: ver eventos publicados
CREATE POLICY "Anyone can view published events"
  ON public.events FOR SELECT
  USING (status = 'published');

-- Admin/rector: CRUD eventos
CREATE POLICY "Admins can view all events"
  ON public.events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can insert events"
  ON public.events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can update events"
  ON public.events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete events"
  ON public.events FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ---------- PREINSCRIPCIONES ----------
-- Solo admin/rector ve pre-inscripciones
CREATE POLICY "Admins can view all preinscripciones"
  ON public.preinscripciones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Público puede crear pre-inscripción
CREATE POLICY "Anyone can create preinscripcion"
  ON public.preinscripciones FOR INSERT
  WITH CHECK (true);

-- Admin puede actualizar estado
CREATE POLICY "Admins can update preinscripciones"
  ON public.preinscripciones FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ============================================================
-- 8. STORAGE BUCKETS + POLICIES
-- ============================================================

-- Crear buckets (ejecutar en Supabase Dashboard > Storage)
-- O usar SQL:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('cms-images', 'cms-images', true, 10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('pqrs-attachments', 'pqrs-attachments', false, 10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf',
           'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('site-assets', 'site-assets', true, 5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/x-icon']),
  ('preinscripciones', 'preinscripciones', false, 5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

-- Policies para cms-images (público lectura, admin escritura)
CREATE POLICY "Public read access for cms-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-images');

CREATE POLICY "Admins can upload to cms-images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'cms-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can update cms-images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'cms-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete from cms-images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'cms-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Policies para pqrs-attachments (privado, solo admin + dueño)
CREATE POLICY "Admins can view pqrs-attachments"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'pqrs-attachments'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can upload to pqrs-attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pqrs-attachments'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete from pqrs-attachments"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pqrs-attachments'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Policies para site-assets (público lectura, admin escritura)
CREATE POLICY "Public read access for site-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload to site-assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'site-assets'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Admins can delete from site-assets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'site-assets'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- Policies para preinscripciones (privado, solo admin)
CREATE POLICY "Admins can view preinscripciones files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'preinscripciones'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "Anyone can upload to preinscripciones"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'preinscripciones');

CREATE POLICY "Admins can delete from preinscripciones"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'preinscripciones'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ============================================================
-- 9. FUNCIONES ÚTILES
-- ============================================================

-- Función para buscar PQRS por radicado + email (consulta pública)
CREATE OR REPLACE FUNCTION search_pqrs(
  p_radicado TEXT,
  p_email TEXT
)
RETURNS TABLE (
  radicado TEXT,
  type pqrs_type,
  status pqrs_status,
  subject TEXT,
  created_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  response TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.radicado,
    p.type,
    p.status,
    p.subject,
    p.created_at,
    p.responded_at,
    p.response
  FROM public.pqrs p
  WHERE p.radicado = p_radicado
    AND (
      p.email = p_email
      OR p.document_number = p_email -- Acepta cédula también
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener timeline de una PQRS
CREATE OR REPLACE FUNCTION get_pqrs_timeline(p_radicado TEXT)
RETURNS TABLE (
  old_status pqrs_status,
  new_status pqrs_status,
  note TEXT,
  performed_by_name TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pt.old_status,
    pt.new_status,
    pt.note,
    COALESCE(pr.full_name, 'Sistema') AS performed_by_name,
    pt.created_at
  FROM public.pqrs_timeline pt
  LEFT JOIN public.profiles pr ON pr.id = pt.performed_by
  WHERE pt.pqrs_id = (SELECT id FROM public.pqrs WHERE radicado = p_radicado)
  ORDER BY pt.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para estadísticas admin PQRS
CREATE OR REPLACE FUNCTION pqrs_stats()
RETURNS TABLE (
  total BIGINT,
  por_estado JSONB,
  tiempo_promedio_respuesta_horas NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM public.pqrs) AS total,
    (
      SELECT jsonb_object_agg(status, count)
      FROM (
        SELECT status, COUNT(*) as count
        FROM public.pqrs
        GROUP BY status
      ) sub
    ) AS por_estado,
    (
      SELECT ROUND(AVG(EXTRACT(EPOCH FROM (responded_at - created_at)) / 3600), 1)
      FROM public.pqrs
      WHERE responded_at IS NOT NULL
    ) AS tiempo_promedio_respuesta_horas;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 10. DATOS INICIALES (opcional -执行一次)
-- ============================================================

-- Crear usuario rector inicial (reemplaza con tu email real)
-- IMPORTANTE: Ejecutar después de crear el usuario en Supabase Auth
-- INSERT INTO public.profiles (id, email, full_name, role)
-- VALUES ('UUID_DEL_USUARIO', 'rector@colegiolacandelaria.edu.co', 'Nombre del Rector', 'rector');

-- Categorías de documentos de transparencia (para usar en CMS)
-- INSERT INTO public.documents (title, category, file_path, file_name, mime_type)
-- VALUES
--   ('Estatutos', 'transparencia', '/path/to/estatutos.pdf', 'estatutos.pdf', 'application/pdf'),
--   ('Organigrama', 'transparencia', '/path/to/organigrama.pdf', 'organigrama.pdf', 'application/pdf');

-- ============================================================
-- 11. REALTIME (suscripciones en tiempo real)
-- ============================================================

-- Habilitar realtime para eventos (calendario)
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;

-- Habilitar realtime para PQRS (panel admin se actualiza)
ALTER PUBLICATION supabase_realtime ADD TABLE public.pqrs;

-- ============================================================
-- 12. ENLACES UNIDADES VIRTUALES
-- ============================================================

-- Tabla de enlaces de unidades virtuales (docentes)
CREATE TABLE public.virtual_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade TEXT NOT NULL,                          -- Grado (00A, 01B, 06A, etc.)
  teacher_name TEXT NOT NULL,                   -- Nombre del docente
  drive_url TEXT NOT NULL,                      -- URL de Google Drive
  sort_order INTEGER NOT NULL DEFAULT 0,        -- Orden de aparición
  is_active BOOLEAN NOT NULL DEFAULT true,      -- Si está activo o no
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para búsquedas por grado
CREATE INDEX idx_virtual_units_grade ON public.virtual_units(grade);
CREATE INDEX idx_virtual_units_active ON public.virtual_units(is_active);

-- RLS para virtual_units
ALTER TABLE public.virtual_units ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "virtual_units_select_public"
  ON public.virtual_units FOR SELECT
  USING (true);

-- Escritura solo admin/rector
CREATE POLICY "virtual_units_insert_admin"
  ON public.virtual_units FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "virtual_units_update_admin"
  ON public.virtual_units FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

CREATE POLICY "virtual_units_delete_admin"
  ON public.virtual_units FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'rector')
    )
  );

-- ============================================================
-- 13. CRON JOBS (pg_cron - para emails de PQRS)
-- ============================================================

-- Nota: pg_cron está disponible en el plan gratuito de Supabase
-- Configurar en Supabase Dashboard > Database > Extensions > pg_cron

-- Job para procesar cola de emails PQRS (cada 5 minutos)
-- INSERT INTO cron.job (schedule, command, nodename)
-- VALUES (
--   '*/5 * * * *',
--   $$SELECT net.http_post(
--     url := current_setting('app.settings.edge_function_url') || '/send-pqrs-emails',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
--     ),
--     body := '{}'::jsonb
--   )$$,
--   'supabase-functions'
-- );

-- ============================================================
-- FIN DEL SCHEMA
-- ============================================================