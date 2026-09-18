"use client";

import {
  IconMessage,
  IconAlertTriangle,
  IconReceipt,
  IconBulb,
  IconShield,
} from "@tabler/icons-react";

interface StepTypeProps {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
}

const PQRS_TYPES = [
  {
    value: "peticion",
    label: "Petición",
    description:
      "Solicitud de atención, información o respuesta sobre un asunto de interés.",
    icon: IconMessage,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
  },
  {
    value: "queja",
    label: "Queja",
    description:
      "Manifestación de inconformidad por la atención recibida o el servicio prestado.",
    icon: IconAlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    hoverBorder: "hover:border-orange-400",
  },
  {
    value: "reclamo",
    label: "Reclamo",
    description:
      "Disconformidad relacionada con un derecho que el ciudadano considera vulnerado.",
    icon: IconReceipt,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    hoverBorder: "hover:border-red-400",
  },
  {
    value: "sugerencia",
    label: "Sugerencia",
    description:
      "Propuesta de mejora para optimizar los procesos y servicios de la institución.",
    icon: IconBulb,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    hoverBorder: "hover:border-yellow-400",
  },
  {
    value: "denuncia",
    label: "Denuncia",
    description:
      "Reporte de irregularidades, faltas administrativas o conductas contrarias a la ley.",
    icon: IconShield,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    hoverBorder: "hover:border-purple-400",
  },
];

export default function StepType({ value, onChange, error }: StepTypeProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-900">
          ¿Qué tipo de solicitud desea radicar?
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Seleccione la opción que mejor describa su caso
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PQRS_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? `${type.border} ${type.bg} ring-2 ring-offset-2 ring-primary-500`
                  : `border-neutral-200 hover:bg-neutral-50 ${type.hoverBorder}`
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${type.bg}`}
              >
                <Icon size={24} className={type.color} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-semibold ${
                    isSelected ? "text-primary-900" : "text-neutral-700"
                  }`}
                >
                  {type.label}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {type.description}
                </p>
              </div>
              {isSelected && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-center text-sm text-red-600">{error}</p>
      )}

      <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
        <p className="font-medium">¿No sabe cuál elegir?</p>
        <p className="mt-1">
          <strong>Petición:</strong> Para solicitudes generales.
          <strong> Queja:</strong> Si no le dieron buena atención.
          <strong> Reclamo:</strong> Si sienten que le vulneraron un derecho.
          <strong> Sugerencia:</strong> Para mejorar algo.
          <strong> Denuncia:</strong> Para reportar irregularidades.
        </p>
      </div>
    </div>
  );
}