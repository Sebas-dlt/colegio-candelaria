"use client";

import { useState, useEffect, useCallback } from "react";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";

interface Event {
  id: string;
  title: string;
  description?: string;
  start_at: string;
  end_at?: string;
  location?: string;
  category: string;
  status: string;
  is_all_day: boolean;
}

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "academico", label: "Académico" },
  { value: "cultural", label: "Cultural" },
  { value: "administrativo", label: "Administrativo" },
  { value: "festivo", label: "Festivo" },
  { value: "deportivo", label: "Deportivo" },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    location: "",
    category: "general",
    is_all_day: false,
  });

  const fetchEvents = useCallback(async () => {
    try {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const res = await fetch(`/api/events?month=${month}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events ?? []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    fetch(`/api/events?month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setEvents(data.events ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", start_date: "", start_time: "", end_date: "", end_time: "", location: "", category: "general", is_all_day: false });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const start_at = form.is_all_day || !form.start_time
      ? `${form.start_date}T00:00:00`
      : `${form.start_date}T${form.start_time}`;
    const end_at = form.end_date
      ? form.end_time
        ? `${form.end_date}T${form.end_time}`
        : `${form.end_date}T23:59:59`
      : undefined;

    const body = {
      title: form.title,
      description: form.description || undefined,
      start_at,
      end_at,
      location: form.location || undefined,
      category: form.category,
      is_all_day: form.is_all_day,
      status: "published",
    };

    const url = editing ? `/api/events/${editing.id}` : "/api/events";
    const method = editing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        resetForm();
        fetchEvents();
      }
    } catch {
      // silent
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este evento?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) fetchEvents();
    } catch {
      // silent
    }
  };

  const handleEdit = (ev: Event) => {
    const start = new Date(ev.start_at);
    const end = ev.end_at ? new Date(ev.end_at) : null;
    setForm({
      title: ev.title,
      description: ev.description ?? "",
      start_date: start.toISOString().split("T")[0],
      start_time: ev.is_all_day ? "" : start.toTimeString().slice(0, 5),
      end_date: end ? end.toISOString().split("T")[0] : "",
      end_time: end && !ev.is_all_day ? end.toTimeString().slice(0, 5) : "",
      location: ev.location ?? "",
      category: ev.category,
      is_all_day: ev.is_all_day,
    });
    setEditing(ev);
    setShowForm(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Eventos</h1>
          <p className="text-sm text-neutral-500">Gestiona los eventos del calendario institucional</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <IconPlus size={18} />
          Nuevo evento
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="mb-4 font-bold text-neutral-900">{editing ? "Editar evento" : "Nuevo evento"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-neutral-700">Título *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-neutral-700">Descripción</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Fecha inicio *</label>
              <input required type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Hora inicio</label>
              <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} disabled={form.is_all_day} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-neutral-100" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Fecha fin</label>
              <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Hora fin</label>
              <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} disabled={form.is_all_day} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-neutral-100" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Ubicación</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Categoría</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={form.is_all_day} onChange={(e) => setForm({ ...form, is_all_day: e.target.checked })} className="rounded border-neutral-300" />
                Todo el día
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
              {editing ? "Guardar cambios" : "Crear evento"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-neutral-500">No hay eventos este mes.</p>
      ) : (
        <div className="space-y-2">
          {events.map((ev) => {
            const date = new Date(ev.start_at);
            return (
              <div key={ev.id} className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4">
                <div className="text-center">
                  <div className="text-xs font-semibold text-primary-600">
                    {date.toLocaleDateString("es-CO", { weekday: "short" })}
                  </div>
                  <div className="text-xl font-bold text-neutral-900">{date.getDate()}</div>
                  <div className="text-xs text-neutral-500">
                    {date.toLocaleDateString("es-CO", { month: "short" })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900">{ev.title}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold text-white ${
                      ev.category === "academico" ? "bg-blue-500" :
                      ev.category === "cultural" ? "bg-purple-500" :
                      ev.category === "administrativo" ? "bg-amber-500" :
                      ev.category === "festivo" ? "bg-red-500" :
                      ev.category === "deportivo" ? "bg-green-500" :
                      "bg-neutral-400"
                    }`}>{ev.category}</span>
                    {ev.is_all_day ? "Todo el día" : date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                    {ev.location && <span>📍 {ev.location}</span>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(ev)} className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700">
                    <IconEdit size={16} />
                  </button>
                  <button onClick={() => handleDelete(ev.id)} className="rounded p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600">
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}