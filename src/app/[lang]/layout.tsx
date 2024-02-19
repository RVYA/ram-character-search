import "./globals.css"

import type { Metadata, ResolvingMetadata } from "next"

import { getDictionary } from "dictionaries"
import { Locale, i18n } from "src/i18n-config"

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata(
  { params }: RootProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: "MISSING_TITLE",
    description: "MISSING_DESC",
  }
}

interface RootProps {
  children: React.ReactNode
  params: { lang: Locale }
}

export default function RootLayout({ children, params }: RootProps) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
