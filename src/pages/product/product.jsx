import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Tag, Heart, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const Product = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    price: false,
    availability: false,
    sort: false,
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [productData, setProductData] = useState([
    {
      media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cd47",
      product_id: "FL-RNR-001",
      name: "Luxury Red Naomi Rose Bouquet",
      slug: "luxury-red-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
    {
      media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cssd47",
      product_id: "FL-RNR-002",
      name: "Luxury Green Naomi Rose Bouquet",
      slug: "luxury-green-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
    {
      media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cd48",
      product_id: "FL-RNR-003",
      name: "Luxury Pink Naomi Rose Bouquet",
      slug: "luxury-pink-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
    {
     media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cd49",
      product_id: "FL-RNR-004",
      name: "Luxury White Naomi Rose Bouquet",
      slug: "luxury-white-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
    {
      media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cd50",
      product_id: "FL-RNR-005",
      name: "Luxury Yellow Naomi Rose Bouquet",
      slug: "luxury-yellow-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
    {
      media: {
        primary_image_url: "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        gallery_images: [
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
          "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        ],
      },
      _id: "692ca762d374d60a8c63cd51",
      product_id: "FL-RNR-006",
      name: "Luxury Peach Naomi Rose Bouquet",
      slug: "luxury-peach-naomi-roses",
      sku: "RNROSE-BASE",
      quantity: 10,
      original_price: 145,
      selling_price: 120,
      description:
        "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
      short_summary:
        "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    },
  ]);

  const handleProductClick = (slug) => {
    navigate(`/product/${category}/${slug}`);
  };

  // Calculate discount percentage
  const calculateDiscount = (original, selling) => {
    if (original <= selling) return 0;
    return Math.round(((original - selling) / original) * 100);
  };

  // Format category name
  const formatCategoryName = (cat) => {
    if (!cat) return "Products";
    return cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Toggle filter section
  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Apply filters and sorting
  const getFilteredProducts = () => {
    let filtered = [...productData];

    // Filter by discount
    if (showDiscountOnly) {
      filtered = filtered.filter(
        (p) => p.original_price > p.selling_price
      );
    }

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.quantity > 0);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) =>
        p.selling_price >= priceRange.min &&
        p.selling_price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.selling_price - b.selling_price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.selling_price - a.selling_price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured/default order
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Close dropdown when clicking outside
  const sortDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Header Section - Compact */}
      <section className="relative py-6 md:py-8 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal mb-2 tracking-tight">
              {formatCategoryName(category)}
            </h1>
            <p className="font-body text-sm md:text-base text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
              Discover our exquisite collection of premium {formatCategoryName(category).toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Toggle & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-grey-200">
            <div className="flex items-center gap-4 w-full sm:w-auto flex-wrap">
              <p className="font-body text-sm sm:text-base text-grey-600 font-light">
                Showing <span className="text-black-charcoal font-light">{filteredProducts.length}</span> of{" "}
                <span className="text-black-charcoal font-light">{productData.length}</span> products
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-black-charcoal hover:text-accent-rose-600 font-body text-sm font-light transition-colors duration-300"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
                Filters
              </button>
            </div>
            {/* Custom Sort Dropdown */}
            <div className="relative w-full sm:w-auto" ref={sortDropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-2 border border-grey-200 hover:border-accent-rose-600 text-black-charcoal font-body text-sm font-light transition-all duration-300 bg-primary-white min-w-[180px]"
              >
                <span className="text-left">
                  {sortBy === "featured" && "Featured"}
                  {sortBy === "price-low" && "Price: Low to High"}
                  {sortBy === "price-high" && "Price: High to Low"}
                  {sortBy === "name-asc" && "Name: A to Z"}
                  {sortBy === "name-desc" && "Name: Z to A"}
                </span>
                <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${showSortDropdown ? 'transform rotate-180' : ''}`} strokeWidth={2} />
              </button>
              
              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-1 w-full sm:w-auto min-w-[180px] bg-primary-white border border-grey-200 shadow-elegant z-20">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "name-asc", label: "Name: A to Z" },
                      { value: "name-desc", label: "Name: Z to A" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 font-body text-sm font-light transition-colors duration-300 ${
                          sortBy === option.value
                            ? "bg-accent-rose-50 text-accent-rose-700"
                            : "text-black-charcoal hover:bg-grey-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Filters Sidebar - Slides in from left */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:z-50"
                onClick={() => setShowFilters(false)}
              ></div>
              
              {/* Sidebar */}
              <aside className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-primary-white shadow-premium z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
                <div className="sticky top-0 bg-primary-white border-b border-grey-200 p-4 flex items-center justify-between z-10">
                  <h2 className="font-display text-lg font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-grey-600 hover:text-black-charcoal transition-colors duration-300"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
                
                <div className="p-4 space-y-6">
                  {/* Clear All Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowDiscountOnly(false);
                        setInStockOnly(false);
                        setPriceRange({ min: 0, max: 500 });
                        setSortBy("featured");
                      }}
                      className="font-body text-xs text-grey-600 hover:text-accent-rose-600 font-light transition-colors duration-300"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Sort By */}
                  <div className="border-b border-grey-100 pb-4">
                    <button
                      onClick={() => toggleFilter("sort")}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-display text-sm font-light text-black-charcoal tracking-tight">
                        Sort By
                      </h3>
                      {expandedFilters.sort ? (
                        <ChevronUp className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      )}
                    </button>
                    {expandedFilters.sort && (
                      <div className="space-y-2">
                        {[
                          { value: "featured", label: "Featured" },
                          { value: "price-low", label: "Price: Low to High" },
                          { value: "price-high", label: "Price: High to Low" },
                          { value: "name-asc", label: "Name: A to Z" },
                          { value: "name-desc", label: "Name: Z to A" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name="sort"
                              value={option.value}
                              checked={sortBy === option.value}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="w-4 h-4 text-accent-rose-600 border-grey-300 focus:ring-accent-rose-500 focus:ring-2"
                            />
                            <span className="font-body text-sm text-grey-700 group-hover:text-black-charcoal font-light transition-colors duration-300">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="border-b border-grey-100 pb-4">
                    <button
                      onClick={() => toggleFilter("price")}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-display text-sm font-light text-black-charcoal tracking-tight">
                        Price Range
                      </h3>
                      {expandedFilters.price ? (
                        <ChevronUp className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      )}
                    </button>
                    {expandedFilters.price && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min="0"
                            max="500"
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange({
                                ...priceRange,
                                min: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                            placeholder="Min"
                          />
                          <span className="text-grey-500 font-body text-sm font-light">-</span>
                          <input
                            type="number"
                            min="0"
                            max="500"
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange({
                                ...priceRange,
                                max: parseInt(e.target.value) || 500,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                            placeholder="Max"
                          />
                        </div>
                        <div className="text-xs text-grey-600 font-body font-light">
                          ${priceRange.min} - ${priceRange.max}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="border-b border-grey-100 pb-4">
                    <button
                      onClick={() => toggleFilter("availability")}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-display text-sm font-light text-black-charcoal tracking-tight">
                        Availability
                      </h3>
                      {expandedFilters.availability ? (
                        <ChevronUp className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-grey-500" strokeWidth={2} />
                      )}
                    </button>
                    {expandedFilters.availability && (
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className="w-4 h-4 text-accent-rose-600 border-grey-300 rounded focus:ring-accent-rose-500 focus:ring-2"
                          />
                          <span className="font-body text-sm text-grey-700 group-hover:text-black-charcoal font-light transition-colors duration-300">
                            In Stock Only
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={showDiscountOnly}
                            onChange={(e) => setShowDiscountOnly(e.target.checked)}
                            className="w-4 h-4 text-accent-rose-600 border-grey-300 rounded focus:ring-accent-rose-500 focus:ring-2"
                          />
                          <span className="font-body text-sm text-grey-700 group-hover:text-black-charcoal font-light transition-colors duration-300">
                            On Sale
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const discount = calculateDiscount(product.original_price, product.selling_price);
              return (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product.slug)}
                  className="group relative overflow-hidden bg-primary-white border border-grey-200 shadow-soft hover:shadow-premium transition-all duration-700 cursor-pointer rounded-xl hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative h-36 sm:h-40 md:h-48 lg:h-56 overflow-hidden bg-grey-100">
                    <img
                      src={product.media.primary_image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x500/F5F5F5/E0E0E0?text=Product+Image";
                      }}
                    />
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent-rose-600 text-primary-white rounded-full shadow-elegant backdrop-blur-sm">
                        <span className="font-body text-xs font-light">-{discount}%</span>
                      </div>
                    )}
                    {/* Wishlist Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-primary-white/95 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent-rose-50 hover:scale-110 shadow-soft">
                      <Heart className="w-4 h-4 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" strokeWidth={2} />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-rose-900/0 via-transparent to-accent-pink-900/0 group-hover:from-accent-rose-900/10 group-hover:via-transparent group-hover:to-accent-pink-900/10 transition-all duration-700"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 md:p-5 border-t border-grey-100 bg-gradient-to-b from-primary-white to-grey-50/30">
                    <h3 className="font-display text-xs sm:text-sm md:text-base font-light text-black-charcoal mb-1.5 sm:mb-2 group-hover:text-accent-rose-600 transition-colors duration-500 tracking-tight line-clamp-2">
                      {product.name}
                    </h3>
                    {product.short_summary && (
                      <p className="font-body text-[10px] sm:text-xs text-grey-600 font-light mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                        {product.short_summary}
                      </p>
                    )}
                    
                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                      <span className="font-display text-sm sm:text-base md:text-lg font-light text-black-charcoal">
                        ${product.selling_price}
                      </span>
                      {product.original_price > product.selling_price && (
                        <span className="font-body text-[10px] sm:text-xs text-grey-500 line-through font-light">
                          ${product.original_price}
                        </span>
                      )}
                    </div>

                    {/* View Details Link */}
                    <div className="flex items-center text-accent-rose-600 gap-1 group-hover:gap-2 transition-all duration-500">
                      <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-wider font-light">View Details</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

              {/* Empty State (if no products) */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16 md:py-24">
                  <p className="font-body text-base md:text-lg text-grey-600 font-light mb-4">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setShowDiscountOnly(false);
                      setInStockOnly(false);
                      setPriceRange({ min: 0, max: 500 });
                      setSortBy("featured");
                    }}
                    className="px-6 py-2.5 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light transition-all duration-300 border border-accent-rose-700/30"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
        </div>
      </section>
    </div>
  );
};

export default Product;