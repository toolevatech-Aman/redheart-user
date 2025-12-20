import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Tag,
  Package,
  Truck,
  Shield,
  Lock,
  Check,
  Edit2,
  Trash2,
  X,
  Home,
  Building2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Address management
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [billingAddressType, setBillingAddressType] = useState("manual"); // "saved" or "manual"
  const [shippingAddressType, setShippingAddressType] = useState("manual"); // "saved" or "manual"
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Accordion states
  const [openSections, setOpenSections] = useState({
    products: true,
    billing: true,
    shipping: true,
    payment: true,
    coupons: true
  });

  // Custom dropdown states
  const [showBillingCountryDropdown, setShowBillingCountryDropdown] = useState(false);
  const [showShippingCountryDropdown, setShowShippingCountryDropdown] = useState(false);
  const [showModalCountryDropdown, setShowModalCountryDropdown] = useState(false);

  const countries = ["United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "Italy", "Spain", "Japan"];

  // Form states
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    addressType: "home"
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const [shippingAddress, setShippingAddress] = useState({
    sameAsBilling: true,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  // Load cart and saved addresses from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
        const addresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
        setSavedAddresses(addresses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setCartItems([]);
        setSavedAddresses([]);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.country-dropdown-container')) {
        setShowBillingCountryDropdown(false);
        setShowShippingCountryDropdown(false);
        setShowModalCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save addresses to localStorage
  const saveAddressesToStorage = (addresses) => {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
    setSavedAddresses(addresses);
  };

  // Add new address
  const handleAddAddress = () => {
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.address || 
        !billingInfo.city || !billingInfo.zipCode) {
      alert("Please fill in all required fields");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      ...billingInfo,
      label: `${billingInfo.firstName} ${billingInfo.lastName} - ${billingInfo.addressType === "home" ? "Home" : "Work"}`
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    saveAddressesToStorage(updatedAddresses);
    setShowAddAddressModal(false);
    setBillingInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      addressType: "home"
    });
  };

  // Edit address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setBillingInfo(address);
    setShowAddAddressModal(true);
  };

  // Update address
  const handleUpdateAddress = () => {
    if (!editingAddress) return;

    const updatedAddresses = savedAddresses.map(addr =>
      addr.id === editingAddress.id
        ? { ...billingInfo, id: editingAddress.id, label: `${billingInfo.firstName} ${billingInfo.lastName} - ${billingInfo.addressType === "home" ? "Home" : "Work"}` }
        : addr
    );

    saveAddressesToStorage(updatedAddresses);
    setShowAddAddressModal(false);
    setEditingAddress(null);
    setBillingInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      addressType: "home"
    });
  };

  // Delete address
  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
      saveAddressesToStorage(updatedAddresses);
      if (selectedBillingAddress?.id === id) {
        setSelectedBillingAddress(null);
        setBillingAddressType("manual");
      }
      if (selectedShippingAddress?.id === id) {
        setSelectedShippingAddress(null);
        setShippingAddressType("manual");
      }
    }
  };

  // Select saved billing address
  const handleSelectBillingAddress = (address) => {
    setSelectedBillingAddress(address);
    setBillingInfo(address);
  };

  // Select saved shipping address
  const handleSelectShippingAddress = (address) => {
    setSelectedShippingAddress(address);
    setShippingAddress({
      sameAsBilling: false,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country
    });
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

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const shipping = subtotal >= 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - couponDiscount;

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") return;
    
    const coupons = {
      "SAVE10": { discount: 10, type: "percentage" },
      "FLOWER20": { discount: 20, type: "percentage" },
      "FREESHIP": { discount: shipping, type: "fixed" }
    };

    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon(couponCode.toUpperCase());
      if (coupon.type === "percentage") {
        setCouponDiscount((subtotal * coupon.discount) / 100);
      } else {
        setCouponDiscount(coupon.discount);
      }
    } else {
      alert("Invalid coupon code");
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
  };

  // Handle form changes
  const handleBillingChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (value.length > 5) return;
    }
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) return;
    }
    setCardInfo({
      ...cardInfo,
      [e.target.name]: value
    });
  };

  // Toggle accordion section
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle place order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate billing
    if (billingAddressType === "saved" && !selectedBillingAddress) {
      alert("Please select a saved billing address");
      return;
    }
    if (billingAddressType === "manual" && (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || 
        !billingInfo.address || !billingInfo.city || !billingInfo.zipCode)) {
      alert("Please fill in all required billing fields");
      return;
    }

    // Validate shipping
    if (!shippingAddress.sameAsBilling) {
      if (shippingAddressType === "saved" && !selectedShippingAddress) {
        alert("Please select a saved shipping address");
        return;
      }
      if (shippingAddressType === "manual" && (!shippingAddress.address || 
          !shippingAddress.city || !shippingAddress.zipCode)) {
        alert("Please fill in shipping address");
        return;
      }
    }

    // Validate payment
    if (paymentMethod === "card" && (!cardInfo.cardNumber || !cardInfo.cardName || 
        !cardInfo.expiryDate || !cardInfo.cvv)) {
      alert("Please fill in all card details");
      return;
    }

    // Process order
    alert("Order placed successfully! Redirecting...");
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartCountUpdated"));
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-accent-rose-600 mx-auto mb-4 animate-pulse" strokeWidth={1.5} />
          <p className="font-body text-grey-600 font-light text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-grey-600 hover:text-accent-rose-600 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={2} />
            <span className="font-body text-sm font-light">Back to Cart</span>
          </button>
          <div className="text-center py-12 md:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-grey-50 rounded-lg mb-6 border border-grey-200">
              <Package className="w-10 h-10 text-grey-400" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal mb-3 tracking-tight">
              Your Cart is Empty
            </h1>
            <p className="font-body text-grey-600 mb-8 max-w-md mx-auto font-light leading-relaxed text-sm sm:text-base">
              Add items to your cart to proceed with checkout.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light tracking-wide rounded-full transition-colors duration-300 shadow-soft hover:shadow-elegant"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-grey-600 hover:text-accent-rose-600 transition-colors duration-300 mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={2} />
            <span className="font-body text-sm font-light">Back to Cart</span>
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal tracking-tight mb-1">
              Checkout
            </h1>
            <p className="font-body text-grey-600 font-light text-xs sm:text-sm">
              Complete your order securely
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Products Section */}
              <div className="bg-primary-white border border-grey-200">
                <button
                  type="button"
                  onClick={() => toggleSection("products")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Order Items
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs text-grey-600 font-light">
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </span>
                    {openSections.products ? (
                      <ChevronUp className="w-5 h-5 text-grey-600" strokeWidth={2} />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-grey-600" strokeWidth={2} />
                    )}
                  </div>
                </button>
                {openSections.products && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                    <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item, index) => {
                    const itemTotal = calculateItemTotal(item);
                    return (
                      <div key={index} className="flex gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-grey-200 last:border-0 last:pb-0">
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
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm sm:text-base font-light text-black-charcoal mb-1 tracking-tight truncate">
                            {item.name}
                          </h3>
                          <p className="font-body text-xs sm:text-sm text-grey-600 font-light mb-1">
                            {item.variant_name} × {item.quantity}
                          </p>
                          {item.add_ons && item.add_ons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.add_ons.map((addOn, addOnIndex) => (
                                <span
                                  key={addOnIndex}
                                  className="inline-block px-2 py-0.5 bg-accent-rose-50 text-accent-rose-700 border border-accent-rose-200 text-[10px] sm:text-xs font-body font-light"
                                >
                                  {addOn.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="font-display text-sm sm:text-base font-light text-black-charcoal">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="bg-primary-white border border-grey-200">
                <button
                  type="button"
                  onClick={() => toggleSection("billing")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Billing Address
                  </h2>
                  {openSections.billing ? (
                    <ChevronUp className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  )}
                </button>
                {openSections.billing && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                    {/* Address Type Selection */}
                    <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-grey-50 border border-grey-200">
                      <p className="font-body text-xs sm:text-sm font-light text-black-charcoal mb-3">Select Address Type:</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex items-center gap-2 cursor-pointer p-2 border-2 border-grey-200 hover:border-accent-rose-300 transition-colors duration-300 flex-1">
                          <input
                            type="radio"
                            name="billingAddressType"
                            value="saved"
                            checked={billingAddressType === "saved"}
                            onChange={(e) => {
                              setBillingAddressType(e.target.value);
                              if (e.target.value === "manual") {
                                setSelectedBillingAddress(null);
                              }
                            }}
                            className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                          />
                          <span className="font-body text-sm font-light text-black-charcoal">Use Saved Address</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 border-2 border-grey-200 hover:border-accent-rose-300 transition-colors duration-300 flex-1">
                          <input
                            type="radio"
                            name="billingAddressType"
                            value="manual"
                            checked={billingAddressType === "manual"}
                            onChange={(e) => {
                              setBillingAddressType(e.target.value);
                              if (e.target.value === "saved") {
                                setSelectedBillingAddress(null);
                              }
                            }}
                            className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                          />
                          <span className="font-body text-sm font-light text-black-charcoal">Enter Manually</span>
                        </label>
                      </div>
                    </div>

                    {billingAddressType === "saved" ? (
                  <div className="space-y-3">
                    {savedAddresses.length === 0 ? (
                      <div className="text-center py-6 border border-grey-200 bg-grey-50">
                        <p className="font-body text-sm text-grey-600 font-light mb-3">No saved addresses</p>
                        <button
                          type="button"
                          onClick={() => {
                            setBillingAddressType("manual");
                            setShowAddAddressModal(true);
                          }}
                          className="px-4 py-2 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-xs font-light transition-colors duration-300 rounded-full"
                        >
                          Add Address
                        </button>
                      </div>
                    ) : (
                      savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-4 border-2 cursor-pointer transition-all duration-300 ${
                            selectedBillingAddress?.id === address.id
                              ? "border-accent-rose-600 bg-accent-rose-50/30"
                              : "border-grey-200 hover:border-grey-300 bg-primary-white"
                          }`}
                          onClick={() => handleSelectBillingAddress(address)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {address.addressType === "home" ? (
                                  <Home className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
                                ) : (
                                  <Building2 className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
                                )}
                                <span className="font-display text-sm font-light text-black-charcoal">
                                  {address.firstName} {address.lastName}
                                </span>
                                <span className="px-2 py-0.5 bg-grey-100 text-grey-600 text-[10px] font-body font-light uppercase">
                                  {address.addressType}
                                </span>
                              </div>
                              <p className="font-body text-xs sm:text-sm text-grey-600 font-light mb-1">
                                {address.address}
                              </p>
                              <p className="font-body text-xs sm:text-sm text-grey-600 font-light">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="font-body text-xs text-grey-500 font-light mt-1">
                                {address.email} {address.phone && `• ${address.phone}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {selectedBillingAddress?.id === address.id && (
                                <div className="w-5 h-5 bg-accent-rose-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address);
                                }}
                                className="p-1.5 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300"
                              >
                                <Edit2 className="w-4 h-4" strokeWidth={2} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(address.id);
                                }}
                                className="p-1.5 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        First Name <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={billingInfo.firstName}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Last Name <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={billingInfo.lastName}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Email <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Address <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        City <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={billingInfo.state}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        ZIP Code <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={billingInfo.zipCode}
                        onChange={handleBillingChange}
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div className="relative country-dropdown-container">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Country
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowBillingCountryDropdown(!showBillingCountryDropdown);
                          setShowShippingCountryDropdown(false);
                          setShowModalCountryDropdown(false);
                        }}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300 flex items-center justify-between"
                      >
                        <span>{billingInfo.country}</span>
                        <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${showBillingCountryDropdown ? 'rotate-180' : ''}`} strokeWidth={2} />
                      </button>
                      {showBillingCountryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-primary-white border border-grey-200 shadow-elegant max-h-48 overflow-y-auto">
                          {countries.map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => {
                                setBillingInfo({ ...billingInfo, country });
                                setShowBillingCountryDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 font-body text-sm font-light hover:bg-grey-50 transition-colors duration-300 ${
                                billingInfo.country === country ? 'bg-accent-rose-50 text-accent-rose-600' : 'text-black-charcoal'
                              }`}
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Address Type
                      </label>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addressType"
                            value="home"
                            checked={billingInfo.addressType === "home"}
                            onChange={handleBillingChange}
                            className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                          />
                          <Home className="w-4 h-4 text-grey-600" strokeWidth={2} />
                          <span className="font-body text-sm font-light text-black-charcoal">Home</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addressType"
                            value="work"
                            checked={billingInfo.addressType === "work"}
                            onChange={handleBillingChange}
                            className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                          />
                          <Building2 className="w-4 h-4 text-grey-600" strokeWidth={2} />
                          <span className="font-body text-sm font-light text-black-charcoal">Work</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                    {billingAddressType === "manual" && (
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(true)}
                        className="mt-4 px-4 py-2 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-xs font-light transition-colors duration-300 rounded-full"
                      >
                        Save This Address
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className="bg-primary-white border border-grey-200">
                <button
                  type="button"
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <Truck className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Shipping Address
                  </h2>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={shippingAddress.sameAsBilling}
                        onChange={(e) => {
                          setShippingAddress({ ...shippingAddress, sameAsBilling: e.target.checked });
                          setShippingAddressType("manual");
                          setSelectedShippingAddress(null);
                        }}
                        className="w-4 h-4 border border-grey-300 text-accent-rose-600 focus:ring-accent-rose-600"
                      />
                      <span className="font-body text-xs sm:text-sm font-light text-black-charcoal">
                        Same as billing
                      </span>
                    </label>
                    {openSections.shipping ? (
                      <ChevronUp className="w-5 h-5 text-grey-600" strokeWidth={2} />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-grey-600" strokeWidth={2} />
                    )}
                  </div>
                </button>
                {openSections.shipping && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                    {!shippingAddress.sameAsBilling && (
                      <>
                        {/* Address Type Selection */}
                        <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-grey-50 border border-grey-200">
                          <p className="font-body text-xs sm:text-sm font-light text-black-charcoal mb-3">Select Address Type:</p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <label className="flex items-center gap-2 cursor-pointer p-2 border-2 border-grey-200 hover:border-accent-rose-300 transition-colors duration-300 flex-1">
                              <input
                                type="radio"
                                name="shippingAddressType"
                                value="saved"
                                checked={shippingAddressType === "saved"}
                                onChange={(e) => {
                                  setShippingAddressType(e.target.value);
                                  if (e.target.value === "manual") {
                                    setSelectedShippingAddress(null);
                                  }
                                }}
                                className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                              />
                              <span className="font-body text-sm font-light text-black-charcoal">Use Saved Address</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-2 border-2 border-grey-200 hover:border-accent-rose-300 transition-colors duration-300 flex-1">
                              <input
                                type="radio"
                                name="shippingAddressType"
                                value="manual"
                                checked={shippingAddressType === "manual"}
                                onChange={(e) => {
                                  setShippingAddressType(e.target.value);
                                  if (e.target.value === "saved") {
                                    setSelectedShippingAddress(null);
                                  }
                                }}
                                className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                              />
                              <span className="font-body text-sm font-light text-black-charcoal">Enter Manually</span>
                            </label>
                          </div>
                        </div>
                        {shippingAddressType === "saved" ? (
                      <div className="space-y-3">
                        {savedAddresses.length === 0 ? (
                          <div className="text-center py-6 border border-grey-200 bg-grey-50">
                            <p className="font-body text-sm text-grey-600 font-light mb-3">No saved addresses</p>
                            <button
                              type="button"
                              onClick={() => setShippingAddressType("manual")}
                              className="px-4 py-2 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-xs font-light transition-colors duration-300 rounded-full"
                            >
                              Enter Manually
                            </button>
                          </div>
                        ) : (
                          savedAddresses.map((address) => (
                            <div
                              key={address.id}
                              className={`p-4 border-2 cursor-pointer transition-all duration-300 ${
                                selectedShippingAddress?.id === address.id
                                  ? "border-accent-rose-600 bg-accent-rose-50/30"
                                  : "border-grey-200 hover:border-grey-300 bg-primary-white"
                              }`}
                              onClick={() => handleSelectShippingAddress(address)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {address.addressType === "home" ? (
                                      <Home className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
                                    ) : (
                                      <Building2 className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
                                    )}
                                    <span className="font-display text-sm font-light text-black-charcoal">
                                      {address.firstName} {address.lastName}
                                    </span>
                                    <span className="px-2 py-0.5 bg-grey-100 text-grey-600 text-[10px] font-body font-light uppercase">
                                      {address.addressType}
                                    </span>
                                  </div>
                                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light mb-1">
                                    {address.address}
                                  </p>
                                  <p className="font-body text-xs sm:text-sm text-grey-600 font-light">
                                    {address.city}, {address.state} {address.zipCode}
                                  </p>
                                </div>
                                {selectedShippingAddress?.id === address.id && (
                                  <div className="w-5 h-5 bg-accent-rose-600 rounded-full flex items-center justify-center ml-4">
                                    <Check className="w-3 h-3 text-primary-white" strokeWidth={3} />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                            Address <span className="text-accent-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            required={!shippingAddress.sameAsBilling}
                            className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                            City <span className="text-accent-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            required={!shippingAddress.sameAsBilling}
                            className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                            State
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.state}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                            className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                            ZIP Code <span className="text-accent-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                            required={!shippingAddress.sameAsBilling}
                            className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                          />
                        </div>
                        <div className="relative country-dropdown-container">
                          <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                            Country
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowShippingCountryDropdown(!showShippingCountryDropdown);
                              setShowBillingCountryDropdown(false);
                              setShowModalCountryDropdown(false);
                            }}
                            className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300 flex items-center justify-between"
                          >
                            <span>{shippingAddress.country}</span>
                            <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${showShippingCountryDropdown ? 'rotate-180' : ''}`} strokeWidth={2} />
                          </button>
                          {showShippingCountryDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-primary-white border border-grey-200 shadow-elegant max-h-48 overflow-y-auto">
                              {countries.map((country) => (
                                <button
                                  key={country}
                                  type="button"
                                  onClick={() => {
                                    setShippingAddress({ ...shippingAddress, country });
                                    setShowShippingCountryDropdown(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 font-body text-sm font-light hover:bg-grey-50 transition-colors duration-300 ${
                                    shippingAddress.country === country ? 'bg-accent-rose-50 text-accent-rose-600' : 'text-black-charcoal'
                                  }`}
                                >
                                  {country}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-primary-white border border-grey-200">
                <button
                  type="button"
                  onClick={() => toggleSection("payment")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-grey-50 transition-colors duration-300"
                >
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Payment Method
                  </h2>
                  {openSections.payment ? (
                    <ChevronUp className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  )}
                </button>
                {openSections.payment && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                <div className="space-y-3 mb-4">
                  <label className="flex items-center gap-3 p-3 sm:p-4 border-2 border-grey-200 cursor-pointer hover:border-accent-rose-300 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                    />
                    <CreditCard className="w-5 h-5 text-grey-600 group-hover:text-accent-rose-600 transition-colors duration-300" strokeWidth={2} />
                    <span className="font-body text-sm font-light text-black-charcoal">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 sm:p-4 border-2 border-grey-200 cursor-pointer hover:border-accent-rose-300 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                    />
                    <span className="font-body text-sm font-light text-black-charcoal">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 sm:p-4 border-2 border-grey-200 cursor-pointer hover:border-accent-rose-300 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                    />
                    <span className="font-body text-sm font-light text-black-charcoal">Cash on Delivery</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-grey-200">
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Card Number <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength={19}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Cardholder Name <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        Expiry Date <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardInfo.expiryDate}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                        CVV <span className="text-accent-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        required
                        maxLength={3}
                        className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="pt-4 border-t border-grey-200">
                    <p className="font-body text-sm text-grey-600 font-light">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="pt-4 border-t border-grey-200">
                    <p className="font-body text-sm text-grey-600 font-light">
                      Pay with cash when your order is delivered.
                    </p>
                  </div>
                )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary & Coupons */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Coupons & Offers */}
              <div className="bg-primary-white border border-grey-200">
                <button
                  type="button"
                  onClick={() => toggleSection("coupons")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-grey-50 transition-colors duration-300"
                >
                  <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight flex items-center gap-2">
                    <Tag className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                    Coupons & Offers
                  </h2>
                  {openSections.coupons ? (
                    <ChevronUp className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-grey-600" strokeWidth={2} />
                  )}
                </button>
                {openSections.coupons && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                {appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent-rose-50 border border-accent-rose-200">
                      <div>
                        <p className="font-body text-sm font-light text-accent-rose-700">
                          {appliedCoupon}
                        </p>
                        <p className="font-body text-xs text-grey-600 font-light">
                          Applied
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-accent-rose-600 hover:text-accent-rose-700 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2.5 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light transition-colors duration-300 rounded-full"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="pt-3 border-t border-grey-200">
                      <p className="font-body text-xs text-grey-600 font-light mb-2">Available Offers:</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between p-2 bg-grey-50 border border-grey-200">
                          <span className="font-body text-xs font-light text-black-charcoal">SAVE10</span>
                          <span className="font-body text-xs font-light text-accent-rose-600">10% OFF</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-grey-50 border border-grey-200">
                          <span className="font-body text-xs font-light text-black-charcoal">FLOWER20</span>
                          <span className="font-body text-xs font-light text-accent-rose-600">20% OFF</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-grey-50 border border-grey-200">
                          <span className="font-body text-xs font-light text-black-charcoal">FREESHIP</span>
                          <span className="font-body text-xs font-light text-accent-rose-600">Free Shipping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="sticky top-20 lg:top-24 bg-primary-white border border-grey-200 p-4 sm:p-5 md:p-6">
                <h2 className="font-display text-lg sm:text-xl font-light text-black-charcoal tracking-tight mb-4 sm:mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-grey-200">
                    <span className="font-body text-xs sm:text-sm text-grey-600 font-light">
                      Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
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

                  <div className="flex justify-between items-center pb-2 border-b border-grey-200">
                    <span className="font-body text-xs sm:text-sm text-grey-600 font-light">
                      Tax
                    </span>
                    <span className="font-display text-sm sm:text-base font-light text-black-charcoal">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center pb-2 border-b border-grey-200">
                      <span className="font-body text-xs sm:text-sm text-grey-600 font-light">
                        Discount ({appliedCoupon})
                      </span>
                      <span className="font-display text-sm sm:text-base font-light text-success">
                        -${couponDiscount.toFixed(2)}
                      </span>
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
                  type="submit"
                  className="w-full px-4 py-3 sm:py-3.5 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light tracking-wide rounded-full transition-colors duration-300 shadow-soft hover:shadow-elegant mb-4 sm:mb-5 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" strokeWidth={2} />
                  Place Order
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
        </form>

        {/* Add/Edit Address Modal */}
        {showAddAddressModal && (
          <div 
            className="fixed inset-0 bg-black-soft/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAddAddressModal(false);
                setEditingAddress(null);
                setBillingInfo({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "United States",
                  addressType: "home"
                });
              }
            }}
          >
            <div className="bg-primary-white border border-grey-200 p-5 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl sm:text-2xl font-light text-black-charcoal tracking-tight">
                  {editingAddress ? "Edit Address" : "Save Address"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAddressModal(false);
                    setEditingAddress(null);
                    setBillingInfo({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      address: "",
                      city: "",
                      state: "",
                      zipCode: "",
                      country: "United States",
                      addressType: "home"
                    });
                  }}
                  className="p-1.5 text-grey-400 hover:text-accent-rose-600 transition-colors duration-300"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    First Name <span className="text-accent-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Last Name <span className="text-accent-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Address <span className="text-accent-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    City <span className="text-accent-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingChange}
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    ZIP Code <span className="text-accent-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingChange}
                    required
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div className="relative country-dropdown-container">
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Country
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModalCountryDropdown(!showModalCountryDropdown);
                      setShowBillingCountryDropdown(false);
                      setShowShippingCountryDropdown(false);
                    }}
                    className="w-full px-3 py-2.5 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300 flex items-center justify-between"
                  >
                    <span>{billingInfo.country}</span>
                    <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${showModalCountryDropdown ? 'rotate-180' : ''}`} strokeWidth={2} />
                  </button>
                  {showModalCountryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-primary-white border border-grey-200 shadow-elegant max-h-48 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => {
                            setBillingInfo({ ...billingInfo, country });
                            setShowModalCountryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 font-body text-sm font-light hover:bg-grey-50 transition-colors duration-300 ${
                            billingInfo.country === country ? 'bg-accent-rose-50 text-accent-rose-600' : 'text-black-charcoal'
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-body text-xs sm:text-sm font-light text-black-charcoal mb-1.5">
                    Address Type
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value="home"
                        checked={billingInfo.addressType === "home"}
                        onChange={handleBillingChange}
                        className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                      />
                      <Home className="w-4 h-4 text-grey-600" strokeWidth={2} />
                      <span className="font-body text-sm font-light text-black-charcoal">Home</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value="work"
                        checked={billingInfo.addressType === "work"}
                        onChange={handleBillingChange}
                        className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600"
                      />
                      <Building2 className="w-4 h-4 text-grey-600" strokeWidth={2} />
                      <span className="font-body text-sm font-light text-black-charcoal">Work</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                  className="flex-1 px-4 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light transition-colors duration-300 rounded-full"
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAddressModal(false);
                    setEditingAddress(null);
                    setBillingInfo({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      address: "",
                      city: "",
                      state: "",
                      zipCode: "",
                      country: "United States",
                      addressType: "home"
                    });
                  }}
                  className="px-4 py-3 bg-grey-100 hover:bg-grey-200 text-black-charcoal font-body text-sm font-light transition-colors duration-300 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
