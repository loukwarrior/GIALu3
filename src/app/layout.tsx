import type { Metadata } from "next";
import { Inter, Open_Sans, Dancing_Script } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: 'swap',
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gia-wellness.com'),
  title: "GIA - Wellness Community | Yoga, Pilates & Mindfulness",
  description: "Únete a la comunidad GIA. Descubre clases de yoga, pilates, meditación y tips de bienestar. Tu espacio de crecimiento personal y conexión.",
  keywords: ["yoga", "pilates", "meditación", "bienestar", "mindfulness", "ropa deportiva", "comunidad", "wellness"],
  authors: [{ name: "GIA Wellness Team" }],
  creator: "GIA",
  publisher: "GIA",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gia-wellness.com",
    siteName: "GIA Wellness",
    title: "GIA - Tu comunidad de bienestar",
    description: "Descubre tu mejor versión con nuestras clases de yoga, pilates y meditación. Únete a la comunidad GIA.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GIA Wellness Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIA - Tu comunidad de bienestar",
    description: "Descubre tu mejor versión con nuestras clases de yoga, pilates y meditación.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${openSans.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-accent-50 to-primary-50">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
