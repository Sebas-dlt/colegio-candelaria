"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
} from "@tabler/icons-react";

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "recibida", label: "Recibida" },
  { value: "en_estudio", label: "En estudio" },
  { value: "en_curso", label: "En curso" },
  { value: "resuelta", label: "Resuelta" },
  { value: "cerrada", label: "Cerrada" },
  { value: "rechazada", label: "Rechazada" },
];

const TYPE_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "peticion", label: "Petición" },
  { value: "queja", label: "Queja" },
  { value: "reclamo", label: "Reclamo" },
  { value: "sugerencia", label: "Sugerencia" },
  { value: "denuncia", label: "Denuncia" },
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

interface PqrsItem {
  id: string;
  radicado: string;
  type: string;
  subject: string;
  status: string;
  is_anonymous: boolean;
  full_name?: string;
  email?: string;
  created_at: string;
}

function PqrsListContent() {
  const searchParams = useSearchParams();

  const [pqrs, setPqrs] = useState<PqrsItem[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  const buildParams = useCallback(
    (page: number) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (status) params.set("status", status);
      if (type) params.set("type", type);
      if (search) params.set("search", search);
      return params;
    },
    [status, type, search]
  );

  const fetchPqrs = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/pqrs?${buildParams(page)}`);
        const data = await res.json();
        setPqrs(data.data || []);
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
      } catch (error) {
        console.error("Error fetching PQRS:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildParams]
  );

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/pqrs?${buildParams(1)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setPqrs(data.data || []);
          setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
        }
      })
      .catch((error) => {
        if (!cancelled) console.error("Error fetching PQRS:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [buildParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPqrs(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Gestionar PQRS</h1>
        <p className="text-neutral-500">
          {pagination.total} {pagination.total === 1 ? "solicitud" : "solicitudes"} registradas
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <IconSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por radicado, asunto o nombre..."
                className="w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-4 text-sm placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <IconLoader2 size={24} className="animate-spin text-primary-600" />
          </div>
        ) : pqrs.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-500">
            No se encontraron PQRS
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Radicado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Asunto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Solicitante
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Fecha
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {pqrs.map((item) => {
                  const statusCfg = STATUS_CONFIG[item.status] || {
                    label: item.status,
                    class: "bg-neutral-100 text-neutral-700",
                  };

                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-neutral-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        <Link
                          href={`/admin/pqrs/${item.radicado}`}
                          className="font-mono text-sm font-semibold text-primary-700 hover:text-primary-800"
                        >
                          {item.radicado}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-600">
                        {TYPE_CONFIG[item.type] || item.type}
                      </td>
                      <td className="max-w-xs truncate px-4 py-4 text-sm text-neutral-900">
                        {item.subject}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-600">
                        {item.is_anonymous ? (
                          <span className="text-neutral-400">Anónimo</span>
                        ) : (
                          item.full_name || item.email || "-"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusCfg.class}`}
                        >
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                        {new Date(item.created_at).toLocaleDateString("es-CO")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        <Link
                          href={`/admin/pqrs/${item.radicado}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3">
            <p className="text-sm text-neutral-500">
              Página {pagination.page} de {pagination.pages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchPqrs(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconChevronLeft size={16} />
              </button>
              <button
                onClick={() => fetchPqrs(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PqrsListPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <IconLoader2 size={24} className="animate-spin text-primary-600" />
        </div>
      }
    >
      <PqrsListContent />
    </Suspense>
  );
}