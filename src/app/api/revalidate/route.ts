// Growth Studio calls this on publish, unpublish and edit (connect guide section 5 / 9a).
// Pages are prerendered from Studio at build time, so a real event starts a rebuild: a fresh
// Railway deploy of this service (Railway has no deploy hook URL, so its API with a project
// token), or the Vercel deploy hook while CMS_DEPLOY_HOOK_URL is set. A "ping" never builds.
import { timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

const secretsMatch = (given: string, expected: string) => {
  const a = Buffer.from(given), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

function startRebuild() {
  const hook = process.env.CMS_DEPLOY_HOOK_URL;
  if (hook) return fetch(hook, { method: "POST" });
  const { RAILWAY_DEPLOY_TOKEN: token, RAILWAY_SERVICE_ID: serviceId, RAILWAY_ENVIRONMENT_ID: environmentId } = process.env;
  return fetch("https://backboard.railway.com/graphql/v2", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Project-Access-Token": token ?? "" },
    body: JSON.stringify({
      query: "mutation($s:String!,$e:String!){serviceInstanceDeployV2(serviceId:$s,environmentId:$e)}",
      variables: { s: serviceId, e: environmentId },
    }),
  }).then(async (r) => (r.ok && !(await r.clone().json()).errors ? r : new Response(null, { status: 502 })));
}

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  const canBuild = process.env.CMS_DEPLOY_HOOK_URL || process.env.RAILWAY_DEPLOY_TOKEN;
  if (!secret || !canBuild) return Response.json({ ok: false }, { status: 503 }); // fail closed
  if (!secretsMatch(request.headers.get("x-revalidate-secret") ?? "", secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  let payload: { event?: string } = {};
  try { payload = ((await request.json()) ?? {}) as { event?: string }; } catch {}
  if (payload.event === "ping") return Response.json({ ok: true });

  const ok = await startRebuild().then((r) => r.ok, () => false);
  return Response.json({ ok }, { status: ok ? 200 : 502 });
}
