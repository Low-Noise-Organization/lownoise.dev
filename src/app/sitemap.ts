import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://low-noise-organization.github.io/lownoise.dev/", changeFrequency: "monthly", priority: 1 }];
}
