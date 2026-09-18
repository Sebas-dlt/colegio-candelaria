import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const newsSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  cover_image: z.string().url().optional(),
  cover_image_blur: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  published_at: z.string().optional(),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const status = searchParams.get("status") || "published";
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    const supabase = await createClient();

    let query = supabase
      .from("news")
      .select("*", { count: "exact" })
      .eq("status", status)
      .order("published_at", { ascending: false });

    if (tag) {
      query = query.contains("tags", [tag]);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching news:", error);
      return NextResponse.json(
        { error: "Error al obtener noticias" },
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
    const data = newsSchema.parse(body);

    // Generar slug único
    let slug = generateSlug(data.title);
    const { data: existing } = await supabase
      .from("news")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Si está publicando, setear published_at
    const publishedAt =
      data.status === "published" && !data.published_at
        ? new Date().toISOString()
        : data.published_at;

    const { data: news, error: newsError } = await supabase
      .from("news")
      .insert({
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        cover_image: data.cover_image,
        cover_image_blur: data.cover_image_blur,
        tags: data.tags,
        status: data.status,
        published_at: publishedAt,
        created_by: user.id,
      })
      .select("id, slug, title, status, created_at")
      .single();

    if (newsError) {
      console.error("Error creating news:", newsError);
      return NextResponse.json(
        { error: "Error al crear noticia" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Noticia creada exitosamente",
        data: news,
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