import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEWTS - Intelligence for Restless Minds',
  description: 'AI-powered news intelligence for strategic decision-makers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
