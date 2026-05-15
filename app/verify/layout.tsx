import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Verifikasi Tanda Tangan Digital',
  description: 'Sistem verifikasi tanda tangan digital surat resmi Muhammad Rayhan Syah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
