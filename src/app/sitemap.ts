import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return ["", "/halls", ...rooms.map((r) => `/halls/${r.slug}`)].map(
    (path) => ({ url: base + path }),
  );
}
