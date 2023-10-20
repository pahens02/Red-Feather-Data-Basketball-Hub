import React from 'react';
import Link from 'next/link';
import './globals.css'

export const metadata = {
  title: 'UofL Basketball Hub',
  description: 'Data Hub for Uofl Mens Basketball Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
        <main className="min-h-screen bg-background flex">
          {children}
        </main>
        </div>
      </body>
    </html>
  )
}