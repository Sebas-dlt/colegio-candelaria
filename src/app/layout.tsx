import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Institución Educativa Nuestra Señora de la Candelaria",
    template: "%s | Institución Educativa Nuestra Señora de la Candelaria",
  },
  description:
    "Formamos personas íntegras, competentes y comprometidas con su entorno, desde los valores del Evangelio.",
  keywords: [
    "colegio",
    "Malambo",
    "Atlántico",
    "escuela",
    "educación",
    "La Candelaria",
  ],
  metadataBase: new URL("https://www.colegiolacandelaria.edu.co"),
  icons: {
    icon: "/favicon.ico",
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