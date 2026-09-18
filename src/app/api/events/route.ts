import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  start_at: z.string(),
  end_at: z.string().optional(),
  location: z.string().optional(),
  cover_image: z.string().url().optional(),
  cover_image_blur: z.string().optional(),
  is_all_day: z.boolean().default(false),
  category: z
    .enum(["academico", "cultural", "administrativo", "festivo", "deportivo", "general"])
    .default("general"),
  status: z.enum(["draft", "published", "cancelled"]).default("draft"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // YYYY-MM
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "published";

    const supabase = await createClient();

    let query = supabase
      .from("events")
      .select("*")
      .eq("status", status)
      .order("start_at", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    // Filtrar por mes si se especifica
    if (month) {
      const [year, monthNum] = month.split("-").map(Number);
      const startDate = new Date(year, monthNum - 1, 1).toISOString();
      const endDate = new Date(year, monthNum, 0, 23, 59, 59).toISOString();
      query = query.gte("start_at", startDate).lte("start_at", endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json(
        { error: "Error al obtener eventos" },
        { status: 500 }
      );
    }

    return NextResponse.json({ events: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const data = eventSchema.parse(body);

    const { data: event, error: eventError } = await supabase
      .from("events")
      .insert({
        title: data.title,
        description: data.description,
        start_at: data.start_at,
        end_at: data.end_at,
        location: data.location,
        cover_image: data.cover_image,
        cover_image_blur: data.cover_image_blur,
        is_all_day: data.is_all_day,
        category: data.category,
        status: data.status,
        created_by: user.id,
      })
      .select("id, title, start_at, status, created_at")
      .single();

    if (eventError) {
      console.error("Error creating event:", eventError);
      return NextResponse.json(
        { error: "Error al crear evento" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Evento creado exitosamente",
        data: event,
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