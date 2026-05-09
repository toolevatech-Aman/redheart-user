import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCityPage } from "../../service/cityService";
import { getProduct } from "../../service/products";
import ProductCard from "../product/ProductCard";
import logo from "../../assets/RedHeart-Logo-02.png";
import { SUBCATEGORY_SLUG_FILTERS, resolveFiltersFromUrl } from "../../utils/urlTaxonomy";
import { getProductUrl, URL_TO_CATEGORY_MAP } from "../../utils/seoUtils";
import { getDescription } from "../../comman/H1Function/h1Functions";
import { getPageH1 } from "../../utils/urlTaxonomy";

// ── Category config for fallback rendering ─────────────────────────────────
const CATEGORY_META = {
  Flowers: { base: "/florist-near-me", accent: "#e11d48" },
  Cakes:   { base: "/order-cake-online", accent: "#f59e0b" },
  Plants:  { base: "/plants-online", accent: "#16a34a" },
};

// ── Apply meta tags to document head ──────────────────────────────────────
function applyMeta({ title, description, keywords, canonical }) {
  if (title)       document.title = title;
  if (description) {
    let el = document.querySelector('meta[name="description"]');
    if (!el) { el = document.createElement("meta"); el.name = "description"; document.head.appendChild(el); }
    el.setAttribute("content", description);
  }
  if (keywords) {
    let el = document.querySelector('meta[name="keywords"]');
    if (!el) { el = document.createElement("meta"); el.name = "keywords"; document.head.appendChild(el); }
    el.setAttribute("content", keywords);
  }
  if (canonical) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.rel = "canonical"; document.head.appendChild(el); }
    el.setAttribute("href", canonical);
  }
}

// ── Inject FAQ JSON-LD script ──────────────────────────────────────────────
function injectFaqSchema(faqs) {
  const id = "city-faq-schema";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!faqs || faqs.length === 0) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ── Inject BreadcrumbList JSON-LD script ──────────────────────────────────
function injectBreadcrumbSchema(breadcrumb) {
  const id = "city-breadcrumb-schema";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!breadcrumb || breadcrumb.length === 0) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `https://www.redheart.in${crumb.url}`,
    })),
  };
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ── Main component ─────────────────────────────────────────────────────────
const CityLandingPage = ({ category }) => {
  const { citySlug } = useParams();
  const navigate     = useNavigate();

  // State
  const [cityData,       setCityData]       = useState(null);   // city SEO data from DB
  const [cityLoading,    setCityLoading]    = useState(true);   // initial city fetch
  const [products,       setProducts]       = useState([]);
  const [page,           setPage]           = useState(1);
  const [hasMore,        setHasMore]        = useState(true);
  const [prodLoading,    setProdLoading]    = useState(false);
  const [currentImages,  setCurrentImages]  = useState({});
  const [isSubcategory,  setIsSubcategory]  = useState(false);  // true = not a city slug

  // Detect: is this a known subcategory slug, or a city slug?
  useEffect(() => {
    const isSubcat = Boolean(SUBCATEGORY_SLUG_FILTERS?.[citySlug]);
    setIsSubcategory(isSubcat);

    if (isSubcat) {
      // Subcategory — no need to hit city API
      setCityLoading(false);
      return;
    }

    // Try to load city data from API
    setCityLoading(true);
    getCityPage(category, citySlug)
      .then((data) => {
        setCityData(data);
        if (data) {
          applyMeta({
            title:       data.metaTitle,
            description: data.metaDescription,
            keywords:    data.metaKeyword,
            canonical:   data.canonicalUrl,
          });
          injectBreadcrumbSchema(data.breadcrumb);
          injectFaqSchema(data.faqs);
        }
      })
      .catch(console.error)
      .finally(() => setCityLoading(false));

    // Clean up schemas on unmount
    return () => {
      ["city-faq-schema", "city-breadcrumb-schema"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [category, citySlug]);

  // ── Fetch products ────────────────────────────────────────────────────────
  const fetchProducts = useCallback(
    async (pageNo) => {
      if (prodLoading) return;
      setProdLoading(true);
      try {
        // Build payload — subcategory mode uses taxonomy filters; city mode uses available_cities
        const subcatFilters = isSubcategory ? (SUBCATEGORY_SLUG_FILTERS[citySlug] || {}) : {};
        const payload = {
          category_name:    category,
          subcategory_name: subcatFilters.subcategory_name?.join(",") || "",
          occasion_tags:    subcatFilters.occasion_tags?.join(",")    || "",
          festival_tags:    subcatFilters.festival_tags?.join(",")    || "",
          type:             subcatFilters.type?.join(",")             || "",
          relationship:     subcatFilters.relationship?.join(",")     || "",
          color:            subcatFilters.color?.join(",")            || "",
          available_cities: !isSubcategory ? (cityData?.cityName || "") : "",
          page:             pageNo,
          limit:            12,
        };
        const res = await getProduct(payload);
        setProducts((prev) => pageNo === 1 ? res.products : [...prev, ...res.products]);
        setHasMore(pageNo < res.totalPages);
      } catch (err) {
        console.error("CityLandingPage fetchProducts:", err);
      } finally {
        setProdLoading(false);
      }
    },
    [category, cityData, isSubcategory, citySlug, prodLoading]
  );

  // Initial product load — wait until cityData is resolved
  useEffect(() => {
    if (cityLoading) return;
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [cityLoading, cityData]);

  // Pagination
  useEffect(() => {
    if (page > 1) fetchProducts(page);
  }, [page]);

  const calculateDiscount = (original, selling) =>
    original > selling ? Math.round(((original - selling) / original) * 100) : 0;

  const handleProductClick = (slug, id, product) => {
    const stored   = JSON.parse(localStorage.getItem("recentProducts")) || [];
    const filtered = stored.filter((p) => p._id !== product._id);
    filtered.unshift(product);
    if (filtered.length > 8) filtered.pop();
    localStorage.setItem("recentProducts", JSON.stringify(filtered));
    const url = getProductUrl(category, slug, product.sku || product.product_id || "");
    navigate(url, { state: { id } });
  };

  const selectImage = (productId, index) =>
    setCurrentImages((prev) => ({ ...prev, [productId]: index }));

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (cityLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Derive the category base URL slug (e.g. "florist-near-me")
  const categoryBaseSlug = CATEGORY_META[category]?.base?.replace("/", "") || "";

  // ── Breadcrumb ─────────────────────────────────────────────────────────────
  const breadcrumbs = cityData?.breadcrumb || [
    { label: "Home", url: "/" },
    { label: category, url: `/${categoryBaseSlug}` },
    ...(citySlug ? [{ label: citySlug.replace(/-/g, " "), url: `/${categoryBaseSlug}/${citySlug}` }] : []),
  ];

  // ── H1 ─────────────────────────────────────────────────────────────────────
  const h1Text = cityData?.h1
    || getPageH1(categoryBaseSlug, citySlug)
    || getDescription(category)
    || `${category} Delivery`;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header: H1 + Breadcrumb ───────────────────────────────────── */}
      <div className="border-b px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">{h1Text}</h1>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <li>
                      <a href={crumb.url} className="hover:text-gray-700 transition">
                        {crumb.label}
                      </a>
                    </li>
                    <li className="text-gray-400">/</li>
                  </>
                ) : (
                  <li className="text-gray-900 font-medium">{crumb.label}</li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {/* ── Product grid ───────────────────────────────────────────────────── */}
      {products.length === 0 && !prodLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img src={logo} alt="No products" className="w-32 h-32 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Oops! No products found.</h2>
          <p className="text-gray-500 mt-2">
            We're working hard to fill this page. Check back soon!
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

      {/* ── SEO Footer Content (from DB) ────────────────────────────────────── */}
      {cityData?.footerContent && (
        <div className="px-4 py-10 max-w-4xl mx-auto border-t border-gray-100 mt-6">
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: cityData.footerContent }}
          />
        </div>
      )}

      {/* ── FAQ Section ─────────────────────────────────────────────────────── */}
      {cityData?.faqs && cityData.faqs.length > 0 && (
        <div className="px-4 py-8 border-t border-gray-100 max-w-3xl ml-4 md:ml-16 lg:ml-24">
          <div className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</div>
          <div className="space-y-4">
            {cityData.faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-4 group">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-3">
                  <h2 className="font-medium text-gray-800 text-base m-0">{faq.question}</h2>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▾</span>
                </summary>
                <h3 className="mt-3 text-gray-600 text-sm leading-relaxed font-normal">{faq.answer}</h3>
              </details>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CityLandingPage;
