/**
 * Add 301 redirects for legacy WordPress URLs that Google Search Console
 * reported as "Not found (404)" on tertiaryinfotech.com.
 *
 * Three families:
 *   1. `/<post-slug>.html`  — the old WP permalink style. These posts still
 *      exist at /blog/<post-slug>, so the .html form is a pure 404 that bleeds
 *      link equity. Verified against the posts table before being listed here.
 *   2. Renamed portfolio pages (/squashpro → /squashpro-2 etc.).
 *   3. Misc typos and dead WP surfaces (/home, /blogBlog, /sample-page).
 *
 * WP archive routes (/category/*, /tag/*, /author/*, /2025/04/15) and
 * /blog/page/N are deliberately NOT redirected — they have no equivalent and a soft-404 to /blog
 * would be a worse signal than an honest 404. They're left to age out.
 *
 * Idempotent: upserts on from_path. Run:
 *   DATABASE_URL=... npx tsx scripts/add-legacy-redirects.ts
 */
import { db } from "../src/db";
import { redirects, posts, pages } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Legacy `.html` permalinks → /blog/<slug>. Slug is the filename minus .html.
const LEGACY_HTML_POSTS = [
  "the-impact-of-generative-ai-on-education",
  "eliminate-traqom-chaos-automate-compliance-with-a-cloud-based-feedback-dashboard",
  "why-skills-mapping-is-becoming-essential-for-training-providers-in-2025",
  "beyond-traditional-lms-how-ai-and-cloud-tech-are-redefining-adult-learning",
  "regional-manager-limited-time-management-2",
  "the-role-of-training-centres-in-singapores-skillsfuture-ecosystem",
  "why-wsq-providers-need-a-tpqa-compliant-tpg-integrated-training-management-system",
  "top-10-best-digital-marketing-trainings-in-singapore",
  "top-10-best-blockchain-trainings-in-singapore",
  "top-10-best-aws-trainings-in-singapore",
  "top-10-best-autodesk-trainings-in-singapore",
  "top-10-best-ecommerce-trainings-in-singapore",
  "top-10-best-sustainability-trainings-in-singapore",
  "top-10-best-it-trainings-in-singapore",
  "top-10-best-finance-trainings-in-singapore",
  "top-10-best-adult-training-centers-in-singapore",
  "transform-work-processes-with-agentic-ai",
  "improve-ai-chatbots-with-retrieval-augmented-generation-rag",
  "top-10-best-ai-trainings-in-singapore",
  "whats-the-holding-back-it-solution-industry",
  "go-beyond-pdfs-deploy-blockchain-verified-opencerts-for-wsq-compliance-and-learner-trust",
  "improve-hr-processes-with-microsoft-copilot-agents",
  "improve-workplace-productivity-with-microsoft-copilot-365",
  "how-will-mcp-server-enhance-ai-agent-capability",
  "how-to-be-a-tpqa-compliant-training-provider",
];

// Renamed / typo'd routes → their current home.
const MANUAL: Array<[string, string]> = [
  ["/home", "/"],
  ["/Home", "/"],
  ["/blogBlog", "/blog"],
  ["/contactContact", "/contact"],
  ["/sample-page", "/"],
  ["/services-6", "/"],
  ["/potluck-2", "/potluck"],
  ["/recycle-resell", "/recycle-resell-2"],
  ["/squashpro", "/squashpro-2"],
  ["/idea-galaxy", "/idea-galaxy-2"],
  ["/ai-hrms", "/ai-hr-management-system"],
  ["/notebooklm", "/notebooklm-mcp-bridge"],
];

async function main() {
  const pairs: Array<[string, string]> = [];

  // Only add a .html redirect when the destination post really exists.
  for (const slug of LEGACY_HTML_POSTS) {
    const [p] = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);
    if (!p) {
      console.warn(`  ! skipping /${slug}.html — no such post`);
      continue;
    }
    pairs.push([`/${slug}.html`, `/blog/${slug}`]);
  }

  for (const [from, to] of MANUAL) {
    // Verify page targets resolve. File-based routes (/, /blog, /contact) are
    // not rows in `pages`, so they're allowlisted rather than looked up.
    const FILE_ROUTES = new Set(["/", "/blog", "/contact"]);
    if (!FILE_ROUTES.has(to)) {
      const slug = to.replace(/^\//, "");
      const [pg] = await db
        .select({ slug: pages.slug })
        .from(pages)
        .where(eq(pages.slug, slug))
        .limit(1);
      if (!pg) {
        console.warn(`  ! skipping ${from} → ${to} — target page missing`);
        continue;
      }
    }
    pairs.push([from, to]);
  }

  let n = 0;
  for (const [fromPath, toPath] of pairs) {
    await db
      .insert(redirects)
      .values({ fromPath, toPath, statusCode: 301 })
      .onConflictDoUpdate({
        target: redirects.fromPath,
        set: { toPath, statusCode: 301 },
      });
    n += 1;
  }
  console.log(`✓ Upserted ${n} redirects`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
