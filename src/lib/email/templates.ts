import { escapeHtml } from "@/lib/escape";

interface PqrsConfirmationEmail {
  radicado: string;
  type: string;
  subject: string;
  description: string;
  recipientName?: string;
}

interface PqrsNotificationEmail {
  radicado: string;
  type: string;
  subject: string;
  description: string;
  fullName?: string;
  email?: string;
  phone?: string;
  dependency?: string;
}

interface PqrsStatusEmail {
  radicado: string;
  type: string;
  subject: string;
  newStatus: string;
  response?: string;
  recipientName?: string;
}

const TYPE_LABELS: Record<string, string> = {
  peticion: "Petición",
  queja: "Queja",
  reclamo: "Reclamo",
  sugerencia: "Sugerencia",
  denuncia: "Denuncia",
};

const STATUS_LABELS: Record<string, string> = {
  recibida: "Recibida",
  en_estudio: "En estudio",
  en_curso: "En curso",
  resuelta: "Resuelta",
  cerrada: "Cerrada",
  rechazada: "Rechazada",
};

export function pqrsConfirmationHtml(data: PqrsConfirmationEmail): string {
  const typeLabel = escapeHtml(TYPE_LABELS[data.type] || data.type);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Montserrat', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color: #003d5c; padding: 24px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Institución Educativa Nuestra Señora de la Candelaria
              </h1>
              <p style="margin: 8px 0 0; color: #f2c94c; font-size: 14px;">
                Confirmación de Radicación PQRS
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 14px;">
                ${data.recipientName ? `Estimado/a ${escapeHtml(data.recipientName)},` : "Estimado/a ciudadano/a,"}
              </p>
              
              <p style="margin: 0 0 24px; color: #374151; font-size: 14px; line-height: 1.6;">
                Hemos recibido su ${typeLabel} y ha sido radicada exitosamente. A continuación los detalles:
              </p>
              
              <!-- Radicado Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Número de Radicado
                    </p>
                    <p style="margin: 0; color: #003d5c; font-size: 24px; font-weight: 700;">
                      ${escapeHtml(data.radicado)}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Tipo</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">${typeLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Asunto</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">${escapeHtml(data.subject)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Estado</p>
                    <p style="margin: 4px 0 0; color: #388e3c; font-size: 14px; font-weight: 500;">Recibida</p>
                  </td>
                </tr>
              </table>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; color: #2e7d32; font-size: 13px; line-height: 1.5;">
                      <strong>Importante:</strong> Conserve este número de radicado para consultar el estado de su caso. 
                      El plazo de respuesta es de 15 días hábiles conforme a la Ley 1755 de 2015.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pqrs/consultar?radicado=${encodeURIComponent(data.radicado)}" 
                       style="display: inline-block; background-color: #003d5c; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Consultar Estado
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                Si tiene alguna consulta, comuníquese al correo contacto@colegiolacandelaria.edu.co o al teléfono +57 304 202 6613.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f0f2f5; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} Institución Educativa Nuestra Señora de la Candelaria
              </p>
              <p style="margin: 4px 0 0; color: #6b7280; font-size: 12px;">
                Malambo, Atlántico, Colombia
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function pqrsNotificationHtml(data: PqrsNotificationEmail): string {
  const typeLabel = escapeHtml(TYPE_LABELS[data.type] || data.type);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Montserrat', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color: #003d5c; padding: 24px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Nueva PQRS Radicada
              </h1>
              <p style="margin: 8px 0 0; color: #f2c94c; font-size: 14px;">
                Requiere atención
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <!-- Radicado Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3e0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px; color: #e65100; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Radicado
                    </p>
                    <p style="margin: 0; color: #e65100; font-size: 24px; font-weight: 700;">
                      ${escapeHtml(data.radicado)}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Tipo</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">${typeLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Asunto</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">${escapeHtml(data.subject)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Solicitante</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">
                      ${escapeHtml(data.fullName || "Anónimo")} ${data.email ? `(${escapeHtml(data.email)})` : ""} ${data.phone ? `Tel: ${escapeHtml(data.phone)}` : ""}
                    </p>
                  </td>
                </tr>
                ${data.dependency ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e3e7ec;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Dependencia</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; font-weight: 500;">${escapeHtml(data.dependency)}</p>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Descripción</p>
                    <p style="margin: 4px 0 0; color: #374151; font-size: 14px; line-height: 1.5;">${escapeHtml(data.description)}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 0;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/pqrs/${encodeURIComponent(data.radicado)}" 
                       style="display: inline-block; background-color: #e65100; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Gestionar PQRS
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f0f2f5; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Este es un correo automático del sistema de PQRS. No responda a este mensaje.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function pqrsStatusHtml(data: PqrsStatusEmail): string {
  const typeLabel = escapeHtml(TYPE_LABELS[data.type] || data.type);
  const statusLabel = escapeHtml(STATUS_LABELS[data.newStatus] || data.newStatus);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Montserrat', system-ui, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color: #003d5c; padding: 24px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Actualización de su PQRS
              </h1>
              <p style="margin: 8px 0 0; color: #f2c94c; font-size: 14px;">
                ${escapeHtml(data.radicado)}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 14px;">
                ${data.recipientName ? `Estimado/a ${escapeHtml(data.recipientName)},` : "Estimado/a ciudadano/a,"}
              </p>
              
              <p style="margin: 0 0 24px; color: #374151; font-size: 14px; line-height: 1.6;">
                Le informamos que el estado de su ${typeLabel} ha cambiado:
              </p>
              
              <!-- Status Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e3f2fd; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #1565c0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Nuevo Estado
                    </p>
                    <p style="margin: 0; color: #1565c0; font-size: 20px; font-weight: 700;">
                      ${statusLabel}
                    </p>
                  </td>
                </tr>
              </table>
              
              ${data.response ? `
              <!-- Response -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Respuesta</p>
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${escapeHtml(data.response)}</p>
                  </td>
                </tr>
              </table>
              ` : ""}
              
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pqrs/consultar?radicado=${encodeURIComponent(data.radicado)}" 
                       style="display: inline-block; background-color: #003d5c; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Consultar Detalles
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                Si tiene alguna consulta, comuníquese al correo contacto@colegiolacandelaria.edu.co o al teléfono +57 304 202 6613.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f0f2f5; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} Institución Educativa Nuestra Señora de la Candelaria
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}