import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const BASE_URL = "https://goqatar.app";
const GTM_ID = "GTM-PS48G5JD";

export const viewport: Viewport = {
  themeColor: "#8A1538",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Go Qatar — Find Any Address, Metro & News in Qatar",
    template: "%s | Go Qatar",
  },
  description:
    "Find any building from its blue plate, plan Doha Metro journeys, and read Qatar news. Free on iOS and Android.",
  keywords: [
    "Qatar navigation",
    "Qatar address finder",
    "Go Qatar app",
    "Qatar map",
    "Qatar address system",
    "Zone Street Building Qatar",
    "Doha address",
    "Qatar GPS",
    "Doha Metro",
    "Doha Metro map",
    "QAR exchange rate",
    "Qatar news",
  ],
  authors: [{ name: "Snap Infinity", url: "https://snapinfinity.com" }],
  creator: "Snap Infinity",
  publisher: "Snap Infinity",
  category: "travel",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    title: "Go Qatar — Find Any Address, Metro & News in Qatar",
    description:
      "Find any building from its blue plate, plan Doha Metro journeys, and read Qatar news. Free on iOS and Android.",
    url: BASE_URL,
    siteName: "Go Qatar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Go Qatar — addresses, metro and news in one app",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Go Qatar — Find Any Address, Metro & News in Qatar",
    description:
      "Find any building from its blue plate, plan Doha Metro journeys, and read Qatar news. Free on iOS and Android.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png",   sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="bg-background text-white antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
