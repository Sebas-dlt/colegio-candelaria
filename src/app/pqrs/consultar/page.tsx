"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  IconSearch,
  IconLoader2,
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconFileText,
} from "@tabler/icons-react";

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  recibida: { color: "text-blue-600", bg: "bg-blue-50", label: "Recibida" },
  en_estudio: { color: "text-yellow-600", bg: "bg-yellow-50", label: "En Estudio" },
  en_curso: { color: "text-orange-600", bg: "bg-orange-50", label: "En Curso" },
  resuelta: { color: "text-green-600", bg: "bg-green-50", label: "Resuelta" },
  cerrada: { color: "text-neutral-600", bg: "bg-neutral-100", label: "Cerrada" },
  rechazada: { color: "text-red-600", bg: "bg-red-50", label: "Rechazada" },
};

const TYPE_LABELS: Record<string, string> = {
  peticion: "Petición",
  queja: "Queja",
  reclamo: "Reclamo",
  sugerencia: "Sugerencia",
  denuncia: "Denuncia",
};

function ConsultarContent() {
  const searchParams = useSearchParams();
  const initialRadicado = searchParams.get("radicado") || "";

  const [radicado, setRadicado] = useState(initialRadicado);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!radicado || !identifier) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `/api/pqrs/consultar?radicado=${encodeURIComponent(radicado)}&identifier=${encodeURIComponent(identifier)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al consultar");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary-900 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold text-white">
            Consultar PQRS
          </h1>
          <p className="mt-2 text-white/80">
            Verifique el estado de su solicitud con el número de radicado
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label
              htmlFor="radicado"
              className="block text-sm font-medium text-neutral-700"
            >
              Número de Radicado
            </label>
            <input
              id="radicado"
              type="text"
              value={radicado}
              onChange={(e) => setRadicado(e.target.value.toUpperCase())}
              placeholder="CND-2025-000001"
              className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-center text-lg font-mono font-semibold placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-neutral-700"
            >
              Correo electrónico o número de documento
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="correo@ejemplo.com o 1234567890"
              className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              required
            />
            <p className="mt-1 text-xs text-neutral-500">
              Use el mismo correo o documento con el que radicó la solicitud
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !radicado || !identifier}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <IconLoader2 size={18} className="animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <IconSearch size={18} />
                Consultar Estado
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className="mt-6 space-y-4">
            {/* Radicado y estado */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Radicado</p>
                  <p className="text-2xl font-bold text-primary-900 font-mono">
                    {result.radicado}
                  </p>
                </div>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    STATUS_CONFIG[result.status]?.bg || "bg-neutral-100"
                  } ${STATUS_CONFIG[result.status]?.color || "text-neutral-600"}`}
                >
                  {STATUS_CONFIG[result.status]?.label || result.status}
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-neutral-500">Tipo:</span>{" "}
                  <span className="font-medium">
                    {TYPE_LABELS[result.type] || result.type}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Fecha:</span>{" "}
                  <span className="font-medium">
                    {new Date(result.created_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-neutral-500">Asunto:</span>{" "}
                  <span className="font-medium">{result.subject}</span>
                </div>
              </div>
            </div>

            {/* Respuesta */}
            {result.response && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <IconCheck size={18} className="text-green-600" />
                  <h3 className="font-semibold text-green-800">Respuesta</h3>
                </div>
                <p className="whitespace-pre-wrap text-sm text-green-900">
                  {result.response}
                </p>
                {result.responded_at && (
                  <p className="mt-2 text-xs text-green-700">
                    Respondido el{" "}
                    {new Date(result.responded_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            )}

            {/* Timeline */}
            {result.timeline && result.timeline.length > 0 && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6">
                <h3 className="mb-4 font-semibold text-neutral-900">
                  Historial de cambios
                </h3>
                <div className="space-y-4">
                  {result.timeline.map((entry: any, index: number) => {
                    const config = STATUS_CONFIG[entry.new_status];
                    const performedBy =
                      entry.profiles?.full_name || "Sistema";

                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                          {index === 0 ? (
                            <IconClock size={14} className="text-neutral-500" />
                          ) : (
                            <IconFileText
                              size={14}
                              className="text-neutral-400"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                config?.bg || "bg-neutral-100"
                              } ${config?.color || "text-neutral-600"}`}
                            >
                              {config?.label || entry.new_status}
                            </span>
                            <span className="text-xs text-neutral-500">
                              por {performedBy}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="mt-1 text-sm text-neutral-600">
                              {entry.note}
                            </p>
                          )}
                          <p className="mt-0.5 text-xs text-neutral-400">
                            {new Date(entry.created_at).toLocaleDateString(
                              "es-CO",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-medium">Información importante</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  El plazo de respuesta es de 15 días hábiles (Ley 1755 de 2015)
                </li>
                <li>
                  Si tiene dudas, comuníquese al teléfono +57 304 202 6613
                </li>
                <li>
                  O envíe un correo a contacto@colegiolacandelaria.edu.co
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PqrsConsultarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <IconLoader2 size={32} className="animate-spin text-primary-600" />
        </div>
      }
    >
      <ConsultarContent />
    </Suspense>
  );
}