import type { MetadataRoute } from "next";

const BASE_URL = "https://goqatar.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: "2026-06-26",
    },
  ];
}
