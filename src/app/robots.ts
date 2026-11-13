import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lownoise.dev/hidden/", "/lownoise.dev/hiden/", "/lownoise.dev/algorithms/", "/lownoise.dev/reviews/"] },
    sitemap: "https://low-noise-organization.github.io/lownoise.dev/sitemap.xml",
  };
}
