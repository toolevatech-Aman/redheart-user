import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { getProduct } from "../../service/products";
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
const buildInitialFilters = (filterData) => {
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

  if (!filterData) return baseFilters;

  const { payloadKey, value } = filterData;

  return {
    ...baseFilters,
    [payloadKey]: [value],
  };
};
const Product = () => {
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

  const filterFromCategory = getPayloadKeyByItemName(category);

  const [selectedFilters, setSelectedFilters] = useState(() =>
    buildInitialFilters(filterFromCategory)
  );
  /* ===================== API ===================== */
  const fetchProducts = async (pageNo) => {
    if (loading) return;

    setLoading(true);
    const payload = {
      category_name: selectedFilters.category_name  || "",
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
      limit: 16,
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
  }, [category, selectedFilters]);
  useEffect(() => {
    const filterFromCategory = getPayloadKeyByItemName(category);
    setSelectedFilters(buildInitialFilters(filterFromCategory));
  }, [category]);

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

  const handleProductClick = (slug, id) => {
    navigate(`/product/${category}/${slug}`, { state: { id } });
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
        <h1 className="text-2xl capitalize">{category}</h1>
        {/* <button
          onClick={() => setShowFilters(true)}
          className="border px-4 py-2 flex gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button> */}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              currentImageIndex={currentImages[p._id] || 0}
              selectImage={selectImage}
              handleProductClick={handleProductClick}
              calculateDiscount={calculateDiscount}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Product;
