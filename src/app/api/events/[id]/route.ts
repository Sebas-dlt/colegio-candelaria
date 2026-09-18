import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const eventUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  start_at: z.string().optional(),
  end_at: z.string().optional(),
  location: z.string().optional(),
  cover_image: z.string().url().optional(),
  cover_image_blur: z.string().optional(),
  is_all_day: z.boolean().optional(),
  category: z.enum(["academico", "cultural", "administrativo", "festivo", "deportivo", "general"]).optional(),
  status: z.enum(["draft", "published", "cancelled"]).optional(),
});

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, error: NextResponse.json({ error: "No autenticado" }, { status: 401 }) };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["admin", "rector"].includes(profile.role)) {
    return { supabase, error: NextResponse.json({ error: "Sin permisos" }, { status: 403 }) };
  }
  return { supabase, error: null };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const data = eventUpdateSchema.parse(body);

  const { data: event, error: updateError } = await supabase
    .from("events")
    .update(data)
    .eq("id", id)
    .select("id, title, start_at, status")
    .single();

  if (updateError) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
  return NextResponse.json({ data: event });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { error: deleteError } = await supabase.from("events").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
  return NextResponse.json({ message: "Eliminado" });
}