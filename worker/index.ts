// Serves the exported site. Beyond static files: www → apex, /voice and /voiceagents → the
// Voice product app, /digitalmarketing → its service page, and /x → x.html when a same-named folder (Next's RSC .txt files) shadows it.
type Env = { ASSETS: { fetch: typeof fetch }; CMS_REVALIDATE_SECRET?: string; GH_DISPATCH_TOKEN?: string };

const json = (body: object, status: number) => Response.json(body, { status });

function secretsMatch(given: string, expected: string) {
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i += 1) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

// Growth Studio's update route (connect guide sections 5 and 9a). The site is static, so a publish
// starts the GitHub deploy workflow; the post is live when that build finishes (2-4 minutes).
async function revalidate(request: Request, env: Env) {
  const secret = env.CMS_REVALIDATE_SECRET;
  if (!secret || !env.GH_DISPATCH_TOKEN) return json({ ok: false }, 503); // fail closed
  if (!secretsMatch(request.headers.get("x-revalidate-secret") ?? "", secret)) return json({ ok: false }, 401);
  let payload: { event?: string } = {};
  try { payload = (await request.json()) ?? {}; } catch {}
  if (payload.event === "ping") return json({ ok: true }, 200); // Check my website: never builds
  const gh = await fetch("https://api.github.com/repos/charann29/elevatebox-landing/actions/workflows/deploy.yml/dispatches", {
    method: "POST",
    headers: { authorization: `Bearer ${env.GH_DISPATCH_TOKEN}`, accept: "application/vnd.github+json", "user-agent": "elevatebox-site" },
    body: JSON.stringify({ ref: "main" }),
  });
  return json({ ok: gh.ok }, gh.ok ? 200 : 502);
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/revalidate" && request.method === "POST") return revalidate(request, env);
    if (url.hostname === "www.elevatebox.in") {
      url.hostname = "elevatebox.in";
      return Response.redirect(url.toString(), 308);
    }
    if (/^\/voice(agents)?(\/|$)/.test(url.pathname)) {
      return Response.redirect("https://agents.elevatebox.in/", 308);
    }
    if (/^\/digitalmarketing\/?$/.test(url.pathname)) {
      return Response.redirect(`${url.origin}/services/digital-marketing`, 308);
    }
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404 || /\.\w+$/.test(url.pathname) || url.pathname === "/") return res;
    const html = new URL(url);
    html.pathname = url.pathname.replace(/\/$/, "") + ".html";
    const page = await env.ASSETS.fetch(new Request(html, request));
    return page.ok ? page : res;
  },
};
