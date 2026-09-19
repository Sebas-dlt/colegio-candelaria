import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { sendPqrsConfirmation, sendPqrsNotification } from "@/lib/email/send";
import { checkRateLimit } from "@/lib/rate-limit";
import { csrfGuard } from "@/lib/csrf";

const pqrsSchema = z.object({
  type: z.enum(["peticion", "queja", "reclamo", "sugerencia", "denuncia"]),
  is_anonymous: z.boolean().default(false),
  full_name: z.string().min(2).optional(),
  document_type: z.string().optional(),
  document_number: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  subject: z.string().min(5),
  description: z.string().min(20),
  dependency: z.string().optional(),
  event_date: z.string().optional(),
  evidence_description: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // CSRF protection
    const csrfError = csrfGuard(request);
    if (csrfError) return csrfError;

    // Rate limiting: 3 PQRS por hora por IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const { success: rateLimitOk, remaining } = await checkRateLimit("pqrs", ip);
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Has alcanzado el límite de envío. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = pqrsSchema.parse(body);

    const supabase = await createClient();

    // Si no es anónimo, validar datos obligatorios
    if (!data.is_anonymous) {
      if (!data.full_name || !data.email || !data.document_number) {
        return NextResponse.json(
          { error: "Nombre, email y número de documento son obligatorios" },
          { status: 400 }
        );
      }
    }

    // Insertar PQRS
    const { data: pqrs, error: pqrsError } = await supabase
      .from("pqrs")
      .insert({
        type: data.type,
        is_anonymous: data.is_anonymous,
        full_name: data.full_name,
        document_type: data.document_type,
        document_number: data.document_number,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        subject: data.subject,
        description: data.description,
        dependency: data.dependency,
        event_date: data.event_date,
        evidence_description: data.evidence_description,
        source: "web",
      })
      .select("radicado, type, status, created_at")
      .single();

    if (pqrsError) {
      console.error("Error creating PQRS:", pqrsError);
      return NextResponse.json(
        { error: "Error al crear la PQRS" },
        { status: 500 }
      );
    }

    // Enviar emails (no bloquear la respuesta)
    const emailPromises: Promise<unknown>[] = [];

    // Email de confirmación al usuario (si no es anónimo y tiene email)
    if (!data.is_anonymous && data.email) {
      emailPromises.push(
        sendPqrsConfirmation({
          to: data.email,
          radicado: pqrs.radicado,
          type: pqrs.type,
          subject: data.subject,
          description: data.description,
          recipientName: data.full_name,
        })
      );
    }

    // Email de notificación al rector
    emailPromises.push(
      sendPqrsNotification({
        radicado: pqrs.radicado,
        type: pqrs.type,
        subject: data.subject,
        description: data.description,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        dependency: data.dependency,
      })
    );

    // Ejecutar emails en background (no bloquear respuesta)
    Promise.allSettled(emailPromises).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Email ${index} failed:`, result.reason);
        }
      });
    });

    return NextResponse.json(
      {
        message: "PQRS radicada exitosamente",
        data: {
          radicado: pqrs.radicado,
          type: pqrs.type,
          status: pqrs.status,
          created_at: pqrs.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Verificar autenticación
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Verificar rol admin/rector
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "rector"].includes(profile.role)) {
      return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
    }

    // Obtener parámetros de query
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    let query = supabase
      .from("pqrs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filtros
    if (status) {
      query = query.eq("status", status);
    }
    if (type) {
      query = query.eq("type", type);
    }
    if (search) {
      // Sanitizar parámetros de búsqueda: escapar wildcards de ILIKE
      const sanitizedSearch = search
        .replace(/%/g, "\\%")
        .replace(/_/g, "\\_")
        .trim()
        .slice(0, 100); // Limitar longitud
      
      if (sanitizedSearch) {
        query = query.or(
          `radicado.ilike.%${sanitizedSearch}%,subject.ilike.%${sanitizedSearch}%,full_name.ilike.%${sanitizedSearch}%`
        );
      }
    }

    // Paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching PQRS:", error);
      return NextResponse.json(
        { error: "Error al obtener PQRS" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}