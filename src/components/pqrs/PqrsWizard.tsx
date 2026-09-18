"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  IconChevronRight,
  IconChevronLeft,
  IconLoader2,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import StepType from "./StepType";
import StepPersonal from "./StepPersonal";
import StepDetails from "./StepDetails";
import StepAdditional from "./StepAdditional";
import StepSummary from "./StepSummary";

// Schema completo del wizard
const pqrsSchema = z.object({
  // Paso 1: Tipo
  type: z.string().min(1, "Selecciona un tipo de PQRS"),

  // Paso 2: Datos personales
  is_anonymous: z.boolean(),
  full_name: z.string().optional(),
  document_type: z.string().optional(),
  document_number: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),

  // Paso 3: Detalle
  subject: z.string().min(5, "Mínimo 5 caracteres"),
  description: z.string().min(20, "Mínimo 20 caracteres"),
  evidence_description: z.string().optional(),

  // Paso 4: Adicionales
  dependency: z.string().optional(),
  event_date: z.string().optional(),
});

type PqrsFormData = Record<string, any>;

const STEPS = [
  { id: 1, label: "Tipo", description: "¿Qué desea reportar?" },
  { id: 2, label: "Datos", description: "Sus datos de contacto" },
  { id: 3, label: "Detalle", description: "Describa el caso" },
  { id: 4, label: "Adicionales", description: "Información extra" },
  { id: 5, label: "Enviar", description: "Revisar y enviar" },
];

const STORAGE_KEY = "pqrs_draft";

export default function PqrsWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    radicado?: string;
    error?: string;
  } | null>(null);

  const form = useForm({
    resolver: zodResolver(pqrsSchema),
    defaultValues: {
      type: "",
      is_anonymous: false,
      full_name: "",
      document_type: "CC",
      document_number: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      subject: "",
      description: "",
      evidence_description: "",
      dependency: "",
      event_date: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  // Cargar borrador del localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && key !== "currentStep") {
            setValue(key as any, value);
          }
        });
        if (data.currentStep) {
          setCurrentStep(data.currentStep);
        }
      } catch {
        // Ignorar errores de parsing
      }
    }
  }, [setValue]);

  // Guardar borrador en localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...data, currentStep })
      );
    });
    return () => subscription.unsubscribe();
  }, [watch, currentStep]);

  // Validar paso actual
  const validateStep = useCallback(
    async (step: number) => {
      switch (step) {
        case 1:
          return trigger("type");
        case 2:
          return trigger(["is_anonymous", "full_name", "email", "document_number"]);
        case 3:
          return trigger(["subject", "description"]);
        case 4:
          return true; // Paso opcional
        default:
          return true;
      }
    },
    [trigger]
  );

  // Siguiente paso
  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Paso anterior
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Enviar formulario
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/pqrs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar la PQRS");
      }

      setSubmitResult({
        success: true,
        radicado: result.data.radicado,
      });

      // Limpiar borrador
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      setSubmitResult({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si ya se envió exitosamente
  if (submitResult?.success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-green-100">
          <IconCheck size={40} className="text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-primary-900">
          PQRS Radicada Exitosamente
        </h2>
        <p className="mb-6 text-neutral-600">
          Su solicitud ha sido registrada correctamente.
        </p>

        <div className="mb-8 rounded-lg bg-neutral-50 p-6">
          <p className="mb-2 text-sm text-neutral-500">Número de Radicado</p>
          <p className="text-3xl font-bold text-primary-700">
            {submitResult.radicado}
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-blue-50 p-4 text-left text-sm text-blue-800">
          <p className="font-medium">¿Qué sigue?</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Recibirá un correo de confirmación</li>
            <li>El plazo de respuesta es de 15 días hábiles</li>
            <li>Puede consultar el estado con su radicado</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`/pqrs/consultar?radicado=${submitResult.radicado}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Consultar Estado
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-primary-700 text-white"
                        : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <IconCheck size={18} />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="mt-2 hidden text-xs text-neutral-500 sm:block">
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 sm:w-16 ${
                    currentStep > step.id ? "bg-green-500" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-neutral-700">
            Paso {currentStep}: {STEPS[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Paso 1: Tipo */}
        {currentStep === 1 && (
          <StepType
            value={watch("type")}
            onChange={(value) => setValue("type", value, { shouldValidate: true })}
            error={errors.type?.message as string}
          />
        )}

        {/* Paso 2: Datos personales */}
        {currentStep === 2 && (
          <StepPersonal
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        )}

        {/* Paso 3: Detalle */}
        {currentStep === 3 && (
          <StepDetails register={register} errors={errors} />
        )}

        {/* Paso 4: Adicionales */}
        {currentStep === 4 && (
          <StepAdditional register={register} errors={errors} />
        )}

        {/* Paso 5: Resumen */}
        {currentStep === 5 && (
          <StepSummary watch={watch} />
        )}

        {/* Error de envío */}
        {submitResult?.error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
            {submitResult.error}
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between pt-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <IconChevronLeft size={16} />
              Anterior
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Siguiente
              <IconChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={16} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar PQRS"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}