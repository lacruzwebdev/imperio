import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
  return <main id="main" className="min-h-[70svh]">{children}</main>
}
