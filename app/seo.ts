import type { Metadata } from "next";

export const SITE_URL = "https://www.klattur.com";
export const SITE_NAME = "Klattur";
export const DEFAULT_TITLE = "Klattur - Less mind clutter, more peace of mind";
export const DEFAULT_DESCRIPTION =
  "Ten minutes, one thought. Klattur guides you through stressful thoughts step by step, audio-guided and at your own pace.";

const SUPPORTED_LOCALES = ["en", "nl"] as const;

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  en: "en_US",
  nl: "nl_NL",
};

export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Klattur",
} as const;

export function getLocalizedSocialImage(locale: string) {
  return {
    ...SOCIAL_IMAGE,
    url: `/${locale}/opengraph-image`,
  } as const;
}

function toUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function getLocalizedPath(locale: string, pathname = "") {
  const normalizedPath = pathname.startsWith("/") || pathname === "" ? pathname : `/${pathname}`;
  return `/${locale}${normalizedPath}`;
}

export function buildPageMetadata({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}): Metadata {
  const url = toUrl(pathname);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export function buildLocalizedMetadata({
  locale,
  title,
  description,
  pathname = "",
}: {
  locale: string;
  title: string;
  description: string;
  pathname?: string;
}): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname);
  const socialImage = getLocalizedSocialImage(locale);

  return {
    ...buildPageMetadata({
      title,
      description,
      pathname: localizedPath,
    }),
    alternates: {
      canonical: toUrl(localizedPath),
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((supportedLocale) => [
          supportedLocale,
          toUrl(getLocalizedPath(supportedLocale, pathname)),
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      url: toUrl(localizedPath),
      siteName: SITE_NAME,
      type: "website",
      locale: OPEN_GRAPH_LOCALES[locale] ?? OPEN_GRAPH_LOCALES.en,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
