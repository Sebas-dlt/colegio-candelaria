"use client";

import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { IconUser, IconMail, IconPhone, IconBuilding } from "@tabler/icons-react";

interface StepPersonalProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const DOC_TYPES = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PA", label: "Pasaporte" },
];

export default function StepPersonal({
  register,
  watch,
  setValue,
  errors,
}: StepPersonalProps) {
  const isAnonymous = watch("is_anonymous");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-900">
          Datos del solicitante
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Proporcione sus datos de contacto para dar seguimiento
        </p>
      </div>

      {/* Opción anónimo */}
      <label className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50">
        <input
          type="checkbox"
          {...register("is_anonymous")}
          onChange={(e) => {
            setValue("is_anonymous", e.target.checked, {
              shouldValidate: true,
            });
          }}
          className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <div>
          <p className="font-medium text-neutral-700">Enviar de forma anónima</p>
          <p className="text-sm text-neutral-500">
            No proporcionará sus datos personales. Tenga en cuenta que esto puede
            limitar el seguimiento de su caso.
          </p>
        </div>
      </label>

      {/* Campos de datos personales */}
      {!isAnonymous && (
        <div className="space-y-4">
          {/* Nombre completo */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-neutral-700"
            >
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconUser size={18} className="text-neutral-400" />
              </div>
              <input
                id="full_name"
                type="text"
                {...register("full_name")}
                placeholder="Juan Pérez López"
                className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
            {errors.full_name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.full_name.message as string}
              </p>
            )}
          </div>

          {/* Tipo y número de documento */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="document_type"
                className="block text-sm font-medium text-neutral-700"
              >
                Tipo de documento
              </label>
              <select
                id="document_type"
                {...register("document_type")}
                className="mt-1 block w-full rounded-lg border border-neutral-200 py-2.5 px-3 text-sm transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              >
                {DOC_TYPES.map((doc) => (
                  <option key={doc.value} value={doc.value}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="document_number"
                className="block text-sm font-medium text-neutral-700"
              >
                Número de documento <span className="text-red-500">*</span>
              </label>
              <input
                id="document_number"
                type="text"
                inputMode="numeric"
                {...register("document_number")}
                placeholder="1234567890"
                className="mt-1 block w-full rounded-lg border border-neutral-200 py-2.5 px-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
              {errors.document_number && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.document_number.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconMail size={18} className="text-neutral-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="correo@ejemplo.com"
                className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message as string}
              </p>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Recibirá la confirmación y actualizaciones en este correo
            </p>
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700"
            >
              Teléfono de contacto
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconPhone size={18} className="text-neutral-400" />
              </div>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+57 300 123 4567"
                className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
          </div>

          {/* Dirección y ciudad */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-neutral-700"
              >
                Dirección
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <IconBuilding size={18} className="text-neutral-400" />
                </div>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  placeholder="Calle 10 #5-20"
                  className="block w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-neutral-700"
              >
                Ciudad
              </label>
              <input
                id="city"
                type="text"
                {...register("city")}
                placeholder="Malambo"
                className="mt-1 block w-full rounded-lg border border-neutral-200 py-2.5 px-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-medium">¿Por qué pedimos sus datos?</p>
        <p className="mt-1">
          Sus datos son necesarios para dar seguimiento a su solicitud y
          notificarle sobre su estado. Si elige anónimo, no podrá recibir
          actualizaciones ni consultar por radicado.
        </p>
      </div>
    </div>
  );
}