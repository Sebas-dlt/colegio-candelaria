"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { IconMail, IconLoader2, IconCheck, IconAlertCircle } from "@tabler/icons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Revisa tu correo. Te enviamos un enlace de acceso." });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" aria-label="Ir al inicio">
            <Image
              src="/logo-candelaria.png"
              alt="IE Nuestra Señora de la Candelaria"
              width={80}
              height={105}
              className="h-20 w-auto"
              priority
            />
          </Link>
          <h1 className="mt-4 text-center text-2xl font-bold text-primary-900">
            Acceso Administrativo
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Ingresa tu correo institucional para recibir un enlace de acceso
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Correo electrónico
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconMail size={18} className="text-neutral-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rector@colegiolacandelaria.edu.co"
                className="block w-full rounded-lg border border-neutral-200 py-3 pl-10 pr-3 text-sm placeholder-neutral-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Mensaje */}
          {message && (
            <div
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.type === "success" ? (
                <IconCheck size={18} className="mt-0.5 shrink-0" />
              ) : (
                <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
              )}
              {message.text}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading || !email}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <IconLoader2 size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar enlace de acceso"
            )}
          </button>
        </form>

        {/* Volver */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition-colors hover:text-primary-700"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}