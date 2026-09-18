import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const documentSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),
  description: z.string().optional(),
  file_path: z.string().url(),
  file_name: z.string().min(1),
  file_size: z.number().optional(),
  mime_type: z.string().optional(),
  published_at: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const supabase = await createClient();

    let query = supabase
      .from("documents")
      .select("*")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching documents:", error);
      return NextResponse.json(
        { error: "Error al obtener documentos" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
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
    const data = documentSchema.parse(body);

    const { data: doc, error: docError } = await supabase
      .from("documents")
      .insert({
        title: data.title,
        category: data.category,
        description: data.description,
        file_path: data.file_path,
        file_name: data.file_name,
        file_size: data.file_size,
        mime_type: data.mime_type,
        published_at: data.published_at || new Date().toISOString(),
        created_by: user.id,
      })
      .select("id, title, category, created_at")
      .single();

    if (docError) {
      console.error("Error creating document:", docError);
      return NextResponse.json(
        { error: "Error al crear documento" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Documento creado exitosamente",
        data: doc,
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