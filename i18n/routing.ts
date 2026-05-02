import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always" // altijd /nl/ of /en/ in de URL
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
