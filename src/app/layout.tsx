import "./globals.css"

import type { Metadata } from "next"

// TODO: Write metadata
export const metadata: Metadata = {
  title: "MISSING_TITLE",
  description: "MISSING_DESCRIPTION",
}

interface RootProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
