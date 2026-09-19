import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { csrfGuard } from "@/lib/csrf";

const virtualUnitSchema = z.object({
  grade: z.string().min(1),
  teacher_name: z.string().min(3),
  drive_url: z.string().url(),
  sort_order: z.number().int().optional(),
  is_active: z.boolean().optional(),
});

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("virtual_units")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("grade", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  // CSRF protection
  const csrfError = csrfGuard(request);
  if (csrfError) return csrfError;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "rector"].includes(profile.role)) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = virtualUnitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: unit, error } = await supabase
    .from("virtual_units")
    .insert(parsed.data)
    .select("id, grade, teacher_name")
    .single();

  if (error) {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
  return NextResponse.json({ data: unit }, { status: 201 });
}