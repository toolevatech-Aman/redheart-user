import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { getProduct } from "../../service/products";
import logo from "../../assets/RedHeart-Logo-02.png";
import {
  SubCategoryFilters,
  FestivalFilters,
  SpecialOccasionFilters,
  OccasionFilters,
  TypeFilters,
  RelationshipFilters,
  ColorFilters,
} from "../../constants/filtersConstant";
import ProductCard from "./ProductCard";
import { getPayloadKeyByItemName } from "../../comman/payload-finder/payload-finder";
import { getDescription } from "../../comman/H1Function/h1Functions";
import {
  getCategoryFromUrl,
  getProductUrl,
  URL_TO_CATEGORY_MAP,
  toSlug,
} from "../../utils/seoUtils";
import { resolveFiltersFromUrl, getPageH1 } from "../../utils/urlTaxonomy";
import { getCategoryPageSeo } from "../../service/categorySeoService";

const TOP_LEVEL_CATEGORIES = ["Flowers", "Cakes", "Plants", "Combos"];

const BASE_URL = "https://www.redheart.in";

const CATEGORY_SCHEMA_CONFIG = {
  "florist-near-me":           { bizType: "Florist", serviceLabel: "Flower Delivery",  categorySlug: "florist-near-me"           },
  "order-cake-online":         { bizType: "Bakery",  serviceLabel: "Cake Delivery",    categorySlug: "order-cake-online"         },
  "plants-online":             { bizType: "Store",   serviceLabel: "Plant Delivery",   categorySlug: "plants-online"             },
  "birthday-gifts-delivery":   { bizType: "Store",   serviceLabel: "Birthday Gifts",   categorySlug: "birthday-gifts-delivery"   },
  "anniversary-gifts-delivery":{ bizType: "Store",   serviceLabel: "Anniversary Gifts",categorySlug: "anniversary-gifts-delivery"},
  "wedding-gifts-online":      { bizType: "Store",   serviceLabel: "Wedding Gifts",    categorySlug: "wedding-gifts-online"      },
  "gift-hampers":              { bizType: "Store",   serviceLabel: "Gift Hampers",     categorySlug: "gift-hampers"              },
};

function injectCategorySchemas({ seo, categorySlug, subcategorySlug = null, products = [] }) {
  const id = "category-all-schemas";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!seo) return;

  const pageKey = subcategorySlug ? `${categorySlug}/${subcategorySlug}` : categorySlug;
  const cfg     = CATEGORY_SCHEMA_CONFIG[categorySlug] || { bizType: "Store", serviceLabel: seo.h1 || categorySlug, categorySlug };
  const pageUrl = `${BASE_URL}${seo.url || "/" + pageKey}`;
  const crumbs  = seo.breadcrumb || [];

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "RedHeart",
      "description": "Premium flowers, cakes & plants delivered same-day to 830+ cities across India.",
      "publisher": { "@id": `${BASE_URL}/#organization` },
      "inLanguage": "en-IN",
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "RedHeart",
      "url": BASE_URL,
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png`, "width": 200, "height": 60 },
      "telephone": "+919275506722",
      "email": "admin@redheart.in",
      "address": { "@type": "PostalAddress", "addressLocality": "Gurugram", "addressRegion": "Haryana", "postalCode": "122001", "addressCountry": "IN" },
      "areaServed": { "@type": "Country", "name": "India" },
      "description": "Same-day delivery of fresh flowers, cakes, and plants to 830+ cities across India.",
      "contactPoint": { "@type": "ContactPoint", "telephone": "+919275506722", "contactType": "customer service", "areaServed": "IN", "availableLanguage": ["English", "Hindi"] },
      "sameAs": ["https://www.instagram.com/redheart.in/", "https://www.linkedin.com/company/redheart"],
    },
    {
      "@type": ["LocalBusiness", cfg.bizType],
      "@id": `${pageUrl}/#localbusiness`,
      "name": `RedHeart - ${cfg.serviceLabel}`,
      "url": pageUrl,
      "description": seo.metaDescription,
      "image": `${BASE_URL}/logo.png`,
      "telephone": "+919275506722",
      "email": "admin@redheart.in",
      "address": { "@type": "PostalAddress", "addressLocality": "Gurugram", "addressRegion": "Haryana", "addressCountry": "IN" },
      "areaServed": { "@type": "Country", "name": "India" },
      "priceRange": "₹399 - ₹5000",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
      "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" },
      "parentOrganization": { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      "name": `Same-Day ${cfg.serviceLabel} Across India`,
      "description": `Order ${cfg.serviceLabel.toLowerCase()} online for same-day & midnight delivery across 830+ cities in India.`,
      "provider": { "@id": `${BASE_URL}/#organization` },
      "serviceType": `${cfg.serviceLabel} Service`,
      "areaServed": { "@type": "Country", "name": "India" },
      "offers": { "@type": "Offer", "priceCurrency": "INR", "price": "399", "description": "Starting price for same-day delivery", "availability": "https://schema.org/InStock" },
      "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" },
    },
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}/#webpage`,
      "url": pageUrl,
      "name": seo.metaTitle,
      "description": seo.metaDescription,
      "isPartOf": { "@id": `${BASE_URL}/#website` },
      "about": { "@id": `${pageUrl}/#localbusiness` },
      "breadcrumb": { "@id": `${pageUrl}/#breadcrumb` },
      "inLanguage": "en-IN",
      "potentialAction": { "@type": "SearchAction", "target": `${BASE_URL}/search?q={search_term_string}`, "query-input": "required name=search_term_string" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}/#breadcrumb`,
      "itemListElement": crumbs.map((crumb, i) => ({ "@type": "ListItem", "position": i + 1, "name": crumb.label, "item": `${BASE_URL}${crumb.url}` })),
    },
  ];

  if (seo.faqs?.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faqpage`,
      "mainEntity": seo.faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    });
  }

  if (products.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${pageUrl}/#itemlist`,
      "name": seo.h1,
      "numberOfItems": products.length,
      "itemListElement": products.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": p.product_name || p.name || "",
        "url": `${BASE_URL}/p/${cfg.categorySlug}/${p.slug || ""}-${p.product_id || p.sku || ""}`,
        "image": p.images?.[0] || undefined,
      })).filter(item => item.name),
    });
  }

  graph.push({
    "@type": "OfferShippingDetails",
    "@id": `${pageUrl}/#shipping`,
    "shippingRate": { "@type": "PriceSpecification", "priceCurrency": "INR", "price": "49" },
    "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "IN" },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 2, "unitCode": "HUR" },
      "transitTime":  { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 4, "unitCode": "HUR" },
    },
  });

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  document.head.appendChild(script);
}

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="py-3 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium text-gray-800 text-left">{question}</h2>
        <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 ml-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <h3 className="mt-2 text-gray-600 text-sm font-normal leading-relaxed text-left">{answer}</h3>}
    </div>
  );
};

const buildFiltersFromSearch = (searchString) => {
  const params = new URLSearchParams(searchString);
  const filters = {
    category_name: params.get("category") || "",
    subcategory_name: [],
    festival_tags: [],
    occasion_tags: [],
    special_occasion_tags: [],
    type: [],
    relationship: [],
    color: [],
  };
  const map = {
    subcategory: "subcategory_name",
    festival: "festival_tags",
    occasion: "occasion_tags",
    special_occasion: "special_occasion_tags",
    type: "type",
    relationship: "relationship",
    color: "color",
  };
  Object.entries(map).forEach(([searchKey, payloadKey]) => {
    const value = params.get(searchKey);
    if (value) {
      filters[payloadKey] = value.split(",").map(v => v.trim()).filter(Boolean);
    }
  });
  return filters;
};

const Product = () => {
  const location = useLocation();
  const { categorySlug, subcategorySlug } = useParams();
  const navigate = useNavigate();

  // Resolve filters from URL using taxonomy (intersection logic)
  const urlFilters = resolveFiltersFromUrl(categorySlug, subcategorySlug);
  const categoryFromQuery = new URLSearchParams(location.search).get("category");
  const currentCategory =
    categoryFromQuery ||
    urlFilters.category_name ||
    (urlFilters.occasion_tags?.[0]) ||
    (urlFilters.festival_tags?.[0]) ||
    categorySlug ||
    "";

  /* ===================== STATES ===================== */
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [currentImages, setCurrentImages] = useState({});

  const [selectedFilters, setSelectedFilters] = useState(() => {
    if (location.search) return buildFiltersFromSearch(location.search);
    return urlFilters;
  });

  const [pageSeo, setPageSeo] = useState(null);

  /* ===================== SEO FETCH ===================== */
  useEffect(() => {
    const pageKey = subcategorySlug
      ? `${categorySlug}/${subcategorySlug}`
      : categorySlug;
    if (!pageKey) return;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setCanonical = (href) => {
      let el = document.querySelector('link[rel="canonical"]');
      if (!el) { el = document.createElement("link"); el.rel = "canonical"; document.head.appendChild(el); }
      el.setAttribute("href", href);
    };

    getCategoryPageSeo(pageKey).then((raw) => {
      // Backend wildcard truncates path — reject if returned data is for a parent/different page
      const seo = raw && raw.pageKey === pageKey ? raw : null;
      setPageSeo(seo);

      if (seo) {
        if (seo.metaTitle)       document.title = seo.metaTitle;
        if (seo.metaDescription) setMeta("description", seo.metaDescription);
        if (seo.metaKeyword)     setMeta("keywords", seo.metaKeyword);
        setCanonical(seo.canonicalUrl || `${BASE_URL}/${pageKey}`);
        injectCategorySchemas({ seo, categorySlug, subcategorySlug });
      } else if (subcategorySlug) {
        const label    = subcategorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const catLabel = categorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        document.title = `${label} ${catLabel} | RedHeart`;
        setMeta("description", `Order ${label} online with same-day & midnight delivery across India. Best ${label} gifts from ₹399 — shop on RedHeart.`);
        setCanonical(`${BASE_URL}/${pageKey}`);

        // Inject BreadcrumbList schema for subcategory pages with no CMS entry
        const schemaId = "subcat-breadcrumb-schema";
        const existing = document.getElementById(schemaId);
        if (existing) existing.remove();
        const el = document.createElement("script");
        el.id = schemaId;
        el.type = "application/ld+json";
        el.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": catLabel,  "item": `${BASE_URL}/${categorySlug}` },
            { "@type": "ListItem", "position": 3, "name": label,     "item": `${BASE_URL}/${pageKey}` },
          ]
        });
        document.head.appendChild(el);
      }
    });

    return () => {
      ["category-all-schemas", "subcat-breadcrumb-schema"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [categorySlug, subcategorySlug]);

  /* ===================== API ===================== */
  const fetchProducts = async (pageNo) => {
    if (loading) return;
    setLoading(true);

    const basePayload = {
      subcategory_name: selectedFilters.subcategory_name.join(","),
      festival_tags: selectedFilters.festival_tags.join(","),
      occasion_tags: [
        ...selectedFilters.occasion_tags,
        ...selectedFilters.special_occasion_tags,
      ].join(","),
      type: selectedFilters.type.join(","),
      relationship: selectedFilters.relationship.join(","),
      color: selectedFilters.color.join(","),
    };

    const isMixed = !selectedFilters.category_name;

    try {
      let newProducts = [];
      let moreAvailable = false;

      if (isMixed) {
        // Fetch 4 from each category in parallel so every load has a mix
        const [rFlowers, rCakes, rPlants] = await Promise.all([
          getProduct({ ...basePayload, category_name: "Flowers", page: pageNo, limit: 4 }),
          getProduct({ ...basePayload, category_name: "Cakes",   page: pageNo, limit: 4 }),
          getProduct({ ...basePayload, category_name: "Plants",  page: pageNo, limit: 4 }),
        ]);

        // Interleave: F, C, P, F, C, P ...
        const buckets = [rFlowers.products, rCakes.products, rPlants.products];
        const maxLen = Math.max(...buckets.map(b => b.length));
        for (let i = 0; i < maxLen; i++) {
          buckets.forEach(b => { if (b[i]) newProducts.push(b[i]); });
        }

        moreAvailable =
          pageNo < rFlowers.totalPages ||
          pageNo < rCakes.totalPages  ||
          pageNo < rPlants.totalPages;
      } else {
        const payload = { ...basePayload, category_name: selectedFilters.category_name, page: pageNo, limit: 12 };
        const res = await getProduct(payload);
        newProducts = res.products;
        moreAvailable = pageNo < res.totalPages;
      }

      setProducts(prev => {
        const updated = pageNo === 1 ? newProducts : [...prev, ...newProducts];
        // Re-inject schemas with ItemList once first page loads
        if (pageNo === 1) {
          setPageSeo(seo => { if (seo) injectCategorySchemas({ seo, categorySlug, subcategorySlug, products: updated }); return seo; });
        }
        return updated;
      });
      setHasMore(moreAvailable);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== INITIAL + FILTER RESET ===================== */
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [currentCategory, selectedFilters]);

  useEffect(() => {
    if (location.search) {
      setSelectedFilters(buildFiltersFromSearch(location.search));
    } else {
      setSelectedFilters(resolveFiltersFromUrl(categorySlug, subcategorySlug));
    }
  }, [categorySlug, subcategorySlug, location.search]);

  /* ===================== PAGE CHANGE ===================== */
  useEffect(() => {
    if (page > 1) fetchProducts(page);
  }, [page]);

  /* ===================== HELPERS ===================== */
  const toggleFilter = (key, value) => {
    setSelectedFilters((prev) => {
      const current = prev[key];
      return current.includes(value)
        ? { ...prev, [key]: current.filter((v) => v !== value) }
        : { ...prev, [key]: [...current, value] };
    });
  };

  const handleProductClick = (slug, id, product) => {
    // Save product in localStorage for Recently Viewed
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
    const filtered = stored.filter((p) => p._id !== product._id);
    filtered.unshift(product);
    if (filtered.length > 8) filtered.pop();
    localStorage.setItem("recentProducts", JSON.stringify(filtered));

    // Build new SEO product URL
    const productCategory = product.categorization?.category_name || currentCategory;
    const sku = product.sku || product.product_id || '';
    const url = getProductUrl(productCategory, slug, sku);
    navigate(url, { state: { id } });
  };

  const calculateDiscount = (original, selling) =>
    original > selling ? Math.round(((original - selling) / original) * 100) : 0;

  const selectImage = (productId, index) => {
    setCurrentImages((prev) => ({ ...prev, [productId]: index }));
  };

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b p-4 flex justify-between">
        <h1 className="text-2xl capitalize">
          {pageSeo?.h1 || getPageH1(categorySlug, subcategorySlug) || getDescription(currentCategory)}
        </h1>
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><a href="/" className="hover:text-gray-700 transition">Home</a></li>
            <li className="text-gray-400">/</li>
            {subcategorySlug ? (
              <>
                <li><a href={`/${categorySlug}`} className="hover:text-gray-700 transition capitalize">{categorySlug.replace(/-/g, " ")}</a></li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium capitalize">{subcategorySlug.replace(/-/g, " ")}</li>
              </>
            ) : (
              <li className="text-gray-900 font-medium">{currentCategory}</li>
            )}
          </ol>
        </nav>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-80 bg-white p-6 overflow-y-auto relative">
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {[
              { title: "Subcategories", key: "subcategory_name", options: SubCategoryFilters },
              { title: "Festival", key: "festival_tags", options: FestivalFilters },
              { title: "Occasion", key: "occasion_tags", options: OccasionFilters },
              { title: "Special Occasion", key: "special_occasion_tags", options: SpecialOccasionFilters },
              { title: "Type", key: "type", options: TypeFilters },
              { title: "Relationship", key: "relationship", options: RelationshipFilters },
              { title: "Color", key: "color", options: ColorFilters },
            ].map((f) => (
              <div key={f.key} className="mb-4">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedFilters((p) => ({ ...p, [f.key]: !p[f.key] }))
                  }
                >
                  {f.title}
                  {expandedFilters[f.key] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedFilters[f.key] &&
                  f.options.map((opt) => (
                    <label key={opt} className="flex gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={selectedFilters[f.key].includes(opt)}
                        onChange={() => toggleFilter(f.key, opt)}
                      />
                      {opt}
                    </label>
                  ))}
              </div>
            ))}

            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-rose-600 text-white py-2 mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src={logo}
            alt="No products"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">
            Oops! No products found.
          </h2>
          <p className="text-gray-500 mt-2">
            We're working hard to fill this category. Check back soon or try another filter!
          </p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          scrollThreshold="50%"
          loader={
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6 p-4">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                currentImageIndex={currentImages[p._id] || 0}
                selectImage={selectImage}
                handleProductClick={(slug, id) => handleProductClick(slug, id, p)}
                calculateDiscount={calculateDiscount}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* SEO Footer Content */}
      {pageSeo?.footerContent && (
        <div
          className="max-w-5xl mx-auto px-4 py-10 prose prose-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: pageSeo.footerContent }}
        />
      )}

      {/* FAQ Section */}
      {pageSeo?.faqs?.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pb-10 ml-4">
          <p className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</p>
          <div className="divide-y divide-gray-200">
            {pageSeo.faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
