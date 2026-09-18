"use client";

import { UseFormWatch } from "react-hook-form";
import type { PqrsFormData } from "./PqrsWizard";
import { IconAlertCircle, IconShield } from "@tabler/icons-react";

interface StepSummaryProps {
  watch: UseFormWatch<PqrsFormData>;
}

const TYPE_LABELS: Record<string, string> = {
  peticion: "Petición",
  queja: "Queja",
  reclamo: "Reclamo",
  sugerencia: "Sugerencia",
  denuncia: "Denuncia",
};

export default function StepSummary({ watch }: StepSummaryProps) {
  const formData = watch();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-900">
          Resumen de su solicitud
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Revise la información antes de enviar
        </p>
      </div>

      {/* Tipo */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h3 className="mb-2 text-sm font-medium text-neutral-500">Tipo</h3>
        <p className="font-semibold text-primary-900">
          {TYPE_LABELS[formData.type] || formData.type}
        </p>
      </div>

      {/* Datos personales */}
      {!formData.is_anonymous && (
        <div className="rounded-lg border border-neutral-200 p-4">
          <h3 className="mb-2 text-sm font-medium text-neutral-500">
            Datos del solicitante
          </h3>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <span className="text-neutral-500">Nombre:</span>{" "}
              <span className="font-medium">{formData.full_name || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500">Documento:</span>{" "}
              <span className="font-medium">
                {formData.document_type} {formData.document_number || "-"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500">Email:</span>{" "}
              <span className="font-medium">{formData.email || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500">Teléfono:</span>{" "}
              <span className="font-medium">{formData.phone || "-"}</span>
            </div>
          </div>
        </div>
      )}

      {formData.is_anonymous && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Solicitud anónima:</strong> No se registrarán datos
            personales. No podrá recibir actualizaciones por correo.
          </p>
        </div>
      )}

      {/* Detalle */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h3 className="mb-2 text-sm font-medium text-neutral-500">
          Detalle del caso
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-neutral-500">Asunto:</span>{" "}
            <span className="font-medium">{formData.subject || "-"}</span>
          </div>
          <div>
            <span className="text-neutral-500">Descripción:</span>
            <p className="mt-1 whitespace-pre-wrap text-neutral-700">
              {formData.description || "-"}
            </p>
          </div>
          {formData.evidence_description && (
            <div>
              <span className="text-neutral-500">Evidencia:</span>
              <p className="mt-1 text-neutral-700">
                {formData.evidence_description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Adicionales */}
      {(formData.dependency || formData.event_date) && (
        <div className="rounded-lg border border-neutral-200 p-4">
          <h3 className="mb-2 text-sm font-medium text-neutral-500">
            Información adicional
          </h3>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            {formData.dependency && (
              <div>
                <span className="text-neutral-500">Dependencia:</span>{" "}
                <span className="font-medium">{formData.dependency}</span>
              </div>
            )}
            {formData.event_date && (
              <div>
                <span className="text-neutral-500">Fecha del hecho:</span>{" "}
                <span className="font-medium">
                  {new Date(formData.event_date + "T00:00:00").toLocaleDateString(
                    "es-CO",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Consentimiento */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <div className="flex items-start gap-3">
          <IconShield size={20} className="mt-0.5 shrink-0 text-primary-600" />
          <div className="text-sm">
            <p className="font-medium text-neutral-700">Aviso de privacidad</p>
            <p className="mt-1 text-neutral-500">
              Al enviar esta solicitud, usted autoriza a la Institución Educativa
              Nuestra Señora de la Candelaria para tratar sus datos personales de
              conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013. Sus
              datos serán utilizados únicamente para dar trámite y seguimiento a
              su solicitud.
            </p>
          </div>
        </div>
      </div>

      {/* Advertencia */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Antes de enviar verifique:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>La información sea correcta y completa</li>
            <li>El tipo de solicitud sea el adecuado</li>
            <li>Sus datos de contacto estén bien escritos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}