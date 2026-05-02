import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: [
    "/(nl|en)/:path*"  // ← dit vangt /nl/start en /en/start op
  ]
}