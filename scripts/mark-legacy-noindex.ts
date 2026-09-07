/**
 * Mark legacy WordPress theme-demo pages as noIndex.
 *
 * Google Search Console reported ~1.4K not-indexed URLs on tertiaryinfotech.com.
 * A large share came from WordPress starter-theme demo layouts imported during
 * the CMS migration (home-startup, it-compnany-op, sass-landing, webteck-cart,
 * services-2 …). They are thin/duplicate content: several have an entirely
 * empty body, and the "-op" variants are byte-identical to their originals.
 *
 * Submitting them in sitemap.xml told Google they were index-worthy, which both
 * wasted crawl budget and dragged on site-level quality signals. This script
 * flips `pages.no_index = true` on them, which makes:
 *   - sitemap.ts drop them (it now filters on noIndex), and
 *   - /[slug] emit <meta name="robots" content="noindex">.
 *
 * The pages stay published and reachable — existing inbound links still work.
 *
 * Idempotent. Run:
 *   DATABASE_URL=... npx tsx scripts/mark-legacy-noindex.ts [--dry]
 */
import { db } from "../src/db";
import { pages, categories } from "../src/db/schema";
import { eq, isNull, and, inArray } from "drizzle-orm";

// WordPress starter-theme demo layouts + WooCommerce page shells.
const DEMO_PREFIXES =
  /^(home-|it-comp|it-company|it-solutions|sass-landing|software-company-2|software-company$|startup-company|web-agency|web-development|digital-agency|crypto-currency|cyber-security|ai-technology|app-landing|webteck-|services-\d|service-details|project-details|team-details|header-it-agency|sample-page|portfolio-archive|wishlist|digital-product-landing-page)/;

// Real pages that happen to have an empty body — never hide these.
const NEVER_HIDE = new Set(["blog", "software-company-op"]);

async function main() {
  const dry = process.argv.includes("--dry");
  const rows = await db
    .select({
      id: pages.id,
      slug: pages.slug,
      noIndex: pages.noIndex,
      contentHtml: pages.contentHtml,
      categoryId: pages.categoryId,
    })
    .from(pages)
    .where(eq(pages.status, "published"));

  const targets = rows.filter((r) => {
    if (NEVER_HIDE.has(r.slug)) return false;
    // Categorised pages (portfolio) are genuine work — leave them indexed.
    if (r.categoryId !== null) return false;
    const empty = (r.contentHtml ?? "").length === 0;
    return DEMO_PREFIXES.test(r.slug) || empty;
  });

  const toFlip = targets.filter((r) => !r.noIndex);
  console.log(
    `${targets.length} legacy pages matched; ${toFlip.length} need no_index=true`,
  );
  for (const t of toFlip) console.log(`  - ${t.slug}`);
  if (dry) {
    console.log("(dry run — nothing written)");
    process.exit(0);
  }
  if (toFlip.length > 0) {
    await db
      .update(pages)
      .set({ noIndex: true })
      .where(
        inArray(
          pages.id,
          toFlip.map((t) => t.id),
        ),
      );
  }
  console.log(`✓ Updated ${toFlip.length} pages`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
