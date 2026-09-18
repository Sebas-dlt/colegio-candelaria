"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/calendar/Calendar";
import type { CalendarEvent } from "@/components/calendar/useCalendar";

export default function CalendarioPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/events?month=${currentMonth}&status=published`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setEvents(data?.events ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentMonth]);

  const handleDateClick = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const newMonth = `${y}-${m}`;
    if (newMonth !== currentMonth) {
      setLoading(true);
      setCurrentMonth(newMonth);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Calendario de Actividades</h1>
          <p className="mt-4 text-lg text-white/80">
            Eventos académicos, culturales y administrativos de la institución
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          loading={loading}
        />

        {/* Próximos eventos */}
        {events.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-neutral-900">Próximos eventos</h2>
            <div className="space-y-2">
              {events
                .filter((e) => new Date(e.start_at) >= new Date())
                .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
                .slice(0, 5)
                .map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary-600">
                        {new Date(ev.start_at).toLocaleDateString("es-CO", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-bold text-neutral-900">
                        {new Date(ev.start_at).getDate()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{ev.title}</p>
                      {!ev.is_all_day && (
                        <p className="text-xs text-neutral-500">
                          {new Date(ev.start_at).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}