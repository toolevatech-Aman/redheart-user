import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Check,
  ArrowLeft,
  Package,
  Truck,
  Shield,
  Heart,
  Sparkles,
  Gift,
  Award
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
        // Select all items by default
        setSelectedItems(cart.map((item, index) => index));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItems([]);
        setIsLoading(false);
      }
    };

    loadCart();
    
    // Listen for storage changes (when cart is updated from other pages)
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        loadCart();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener("cartUpdated", loadCart);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // Update cart count in header when cart changes
  useEffect(() => {
    const event = new CustomEvent("cartCountUpdated");
    window.dispatchEvent(event);
  }, [cartItems]);

  // Toggle item selection
  const toggleItemSelection = (index) => {
    setSelectedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((_, index) => index));
    }
  };

  // Update quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Trigger cart update event
    window.dispatchEvent(new CustomEvent("cartCountUpdated"));
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Update selected items indices
    setSelectedItems((prev) => {
      return prev
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i));
    });
    
    // Trigger cart update event
    window.dispatchEvent(new CustomEvent("cartCountUpdated"));
  };

  // Calculate totals
  const calculateItemTotal = (item) => {
    const itemTotal = item.selling_price * item.quantity;
    const addOnsTotal = (item.add_ons || []).reduce(
      (sum, addOn) => sum + addOn.selling_price * (addOn.quantity || 1),
      0
    );
    return itemTotal + addOnsTotal;
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, index) => {
      return sum + calculateItemTotal(cartItems[index]);
    }, 0);
  };

  const calculateTotalItems = () => {
    return selectedItems.reduce((sum, index) => {
      return sum + cartItems[index].quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalItems = calculateTotalItems();
  const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 10) : 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-accent-rose-600 mx-auto mb-4 animate-pulse" strokeWidth={1.5} />
          <p className="font-body text-grey-600 font-light text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-grey-600 hover:text-accent-rose-600 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={2} />
            <span className="font-body text-sm font-light">Continue Shopping</span>
          </button>

          {/* Empty Cart */}
          <div className="text-center py-12 md:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-grey-50 rounded-lg mb-6 border border-grey-200">
              <ShoppingBag className="w-10 h-10 text-grey-400" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal mb-3 tracking-tight">
              Your Cart is Empty
            </h1>
            <p className="font-body text-grey-600 mb-8 max-w-md mx-auto font-light leading-relaxed text-sm sm:text-base">
              Start shopping to add beautiful flowers to your cart.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light tracking-wide rounded-lg transition-all duration-300 shadow-soft hover:shadow-elegant"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-grey-600 hover:text-accent-rose-600 transition-colors duration-300 mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={2} />
            <span className="font-body text-sm font-light">Continue Shopping</span>
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal tracking-tight mb-1">
              Shopping Cart
            </h1>
            <p className="font-body text-grey-600 font-light text-xs sm:text-sm">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {/* Select All */}
            <div className="bg-grey-50 border border-grey-200 rounded-lg p-3 sm:p-4 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onChange={toggleSelectAll}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border border-grey-300 rounded transition-all duration-300 flex items-center justify-center ${
                    selectedItems.length === cartItems.length && cartItems.length > 0
                      ? "bg-accent-rose-600 border-accent-rose-600"
                      : "bg-primary-white group-hover:border-accent-rose-400"
                  }`}
                >
                  {selectedItems.length === cartItems.length && cartItems.length > 0 && (
                    <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />
                  )}
                </div>
                <span className="font-display text-sm font-light text-black-charcoal">
                  Select All ({selectedItems.length} of {cartItems.length})
                </span>
              </label>
              {selectedItems.length > 0 && (
                <button
                  onClick={() => {
                    const updatedCart = cartItems.filter((_, i) => !selectedItems.includes(i));
                    setCartItems(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    setSelectedItems([]);
                    window.dispatchEvent(new CustomEvent("cartCountUpdated"));
                  }}
                  className="text-accent-rose-600 hover:text-accent-rose-700 font-body text-xs sm:text-sm font-light transition-colors duration-300"
                >
                  Remove Selected
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item, index) => {
                const isSelected = selectedItems.includes(index);
                const itemTotal = calculateItemTotal(item);

                return (
                  <div
                    key={index}
                    className={`group bg-primary-white border transition-all duration-300 ${
                      isSelected
                        ? "border-accent-rose-600 shadow-soft"
                        : "border-grey-200 hover:border-grey-300"
                    }`}
                  >
                    <div className="p-3 sm:p-4 md:p-5">
                      <div className="flex gap-3 sm:gap-4 md:gap-5">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-0.5">
                          <label className="cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleItemSelection(index)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 border transition-all duration-300 flex items-center justify-center ${
                                isSelected
                                  ? "bg-accent-rose-600 border-accent-rose-600"
                                  : "border-grey-300 group-hover:border-accent-rose-400 bg-primary-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />
                              )}
                            </div>
                          </label>
                        </div>

                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden bg-grey-100 border border-grey-200">
                            <img
                              src={item.image_url || "https://via.placeholder.com/200x200/F5F5F5/E0E0E0?text=Product"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/200x200/F5F5F5/E0E0E0?text=Product";
                              }}
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-display text-sm sm:text-base md:text-lg font-light text-black-charcoal mb-0.5 tracking-tight truncate">
                                    {item.name}
                                  </h3>
                                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light mb-2">
                                    {item.variant_name}
                                  </p>
                                </div>
                                {/* Remove Button */}
                                <button
                                  onClick={() => removeItem(index)}
                                  className="flex-shrink-0 p-1.5 sm:p-2 text-grey-400 hover:text-accent-rose-600 hover:bg-accent-rose-50 transition-colors duration-300"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                                </button>
                              </div>
                              
                              {/* Add-ons */}
                              {item.add_ons && item.add_ons.length > 0 && (
                                <div className="mb-2">
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.add_ons.map((addOn, addOnIndex) => (
                                      <span
                                        key={addOnIndex}
                                        className="inline-block px-2 py-0.5 bg-accent-rose-50 text-accent-rose-700 border border-accent-rose-200 text-xs font-body font-light"
                                      >
                                        {addOn.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Price */}
                              <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                                <span className="font-display text-base sm:text-lg font-light text-black-charcoal">
                                  ${item.selling_price.toFixed(2)}
                                </span>
                                {item.original_price > item.selling_price && (
                                  <>
                                    <span className="font-body text-xs text-grey-500 line-through font-light">
                                      ${item.original_price.toFixed(2)}
                                    </span>
                                    <span className="px-1.5 py-0.5 bg-accent-rose-100 text-accent-rose-700 text-[10px] font-body font-light">
                                      Save {Math.round(((item.original_price - item.selling_price) / item.original_price) * 100)}%
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                                <div className="flex items-center border border-grey-200">
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1.5 sm:p-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-grey-50 transition-colors duration-300"
                                  >
                                    <Minus className="w-3.5 h-3.5 text-black-charcoal" strokeWidth={2} />
                                  </button>
                                  <span className="px-3 sm:px-4 py-1.5 font-display text-sm font-light text-black-charcoal min-w-[40px] sm:min-w-[50px] text-center bg-primary-white border-x border-grey-200">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                    className="p-1.5 sm:p-2 hover:bg-grey-50 transition-colors duration-300"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-black-charcoal" strokeWidth={2} />
                                  </button>
                                </div>
                                <div className="text-right sm:text-left">
                                  <p className="font-body text-[10px] text-grey-500 font-light mb-0.5">Total</p>
                                  <span className="font-display text-base sm:text-lg font-light text-black-charcoal">
                                    ${itemTotal.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 lg:top-24 bg-primary-white border border-grey-200 p-4 sm:p-5 md:p-6">
              <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight mb-4 sm:mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-grey-200">
                  <span className="font-body text-xs sm:text-sm text-grey-600 font-light">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-display text-sm sm:text-base font-light text-black-charcoal">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-grey-200">
                  <span className="font-body text-xs sm:text-sm text-grey-600 font-light">
                    Shipping
                  </span>
                  <span className="font-display text-sm sm:text-base font-light text-black-charcoal">
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 50 && (
                  <div className="bg-accent-rose-50 border border-accent-rose-200 p-2.5 sm:p-3">
                    <p className="font-body text-xs text-accent-rose-700 font-light">
                      Add <span className="font-medium">${(50 - subtotal).toFixed(2)}</span> more for free shipping
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-grey-300">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-base sm:text-lg font-light text-black-charcoal">Total</span>
                    <span className="font-display text-xl sm:text-2xl font-light text-black-charcoal">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedItems.length === 0) {
                    alert("Please select at least one item to checkout");
                    return;
                  }
                  // Filter cart to only selected items and save to localStorage
                  const checkoutItems = cartItems.filter((_, i) => selectedItems.includes(i));
                  localStorage.setItem("cart", JSON.stringify(checkoutItems));
                  window.dispatchEvent(new CustomEvent("cartCountUpdated"));
                  navigate("/checkout");
                }}
                disabled={selectedItems.length === 0}
                className="w-full px-4 py-3 sm:py-3.5 bg-accent-rose-600 hover:bg-accent-rose-700 disabled:bg-grey-300 disabled:cursor-not-allowed text-primary-white font-body text-sm font-light tracking-wide rounded-full transition-colors duration-300 shadow-soft hover:shadow-elegant mb-4 sm:mb-5"
              >
                Checkout ({selectedItems.length} {selectedItems.length === 1 ? "item" : "items"})
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-grey-200">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-4 h-4 text-accent-rose-600 mb-1" strokeWidth={2} />
                  <span className="font-body text-[10px] text-grey-700 font-light">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-4 h-4 text-accent-rose-600 mb-1" strokeWidth={2} />
                  <span className="font-body text-[10px] text-grey-700 font-light">Secure</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Package className="w-4 h-4 text-accent-rose-600 mb-1" strokeWidth={2} />
                  <span className="font-body text-[10px] text-grey-700 font-light">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

