import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductById } from "../../service/products";
import RecentlyViewed from "./RecentlyViewed";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { message } from "../../comman/toaster-message/toasterMessage";
import { getAddOnProductExcept } from "../../service/addOnHamper";
import AddOnModal from "./addOnModal";
import { FaShippingFast, FaLeaf, FaLock, FaGift, FaHeart } from "react-icons/fa";
import { clearBuyNowItem, setBuyNowItem } from "../../store/buyNowSlice";
import { DeliveryModal } from "../cart/deliverySlot";
const ProductUSPs = () => {
  const usps = [
    {
      icon: <FaShippingFast className="text-red-600 text-xl" />,
      title: "Fast Delivery",
      desc: "Same-day & scheduled delivery available",
    },
    {
      icon: <FaLeaf className="text-green-600 text-xl" />,
      title: "Freshness Guaranteed",
      desc: "Handpicked & quality-checked products",
    },
    {
      icon: <FaGift className="text-pink-600 text-xl" />,
      title: "Free Message Card",
      desc: "Add a personalized note with every gift",
    },
    {
      icon: <FaLock className="text-purple-600 text-xl" />,
      title: "Secure Payments",
      desc: "100% safe & encrypted checkout",
    },
    {
      icon: <FaHeart className="text-red-500 text-xl" />,
      title: "Loved by Thousands",
      desc: "Trusted gifting brand across India",
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <h3 className="text-sm font-semibold mb-4 text-neutral-900">
        Why Choose Us
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {usps.map((usp, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
          >
            <div className="flex-shrink-0">{usp.icon}</div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {usp.title}
              </p>
              <p className="text-xs text-neutral-600">{usp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const Accordion = ({ title, children, initialOpen = false }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="border-b border-neutral-200 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-base font-semibold text-black">{title}</h3>
        <span className="text-xl text-red-600">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-2 text-neutral-700 text-sm leading-relaxed">{children}</div>}
    </div>
  );
};


const ProductDescriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [open, setOpen] = useState(false);
  const [addOnOpen, setAddOnOpen] = useState(false);
  const [addOnData, setAddOnData] = useState([]);
  console.log("AddOn Data", addOnData);
  const [product, setProduct] = useState(null);
  const [isAddonLoader, setIsAddOnLoader] = useState(false);
  const [lastCartProductId, setLastCartProductId] = useState(null);
  const [buyBackProcess, setBuyBackProcess] = useState(false);
  const [addOnBuyBackData, setAddOnBuyBackData] = useState([]);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  console.log((product));
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);
  useEffect(() => {
    dispatch(clearBuyNowItem());
  }, [dispatch]);
  const fetchProduct = async () => {
    setLoading(true);
    const res = await getProductById(id);
    setProduct(res);
    setMainImage(res.media.primary_image_url);
    setLoading(false);
  };

  const toggleAddon = (addon) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a._id === addon._id)
        ? prev.filter((a) => a._id !== addon._id)
        : [...prev, addon]
    );
  };
  const getAddon = async (category) => {
    setIsAddOnLoader(true)
    try {
      const res = await getAddOnProductExcept(category);
      setAddOnData(res);
    }

    catch (err) {
      console.error("Add-on fetch error:", err);
    }
    finally {
      setIsAddOnLoader(false)
    }

  }
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center p-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Launching Soon!</h2>
          <p className="text-neutral-600">This product will be available shortly. Stay tuned!</p>
        </div>
      </div>
    );

  // Determine which image to show
  const displayImage = selectedVariant?.image_url || mainImage;

  // Determine prices
  const displayOriginal = selectedVariant?.original_price || product.original_price;
  const displaySelling = selectedVariant?.selling_price || product.selling_price;
  const handleAddToCart = async () => {
    if (!product) return;

    const cartItem = {
      productId: selectedVariant?._id || product.product_id,
      _id: product._id,
      name: product.name,
      variant_name: selectedVariant?.variant_name || "",
      image_url: selectedVariant?.image_url || product.media.primary_image_url,
      selling_price: selectedVariant?.selling_price || product.selling_price,
      original_price: selectedVariant?.original_price || product.original_price,
      quantity: 1,
      add_ons: selectedAddOns.map((a) => ({
        _id: a._id,
        name: a.name,
        selling_price: a.selling_price,
        quantity: 1,
        image_url: a.image_url || "",
      })),
    };

    dispatch(addToCart(cartItem));

    message.success("Added to cart!");
    setLastCartProductId(cartItem.productId);
    await getAddon(product.categorization.category_name);
    setAddOnOpen(true);
  };
  const appendAddOnsToCart = (newAddOns) => {
    if (!lastCartProductId || newAddOns.length === 0) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.map((item) => {
      if (item.productId === lastCartProductId) {
        return {
          ...item,
          add_ons: [...(item.add_ons || []), ...newAddOns],
        };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const buyNowItem = {
    productId: selectedVariant?._id || product._id,
    name: product.name,
    variant_name: selectedVariant?.variant_name || "",
    image_url:
      selectedVariant?.image_url || product.media.primary_image_url,
    selling_price:
      selectedVariant?.selling_price || product.selling_price,
    original_price:
      selectedVariant?.original_price || product.original_price,
    quantity: 1,
    add_ons: selectedAddOns,
  };
  const handleBuyNowClick = async () => {
    if (!product) return;



    // Load addon suggestions (optional)
    await getAddon(product.categorization.category_name);

    dispatch(setBuyNowItem(buyNowItem));

    setBuyBackProcess(true);
    setAddOnOpen(true);
  };
  return (
    <div className="bg-white text-black">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 py-6">

        {/* LEFT – IMAGE GALLERY */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="rounded-[30px] overflow-hidden ">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-[450px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto py-2">
            {[...product.media.gallery_images].map((img, i) => (
              <img
                key={i}
                src={img}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${img === displayImage ? "border-red-600" : "border-neutral-200"
                  }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT – PRODUCT INFO */}
        <div className="space-y-8">

          {/* Header */}
          <div>
            <p className="inline-block bg-red-100 text-red-600 uppercase tracking-wider text-xs px-2 py-1 rounded-full">
              {product.short_summary}
            </p>

            <h1 className="mt-2 text-3xl font-serif font-bold leading-tight">{product.name}</h1>
          </div>


          {/* Variants */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Choose Arrangement</h3>
            <div className="flex flex-wrap gap-2">
              {product.variations.map((variant) => {
                const selected = selectedVariant?._id === variant._id;
                return (
                  <button
                    key={variant._id}
                    onClick={() =>
                      setSelectedVariant(selected ? null : variant) // toggle selection
                    }
                    className={`flex flex-col items-center px-3 py-2 rounded-lg border text-xs font-medium transition-all ${selected
                      ? "border-red-600 bg-red-50 text-red-600 shadow"
                      : "border-neutral-300 hover:border-black"
                      }`}
                  >
                    {variant.image_url && (
                      <img
                        src={variant.image_url}
                        alt={variant.variant_name}
                        className="w-16 h-16 object-cover rounded-lg mb-1"
                      />
                    )}
                    <div className="flex items-center gap-1">
                      <span>{variant.variant_name}</span>
                      {selected && <span className="text-red-600">−</span>}
                    </div>
                  </button>
                );
              })}

            </div>
          </div>


          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-red-600">₹{displaySelling}</span>
            <span className="line-through text-neutral-400 text-sm">₹{displayOriginal}</span>
          </div>

          {/* Variant Description Accordion */}
          {selectedVariant && selectedVariant.description && (
            <Accordion title="Arrangement Details">
              <p>{selectedVariant.description}</p>
            </Accordion>
          )}

          {/* Product Accordions */}
          {/* <div className="pt-4 space-y-3 text-sm">
            <Accordion title="Product Contents">
              <ul className="list-disc ml-5 space-y-1 text-neutral-700">
                {product.product_attributes.product_content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Care Instructions">
              <ul className="list-disc ml-5 space-y-1 text-neutral-700">
                {product.care_and_logistics.care_instructions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Product Details">
              <p>Color: <span className="font-medium">{product.product_attributes.color}</span></p>
              <p>Origin: <span className="font-medium">{product.product_attributes.origin}</span></p>
              <p>Minimum Vase Life: <span className="font-medium">{product.product_attributes.vase_life_days_min} days</span></p>
            </Accordion>

            <Accordion title="Perfect For">
              <div className="flex flex-wrap gap-2 mt-1">
                {product.categorization.occasion_tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-medium">{tag}</span>
                ))}
              </div>
            </Accordion>

            <Accordion title="Festival & Relationship Highlights">
              <div className="flex flex-wrap gap-2 mt-1">
                {product.categorization.festival_tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </Accordion>
          </div> */}
          <div className="pt-2 space-y-2 text-sm">
            {/* Product Contents */}
            <Accordion title="Product Contains" initialOpen={true}>
              {/* Product Contents – Always Open */}
              <div className="pt-6">

                <ul className="list-disc ml-6 space-y-2 text-neutral-800">
                  {/* If a variant is selected, show its name first */}
                  {selectedVariant && (
                    <li
                      className="p-2 rounded-lg bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-sm hover:shadow-md transition-shadow duration-300 font-semibold"
                    >
                      {selectedVariant.variant_name}
                    </li>
                  )}

                  {product.product_attributes.product_content.map((item, i) => (
                    <li
                      key={i}
                      className="p-2 rounded-lg bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </Accordion>

            {/* description  */}
            <Accordion title="Product Description">
              <ul className="list-disc ml-6 space-y-2 text-neutral-800">

                <span

                  className="p-2 "
                >
                  {product.description}
                </span>

              </ul>
            </Accordion>

            {/* Care Instructions */}
            <Accordion title="Care Instructions">
              <ul className="list-disc ml-6 space-y-2 text-neutral-800">
                {product.care_and_logistics.care_instructions.map((item, i) => (
                  <li
                    key={i}
                    className="p-2 rounded-lg bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Accordion>

            {/* Product Details */}
            <Accordion title="Product Details">
              <div className="space-y-2 text-neutral-900">
                <p>
                  Color: <span className="font-semibold text-purple-600">{product?.product_attributes.color}</span>
                </p>
                <p>
                  Origin: <span className="font-semibold text-green-600">{product?.product_attributes.origin}</span>
                </p>
                <p>
                  Minimum Vase Life: <span className="font-semibold text-orange-500">{product?.product_attributes.vase_life_days_min} days</span>
                </p>
                <p>
                  Type: <span className="font-semibold text-orange-500">{product?.categorization?.subcategory_name} </span>
                </p>

              </div>
            </Accordion>

            {/* Perfect For */}
            <Accordion title="Perfect For">
              <div className="flex flex-wrap gap-3 mt-2">
                {product.categorization.occasion_tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 font-medium text-xs hover:scale-105 transform transition-all duration-300 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Accordion>


          </div>


          {/* Add-ons */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Enhance Your Gift</h3>
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.care_and_logistics.add_ons.map((addon) => {
                const selected = selectedAddOns.some((a) => a._id === addon._id);
                return (
                  <div
                    key={addon._id}
                    onClick={() => toggleAddon(addon)} // toggles selection
                    className={`relative flex-shrink-0 w-24 rounded-xl border p-2 cursor-pointer transition-all hover:shadow ${selected ? "border-red-600 bg-red-50 shadow" : "border-neutral-200"
                      }`}
                  >
                    {/* Minus sign */}
                    {selected && (
                      <span className="absolute top-1 right-1 text-red-600 font-bold text-lg cursor-pointer">
                        −
                      </span>
                    )}

                    <img
                      src={addon.image_url}
                      alt={addon.name}
                      className="w-full h-20 object-contain mb-1 rounded-lg"
                    />
                    <h4 className="font-medium text-xs truncate">{addon.name}</h4>
                    <p className="mt-1 text-red-600 font-semibold text-xs">₹{addon.selling_price}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <ProductUSPs />

          {/* CTA */}
          {/* <div className="pt-6 flex gap-4">
            <button
              className="flex-1 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition text-sm"
              onClick={() => {
                if (lastCartProductId === (selectedVariant?._id || product.product_id)) {
                  navigate("/cart"); // Go to Cart page
                } else {
                  handleAddToCart(); // Add to cart
                }
              }}
              disabled={isAddonLoader}
            >
              {lastCartProductId === (selectedVariant?._id || product.product_id)
                ? "Go to Cart"
                : isAddonLoader
                  ? "Adding magic ✨"
                  : "Add to Cart"}
            </button>


            <button
              className="flex-1 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm"
              onClick={handleBuyNowClick}
              disabled={isAddonLoader}
            >
              {isAddonLoader ? "Zooming to checkout 🚀" : "Buy Now"}
            </button>

          </div> */}
          {/* CTA Buttons */}
          <div className="lg:static fixed bottom-0 left-0 w-full bg-white p-4 flex gap-4 shadow-lg lg:shadow-none z-50 lg:justify-start lg:gap-4">
            <button
              className="flex-1 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition text-sm"
              onClick={() => {
                if (lastCartProductId === (selectedVariant?._id || product.product_id)) {
                  navigate("/cart");
                } else {
                  handleAddToCart();
                }
              }}
              disabled={isAddonLoader}
            >
              {lastCartProductId === (selectedVariant?._id || product.product_id)
                ? "Go to Cart"
                : isAddonLoader
                  ? "Adding magic ✨"
                  : "Add to Cart"}
            </button>

            <button
              className="flex-1 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm"
              onClick={handleBuyNowClick}
              disabled={isAddonLoader}
            >
              {isAddonLoader ? "Zooming to checkout 🚀" : "Buy Now"}
            </button>
          </div>

        </div>
      </div>
      {addOnOpen && (
        <AddOnModal
          isOpen={addOnOpen}
          onClose={() => setAddOnOpen(false)}
          addOnData={addOnData}
          onProceed={(newAddOns) => {
            if (buyBackProcess) {
              dispatch(
                setBuyNowItem({
                  ...buyNowItem,
                  add_ons: [...selectedAddOns, ...newAddOns],
                })
              );
              setIsDeliveryModalOpen(true)
            } else {
              appendAddOnsToCart(newAddOns);
            }
            setAddOnOpen(false);
          }}
        />
      )}

      <DeliveryModal isOpen={isDeliveryModalOpen} onClose={() => setIsDeliveryModalOpen(false)} />

      <RecentlyViewed />
    </div>
  );
};

export default ProductDescriptionPage;
