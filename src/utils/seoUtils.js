/**
 * SEO URL utilities for Redheart
 * Handles conversion between human-readable category names and SEO-friendly URL slugs
 */

// Primary SEO slug map: internal category name → SEO URL slug
export const CATEGORY_URL_MAP = {
  'Flowers':     'flowers',
  'Cakes':       'cakes',
  'Plants':      'plants',
  'Combos':      'combos-online',
  'Hampers':     'gift-hampers',
  'Birthday':    'birthday-gifts-delivery',
  'Anniversary': 'anniversary-gifts-delivery',
  'Wedding':     'wedding-gifts-online',
};

// Reverse map: SEO URL slug → internal category name (for API calls)
export const URL_TO_CATEGORY_MAP = Object.entries(CATEGORY_URL_MAP).reduce(
  (acc, [cat, slug]) => ({ ...acc, [slug]: cat }),
  {}
);

/**
 * Convert any string to a clean URL slug
 * - Lowercase
 * - Remove non-ASCII / UTF garbage chars
 * - Replace spaces → hyphens
 * - Collapse -- → -
 * - Trim leading/trailing hyphens
 */
export const toSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, '')    // remove non-ASCII
    .replace(/[^a-z0-9\s-]/g, '')    // remove non-alphanumeric except spaces & hyphens
    .replace(/\s+/g, '-')             // spaces → hyphens
    .replace(/-{2,}/g, '-')           // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');         // trim leading/trailing hyphens
};

/**
 * Get the SEO URL for a top-level category
 * e.g. getCategoryUrl('Flowers') → '/florist-near-me'
 * e.g. getCategoryUrl('Husband') → '/husband' (toSlug fallback)
 */
export const getCategoryUrl = (category) => {
  if (!category) return '/';
  const mapped = CATEGORY_URL_MAP[category];
  if (mapped) return `/${mapped}`;
  return `/${toSlug(category)}`;
};

/**
 * Get subcategory URL with deduplication of category word
 * e.g. getSubcategoryUrl('Cakes', 'Butterscotch Cakes') → '/order-cake-online/butterscotch'
 * e.g. getSubcategoryUrl('Flowers', 'Roses') → '/florist-near-me/roses'
 */
export const getSubcategoryUrl = (category, subcategory) => {
  const categorySlug = CATEGORY_URL_MAP[category] || toSlug(category);
  // Strip the category word from the subcategory if present
  const categoryWord = toSlug(category);
  let subSlug = toSlug(subcategory);
  // Remove trailing category word (e.g. "butterscotch-cakes" → "butterscotch")
  const suffix = `-${categoryWord}`;
  if (subSlug.endsWith(suffix)) {
    subSlug = subSlug.slice(0, -suffix.length);
  }
  // Also handle case where subcategory IS the category word (e.g. "cakes" → "")
  if (subSlug === categoryWord) {
    subSlug = '';
  }
  if (!subSlug) return `/${categorySlug}`;
  return `/${categorySlug}/${subSlug}`;
};

/**
 * Get the full product URL
 * e.g. getProductUrl('Cakes', 'white-rosette-black-forest-cake', '100001ca')
 *      → '/p/order-cake-online/white-rosette-black-forest-cake-100001ca'
 */
export const getProductUrl = (category, productSlug, sku) => {
  const categorySlug = CATEGORY_URL_MAP[category] || toSlug(category);
  const slug = toSlug(productSlug);
  const skuPart = sku ? `-${toSlug(String(sku))}` : '';
  return `/p/${categorySlug}/${slug}${skuPart}`;
};

/**
 * Resolve actual category name from a URL slug (for API calls)
 * e.g. getCategoryFromUrl('order-cake-online') → 'Cakes'
 * e.g. getCategoryFromUrl('birthday-gifts-delivery') → 'Birthday'
 * Returns null if not found in the map (caller can use the slug directly)
 */
export const getCategoryFromUrl = (urlSlug) => {
  if (!urlSlug) return null;
  // Direct lookup in reverse map
  if (URL_TO_CATEGORY_MAP[urlSlug]) return URL_TO_CATEGORY_MAP[urlSlug];
  // Try case-insensitive match
  const lower = urlSlug.toLowerCase();
  const found = Object.entries(URL_TO_CATEGORY_MAP).find(
    ([k]) => k.toLowerCase() === lower
  );
  return found ? found[1] : null;
};
