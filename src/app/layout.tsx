import type { Metadata, Viewport } from "next";
import { Montserrat, Caveat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Institución Educativa Nuestra Señora de la Candelaria",
    template: "%s | Institución Educativa Nuestra Señora de la Candelaria",
  },
  description:
    "Formamos personas íntegras, competentes y comprometidas con su entorno, desde los valores del Evangelio. Institución Educativa en Malambo, Atlántico.",
  keywords: [
    "colegio",
    "Malambo",
    "Atlántico",
    "escuela",
    "educación",
    "La Candelaria",
    "institución educativa",
    "eduación básica",
    "secundaria",
  ],
  metadataBase: new URL("https://colegiolacandelaria.edu.co"),
  icons: {
    icon: ["/favicon.ico", "/favicon.png"],
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "IE Nuestra Señora de la Candelaria",
    title: "Institución Educativa Nuestra Señora de la Candelaria",
    description:
      "Formamos personas íntegras, competentes y comprometidas con su entorno, desde los valores del Evangelio. Malambo, Atlántico.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IE Nuestra Señora de la Candelaria - Malambo, Atlántico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Institución Educativa Nuestra Señora de la Candelaria",
    description:
      "Formamos personas íntegras, competentes y comprometidas con su entorno, desde los valores del Evangelio. Malambo, Atlántico.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${caveat.variable}`}>
      <body>
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="contenido-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}