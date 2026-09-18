const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{ success: boolean; id?: string; error?: string; skipped?: boolean }> {
  try {
    const response = await fetch(`${SITE_URL}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    const data = await response.json();

    // If email was skipped (rate limit, not configured), don't treat as error
    if (data.skipped) {
      console.warn("Email skipped:", data.error);
      return { success: false, skipped: true, error: data.error };
    }

    if (!response.ok) {
      console.error("Email API error:", data);
      return { success: false, error: data.error || "Error sending email" };
    }

    return { success: true, id: data.data?.id };
  } catch (error) {
    // Network errors, etc. - don't fail the operation
    console.warn("Email send failed (non-critical):", error);
    return {
      success: false,
      skipped: true,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendPqrsConfirmation(options: {
  to: string;
  radicado: string;
  type: string;
  subject: string;
  description: string;
  recipientName?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const { pqrsConfirmationHtml } = await import("./templates");
  
  const html = pqrsConfirmationHtml({
    radicado: options.radicado,
    type: options.type,
    subject: options.subject,
    description: options.description,
    recipientName: options.recipientName,
  });

  return sendEmail({
    to: options.to,
    subject: `Confirmación Radicación ${options.radicado} - IE Nuestra Señora de la Candelaria`,
    html,
  });
}

export async function sendPqrsNotification(options: {
  radicado: string;
  type: string;
  subject: string;
  description: string;
  fullName?: string;
  email?: string;
  phone?: string;
  dependency?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const { pqrsNotificationHtml } = await import("./templates");
  const rectorEmail = process.env.RECTOR_EMAIL || "rector@colegiolacandelaria.edu.co";
  
  const html = pqrsNotificationHtml(options);

  return sendEmail({
    to: rectorEmail,
    subject: `Nueva PQRS ${options.radicado} - ${options.subject}`,
    html,
  });
}

export async function sendPqrsStatusUpdate(options: {
  to: string;
  radicado: string;
  type: string;
  subject: string;
  newStatus: string;
  response?: string;
  recipientName?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const { pqrsStatusHtml } = await import("./templates");
  
  const html = pqrsStatusHtml(options);

  return sendEmail({
    to: options.to,
    subject: `Actualización PQRS ${options.radicado} - ${options.subject}`,
    html,
  });
}