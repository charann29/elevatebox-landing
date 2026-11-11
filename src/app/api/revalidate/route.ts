// Growth Studio calls this on publish, unpublish and edit (connect guide section 5 / 9a).
// Pages are prerendered from Studio at build time, so a real event starts a Vercel rebuild
// through the project's deploy hook; a "ping" (Check my website) never builds.
import { timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

const secretsMatch = (given: string, expected: string) => {
  const a = Buffer.from(given), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  const hook = process.env.CMS_DEPLOY_HOOK_URL;
  if (!secret || !hook) return Response.json({ ok: false }, { status: 503 }); // fail closed
  if (!secretsMatch(request.headers.get("x-revalidate-secret") ?? "", secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  let payload: { event?: string } = {};
  try { payload = ((await request.json()) ?? {}) as { event?: string }; } catch {}
  if (payload.event === "ping") return Response.json({ ok: true });

  const ok = await fetch(hook, { method: "POST" }).then((r) => r.ok, () => false);
  return Response.json({ ok }, { status: ok ? 200 : 502 });
}
