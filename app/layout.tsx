import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Micro Interactions Dashboard',
  description: 'A beautifully designed dashboard with engineered micro-interactions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
