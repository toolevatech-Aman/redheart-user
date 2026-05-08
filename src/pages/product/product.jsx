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

const TOP_LEVEL_CATEGORIES = ["Flowers", "Cakes", "Plants", "Combos"];

/**
 * Resolve the actual category name from either:
 * - A new SEO slug (e.g. "order-cake-online" → "Cakes")
 * - A subcategory slug from /:categorySlug/:subcategorySlug route
 * - Or just pass through the value if it's already a known category name
 */
const resolveCategory = (categorySlug, subcategorySlug) => {
  // First try the SEO map
  const fromMap = getCategoryFromUrl(categorySlug);
  if (fromMap) return fromMap;

  // Check if it's already a known top-level category name (legacy support)
  if (TOP_LEVEL_CATEGORIES.includes(categorySlug)) return categorySlug;

  // If we have a subcategorySlug, the categorySlug is a generic slug
  // Try to match it against known category slugs
  // e.g. "husband" → relationship filter, not a top-level category
  return categorySlug; // return as-is; buildInitialFilters will handle it
};

const buildInitialFilters = (filterData, routeCategory) => {
  const baseFilters = {
    category_name: '',
    subcategory_name: [],
    festival_tags: [],
    occasion_tags: [],
    special_occasion_tags: [],
    type: [],
    relationship: [],
    color: [],
  };

  // If route param is a top-level category (e.g. "Cakes"), filter by category_name
  if (!filterData && routeCategory && TOP_LEVEL_CATEGORIES.includes(routeCategory)) {
    return { ...baseFilters, category_name: routeCategory };
  }

  // If route param is an occasion (e.g. "Birthday")
  if (!filterData && routeCategory && OccasionFilters.includes(routeCategory)) {
    return { ...baseFilters, occasion_tags: [routeCategory] };
  }

  // If route param is a special occasion (e.g. "Valentine's Day")
  if (!filterData && routeCategory && SpecialOccasionFilters.includes(routeCategory)) {
    return { ...baseFilters, special_occasion_tags: [routeCategory] };
  }

  // If route param is a festival (e.g. "Rakhi")
  if (!filterData && routeCategory && FestivalFilters.includes(routeCategory)) {
    return { ...baseFilters, festival_tags: [routeCategory] };
  }

  // If route param is a subcategory (e.g. "Roses")
  if (!filterData && routeCategory && SubCategoryFilters.includes(routeCategory)) {
    return { ...baseFilters, subcategory_name: [routeCategory] };
  }

  if (!filterData) return baseFilters;

  const { payloadKey, value } = filterData;

  return {
    ...baseFilters,
    [payloadKey]: [value],
  };
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
      filters[payloadKey] = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
  });

  return filters;
};

const Product = () => {
  const location = useLocation();
  const { categorySlug, subcategorySlug } = useParams();
  const navigate = useNavigate();

  // ── Resolve actual category name from the SEO slug ──
  // e.g. "order-cake-online" → "Cakes", "birthday-gifts-delivery" → "Birthday"
  const actualCategory = resolveCategory(categorySlug, subcategorySlug);

  // For query-param based category override (legacy search support)
  const categoryFromQuery = new URLSearchParams(location.search).get("category");

  // currentCategory: what we pass to the API / display logic
  const currentCategory = categoryFromQuery || actualCategory || "";

  const searchFilters = buildFiltersFromSearch(location.search);
  const filterFromCategory = getPayloadKeyByItemName(currentCategory);

  /* ===================== STATES ===================== */
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [currentImages, setCurrentImages] = useState({});

  const initialFilters = {
    category_name: '',
    subcategory_name: [],
    festival_tags: [],
    occasion_tags: [],
    special_occasion_tags: [],
    type: [],
    relationship: [],
    color: [],
  };

  const [selectedFilters, setSelectedFilters] = useState(() => {
    if (location.search) return searchFilters;
    // If we have a subcategorySlug, try to apply it as a subcategory filter
    if (subcategorySlug) {
      // Convert slug back to possible subcategory name by matching against known filters
      const subSlugLower = subcategorySlug.toLowerCase();
      const matchedSub = SubCategoryFilters.find(
        (s) => toSlug(s) === subSlugLower || s.toLowerCase() === subSlugLower
      );
      if (matchedSub) {
        return {
          ...initialFilters,
          category_name: TOP_LEVEL_CATEGORIES.includes(actualCategory) ? actualCategory : '',
          subcategory_name: [matchedSub],
        };
      }
    }
    return buildInitialFilters(filterFromCategory, currentCategory);
  });

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

      setProducts(prev => pageNo === 1 ? newProducts : [...prev, ...newProducts]);
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
    const freshFilterFromCategory = getPayloadKeyByItemName(currentCategory);
    if (location.search) {
      setSelectedFilters(buildFiltersFromSearch(location.search));
    } else if (subcategorySlug) {
      const subSlugLower = subcategorySlug.toLowerCase();
      const matchedSub = SubCategoryFilters.find(
        (s) => toSlug(s) === subSlugLower || s.toLowerCase() === subSlugLower
      );
      if (matchedSub) {
        setSelectedFilters({
          ...initialFilters,
          category_name: TOP_LEVEL_CATEGORIES.includes(actualCategory) ? actualCategory : '',
          subcategory_name: [matchedSub],
        });
      } else {
        setSelectedFilters(buildInitialFilters(freshFilterFromCategory, currentCategory));
      }
    } else {
      setSelectedFilters(buildInitialFilters(freshFilterFromCategory, currentCategory));
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
        <h1 className="text-2xl capitalize">{getDescription(currentCategory)}</h1>
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <a href="/" className="hover:text-gray-700 transition">Home</a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{currentCategory}</li>
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
    </div>
  );
};

export default Product;
