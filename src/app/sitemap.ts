import type { MetadataRoute } from "next";
import { db } from "@/db";
import { pages, posts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { EDTOOLS } from "@/lib/edtools-data";
import { MOBILE_APPS } from "@/lib/mobile-apps";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only submit pages/posts we actually want indexed. `noIndex` rows emit a
  // <meta name="robots" content="noindex"> — submitting them in the sitemap as
  // well sends Google a contradictory signal and burns crawl budget on the
  // legacy WordPress theme-demo imports (see scripts/mark-legacy-noindex.ts).
  const [allPages, allPosts] = await Promise.all([
    db
      .select()
      .from(pages)
      .where(and(eq(pages.status, "published"), eq(pages.noIndex, false)))
      .catch(() => []),
    db
      .select()
      .from(posts)
      .where(and(eq(posts.status, "published"), eq(posts.noIndex, false)))
      .catch(() => []),
  ]);
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ssg-ato-application`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/training-management-system`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/learning-management-system`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai-solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/wsq-course-development`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/tpqa-consultancy`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/content-management-system`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/marketplace-development`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/mobile-app-development`, changeFrequency: "monthly", priority: 0.9 },
    ...MOBILE_APPS.map((a) => ({
      url: `${BASE}/apps/${a.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/hr-management-system`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai-agent-deployment`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/real-clients`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ai-chatbot-portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/blog/tags`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/edtools`, changeFrequency: "monthly", priority: 0.8 },
    ...EDTOOLS.map((t) => ({
      url: `${BASE}/edtools/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    ...allPages.map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...allPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
