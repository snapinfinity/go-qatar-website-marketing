import type { MetadataRoute } from "next";

const BASE_URL = "https://goqatar.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
