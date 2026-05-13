/**
 * post-build.js
 * Runs after `react-scripts build` to apply two performance optimisations:
 *
 * 1. INLINE CSS — eliminates the HTML→CSS network dependency chain.
 *    The main CSS is injected as a <style> block so no separate request is needed.
 *
 * 2. LCP PRELOAD — eliminates the 2,500ms+ resource load delay on the LCP image.
 *    Finds the hashed buildhamper.webp filename in the build output and injects
 *    <link rel="preload" as="image" fetchpriority="high"> into <head> so the
 *    browser fetches the LCP image immediately on HTML parse — before JS runs.
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const htmlPath = path.join(__dirname, "../build/index.html");
const cssDir  = path.join(__dirname, "../build/static/css");
const mediaDir = path.join(__dirname, "../build/static/media");

let html = fs.readFileSync(htmlPath, "utf8");

// ─── 1. INLINE CSS ────────────────────────────────────────────────────────────
const cssLinkRegex = /<link href="(\/static\/css\/main\.[a-f0-9]+\.css)" rel="stylesheet">/;
const cssMatch = cssLinkRegex.exec(html);

if (!cssMatch) {
  console.warn("[post-build] No main CSS link found — skipping CSS inline.");
} else {
  const cssHref     = cssMatch[1];
  const cssFilePath = path.join(cssDir, path.basename(cssHref));

  if (!fs.existsSync(cssFilePath)) {
    console.error(`[post-build] CSS file not found: ${cssFilePath}`);
    process.exit(1);
  }

  const cssContent = fs.readFileSync(cssFilePath, "utf8");
  html = html.replace(cssMatch[0], `<style>${cssContent}</style>`);

  const kb = (cssContent.length / 1024).toFixed(1);
  console.log(`[post-build] CSS inlined (${kb} KB)`);
}

// ─── 2. LCP IMAGE PRELOAD ─────────────────────────────────────────────────────
// Find the hashed buildhamper filename — it changes whenever the image is updated.
const hamperFiles = fs.readdirSync(mediaDir).filter(
  (f) => f.startsWith("buildhamper.") && f.endsWith(".webp")
);

if (hamperFiles.length === 0) {
  console.warn("[post-build] buildhamper.webp not found in build/static/media — skipping LCP preload.");
} else {
  const hamperHref = `/static/media/${hamperFiles[0]}`;

  // Inject the preload as the very first <link> in <head> so the browser
  // discovers it at the earliest possible moment.
  const preloadTag = `<link rel="preload" as="image" href="${hamperHref}" fetchpriority="high">`;

  // Insert right after <head> open tag (before any other resource hints)
  html = html.replace("<head>", `<head>${preloadTag}`);

  console.log(`[post-build] LCP preload injected: ${hamperHref}`);
}

// ─── WRITE ────────────────────────────────────────────────────────────────────
fs.writeFileSync(htmlPath, html, "utf8");
console.log("[post-build] Done.");
