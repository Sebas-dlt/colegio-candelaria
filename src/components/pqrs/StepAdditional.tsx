"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IconBuilding, IconCalendar } from "@tabler/icons-react";

interface StepAdditionalProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const DEPENDENCIES = [
  "Rectoría",
  "Secretaría General",
  "Coordinación Académica",
  "Bienestar Estudiantil",
  "Orientación Escolar",
  "Coordinación Administrativa",
  "Coordinación de Convivencia",
  "Biblioteca",
  "Aprendizaje por Proyectos",
  "Tecnología e Informática",
  "Otra",
];

export default function StepAdditional({ register, errors }: StepAdditionalProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-900">
          Información adicional
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Estos campos son opcionales pero ayudan a dar mejor seguimiento
        </p>
      </div>

      {/* Dependencia */}
      <div>
        <label
          htmlFor="dependency"
          className="block text-sm font-medium text-neutral-700"
        >
          Dependencia involucrada
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconBuilding size={18} className="text-neutral-400" />
          </div>
          <select
            id="dependency"
            {...register("dependency")}
            className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          >
            <option value="">Seleccione una dependencia</option>
            {DEPENDENCIES.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Seleccione el área o dependencia de la institución involucrada en su
          caso
        </p>
      </div>

      {/* Fecha del hecho */}
      <div>
        <label
          htmlFor="event_date"
          className="block text-sm font-medium text-neutral-700"
        >
          Fecha en que ocurrieron los hechos
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IconCalendar size={18} className="text-neutral-400" />
          </div>
          <input
            id="event_date"
            type="date"
            {...register("event_date")}
            max={new Date().toISOString().split("T")[0]}
            className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Si no recuerda la fecha exacta, indique aproximadamente
        </p>
      </div>

      <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
        <p className="font-medium">¿Por qué esta información?</p>
        <p className="mt-1">
          Conocer la dependencia y fecha permite asignar correctamente su caso
          y agilizar la respuesta. Si no sabe la dependencia, no se preocupe,
          el sistema la asignará automáticamente.
        </p>
      </div>
    </div>
  );
}