import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Enlaces de Unidades Virtuales",
  description:
    "Acceda a las carpetas de Google Drive de cada docente con los recursos y unidades virtuales.",
};

interface VirtualUnit {
  id: string;
  grade: string;
  teacher_name: string;
  drive_url: string;
}

async function getVirtualUnits(): Promise<VirtualUnit[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("virtual_units")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("grade", { ascending: true });
  return data ?? [];
}

export default async function EnlacesUnidadesVirtualesPage() {
  const teachers = await getVirtualUnits();

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/gestion-academica"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <IconArrowLeft size={16} />
            Volver a Gestión Académica
          </Link>
          <h1 className="text-4xl font-bold text-white">
            Enlaces de Unidades Virtuales
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Acceda a las carpetas de Google Drive de cada docente con los
            recursos y unidades virtuales.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {teachers.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
            <p className="text-neutral-500">
              No hay enlaces disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-sm font-bold text-primary-700">
                    {teacher.grade}
                  </span>
                  <span className="font-medium text-neutral-900">
                    {teacher.teacher_name}
                  </span>
                </div>
                <a
                  href={teacher.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
                >
                  <IconExternalLink size={14} />
                  Abrir carpeta
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}