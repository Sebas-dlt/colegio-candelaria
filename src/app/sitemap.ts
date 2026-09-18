import type { MetadataRoute } from "next";

const BASE_URL = "https://colegiolacandelaria.edu.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/institucional`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/gestion-academica`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/admisiones`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/atencion-ciudadana`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/calendario`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/enlaces-unidades-virtuales`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/transparencia`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/pqrs/radicar`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/pqrs/consultar`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/politica-de-privacidad`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/politica-derechos-autor`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terminos-y-condiciones`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/accesibilidad`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/mapa-del-sitio`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  return staticPages;
}