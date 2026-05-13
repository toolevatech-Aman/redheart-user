import React, { useRef, useState, useEffect } from "react";

const ProductCard = ({
    product,
    handleProductClick,
    calculateDiscount,
    isLCP = false,
}) => {
    const images = [
        product.media.primary_image_url,
        ...(product.media.gallery_images || []),
    ];
    const [imageLoading, setImageLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const discount = calculateDiscount(
        product.original_price,
        product.selling_price
    );

    const type = product.categorization?.type || "";
    const intervalRef = useRef(null);

    const startCarousel = () => {
        if (intervalRef.current || images.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1200); // change image every 1.2s
    };

    const stopCarousel = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    // Clear interval when component unmounts
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            onClick={() => handleProductClick(product.slug, product.product_id)}
            onMouseEnter={startCarousel}
            onMouseLeave={stopCarousel}
        >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden">
                <img
                    src={images[currentImageIndex] || images[0]}
                    alt={product.name}
                    width="400"
                    height="400"
                    loading={isLCP ? "eager" : "lazy"}
                    fetchpriority={isLCP ? "high" : undefined}
                    onLoad={() => setImageLoading(false)}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoading ? "blur-xl scale-110" : "blur-0 scale-100"
                        }`}
                />
                {type && (
                    <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1">
                        {type}
                    </span>
                )}

                {/* Dots — p-4 = 44px touch target, -m-4 cancels spacing, gap-1 = same visual gap */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                aria-label={`View image ${idx + 1} of ${images.length}`}
                                aria-pressed={idx === currentImageIndex}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(idx);
                                }}
                                className="p-4 -m-4 rounded-full focus:outline-none"
                            >
                                <span className={`block w-3 h-3 rounded-full ${
                                    idx === currentImageIndex ? "bg-rose-600" : "bg-white/70"
                                } border border-neutral-400`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 text-center">
                <p className="mb-1 text-sm font-medium text-neutral-700 line-clamp-1 md:line-clamp-2">
                    {product.name}
                </p>


                <div className="flex justify-center items-center gap-2">
                    <p className="text-lg font-semibold">₹{product.selling_price}</p>

                    {discount > 0 && (
                        <>
                            <p className="text-sm line-through text-neutral-500">
                                ₹{product.original_price}
                            </p>
                            <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full">
                                −{discount}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
