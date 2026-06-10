import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MouseBlob from "./components/MouseBlob";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "./seo";

const no_name_reg = localFont({
  src: "../public/fonts/no_name_37_Regular.otf",
  variable: "--font-no-name-regular",
})

const open_sans_semibold = localFont({
  src: "../public/fonts/OpenSans-Semibold.ttf",
  variable: "--font-open-sans-semibold",
})

const open_sans_regular = localFont({
  src: "../public/fonts/OpenSans-Regular.ttf",
  variable: "--font-open-sans-regular",
})

const smooth_circulars = localFont({
  src: "../public/fonts/Smooth_Circulars.otf",
  variable: "--font-smooth-circulars",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  themeColor: '#ffffff',
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = headerStore.get("X-NEXT-INTL-LOCALE") ?? "en";

  return (
    <html lang={locale}>
      <body
  className={`${no_name_reg.variable} ${smooth_circulars.variable} ${open_sans_semibold.variable} ${open_sans_regular.variable} antialiased bg-tiles-green`} //bg-[#57730D]
>
  <div className="relative min-h-screen flex flex-col">
    <Header />
    <MouseBlob /> 

    <main className="flex-1 overflow-auto flex flex-col">
      {children}
      <Footer />
    </main>
  </div>
</body>
    </html>
  );
}
