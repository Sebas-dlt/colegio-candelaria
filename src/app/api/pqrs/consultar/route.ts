import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const radicado = searchParams.get("radicado");
    const identifier = searchParams.get("identifier"); // email o cédula

    if (!radicado || !identifier) {
      return NextResponse.json(
        { error: "Radicado e identificador son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Buscar PQRS por radicado
    const { data: pqrs, error: pqrsError } = await supabase
      .from("pqrs")
      .select(
        `
        radicado,
        type,
        status,
        subject,
        description,
        created_at,
        responded_at,
        response,
        dependency
      `
      )
      .eq("radicado", radicado)
      .single();

    if (pqrsError || !pqrs) {
      return NextResponse.json(
        { error: "PQRS no encontrada" },
        { status: 404 }
      );
    }

    // Verificar que el identifier coincida (email o cédula)
    const { data: fullPqrs } = await supabase
      .from("pqrs")
      .select("email, document_number")
      .eq("radicado", radicado)
      .single();

    if (!fullPqrs) {
      return NextResponse.json(
        { error: "PQRS no encontrada" },
        { status: 404 }
      );
    }

    // Verificar identidad
    const identifierLower = identifier.toLowerCase().trim();
    const emailMatch = fullPqrs.email?.toLowerCase() === identifierLower;
    const docMatch = fullPqrs.document_number === identifier;

    if (!emailMatch && !docMatch) {
      return NextResponse.json(
        { error: "Identificador no coincide con la PQRS" },
        { status: 403 }
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
        created_at,
        profiles:performed_by (full_name)
      `
      )
      .eq("pqrs_id", (await supabase.from("pqrs").select("id").eq("radicado", radicado).single()).data?.id)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      data: {
        ...pqrs,
        timeline: timeline || [],
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