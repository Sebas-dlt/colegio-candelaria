import type { Metadata } from "next";
import PqrsWizard from "@/components/pqrs/PqrsWizard";

export const metadata: Metadata = {
  title: "Radicar PQRS",
  description:
    "Radique sus Peticiones, Quejas, Reclamos, Sugerencias o Denuncias de forma rápida y sencilla.",
};

export default function PqrsRadicarPage() {
  return (
    <section className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary-900 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold text-white">
            Radicar PQRS
          </h1>
          <p className="mt-2 text-white/80">
            Peticiones, Quejas, Reclamos, Sugerencias y Denuncias
          </p>
        </div>
      </div>

      {/* Wizard */}
      <PqrsWizard />
    </section>
  );
}