import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  Truck, 
  Shield, 
  Leaf, 
  Tag,
  ChevronRight,
  Package
} from "lucide-react";

const ProductDescription = () => {
  const { category, productSlug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productDescriptionData, setProductDescriptionData] = useState({
    "categorization": {
      "category_id": 1,
      "category_name": "Roses",
      "subcategory_id": 101,
      "subcategory_name": "Red Roses",
      "festival_tags": [
        "Valentine's Day",
        "Anniversary",
        "Romantic"
      ],
      "occasion_tags": [
        "Birthday",
        "Get Well",
        "Just Because"
      ],
      "type": "Arrangement"
    },
    "product_attributes": {
      "color": "Deep Red / Velvety",
      "stem_length_cm": 60,
      "fragrance_level": "Low to None",
      "vase_life_days_min": 10,
      "origin": "Netherlands"
    },
    "media": {
      "primary_image_url":"https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
      "gallery_images": [
        "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
        "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50",
       "https://imgcdn.floweraura.com/IMG_6360.jpg?tr=w-400,dpr-1.5&q=50"
      ]
    },
    "metrics": {
      "average_rating": 4.8,
      "review_count": 145,
      "times_ordered": 870
    },
    "care_and_logistics": {
      "shipping_constraints": {
        "requires_cold_chain": true,
        "max_delivery_days": 3,
        "regional_availability": [
          "India"
        ]
      },
      "care_instructions": [
        "Cut stems at a 45-degree angle upon arrival.",
        "Use the included flower food packet.",
        "Change water every two days.",
        "Keep away from direct sunlight and heat sources."
      ],
      "add_ons": [
        {
          "name": "Clear Glass Vase",
          "product_id": "VASE-001",
          "quantity": 1,
          "original_price": 20,
          "selling_price": 20,
          "image_url": "https://imgcdn.floweraura.com/teddy-love-with-red-roses-bouquet-9813480co-A_0.jpg?tr=w-400,dpr-1.5&q=50",
          "_id": "692ca762d374d60a8c63cd4a"
        },
        
        {
          "name": "Luxury Chocolates",
          "product_id": "CHOCO-005",
          "quantity": 1,
          "original_price": 25,
          "selling_price": 22.5,
          "image_url": "https://imgcdn.floweraura.com/teddy-love-with-red-roses-bouquet-9813480co-A_0.jpg?tr=w-400,dpr-1.5&q=50",
          "_id": "692ca762d374d60a8c63cd4b"
        }
      ]
    },
    "availability": {
      "is_active": true,
      "is_featured": true,
      "last_restock_date": "2025-11-15T10:30:00.000Z"
    },
    "_id": "692ca762d374d60a8c63cd47",
    "product_id": "FL-RNR-001",
    "name": "Luxury Red Naomi Rose Bouquet",
    "slug": "luxury-red-naomi-roses",
    "sku": "RNROSE-BASE",
    "quantity": 1,
    "original_price": 145,
    "selling_price": 120,
    "description": "The Red Naomi is the quintessential luxury red rose, known for its large head, deep velvety color, and long vase life. Sourced directly from premier Dutch growers.",
    "short_summary": "The classic choice for eternal love, featuring large heads and an incredible 10+ day vase life.",
    "customer_reviews": [
      {
        "rating": 5,
        "review_date": "2025-11-01T15:00:00.000Z",
        "comment": "The Naomi roses were even more beautiful in person. Deep color and they lasted for two weeks! Worth every penny.",
        "_id": "692ca762d374d60a8c63cd48"
      },
      {
        "rating": 4.5,
        "review_date": "2025-10-25T09:15:00.000Z",
        "comment": "Delivered on time and the flowers were fresh. One stem had a slightly small head, but overall excellent.",
        "_id": "692ca762d374d60a8c63cd49"
      }
    ],
    "variations": [
      {
        "inventory": {
          "quantity_available": 120,
          "reorder_point": 20
        },
        "variant_id": "VAR-001-S",
        "variant_sku": "RNROSE-S05",
        "variant_name": "Bunch of 5 Stems (Standard)",
        "quantity_in_bunch": 5,
        "currency": "USD",
        "original_price": 35,
        "selling_price": 31.5,
        "discount_percentage": 10,
        "image_url": "https://example.com/images/redrose_5.jpg",
        "_id": "692ca762d374d60a8c63cd4c"
      },
      {
        "inventory": {
          "quantity_available": 75,
          "reorder_point": 15
        },
        "variant_id": "VAR-001-M",
        "variant_sku": "RNROSE-M12",
        "variant_name": "Bunch of 12 Stems (Dozen)",
        "quantity_in_bunch": 12,
        "currency": "USD",
        "original_price": 75,
        "selling_price": 67.5,
        "discount_percentage": 10,
        "image_url": "https://example.com/images/redrose_12.jpg",
        "_id": "692ca762d374d60a8c63cd4d"
      },
      {
        "inventory": {
          "quantity_available": 30,
          "reorder_point": 5
        },
        "variant_id": "VAR-001-L",
        "variant_sku": "RNROSE-L24",
        "variant_name": "Two Dozen Stems (Grand)",
        "quantity_in_bunch": 24,
        "currency": "USD",
        "original_price": 145,
        "selling_price": 123.25,
        "discount_percentage": 15,
        "image_url": "https://example.com/images/redrose_24.jpg",
        "_id": "692ca762d374d60a8c63cd4e"
      }
    ],
    "createdAt": "2025-11-30T20:21:54.945Z",
    "updatedAt": "2025-11-30T20:34:37.866Z",
    "__v": 0
  });

  const [selectedVariant, setSelectedVariant] = useState(
    productDescriptionData.variations[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Get all images
  const allImages = [
    productDescriptionData.media.primary_image_url,
    ...productDescriptionData.media.gallery_images
  ];

  // Calculate discount percentage
  const calculateDiscount = (original, selling) => {
    if (original <= selling) return 0;
    return Math.round(((original - selling) / original) * 100);
  };

  // Variant selection
  const handleVariantChange = (variantId) => {
    const variant = productDescriptionData.variations.find(
      (v) => v.variant_id === variantId
    );
    setSelectedVariant(variant);
  };

  // Add-ons toggle
  const handleAddOnToggle = (addOn) => {
    if (selectedAddOns.some((a) => a.product_id === addOn.product_id)) {
      setSelectedAddOns(
        selectedAddOns.filter((a) => a.product_id !== addOn.product_id)
      );
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // Quantity handlers
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < selectedVariant.inventory.quantity_available) {
      setQuantity(quantity + 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    const variantTotal = selectedVariant.selling_price * quantity;
    const addOnsTotal = selectedAddOns.reduce(
      (sum, addOn) => sum + addOn.selling_price,
      0
    );
    return variantTotal + addOnsTotal;
  };

  // Add to cart
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = {
      product_id: productDescriptionData.product_id,
      name: productDescriptionData.name,
      variant_id: selectedVariant.variant_id,
      variant_name: selectedVariant.variant_name,
      quantity,
      selling_price: selectedVariant.selling_price,
      currency: selectedVariant.currency,
      image_url: selectedVariant.image_url,
      original_price: selectedVariant.original_price,
      discount_percentage: selectedVariant.discount_percentage || 0,
      add_ons: selectedAddOns
    };

    const index = existingCart.findIndex(
      (item) =>
        item.product_id === cartItem.product_id &&
        item.variant_id === cartItem.variant_id
    );

    if (index !== -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch event to update cart count in header
    window.dispatchEvent(new CustomEvent("cartCountUpdated"));
    
    alert("Added to cart!");
  };

  // Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-accent-rose-600 fill-accent-rose-600" strokeWidth={2} />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 text-accent-rose-600 fill-accent-rose-600/50" strokeWidth={2} />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-grey-300" strokeWidth={2} />
      );
    }
    return stars;
  };

  const discount = calculateDiscount(selectedVariant.original_price, selectedVariant.selling_price);

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Product Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden bg-grey-100 border border-grey-200 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-700 group">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={productDescriptionData.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x600/F5F5F5/E0E0E0?text=Product+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose-900/0 via-transparent to-accent-pink-900/0 group-hover:from-accent-rose-900/5 group-hover:via-transparent group-hover:to-accent-pink-900/5 transition-all duration-700"></div>
                {discount > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-rose-600 text-primary-white rounded-full shadow-elegant backdrop-blur-sm">
                    <span className="font-body text-sm font-light">-{discount}%</span>
                  </div>
                )}
                <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-primary-white/95 backdrop-blur-md rounded-full hover:bg-accent-rose-50 hover:scale-110 transition-all duration-300 shadow-soft">
                  <Heart className="w-5 h-5 text-grey-600 hover:text-accent-rose-600 transition-colors duration-300" strokeWidth={2} />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? "border-accent-rose-600"
                          : "border-grey-200 hover:border-grey-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${productDescriptionData.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150x150/F5F5F5/E0E0E0?text=Image";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {productDescriptionData.categorization.festival_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-rose-100 border border-accent-rose-200 text-accent-rose-700 rounded-full font-body text-xs font-light uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product Name */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal tracking-tight">
                {productDescriptionData.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(productDescriptionData.metrics.average_rating)}
                </div>
                <span className="font-body text-sm text-grey-600 font-light">
                  {productDescriptionData.metrics.average_rating} ({productDescriptionData.metrics.review_count} reviews)
                </span>
                <span className="font-body text-sm text-grey-500 font-light">
                  • {productDescriptionData.metrics.times_ordered} orders
                </span>
              </div>

              {/* Short Summary */}
              <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
                {productDescriptionData.short_summary}
              </p>

              {/* Price Section */}
              <div className="py-4 border-y border-grey-200">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl md:text-4xl font-light text-black-charcoal">
                    ${selectedVariant.selling_price}
                  </span>
                  {selectedVariant.original_price > selectedVariant.selling_price && (
                    <>
                      <span className="font-body text-lg text-grey-500 line-through font-light">
                        ${selectedVariant.original_price}
                      </span>
                      <span className="px-2 py-1 bg-accent-rose-100 text-accent-rose-700 rounded font-body text-xs font-light">
                        Save {calculateDiscount(selectedVariant.original_price, selectedVariant.selling_price)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Variant Selection */}
              <div>
                <h3 className="font-display text-lg font-light text-black-charcoal mb-4 tracking-tight">
                  Select Size
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productDescriptionData.variations.map((variant) => {
                    const variantDiscount = calculateDiscount(variant.original_price, variant.selling_price);
                    return (
                      <button
                        key={variant.variant_id}
                        onClick={() => handleVariantChange(variant.variant_id)}
                        className={`relative p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                          selectedVariant.variant_id === variant.variant_id
                            ? "border-accent-rose-600 bg-accent-rose-50/30"
                            : "border-grey-200 hover:border-grey-300 bg-primary-white"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-display text-sm font-light text-black-charcoal mb-1">
                              {variant.variant_name}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-display text-base font-light text-black-charcoal">
                                ${variant.selling_price}
                              </span>
                              {variant.original_price > variant.selling_price && (
                                <span className="font-body text-xs text-grey-500 line-through font-light">
                                  ${variant.original_price}
                                </span>
                              )}
                            </div>
                          </div>
                          {selectedVariant.variant_id === variant.variant_id && (
                            <div className="w-5 h-5 flex items-center justify-center bg-accent-rose-600 rounded-full">
                              <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div className="font-body text-xs text-grey-600 font-light">
                          {variant.inventory.quantity_available} available
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="font-display text-lg font-light text-black-charcoal mb-4 tracking-tight">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-grey-200 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-50 transition-colors duration-300"
                    >
                      <Minus className="w-4 h-4 text-black-charcoal" strokeWidth={2} />
                    </button>
                    <span className="px-6 py-2 font-display text-lg font-light text-black-charcoal min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= selectedVariant.inventory.quantity_available}
                      className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-50 transition-colors duration-300"
                    >
                      <Plus className="w-4 h-4 text-black-charcoal" strokeWidth={2} />
                    </button>
                  </div>
                  <span className="font-body text-sm text-grey-600 font-light">
                    {selectedVariant.inventory.quantity_available} available
                  </span>
                </div>
              </div>

              {/* Add-ons */}
              {productDescriptionData.care_and_logistics.add_ons.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-light text-black-charcoal mb-4 tracking-tight">
                    Add-ons
                  </h3>
                  <div className="space-y-3">
                    {productDescriptionData.care_and_logistics.add_ons.map((addOn) => {
                      const isSelected = selectedAddOns.some((a) => a.product_id === addOn.product_id);
                      return (
                        <button
                          key={addOn._id}
                          onClick={() => handleAddOnToggle(addOn)}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-300 flex items-center justify-between ${
                            isSelected
                              ? "border-accent-rose-600 bg-accent-rose-50/30"
                              : "border-grey-200 hover:border-grey-300 bg-primary-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 flex items-center justify-center border-2 rounded ${
                              isSelected
                                ? "bg-accent-rose-600 border-accent-rose-600"
                                : "border-grey-300"
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />}
                            </div>
                            <div>
                              <div className="font-display text-sm font-light text-black-charcoal">
                                {addOn.name}
                              </div>
                              <div className="font-body text-xs text-grey-600 font-light">
                                ${addOn.selling_price}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="py-4 border-t border-grey-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-lg font-light text-black-charcoal">
                    Total
                  </span>
                  <span className="font-display text-2xl font-light text-black-charcoal">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full px-8 py-4 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide transition-all duration-500 flex items-center justify-center gap-2 shadow-elegant hover:shadow-premium hover:scale-[1.02] active:scale-[0.98] border border-accent-rose-700/30 rounded-full backdrop-blur-sm relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-rose-700/0 via-accent-rose-500/20 to-accent-rose-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <ShoppingBag className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                <span className="relative z-10">Add to Cart</span>
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-grey-200">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-accent-rose-600 mb-2" strokeWidth={2} />
                  <span className="font-body text-xs text-grey-700 font-light">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-accent-rose-600 mb-2" strokeWidth={2} />
                  <span className="font-body text-xs text-grey-700 font-light">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Package className="w-6 h-6 text-accent-rose-600 mb-2" strokeWidth={2} />
                  <span className="font-body text-xs text-grey-700 font-light">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 md:py-12 lg:py-16 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Description & Attributes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                  Description
                </h2>
                <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                  {productDescriptionData.description}
                </p>
              </div>

              {/* Product Attributes */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-6 tracking-tight">
                  Product Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-white border border-grey-200 rounded-xl">
                    <div className="font-body text-xs text-grey-600 font-light uppercase tracking-wider mb-1">
                      Color
                    </div>
                    <div className="font-display text-sm font-light text-black-charcoal">
                      {productDescriptionData.product_attributes.color}
                    </div>
                  </div>
                  <div className="p-4 bg-primary-white border border-grey-200 rounded-xl">
                    <div className="font-body text-xs text-grey-600 font-light uppercase tracking-wider mb-1">
                      Stem Length
                    </div>
                    <div className="font-display text-sm font-light text-black-charcoal">
                      {productDescriptionData.product_attributes.stem_length_cm} cm
                    </div>
                  </div>
                  <div className="p-4 bg-primary-white border border-grey-200 rounded-xl">
                    <div className="font-body text-xs text-grey-600 font-light uppercase tracking-wider mb-1">
                      Vase Life
                    </div>
                    <div className="font-display text-sm font-light text-black-charcoal">
                      {productDescriptionData.product_attributes.vase_life_days_min}+ days
                    </div>
                  </div>
                  <div className="p-4 bg-primary-white border border-grey-200 rounded-xl">
                    <div className="font-body text-xs text-grey-600 font-light uppercase tracking-wider mb-1">
                      Origin
                    </div>
                    <div className="font-display text-sm font-light text-black-charcoal">
                      {productDescriptionData.product_attributes.origin}
                    </div>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-6 tracking-tight flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-accent-rose-600" strokeWidth={2} />
                  Care Instructions
                </h2>
                <div className="space-y-3">
                  {productDescriptionData.care_and_logistics.care_instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary-white border border-grey-200 rounded-xl">
                      <div className="w-5 h-5 flex items-center justify-center bg-accent-rose-100 rounded-full flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-rose-600" strokeWidth={3} />
                      </div>
                      <p className="font-body text-sm text-grey-700 font-light leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-6 tracking-tight">
                Customer Reviews
              </h2>
              <div className="space-y-6">
                {productDescriptionData.customer_reviews.map((review) => (
                  <div key={review._id} className="p-5 bg-primary-white border border-grey-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.rating)}
                      <span className="font-body text-xs text-grey-600 font-light">
                        {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="font-body text-sm text-grey-700 font-light leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDescription;
