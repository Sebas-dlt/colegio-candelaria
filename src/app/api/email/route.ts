import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { csrfGuard } from "@/lib/csrf";

let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface EmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function POST(request: Request) {
  try {
    // CSRF protection
    const csrfError = csrfGuard(request);
    if (csrfError) return csrfError;

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const { success: rateLimitOk } = await checkRateLimit("email", ip);
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    // Auth check - solo admin/rector pueden enviar emails
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "rector"].includes(profile.role)) {
      return NextResponse.json(
        { error: "Sin permisos para enviar emails" },
        { status: 403 }
      );
    }

    // Verificar que Resend esté configurado
    const resendClient = getResend();
    if (!resendClient) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return NextResponse.json(
        { error: "Email no configurado", skipped: true },
        { status: 200 }
      );
    }

    const body: EmailRequest = await request.json();

    // Validar campos requeridos
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        { error: "Campos requeridos: to, subject, html" },
        { status: 400 }
      );
    }

    // Enviar email
    const { data, error } = await resendClient.emails.send({
      from: process.env.EMAIL_FROM || "noreply@colegiolacandelaria.edu.co",
      to: Array.isArray(body.to) ? body.to : [body.to],
      subject: body.subject,
      html: body.html,
      text: body.text,
      replyTo: body.replyTo,
    });

    if (error) {
      // Handle rate limit specifically
      if (error.name === "validation_error" && error.message?.includes("rate")) {
        console.warn("Email rate limit exceeded, will retry later");
        return NextResponse.json(
          { error: "Límite de envío alcanzado", retryAfter: 60, skipped: true },
          { status: 200 }
        );
      }
      
      console.error("Resend error:", error);
      // Return 200 so PQRS creation doesn't fail
      return NextResponse.json(
        { error: "Error al enviar email", details: error, skipped: true },
        { status: 200 }
      );
    }

    return NextResponse.json({
      message: "Email enviado exitosamente",
      data: { id: data?.id },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    // Return 200 so PQRS creation doesn't fail
    return NextResponse.json(
      { error: "Error interno del servidor", skipped: true },
      { status: 200 }
    );
  }
}