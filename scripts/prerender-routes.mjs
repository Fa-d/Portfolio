// Writes dist/<route>.html for every non-root route so GitHub Pages serves
// /skills, /projects, ... with HTTP 200 (instead of the 404.html SPA fallback),
// each with its own <title>, description, Open Graph tags and canonical URL.
// Runs after `vite build` (see the "build" script in package.json).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { siteUrl, routes } = JSON.parse(
  readFileSync(join(root, "src/app/routeMeta.json"), "utf8"),
);

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Replace exactly one match of `pattern` in `html`, failing loudly otherwise,
// so a change to index.html can't silently ship pages without route metadata.
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, "g")) ?? [];
  if (matches.length !== 1) {
    throw new Error(`prerender-routes: expected 1 match for ${label}, found ${matches.length}`);
  }
  return html.replace(pattern, replacement);
}

function renderPage(template, path, { title, description }) {
  const url = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`, "<title>");
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    "meta description",
  );
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    "og:url",
  );
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    "og:title",
  );
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    "og:description",
  );
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    "canonical",
  );
  return html;
}

const template = readFileSync(join(dist, "index.html"), "utf8");
for (const [path, meta] of Object.entries(routes)) {
  if (path === "/") continue;
  const file = join(dist, `${path.slice(1)}.html`);
  writeFileSync(file, renderPage(template, path, meta));
  console.log(`prerender-routes: wrote dist${path}.html`);
}
