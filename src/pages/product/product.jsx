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
const TOP_LEVEL_CATEGORIES = ["Flowers", "Cakes", "Plants", "Combos"];

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

  // If route param is a top-level category (e.g. /product/Cakes), filter by category_name
  if (!filterData && routeCategory && TOP_LEVEL_CATEGORIES.includes(routeCategory)) {
    return { ...baseFilters, category_name: routeCategory };
  }

  // If route param is an occasion (e.g. /product/Birthday)
  if (!filterData && routeCategory && OccasionFilters.includes(routeCategory)) {
    return { ...baseFilters, occasion_tags: [routeCategory] };
  }

  // If route param is a special occasion (e.g. /product/Valentine's Day)
  if (!filterData && routeCategory && SpecialOccasionFilters.includes(routeCategory)) {
    return { ...baseFilters, special_occasion_tags: [routeCategory] };
  }

  // If route param is a festival (e.g. /product/Rakhi)
  if (!filterData && routeCategory && FestivalFilters.includes(routeCategory)) {
    return { ...baseFilters, festival_tags: [routeCategory] };
  }

  // If route param is a subcategory (e.g. /product/Roses)
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
  const { category } = useParams();
  const navigate = useNavigate();

  /* ===================== STATES ===================== */
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [currentImages, setCurrentImages] = useState({}); // track current image per product

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

  const categoryFromQuery = new URLSearchParams(location.search).get("category");
  const currentCategory = categoryFromQuery || category || "";
  const searchFilters = buildFiltersFromSearch(location.search);
  const filterFromCategory = getPayloadKeyByItemName(currentCategory);

  const [selectedFilters, setSelectedFilters] = useState(() =>
    location.search ? searchFilters : buildInitialFilters(filterFromCategory, currentCategory)
  );
  /* ===================== API ===================== */
  const fetchProducts = async (pageNo) => {
    if (loading) return;

    setLoading(true);
    const payload = {
      category_name: selectedFilters.category_name || "",
      subcategory_name: selectedFilters.subcategory_name.join(","),
      festival_tags: selectedFilters.festival_tags.join(","),
      occasion_tags: [
        ...selectedFilters.occasion_tags,
        ...selectedFilters.special_occasion_tags,
      ].join(","),
      type: selectedFilters.type.join(","),
      relationship: selectedFilters.relationship.join(","),
      color: selectedFilters.color.join(","),
      page: pageNo,
      limit: 12,
    };

    try {
      const res = await getProduct(payload);
      setProducts((prev) =>
        pageNo === 1 ? res.products : [...prev, ...res.products]
      );
      setHasMore(pageNo < res.totalPages);
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
    const filterFromCategory = getPayloadKeyByItemName(currentCategory);
    if (location.search) {
      setSelectedFilters(buildFiltersFromSearch(location.search));
    } else {
      setSelectedFilters(buildInitialFilters(filterFromCategory, currentCategory));
    }
  }, [category, location.search]);

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
    // Save product in localStorage
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];

    // Remove if product already exists to avoid duplicates
    const filtered = stored.filter((p) => p._id !== product._id);

    // Add current product to the start
    filtered.unshift(product);

    // Keep only last 8
    if (filtered.length > 8) filtered.pop();

    // Save back to localStorage
    localStorage.setItem("recentProducts", JSON.stringify(filtered));

    // Navigate to product page
    navigate(`/product/${currentCategory}/${slug}`, { state: { id } });
  };


  const calculateDiscount = (original, selling) =>
    original > selling ? Math.round(((original - selling) / original) * 100) : 0;

  const selectImage = (productId, index) => {
    setCurrentImages((prev) => ({ ...prev, [productId]: index }));
  };

  /* ===================== INTELLIGENT INTERLEAVE ===================== */
  // On occasion/festival/mixed pages (no single top-level category), interleave
  // products so each row shows a mix: Flowers → Cakes → Plants → Others repeating
  const interleaveProducts = (list) => {
    const buckets = {
      Flowers: list.filter(p => p.categorization?.category_name === 'Flowers'),
      Cakes:   list.filter(p => p.categorization?.category_name === 'Cakes'),
      Plants:  list.filter(p => p.categorization?.category_name === 'Plants'),
      Others:  list.filter(p => !['Flowers', 'Cakes', 'Plants'].includes(p.categorization?.category_name)),
    };
    const order = ['Flowers', 'Cakes', 'Plants', 'Others'];
    const idx = { Flowers: 0, Cakes: 0, Plants: 0, Others: 0 };
    const result = [];
    while (result.length < list.length) {
      let added = false;
      for (const key of order) {
        if (idx[key] < buckets[key].length) {
          result.push(buckets[key][idx[key]++]);
          added = true;
        }
      }
      if (!added) break;
    }
    return result;
  };

  // Apply interleaving only on mixed pages (occasion, festival, special occasion, relationship etc.)
  const isMixedPage = !selectedFilters.category_name;
  const displayProducts = isMixedPage ? interleaveProducts(products) : products;

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b p-4 flex justify-between">
        <h1 className="text-2xl capitalize">{getDescription(currentCategory)} </h1>
        {/* <button
          onClick={() => setShowFilters(true)}
          className="border px-4 py-2 flex gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button> */}
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <a href="/" className="hover:text-gray-700 transition">Home</a>
            </li>
            {/* <li>/</li> */}
            {/* <li>
              <a href="/categories" className="hover:text-gray-700 transition">Categories</a>
            </li> */}
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

            {displayProducts.map((p) => (
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
        </InfiniteScroll>)}
    </div>
  );
};

export default Product;
