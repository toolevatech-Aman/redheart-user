import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecentProducts(stored);
  }, []);

  if (recentProducts.length === 0) return null; // hide if nothing viewed

  return (
    <div className="p-6 bg-gray-50 rounded-lg mt-8">
      {/* Title and description */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recently Viewed
        </h2>
        <p className="text-gray-600 mt-1">
          Products you recently checked out. Pick up where you left off!
        </p>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            currentImageIndex={0}
            selectImage={() => {}}
            handleProductClick={() => {
              // navigate when clicked
              window.location.href = `/product/${p.category_name}/${p.slug}`;
            }}
            calculateDiscount={(original, selling) =>
              original > selling
                ? Math.round(((original - selling) / original) * 100)
                : 0
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
