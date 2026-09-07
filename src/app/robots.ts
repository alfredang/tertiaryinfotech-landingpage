import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          // Faceted blog listings. Every category × tag combination renders a
          // near-duplicate of /blog and self-canonicalises to it, but Google was
          // still crawling ~850 of them ("Alternate page with proper canonical
          // tag"), starving real posts of crawl budget. Block the query strings
          // so the budget goes to /blog/<post> instead.
          "/blog?*",
          "/*?category=",
          "/*?tag=",
          "/*&tag=",
          "/*?q=",
          "/*?page=",
          // Lead-attribution CTA params (?source=blog-…) produce a duplicate of
          // every service page. Canonical already points at the clean URL.
          "/*?source=",
          // Legacy WooCommerce/WordPress query params still being probed.
          "/*?wc-ajax=",
          "/*?project_cat=",
          "/*?s=",
          "/*?ref=",
          "/*?from=",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
