import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

import { i18n } from "./i18n-config"

function getLocale(req: NextRequest): string | undefined {
  const headers: Record<string, string> = {}
  req.headers.forEach((val, key) => (headers[key] = val))

  // @ts-ignore locales are readonly
  const availableLocales: string[] = i18n.locales

  const reqLocale = new Negotiator({ headers: headers }).languages(
    availableLocales,
  )

  const locale = matchLocale(reqLocale, availableLocales, i18n.defaultLocale)
  return locale
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const isLocaleMissing = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (isLocaleMissing) {
    const locale = getLocale(req)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url,
      ),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - /images/ (static images folder in public folder)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
}
