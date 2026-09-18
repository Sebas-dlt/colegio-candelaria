"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconArrowLeft,
  IconExternalLink,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";

interface VirtualUnit {
  id: string;
  grade: string;
  teacher_name: string;
  drive_url: string;
  sort_order: number;
  is_active: boolean;
}

const GRADES = [
  "00A", "00B", "00C", "00D", "00E", "00F",
  "01A", "01B", "01C", "01D", "01E", "01F", "01G",
  "02A", "02B", "02C", "02D", "02E", "02F",
  "03A", "03B", "03C", "03D", "03E",
  "04A", "04B", "04C", "04D", "04E",
  "05A", "05B", "05C",
  "06A", "06B", "06C", "06D", "06E",
  "07A", "07B", "07C", "07D",
  "08A", "08B", "08C",
  "09A", "09B", "09C",
  "10A", "10B",
  "11A",
  "NA",
];

export default function AdminVirtualUnitsPage() {
  const [units, setUnits] = useState<VirtualUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VirtualUnit | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ grade: "00A", teacher_name: "", drive_url: "" });
  const [saving, setSaving] = useState(false);

  const fetchUnits = useCallback(async () => {
    const res = await fetch("/api/virtual-units");
    const data = await res.json();
    setUnits(data.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUnits(); }, [fetchUnits]);

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PATCH" : "POST";
    const url = editing ? `/api/virtual-units/${editing.id}` : "/api/virtual-units";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm({ grade: "00A", teacher_name: "", drive_url: "" });
    fetchUnits();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este enlace?")) return;
    await fetch(`/api/virtual-units/${id}`, { method: "DELETE" });
    fetchUnits();
  };

  const handleEdit = (unit: VirtualUnit) => {
    setEditing(unit);
    setForm({ grade: unit.grade, teacher_name: unit.teacher_name, drive_url: unit.drive_url });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-2 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700"
            >
              <IconArrowLeft size={14} />
              Admin
            </Link>
            <h1 className="text-2xl font-bold text-neutral-900">
              Enlaces Unidades Virtuales
            </h1>
          </div>
          <button
            onClick={() => { setEditing(null); setForm({ grade: "00A", teacher_name: "", drive_url: "" }); setShowForm(true); }}
            className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
          >
            <IconPlus size={16} />
            Agregar
          </button>
        </div>

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-neutral-900">
                  {editing ? "Editar enlace" : "Nuevo enlace"}
                </h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-neutral-400 hover:text-neutral-600">
                  <IconX size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">Grado</label>
                  <select
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                  >
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">Nombre del docente</label>
                  <input
                    type="text"
                    value={form.teacher_name}
                    onChange={(e) => setForm({ ...form, teacher_name: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="Ej: MARIA GARCIA"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">URL de Google Drive</label>
                  <input
                    type="url"
                    value={form.drive_url}
                    onChange={(e) => setForm({ ...form, drive_url: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                    placeholder="https://drive.google.com/drive/folders/..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.teacher_name || !form.drive_url}
                  className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50"
                >
                  <IconDeviceFloppy size={16} />
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <p className="text-neutral-500">Cargando...</p>
        ) : units.length === 0 ? (
          <p className="text-neutral-500">No hay enlaces registrados.</p>
        ) : (
          <div className="space-y-2">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-xs font-bold text-primary-700">
                    {unit.grade}
                  </span>
                  <div>
                    <p className="font-medium text-neutral-900">{unit.teacher_name}</p>
                    <a
                      href={unit.drive_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary-600 hover:underline"
                    >
                      <IconExternalLink size={12} />
                      Abrir carpeta
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(unit)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}