import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://goqatar.app";

export const viewport: Viewport = {
  themeColor: "#C9A84C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Go Qatar — Your City. Your Way.",
    template: "%s | Go Qatar",
  },
  description:
    "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
  keywords: [
    "Qatar navigation",
    "Qatar address finder",
    "Go Qatar app",
    "Qatar map",
    "Qatar address system",
    "Zone Street Building Qatar",
    "Doha address",
    "Qatar GPS",
  ],
  authors: [{ name: "Snap Infinity", url: "https://snapinfinity.com" }],
  creator: "Snap Infinity",
  publisher: "Snap Infinity",
  category: "travel",

  openGraph: {
    title: "Go Qatar — Your City. Your Way.",
    description:
      "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
    url: BASE_URL,
    siteName: "Go Qatar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Go Qatar — Navigate Qatar effortlessly",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Go Qatar — Your City. Your Way.",
    description:
      "Find any Qatar address by Zone, Street & Building number. Navigation, news, and favourites — all in one app.",
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
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}
