#!/usr/bin/env node
/**
 * Generates public/product1_sitemap.xml by fetching all products from the API.
 * Run: node scripts/generate-product-sitemap.js
 * Integrated into CI: runs before `npm run build` in deploy.yml
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE   = 'https://backend.redheart.in/api';
const SITE_BASE  = 'https://www.redheart.in';
const OUT_FILE   = path.join(__dirname, '../public/product1_sitemap.xml');
const BATCH_SIZE = 100;

// Must mirror PRODUCT_CATEGORY_SLUG_MAP in src/utils/seoUtils.js
const PRODUCT_CATEGORY_SLUG_MAP = {
  Flowers: 'flowers',
  Cakes:   'cakes',
  Plants:  'plants',
};

const toSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
};

const getProductUrl = (categoryName, slug, sku) => {
  const catSlug = PRODUCT_CATEGORY_SLUG_MAP[categoryName] || toSlug(categoryName);
  const skuPart = sku ? `-${toSlug(String(sku))}` : '';
  return `/p/${catSlug}/${toSlug(slug)}${skuPart}`;
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function fetchAllProducts() {
  // First call to find total count
  const first = await fetchJson(`${API_BASE}/products?limit=${BATCH_SIZE}&page=1`);
  const total = first.total || 0;
  const totalPages = Math.ceil(total / BATCH_SIZE);
  console.log(`Fetching ${total} products across ${totalPages} pages...`);

  const all = [...(first.products || [])];

  for (let page = 2; page <= totalPages; page++) {
    const res = await fetchJson(`${API_BASE}/products?limit=${BATCH_SIZE}&page=${page}`);
    all.push(...(res.products || []));
  }

  console.log(`Fetched ${all.length} products.`);
  return all;
}

async function main() {
  const products = await fetchAllProducts();
  const today = new Date().toISOString().split('T')[0];

  const urls = products
    .filter(p => p.slug && p.categorization?.category_name)
    .map(p => {
      const url = getProductUrl(p.categorization.category_name, p.slug, p.sku);
      return `  <url>\n    <loc>${SITE_BASE}${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join('\n')}

</urlset>`;

  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`Wrote ${urls.length} URLs to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
