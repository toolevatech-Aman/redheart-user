#!/usr/bin/env node
/**
 * prerender.js — Puppeteer-based static HTML pre-renderer for RedHeart
 *
 * Renders every city page (flowers + cakes + plants) to a static HTML file
 * so Google reads real content instead of <div id="root"></div>.
 *
 * Run after `npm run build`:
 *   node scripts/prerender.js
 *
 * Combined build + prerender:
 *   npm run build:prerender
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');
const { spawn } = require('child_process');

const BUILD_DIR         = path.join(__dirname, '../build');
const PORT              = 5050;
const BASE_LOCAL        = `http://localhost:${PORT}`;
const TIMEOUT_MS        = 45000;   // 45s per page (generous for slow backend)
const CONCURRENCY       = 4;       // tabs open at the same time
const BROWSER_RESTART   = 150;     // restart Chrome every N pages to free memory
const RETRY_ONCE        = true;    // retry a page one time if it fails

const STATIC_PAGES = ['/', '/delivery-cities', '/about', '/contact'];

// ── Helpers ───────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function log(msg)  { console.log(`  ${msg}`); }
function ok(msg)   { console.log(`  ✓ ${msg}`); }
function fail(msg) { console.error(`  ✗ ${msg}`); }

function fetchCities(category) {
  return new Promise(resolve => {
    https.get(`https://backend.redheart.in/api/city/public/${category}`, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const arr  = Array.isArray(json) ? json : (json.data || []);
          resolve(arr.map(c => c.url?.split('/').pop()).filter(Boolean));
        } catch { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

function saveSnapshot(urlPath, html) {
  const parts = urlPath.replace(/^\//, '').split('/').filter(Boolean);
  const dir   = parts.length === 0 ? BUILD_DIR : path.join(BUILD_DIR, ...parts);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

function launchBrowser(puppeteer) {
  return puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security',          // allow API calls from localhost
      '--disable-features=IsolateOrigins,site-per-process',
      `--user-data-dir=/tmp/chrome-prerender-${Date.now()}`,
    ],
  });
}

/** Open one URL in its own tab, capture HTML, close tab. Returns true on success. */
async function renderPage(browser, urlPath) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req =>
    ['image', 'font', 'media'].includes(req.resourceType()) ? req.abort() : req.continue()
  );

  try {
    await page.goto(`${BASE_LOCAL}${urlPath}`, {
      waitUntil: 'networkidle0',
      timeout:   TIMEOUT_MS,
    });
    await sleep(400);

    const hasContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root && root.children.length > 0 && root.innerText.trim().length > 50;
    });

    if (!hasContent) return false;

    saveSnapshot(urlPath, await page.content());
    return true;
  } catch {
    return false;
  } finally {
    await page.close().catch(() => {});
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  RedHeart Prerender — all cities, parallel + auto-restart');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
    console.error('✗ build/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }

  // 1. Fetch all city slugs from backend
  console.log('Fetching all cities from backend API...');
  const [flowerCities, cakeCities, plantCities] = await Promise.all([
    fetchCities('Flowers'),
    fetchCities('Cakes'),
    fetchCities('Plants'),
  ]);
  log(`Flowers: ${flowerCities.length}  Cakes: ${cakeCities.length}  Plants: ${plantCities.length}`);

  // 2. Build full URL list
  const urls = [
    ...STATIC_PAGES,
    ...flowerCities.map(c => `/florist-near-me/${c}`),
    ...cakeCities.map(c => `/order-cake-online/${c}`),
    ...plantCities.map(c => `/plants-online/${c}`),
  ];
  const total = urls.length;
  const estMin = Math.ceil((total / CONCURRENCY) * 7 / 60);
  log(`Total: ${total} pages  |  ${CONCURRENCY} tabs at a time  |  browser restarts every ${BROWSER_RESTART} pages`);
  log(`Estimated time: ~${estMin} min\n`);

  // 3. Start local static server
  console.log('Starting local server...');
  const server = spawn(
    'npx', ['serve', '-s', BUILD_DIR, '-l', String(PORT), '--no-clipboard'],
    { stdio: 'pipe', shell: true }
  );
  await sleep(2500);
  log(`Server ready at ${BASE_LOCAL}`);

  // 4. Load puppeteer
  let puppeteer;
  try { puppeteer = require('puppeteer'); }
  catch {
    fail('puppeteer not found — run: npm install --save-dev puppeteer');
    server.kill(); process.exit(1);
  }

  // 5. Process all URLs
  console.log('\nPrerendering...\n');
  let successCount = 0;
  let failCount    = 0;
  let browser      = await launchBrowser(puppeteer);
  let pagesSince   = 0;   // pages processed since last browser restart

  for (let i = 0; i < total; i += CONCURRENCY) {
    // Restart browser periodically to prevent memory buildup
    if (pagesSince >= BROWSER_RESTART) {
      log(`\nRestarting browser (memory reset after ${pagesSince} pages)...`);
      await browser.close().catch(() => {});
      await sleep(1000);
      browser    = await launchBrowser(puppeteer);
      pagesSince = 0;
      log('Browser restarted ✓\n');
    }

    const batch = urls.slice(i, i + CONCURRENCY);

    const results = await Promise.all(
      batch.map(async (urlPath, j) => {
        const idx   = i + j + 1;
        const label = `[${idx}/${total}] ${urlPath}`;

        let success = await renderPage(browser, urlPath);

        // One retry on failure
        if (!success && RETRY_ONCE) {
          await sleep(1500);
          success = await renderPage(browser, urlPath);
          if (success) {
            ok(`${label}  (retry ok)`);
          } else {
            fail(`${label}`);
          }
        } else if (success) {
          ok(label);
        } else {
          fail(label);
        }

        return success;
      })
    );

    results.forEach(r => r ? successCount++ : failCount++);
    pagesSince += batch.length;
  }

  // 6. Cleanup
  await browser.close().catch(() => {});
  server.kill();

  // 7. Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Done — ${successCount} succeeded, ${failCount} failed out of ${total}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (successCount === 0) process.exit(1);
}

main().catch(e => {
  console.error('\n✗ Prerender crashed:', e.message);
  process.exit(1);
});
