import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { redirects } from "@/db/schema";
import { syncAuthorized } from "@/lib/sync-auth";

const redirectSchema = z.object({
  fromPath: z.string().min(1).max(1000).startsWith("/"),
  toPath: z.string().min(1).max(1000).startsWith("/"),
  statusCode: z.number().int().refine((n) => n === 301 || n === 302 || n === 308, {
    message: "statusCode must be 301, 302 or 308",
  }),
});

const payloadSchema = z.object({
  redirects: z.array(redirectSchema).min(1).max(500),
});

export async function POST(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = payloadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let upserted = 0;
  for (const r of parsed.data.redirects) {
    // Never let a redirect point at itself — that's an infinite loop in
    // /[slug] and /blog/[slug], which consult this table before 404'ing.
    if (r.fromPath === r.toPath) continue;
    await db
      .insert(redirects)
      .values({ fromPath: r.fromPath, toPath: r.toPath, statusCode: r.statusCode })
      .onConflictDoUpdate({
        target: redirects.fromPath,
        set: { toPath: r.toPath, statusCode: r.statusCode },
      });
    upserted += 1;
  }

  return NextResponse.json({ ok: true, upserted });
}
