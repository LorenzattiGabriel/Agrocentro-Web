import type React from "react"
import type { Metadata } from "next"
import { Lato, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "@/styles/globals.css"
import "@/styles/animations.css"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Agrocentro - Maquinaria Agrícola Nueva y Usada",
  description:
    "Venta de maquinaria agrícola nueva y usada, implementos y repuestos. Sucursales en Río Primero y Villa Santa Rosa.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${lato.variable} ${openSans.variable}`}>
        <Suspense fallback={null}>
            <Header />
            {children}
            <Footer />
        </Suspense>
        
        <Analytics />

      </body>
    </html>
  )
}
