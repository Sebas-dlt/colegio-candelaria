"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IconFileText, IconInfoCircle } from "@tabler/icons-react";

interface StepDetailsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function StepDetails({ register, errors }: StepDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-900">
          Detalle del caso
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Describa su solicitud con la mayor información posible
        </p>
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-neutral-700"
        >
          Asunto <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconFileText size={18} className="text-neutral-400" />
          </div>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="Resumen breve de su solicitud"
            className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        {errors.subject && (
          <p className="mt-1 text-xs text-red-600">
            {errors.subject.message as string}
          </p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          Ejemplo: "Reclamo por falta de atención en secretaría"
        </p>
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-neutral-700"
        >
          Descripción detallada <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={6}
          placeholder="Describa los hechos, fechas, personas involucradas y cualquier otra información relevante..."
          className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">
            {errors.description.message as string}
          </p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          Mínimo 20 caracteres. Sea específico para agilizar la gestión.
        </p>
      </div>

      {/* Evidencia */}
      <div>
        <label
          htmlFor="evidence_description"
          className="block text-sm font-medium text-neutral-700"
        >
          Evidencia (opcional)
        </label>
        <textarea
          id="evidence_description"
          {...register("evidence_description")}
          rows={3}
          placeholder="Describa si cuenta con documentos, fotos, videos u otra evidencia que respalde su caso..."
          className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Si tiene documentos, mencione qué tipo de evidencia posee. Podrá
          adjuntar archivos en una versión futura del sistema.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <IconInfoCircle size={18} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Consejos para una buena descripción:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Incluya fechas y horas de los hechos</li>
            <li>Mencione nombres de personas involucradas</li>
            <li>Describa secuencianmente lo ocurrido</li>
            <li>Indique qué solución espera</li>
          </ul>
        </div>
      </div>
    </div>
  );
}