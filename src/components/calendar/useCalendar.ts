"use client";

export interface CalendarEvent {
  id: string;
  title: string;
  start_at: string;
  end_at?: string;
  category: string;
  is_all_day: boolean;
  location?: string;
}

export interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

const CATEGORY_COLORS: Record<string, string> = {
  academico: "bg-blue-500",
  cultural: "bg-purple-500",
  administrativo: "bg-amber-500",
  festivo: "bg-red-500",
  deportivo: "bg-green-500",
  general: "bg-neutral-400",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "bg-neutral-400";
}

const DAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function getDayHeaders(): string[] {
  return DAYS_ES;
}

export function getMonthName(month: number): string {
  return MONTHS_ES[month];
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function parseDate(iso: string): Date {
  return new Date(iso);
}

export function getMonthGrid(
  year: number,
  month: number,
  events: CalendarEvent[]
): DayCell[] {
  const ref = new Date(year, month, 1);
  const today = new Date();
  const firstDay = startOfWeek(startOfMonth(ref));
  const lastDay = endOfMonth(ref);
  const lastCell = startOfWeek(addDays(lastDay, 6));

  const eventsByDay = new Map<string, CalendarEvent[]>();
  for (const ev of events) {
    const d = parseDate(ev.start_at);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const list = eventsByDay.get(key);
    if (list) list.push(ev);
    else eventsByDay.set(key, [ev]);
  }

  const cells: DayCell[] = [];
  let current = new Date(firstDay);

  while (current <= lastCell) {
    const key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
    cells.push({
      date: new Date(current),
      isCurrentMonth: isSameMonth(current, ref),
      isToday: isSameDay(current, today),
      events: eventsByDay.get(key) ?? [],
    });
    current = addDays(current, 1);
  }

  return cells;
}

export function getMonthLabel(year: number, month: number): string {
  return `${getMonthName(month)} ${year}`;
}

export function prevMonth(year: number, month: number): { year: number; month: number } {
  return month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
}

export function nextMonth(year: number, month: number): { year: number; month: number } {
  return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
}

export function goToToday(): { year: number; month: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}