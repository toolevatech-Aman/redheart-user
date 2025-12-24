import React from "react";

const ProductCard = ({ product, currentImageIndex, selectImage, handleProductClick, calculateDiscount }) => {
  const images = [product.media.primary_image_url, ...(product.media.gallery_images || [])];
  const discount = calculateDiscount(product.original_price, product.selling_price);
  const type = product.categorization?.type || "";

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
      onClick={() => handleProductClick(product.slug , product.product_id)}
    >
      {/* Image Carousel */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={images[currentImageIndex] || images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Type badge stuck to top-left */}
        {type && (
          <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold shadow-md px-2 py-1">
            {type}
          </span>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  selectImage(product.id, idx);
                }}
                className={`w-2 h-2 rounded-full ${
                  idx === currentImageIndex ? "bg-rose-600" : "bg-white/70"
                } border border-neutral-400`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <p className="mb-1 text-sm font-medium tracking-wide text-neutral-700 group-hover:text-neutral-900 line-clamp-2">
          {product.name}
        </p>

        {/* Price and Discount */}
        <div className="flex justify-center items-center gap-2">
          <p className="text-lg font-semibold tracking-wide text-neutral-900">
            ₹{product.selling_price}
          </p>

          {discount > 0 && (
            <>
              <p className="text-sm line-through text-neutral-400">
                ₹{product.original_price}
              </p>
              <span className="bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                −{discount}%
              </span>
            </>
          )}
        </div>

        <div className="mx-auto mt-3 h-[2px] w-0 bg-neutral-900 transition-all duration-500 group-hover:w-12" />
      </div>
    </div>
  );
};

export default ProductCard;
