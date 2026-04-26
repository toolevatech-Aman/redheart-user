import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT_SITE_NAME = "RedHeart";
const DEFAULT_SITE_URL = "https://redheart.in";
const DEFAULT_TWITTER_CARD = "summary_large_image";

const normalizeText = (value) => (value || "").toString().trim();

const SEOHead = ({
  productName = "",
  categoryName = "",
  brandName = DEFAULT_SITE_NAME,
  description = "",
  canonicalPath = "",
  ogImage = "",
  robots = "index, follow",
  schemas = [],
}) => {
  const siteUrl = normalizeText(process.env.REACT_APP_SITE_URL) || DEFAULT_SITE_URL;
  const normalizedBrand = normalizeText(brandName) || DEFAULT_SITE_NAME;
  const normalizedProduct = normalizeText(productName);
  const normalizedCategory = normalizeText(categoryName);

  const titleParts = [normalizedProduct, normalizedCategory, normalizedBrand].filter(Boolean);
  const title = titleParts.length ? titleParts.join(" | ") : normalizedBrand;

  const normalizedPath = normalizeText(canonicalPath);
  const canonicalUrl = normalizedPath
    ? `${siteUrl}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`
    : siteUrl;

  const metaDescription =
    normalizeText(description) ||
    `${title} - premium flowers, cakes, plants and gifting collections from ${normalizedBrand}.`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content={DEFAULT_TWITTER_CARD} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      {Array.isArray(schemas)
        ? schemas
            .filter(Boolean)
            .map((schema, index) => (
              <script key={`schema-${index}`} type="application/ld+json">
                {JSON.stringify(schema)}
              </script>
            ))
        : null}
    </Helmet>
  );
};

export default SEOHead;
