import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value

    if (cookieLocale && routing.locales.includes(cookieLocale as "nl" | "en")) {
      const url = request.nextUrl.clone()
      url.pathname = `/${cookieLocale}`
      return NextResponse.redirect(url)
    }
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    "/",
    "/(nl|en)/:path*"
  ]
}
