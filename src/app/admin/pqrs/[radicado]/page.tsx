"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  IconArrowLeft,
  IconLoader2,
  IconCheck,
  IconClock,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";

const STATUS_OPTIONS = [
  { value: "recibida", label: "Recibida", color: "blue" },
  { value: "en_estudio", label: "En estudio", color: "yellow" },
  { value: "en_curso", label: "En curso", color: "orange" },
  { value: "resuelta", label: "Resuelta", color: "green" },
  { value: "cerrada", label: "Cerrada", color: "neutral" },
  { value: "rechazada", label: "Rechazada", color: "red" },
];

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  recibida: { label: "Recibida", class: "bg-blue-100 text-blue-700" },
  en_estudio: { label: "En estudio", class: "bg-yellow-100 text-yellow-700" },
  en_curso: { label: "En curso", class: "bg-orange-100 text-orange-700" },
  resuelta: { label: "Resuelta", class: "bg-green-100 text-green-700" },
  cerrada: { label: "Cerrada", class: "bg-neutral-100 text-neutral-700" },
  rechazada: { label: "Rechazada", class: "bg-red-100 text-red-700" },
};

const TYPE_CONFIG: Record<string, string> = {
  peticion: "Petición",
  queja: "Queja",
  reclamo: "Reclamo",
  sugerencia: "Sugerencia",
  denuncia: "Denuncia",
};

interface PqrsDetail {
  id: string;
  radicado: string;
  type: string;
  status: string;
  subject: string;
  description: string;
  full_name?: string;
  email?: string;
  phone?: string;
  document_type?: string;
  document_number?: string;
  is_anonymous: boolean;
  created_at: string;
  event_date?: string;
  dependency?: string;
  response?: string;
  responded_at?: string;
  evidence_description?: string;
  timeline?: Array<{
    old_status: string;
    new_status: string;
    note?: string;
    is_internal: boolean;
    created_at: string;
    profiles?: { full_name?: string };
  }>;
}

export default function PqrsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const radicado = params.radicado as string;

  const [pqrs, setPqrs] = useState<PqrsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [response, setResponse] = useState("");
  const [note, setNote] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [showResponseForm, setShowResponseForm] = useState(false);

  useEffect(() => {
    fetchPqrs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radicado]);

  async function fetchPqrs() {
    try {
      const res = await fetch(`/api/pqrs/${radicado}`);
      const data = await res.json();
      if (res.ok) {
        setPqrs(data.data);
        setNewStatus(data.data.status);
      } else {
        router.push("/admin/pqrs");
      }
    } catch (error) {
      console.error("Error:", error);
      router.push("/admin/pqrs");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate() {
    if (!pqrs || (!newStatus && !response)) return;

    setUpdating(true);
    try {
    const body: { status?: string; response?: string; note?: string } = {};
    if (newStatus !== pqrs.status) {
        body.status = newStatus;
      }
      if (response) {
        body.response = response;
      }
      if (note) {
        body.note = note;
      }

      const res = await fetch(`/api/pqrs/${radicado}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchPqrs();
        setResponse("");
        setNote("");
        setShowResponseForm(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <IconLoader2 size={24} className="animate-spin text-primary-600" />
      </div>
    );
  }

  if (!pqrs) return null;

  const statusCfg = STATUS_CONFIG[pqrs.status] || {
    label: pqrs.status,
    class: "bg-neutral-100 text-neutral-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/pqrs"
          className="rounded-lg p-2 hover:bg-neutral-100"
        >
          <IconArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900 font-mono">
              {pqrs.radicado}
            </h1>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusCfg.class}`}
            >
              {statusCfg.label}
            </span>
          </div>
          <p className="text-neutral-500">{pqrs.subject}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-neutral-900">
              Descripción del caso
            </h2>
            <p className="whitespace-pre-wrap text-neutral-700">
              {pqrs.description}
            </p>
            {pqrs.evidence_description && (
              <div className="mt-4 rounded-lg bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-700">
                  Evidencia reportada:
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {pqrs.evidence_description}
                </p>
              </div>
            )}
          </div>

          {/* Response */}
          {pqrs.response && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <IconCheck size={18} className="text-green-600" />
                <h2 className="font-semibold text-green-900">Respuesta enviada</h2>
              </div>
              <p className="whitespace-pre-wrap text-green-800">
                {pqrs.response}
              </p>
              {pqrs.responded_at && (
                <p className="mt-3 text-sm text-green-700">
                  Respondido el{" "}
                  {new Date(pqrs.responded_at).toLocaleDateString("es-CO", {
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
          {pqrs.timeline && pqrs.timeline.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-semibold text-neutral-900">
                Historial de cambios
              </h2>
              <div className="space-y-4">
                {pqrs.timeline.map((entry, index) => {
                  const cfg = STATUS_CONFIG[entry.new_status] || {
                    label: entry.new_status,
                    class: "bg-neutral-100 text-neutral-700",
                  };
                  const performedBy =
                    entry.profiles?.full_name || "Sistema";

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                        {index === 0 ? (
                          <IconClock size={14} className="text-neutral-500" />
                        ) : (
                          <IconMessage size={14} className="text-neutral-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg.class}`}
                          >
                            {cfg.label}
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-neutral-900">Acciones</h2>

            {/* Status update */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Cambiar estado
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowResponseForm(!showResponseForm)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <IconMessage size={16} />
                Redactar respuesta
              </button>

              {showResponseForm && (
                <div className="space-y-3">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                    placeholder="Escriba la respuesta al ciudadano..."
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Nota interna (opcional)..."
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              )}

              <button
                onClick={handleStatusUpdate}
                disabled={updating || (newStatus === pqrs.status && !response)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? (
                  <>
                    <IconLoader2 size={16} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <IconSend size={16} />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-neutral-900">
              Información
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">Tipo</dt>
                <dd className="font-medium text-neutral-900">
                  {TYPE_CONFIG[pqrs.type] || pqrs.type}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Fecha radicación</dt>
                <dd className="font-medium text-neutral-900">
                  {new Date(pqrs.created_at).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
              {pqrs.dependency && (
                <div>
                  <dt className="text-neutral-500">Dependencia</dt>
                  <dd className="font-medium text-neutral-900">
                    {pqrs.dependency}
                  </dd>
                </div>
              )}
              {pqrs.event_date && (
                <div>
                  <dt className="text-neutral-500">Fecha del hecho</dt>
                  <dd className="font-medium text-neutral-900">
                    {new Date(pqrs.event_date + "T00:00:00").toLocaleDateString(
                      "es-CO",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Contact */}
          {!pqrs.is_anonymous && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 font-semibold text-neutral-900">
                Contacto del solicitante
              </h2>
              <dl className="space-y-3 text-sm">
                {pqrs.full_name && (
                  <div>
                    <dt className="text-neutral-500">Nombre</dt>
                    <dd className="font-medium text-neutral-900">
                      {pqrs.full_name}
                    </dd>
                  </div>
                )}
                {pqrs.email && (
                  <div>
                    <dt className="text-neutral-500">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${pqrs.email}`}
                        className="font-medium text-primary-700 hover:text-primary-800"
                      >
                        {pqrs.email}
                      </a>
                    </dd>
                  </div>
                )}
                {pqrs.phone && (
                  <div>
                    <dt className="text-neutral-500">Teléfono</dt>
                    <dd>
                      <a
                        href={`tel:${pqrs.phone}`}
                        className="font-medium text-primary-700 hover:text-primary-800"
                      >
                        {pqrs.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {pqrs.document_number && (
                  <div>
                    <dt className="text-neutral-500">Documento</dt>
                    <dd className="font-medium text-neutral-900">
                      {pqrs.document_type} {pqrs.document_number}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {pqrs.is_anonymous && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm text-amber-800">
                Esta PQRS fue radicada de forma anónima. No hay datos de
                contacto disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}