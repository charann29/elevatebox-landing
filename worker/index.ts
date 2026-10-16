// Serves the exported site. Beyond static files: www → apex, /voice → the Voice
// product app, and /x → x.html when a same-named folder (Next's RSC .txt files) shadows it.
export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }) {
    const url = new URL(request.url);
    if (url.hostname === "www.elevatebox.in") {
      url.hostname = "elevatebox.in";
      return Response.redirect(url.toString(), 308);
    }
    if (/^\/voice(\/|$)/.test(url.pathname)) {
      return Response.redirect("https://agents.elevatebox.in/", 308);
    }
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404 || /\.\w+$/.test(url.pathname) || url.pathname === "/") return res;
    const html = new URL(url);
    html.pathname = url.pathname.replace(/\/$/, "") + ".html";
    const page = await env.ASSETS.fetch(new Request(html, request));
    return page.ok ? page : res;
  },
};
