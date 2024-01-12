import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import SkipToContent from '@/components/ui/skip-to-content'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imperio Español',
  description: 'Descubre eventos históricos en España'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SkipToContent />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
