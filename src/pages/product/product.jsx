import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
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

const Product = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  /* ===================== STATES ===================== */
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const inititialFilters = {
    subcategory_name: [],
    festival_tags: [],
    occasion_tags: [],
    special_occasion_tags: [],
    type: [],
    relationship: [],
    color: [],
  };
  const [selectedFilters, setSelectedFilters] = useState(inititialFilters);

  /* ===================== API ===================== */
  const GetProducts = async (pageNo = 1) => {
    setLoading(true);
    const mergedOccasionTags = [
      ...selectedFilters.occasion_tags,
      ...selectedFilters.special_occasion_tags,
    ];
    const payload = {
      searchField: "",
      color: selectedFilters.color.join(",") || "",
      subcategory_name: selectedFilters.subcategory_name.join(",") || "",
      category_name: "" || "",
      festival_tags: selectedFilters.festival_tags.join(",") || "",
      occasion_tags: mergedOccasionTags.join(",") || "",
      type: selectedFilters.type.join(",") || "",
      relationship: selectedFilters.relationship.join(",") || "",
      page: pageNo,
      limit: 6,

    };

    try {

      const response = await getProduct(payload);

      setProductData((prev) =>
        pageNo === 1 ? response.products : [...prev, ...response.products]
      );

     setHasMore(pageNo < response.totalPages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetProducts(1);
  }, [category]);

  /* ===================== INFINITE SCROLL ===================== */
  const observer = useRef();

 const lastProductRef = useCallback(
  (node) => {
    if (loading || !hasMore) return; // ✅ don't observe if loading or no more pages
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  },
  [loading, hasMore]
);

  useEffect(() => {
    console.log("thisi s csllaed")
    if (page > 1) GetProducts(page);
  }, [page]);

  /* ===================== HELPERS ===================== */
  const handleProductClick = (slug) => {
    navigate(`/product/${category}/${slug}`);
  };

  const calculateDiscount = (original, selling) => {
    if (original <= selling) return 0;
    return Math.round(((original - selling) / original) * 100);
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const formatCategoryName = (cat) =>
    cat
      ? cat
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
      : "Products";

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Header */}
      <section className="py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-light">{formatCategoryName(category)}</h1>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </section>

      {/* Filter Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
          <div className="w-80 bg-white h-full p-6 overflow-y-auto relative">
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4 p-2"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-medium mb-6">Filters</h2>

            {[
              { title: "Subcategories", key: "subcategory_name", options: SubCategoryFilters },
              { title: "Festival", key: "festival_tags", options: FestivalFilters },
              { title: "Special Occasion", key: "special_occasion_tags", options: SpecialOccasionFilters },
              { title: "Occasion", key: "occasion_tags", options: OccasionFilters },
              { title: "Type", key: "type", options: TypeFilters },
              { title: "Relationship", key: "relationship", options: RelationshipFilters },
              { title: "Color", key: "color", options: ColorFilters },
            ].map((filter) => (
              <div key={filter.key} className="mb-4">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedFilters((prev) => ({
                      ...prev,
                      [filter.key]: !prev[filter.key],
                    }))
                  }
                >
                  <span>{filter.title}</span>
                  {expandedFilters[filter.key] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedFilters[filter.key] && (
                  <div className="mt-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {filter.options.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters[filter.key]?.includes(option)}
                          onChange={() => toggleFilter(filter.key, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Price */}
            {/* <div className="mb-4">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() =>
                  setExpandedFilters((prev) => ({
                    ...prev,
                    price: !prev.price,
                  }))
                }
              >
                <span>Price</span>
                {expandedFilters.price ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expandedFilters.price && (
                <div className="mt-2 flex flex-col gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: Number(e.target.value),
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Number(e.target.value),
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
            </div> */}

            {/* Availability */}
            {/* <div className="mb-4">
              <div className="flex justify-between cursor-pointer">
                <span>Availability</span>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly((prev) => !prev)}
                  />
                  In Stock Only
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showDiscountOnly}
                    onChange={() => setShowDiscountOnly((prev) => !prev)}
                  />
                  Discounted Only
                </label>
              </div>
            </div> */}

            {/* Sort */}
            {/* <div className="mb-4">
              <div className="flex justify-between cursor-pointer">
                <span>Sort</span>
              </div>
              <div className="mt-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div> */}
            {/* Clear Filters Button */}
            {/* Clear Filters Button */}
            {/* <button
              onClick={() => {
                // Reset all filters
              
                setSelectedFilters(inititialFilters)

                // setPriceRange({ min: 0, max: 5000 });
                // setInStockOnly(false);
                // setShowDiscountOnly(false);
                // setSortBy("featured");
                setShowFilters(false);
                // Immediately fetch products with default filters
                GetProducts(1);
              }}
              className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
            >
              Clear Filters
            </button> */}


            <button
              onClick={() => {
                setShowFilters(false);
                GetProducts(1);
              }}
              className="mt-4 w-full bg-rose-600 text-white py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) :
          <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productData.map((product, index) => {
              const discount = calculateDiscount(
                product.original_price,
                product.selling_price
              );
              const isLast = index === productData.length - 1;

              return (
                <div
                  ref={isLast ? lastProductRef : null}
                  key={product._id}
                  onClick={() => handleProductClick(product.slug)}
                  className="cursor-pointer border rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.media.primary_image_url}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-medium line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-base font-semibold">
                        ₹{product.selling_price}
                      </span>
                      {product.original_price > product.selling_price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loader */}
         

          {/* No Products */}
          {/* {!loading && productData.length === 0 && (
            <p className="text-center text-gray-500 py-20">
              No products found.
            </p>
          )} */}
        </div>
      </section>
}
    </div>
  );
};

export default Product;
