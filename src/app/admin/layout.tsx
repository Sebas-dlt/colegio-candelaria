"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconMessageReport,
  IconNews,
  IconCalendarEvent,
  IconFileText,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/admin/pqrs", label: "PQRS", icon: IconMessageReport },
  { href: "/admin/news", label: "Noticias", icon: IconNews },
  { href: "/admin/events", label: "Eventos", icon: IconCalendarEvent },
  { href: "/admin/documents", label: "Documentos", icon: IconFileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="font-semibold text-neutral-900">Admin</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 w-64 border-t border-neutral-200 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          >
            <IconSettings size={18} />
            Ver sitio
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
              <span className="font-semibold text-neutral-900">Admin</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-1 hover:bg-neutral-100"
              >
                <IconX size={20} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                        }`}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden"
          >
            <IconMenu2 size={20} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="hidden text-right text-sm sm:block">
              <p className="font-medium text-neutral-900">Rector</p>
              <p className="text-neutral-500">Administrador</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
              R
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}