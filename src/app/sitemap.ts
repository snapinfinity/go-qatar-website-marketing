import type { MetadataRoute } from "next";
import pageDates from "@/lib/pageDates.json";

const BASE_URL = "https://goqatar.app";

// `lastModified` comes from src/lib/pageDates.json, regenerated on every build
// by scripts/generate-page-dates.mjs from the last commit touching each
// route's content files. Don't hardcode dates here again — they went stale by
// two months last time, which trains search engines to ignore our lastmod.
const routes = ["/", "/contact", "/privacy-policy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route === "/" ? BASE_URL : `${BASE_URL}${route}`,
    lastModified: pageDates[route],
  }));
}
