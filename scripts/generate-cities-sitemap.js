#!/usr/bin/env node
/**
 * Generates public/sitemap_cities.xml by fetching all active city pages from the API.
 * Run: node scripts/generate-cities-sitemap.js
 * Integrated into CI: runs before `npm run build` in deploy.yml
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

const API_BASE  = 'https://backend.redheart.in/api';
const SITE_BASE = 'https://www.redheart.in';
const OUT_FILE  = path.join(__dirname, '../public/sitemap_cities.xml');

const CATEGORIES = ['Flowers', 'Cakes', 'Plants'];

// Category → SEO URL base
const CATEGORY_BASE = {
  Flowers: '/florist-near-me',
  Cakes:   '/order-cake-online',
  Plants:  '/plants-online',
};

const fmtDate = (d) => new Date(d || Date.now()).toISOString().split('T')[0];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

async function fetchCities(category) {
  const url = `${API_BASE}/city/public/${category}`;
  console.log(`  Fetching ${category} cities from ${url}`);
  try {
    const res = await get(url);
    // API returns array directly or wrapped in { data: [] }
    const arr = Array.isArray(res) ? res : (res.data || []);
    console.log(`  → ${arr.length} ${category} cities`);
    return arr;
  } catch (err) {
    console.error(`  ✗ Failed to fetch ${category} cities:`, err.message);
    return [];
  }
}

async function main() {
  console.log('Generating sitemap_cities.xml...\n');

  const allUrls = [];

  for (const category of CATEGORIES) {
    const cities = await fetchCities(category);
    const base   = CATEGORY_BASE[category];

    for (const city of cities) {
      if (!city.url) continue;
      // city.url is the full path e.g. "/florist-near-me/delhi"
      // Use it directly, or build from base + slug
      const slug = city.url.split('/').pop();
      const loc  = `${SITE_BASE}${base}/${slug}`;

      allUrls.push({
        loc,
        lastmod:    fmtDate(city.updatedAt),
        changefreq: 'monthly',
        priority:   '0.8',
      });
    }
  }

  console.log(`\nTotal city URLs: ${allUrls.length}`);

  const entries = allUrls
    .map(({ loc, lastmod, changefreq, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`\n✓ Written to ${OUT_FILE}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
