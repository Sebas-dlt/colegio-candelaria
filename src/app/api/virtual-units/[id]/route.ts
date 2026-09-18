import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const virtualUnitUpdateSchema = z.object({
  grade: z.string().min(1).optional(),
  teacher_name: z.string().min(3).optional(),
  drive_url: z.string().url().optional(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
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
  const parsed = virtualUnitUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: unit, error: updateError } = await supabase
    .from("virtual_units")
    .update(parsed.data)
    .eq("id", id)
    .select("id, grade, teacher_name")
    .single();

  if (updateError) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
  return NextResponse.json({ data: unit });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { error: deleteError } = await supabase.from("virtual_units").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
  return NextResponse.json({ message: "Eliminado" });
}