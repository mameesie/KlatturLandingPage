import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const localizedRoutes = ["", "/about", "/contact", "/credits", "/privacy", "/start"];
const locales = ["en", "nl"];
const standaloneRoutes = ["/boek", "/session"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localizedEntries = locales.flatMap((locale) =>
    localizedRoutes.map((route) => {
      const path = `/${locale}${route}`;

      return {
        url: `${SITE_URL}${path}`,
        lastModified,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${SITE_URL}/${alternateLocale}${route}`,
            ]),
          ),
        },
      };
    }),
  );

  const standaloneEntries = standaloneRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));

  return [...localizedEntries, ...standaloneEntries];
}
