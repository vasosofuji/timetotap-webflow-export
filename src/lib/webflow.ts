// Pages migrated 1:1 from Webflow. Each file in src/webflow/pages is the exact HTML
// Webflow published for that URL (assets self-hosted under public/wf). They are
// served verbatim from the server so Webflow's CSS, interactions (webflow.js) and
// per-page <head> tags behave exactly as on Webflow — no React rendering involved.
const files = import.meta.glob("../webflow/pages/**/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const pages = new Map<string, string>();
for (const [file, html] of Object.entries(files)) {
  const path = file.slice("../webflow/pages".length, -".html".length);
  pages.set(path === "/index" ? "/" : path, html);
}

const HTML_HEADERS = { "content-type": "text/html; charset=utf-8" };

export function webflowPage(request: Request): Response {
  let path = new URL(request.url).pathname;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  try {
    path = decodeURIComponent(path);
  } catch {
    // malformed escape: fall through to 404
  }
  const html = pages.get(path);
  if (html) return new Response(html, { headers: HTML_HEADERS });
  return new Response(pages.get("/404") ?? "Not Found", { status: 404, headers: HTML_HEADERS });
}
