import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Permanent_Marker } from "next/font/google";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Archivo({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const hand = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tu-proyecto.vercel.app"),
  title: "Negocio · Qué vende + dónde (SEO local)",
  description:
    "Descripción de 150-160 caracteres con producto, ciudad y cómo pedir.",
  openGraph: {
    title: "Negocio · Qué vende en Ciudad",
    description: "Descripción corta para redes.",
    locale: "es_ES",
    type: "website",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Marca que hay JS antes de pintar: así los reveal no parpadean y sin JS todo se ve */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" as="image" href="/media/poster.webp" fetchPriority="high" />
      </head>
      <body className={`${display.variable} ${body.variable} ${hand.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
