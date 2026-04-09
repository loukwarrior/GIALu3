import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GIA — Comida Saludable en Playacar',
  description: 'Bowls de açaí, desayunos, tostadas y batidos frescos en el corazón de Playacar. Inauguramos el 12 de abril 2026.',
  openGraph: {
    title: 'GIA — Comida Saludable en Playacar',
    description: 'Inauguración el sábado 12 de abril 2026. Plaza Comercial Playacar.',
    siteName: 'GIA Wellness',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
