"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";
import {
  getMonthGrid,
  getDayHeaders,
  getMonthLabel,
  prevMonth,
  nextMonth,
  goToToday,
  getCategoryColor,
  type CalendarEvent,
  type DayCell,
} from "./useCalendar";

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  loading?: boolean;
}

function EventBadge({
  event,
  onClick,
}: {
  event: CalendarEvent;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-left text-[10px] leading-tight text-white transition-opacity hover:opacity-80 ${getCategoryColor(event.category)}`}
      title={event.title}
    >
      <span className="truncate">{event.title}</span>
    </button>
  );
}

function DayCellComponent({
  cell,
  onDateClick,
  onEventClick,
}: {
  cell: DayCell;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}) {
  return (
    <button
      onClick={() => onDateClick(cell.date)}
      className={`group relative flex min-h-[72px] flex-col rounded-lg border p-1.5 text-left transition-colors sm:min-h-[80px] sm:p-2 ${
        cell.isToday
          ? "border-primary-400 bg-primary-50"
          : cell.isCurrentMonth
            ? "border-transparent bg-white hover:bg-neutral-50"
            : "border-transparent bg-neutral-50 text-neutral-400"
      }`}
    >
      <span
        className={`text-xs font-semibold sm:text-sm ${
          cell.isToday
            ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white"
            : cell.isCurrentMonth
              ? "text-neutral-700"
              : "text-neutral-400"
        }`}
      >
        {cell.date.getDate()}
      </span>
      <div className="mt-1 flex flex-1 flex-col gap-0.5 overflow-hidden">
        {cell.events.slice(0, 3).map((ev) => (
          <EventBadge
            key={ev.id}
            event={ev}
            onClick={() => onEventClick(ev)}
          />
        ))}
        {cell.events.length > 3 && (
          <span className="text-[10px] text-neutral-500">
            +{cell.events.length - 3} más
          </span>
        )}
      </div>
    </button>
  );
}

function EventDetail({
  event,
  onClose,
}: {
  event: CalendarEvent;
  onClose: () => void;
}) {
  const date = new Date(event.start_at);
  const endDate = event.end_at ? new Date(event.end_at) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className={`rounded-lg px-3 py-1 text-xs font-semibold text-white ${getCategoryColor(event.category)}`}>
            {event.category}
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            ✕
          </button>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">{event.title}</h3>
        <div className="mt-3 space-y-2 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <IconCalendar size={16} className="shrink-0 text-neutral-400" />
            <span>
              {date.toLocaleDateString("es-CO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {!event.is_all_day && (
            <div className="flex items-center gap-2">
              <IconClock size={16} className="shrink-0 text-neutral-400" />
              <span>
                {date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                {endDate && ` – ${endDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`}
              </span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <IconMapPin size={16} className="shrink-0 text-neutral-400" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Calendar({
  events = [],
  onDateClick,
  onEventClick,
  loading = false,
}: CalendarProps) {
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const grid = useMemo(() => getMonthGrid(year, month, events), [year, month, events]);
  const dayHeaders = useMemo(() => getDayHeaders(), []);
  const label = useMemo(() => getMonthLabel(year, month), [year, month]);

  const handlePrev = useCallback(() => {
    const p = prevMonth(year, month);
    setYear(p.year);
    setMonth(p.month);
  }, [year, month]);

  const handleNext = useCallback(() => {
    const n = nextMonth(year, month);
    setYear(n.year);
    setMonth(n.month);
  }, [year, month]);

  const handleToday = useCallback(() => {
    const t = goToToday();
    setYear(t.year);
    setMonth(t.month);
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      onDateClick?.(date);
    },
    [onDateClick]
  );

  const handleEventClick = useCallback(
    (event: CalendarEvent) => {
      if (onEventClick) {
        onEventClick(event);
      } else {
        setSelectedEvent(event);
      }
    },
    [onEventClick]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "t" || e.key === "T") handleToday();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext, handleToday]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{label}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handleToday}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Hoy
          </button>
          <button
            onClick={handlePrev}
            className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100"
            aria-label="Mes anterior"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100"
            aria-label="Mes siguiente"
          >
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {dayHeaders.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-semibold text-neutral-500">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((cell, i) => (
          <DayCellComponent
            key={i}
            cell={cell}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-600">
        {[
          ["academico", "Académico"],
          ["cultural", "Cultural"],
          ["administrativo", "Administrativo"],
          ["festivo", "Festivo"],
          ["deportivo", "Deportivo"],
          ["general", "General"],
        ].map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${getCategoryColor(cat)}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
          Cargando eventos...
        </div>
      )}

      {/* Event detail modal */}
      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}