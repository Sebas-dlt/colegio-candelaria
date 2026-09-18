import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { sendPqrsStatusUpdate } from "@/lib/email/send";

const updateSchema = z.object({
  status: z
    .enum(["recibida", "en_estudio", "en_curso", "resuelta", "cerrada", "rechazada"])
    .optional(),
  response: z.string().optional(),
  note: z.string().optional(),
  dependency: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ radicado: string }> }
) {
  try {
    const { radicado } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

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

    // Obtener PQRS actual
    const { data: currentPqrs } = await supabase
      .from("pqrs")
      .select("id, status")
      .eq("radicado", radicado)
      .single();

    if (!currentPqrs) {
      return NextResponse.json(
        { error: "PQRS no encontrada" },
        { status: 404 }
      );
    }

    // Actualizar PQRS
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.status) {
      updateData.status = data.status;
    }

    if (data.response) {
      updateData.response = data.response;
      updateData.responded_at = new Date().toISOString();
      updateData.responded_by = user.id;
    }

    if (data.dependency) {
      updateData.dependency = data.dependency;
    }

    const { error: updateError } = await supabase
      .from("pqrs")
      .update(updateData)
      .eq("radicado", radicado);

    if (updateError) {
      console.error("Error updating PQRS:", updateError);
      return NextResponse.json(
        { error: "Error al actualizar PQRS" },
        { status: 500 }
      );
    }

    // Registrar en timeline si cambió el estado
    if (data.status && data.status !== currentPqrs.status) {
      const { error: timelineError } = await supabase
        .from("pqrs_timeline")
        .insert({
          pqrs_id: currentPqrs.id,
          old_status: currentPqrs.status,
          new_status: data.status,
          note: data.note,
          performed_by: user.id,
          is_internal: false,
        });

      if (timelineError) {
        console.error("Error creating timeline entry:", timelineError);
      }
    }

    // Enviar email de notificación al usuario si cambió el estado
    if (data.status && data.status !== currentPqrs.status) {
      // Obtener datos completos de la PQRS para el email
      const { data: fullPqrs } = await supabase
        .from("pqrs")
        .select("email, full_name, subject, type")
        .eq("radicado", radicado)
        .single();

      if (fullPqrs?.email) {
        sendPqrsStatusUpdate({
          to: fullPqrs.email,
          radicado,
          type: fullPqrs.type,
          subject: fullPqrs.subject,
          newStatus: data.status,
          response: data.response,
          recipientName: fullPqrs.full_name || undefined,
        }).catch((err) => console.error("Error sending status email:", err));
      }
    }

    return NextResponse.json({
      message: "PQRS actualizada exitosamente",
    });
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ radicado: string }> }
) {
  try {
    const { radicado } = await params;

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

    // Obtener PQRS completa
    const { data: pqrs, error: pqrsError } = await supabase
      .from("pqrs")
      .select("*")
      .eq("radicado", radicado)
      .single();

    if (pqrsError || !pqrs) {
      return NextResponse.json(
        { error: "PQRS no encontrada" },
        { status: 404 }
      );
    }

    // Obtener timeline
    const { data: timeline } = await supabase
      .from("pqrs_timeline")
      .select(
        `
        old_status,
        new_status,
        note,
        is_internal,
        created_at,
        profiles:performed_by (full_name)
      `
      )
      .eq("pqrs_id", pqrs.id)
      .order("created_at", { ascending: false });

    // Obtener adjuntos
    const { data: attachments } = await supabase
      .from("pqrs_attachments")
      .select("id, file_name, file_size, mime_type, created_at")
      .eq("pqrs_id", pqrs.id);

    return NextResponse.json({
      data: {
        ...pqrs,
        timeline: timeline || [],
        attachments: attachments || [],
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