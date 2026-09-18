"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconMessageReport,
  IconClock,
  IconCheck,
  IconAlertTriangle,
  IconTrendingUp,
} from "@tabler/icons-react";

interface Stats {
  total: number;
  pendientes: number;
  enCurso: number;
  resueltas: number;
  tiempoPromedio: number | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/pqrs?limit=1");
        const data = await res.json();
        const total = data.pagination?.total || 0;

        // Fetch stats from different endpoints
        const [pendientes, enCurso, resueltas] = await Promise.all([
          fetch("/api/pqrs?status=recibida&limit=1").then((r) => r.json()),
          fetch("/api/pqrs?status=en_estudio&limit=1").then((r) => r.json()),
          fetch("/api/pqrs?status=resuelta&limit=1").then((r) => r.json()),
        ]);

        setStats({
          total,
          pendientes: pendientes.pagination?.total || 0,
          enCurso:
            (enCurso.pagination?.total || 0) +
            (
              await fetch("/api/pqrs?status=en_curso&limit=1").then((r) =>
                r.json()
              )
            ).pagination?.total,
          resueltas: resueltas.pagination?.total || 0,
          tiempoPromedio: null,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500">Resumen del sistema de PQRS</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total PQRS"
          value={stats?.total || 0}
          icon={IconMessageReport}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          label="Pendientes"
          value={stats?.pendientes || 0}
          icon={IconClock}
          color="text-yellow-600"
          bg="bg-yellow-50"
        />
        <StatCard
          label="En curso"
          value={stats?.enCurso || 0}
          icon={IconAlertTriangle}
          color="text-orange-600"
          bg="bg-orange-50"
        />
        <StatCard
          label="Resueltas"
          value={stats?.resueltas || 0}
          icon={IconCheck}
          color="text-green-600"
          bg="bg-green-50"
        />
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/pqrs"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary-200 hover:bg-primary-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <IconMessageReport size={24} className="text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Gestionar PQRS</p>
            <p className="text-sm text-neutral-500">
              Ver, responder y dar seguimiento
            </p>
          </div>
        </Link>

        <Link
          href="/admin/news"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary-200 hover:bg-primary-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <IconTrendingUp size={24} className="text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Publicar noticia</p>
            <p className="text-sm text-neutral-500">Crear contenido nuevo</p>
          </div>
        </Link>

        <Link
          href="/admin/events"
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary-200 hover:bg-primary-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <IconClock size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Crear evento</p>
            <p className="text-sm text-neutral-500">Agregar al calendario</p>
          </div>
        </Link>
      </div>

      {/* Recent PQRS */}
      <RecentPqrs />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${bg}`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );
}

interface PqrsItem {
  id: string;
  radicado: string;
  subject: string;
  status: string;
  created_at: string;
  is_anonymous: boolean;
  full_name?: string;
  email?: string;
}

function RecentPqrs() {
  const [pqrs, setPqrs] = useState<PqrsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pqrs?limit=5")
      .then((r) => r.json())
      .then((data) => setPqrs(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h2 className="font-semibold text-neutral-900">Últimas PQRS</h2>
        <Link
          href="/admin/pqrs"
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Ver todas →
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200 border-t-primary-700" />
        </div>
      ) : pqrs.length === 0 ? (
        <div className="py-8 text-center text-sm text-neutral-500">
          No hay PQRS registradas aún
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {pqrs.map((item) => (
            <Link
              key={item.id}
              href={`/admin/pqrs/${item.radicado}`}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-mono text-sm font-semibold text-primary-700">
                    {item.radicado}
                  </p>
                  <p className="text-sm text-neutral-600">{item.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={item.status} />
                <span className="text-xs text-neutral-400">
                  {new Date(item.created_at).toLocaleDateString("es-CO")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; class: string }> = {
    recibida: { label: "Recibida", class: "bg-blue-100 text-blue-700" },
    en_estudio: {
      label: "En estudio",
      class: "bg-yellow-100 text-yellow-700",
    },
    en_curso: {
      label: "En curso",
      class: "bg-orange-100 text-orange-700",
    },
    resuelta: { label: "Resuelta", class: "bg-green-100 text-green-700" },
    cerrada: { label: "Cerrada", class: "bg-neutral-100 text-neutral-700" },
    rechazada: { label: "Rechazada", class: "bg-red-100 text-red-700" },
  };

  const { label, class: className } = config[status] || {
    label: status,
    class: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}