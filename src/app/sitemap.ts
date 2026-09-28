import type { MetadataRoute } from "next";

import { site, work } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.8 },
    ...work.map((entry) => ({
      url: `${site.url}/work/${entry.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
