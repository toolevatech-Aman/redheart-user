import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Pencil, Truck, MapPin } from "lucide-react";
import logo from "../../assets/RedHeart-Logo-Cropped.png";
import { getProduct } from "../../service/products";
import { MEGA_MENU } from "../../constants/megaMenuData";
import { useSelector } from "react-redux";
import { getProductUrl } from "../../utils/seoUtils";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMobileGroup, setActiveMobileGroup] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [deliveryLocation, setDeliveryLocation] = useState("Detecting location...");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const totalCount = useSelector((state) => state.cart.totalCount);

  // Scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("cartCountUpdated", updateCartCount);
    window.addEventListener("storage", (e) => e.key === "cart" && updateCartCount());
    return () => window.removeEventListener("cartCountUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const handleClickOutsideMobileSearch = (e) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
        setIsDropdownOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutsideMobileSearch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMobileSearch);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobileSearch);
    };
  }, [isSearchOpen]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        const fetchSearchResults = async () => {
          setIsDropdownOpen(true);
          setLoading(true);
          try {
            const payload = { searchField: searchQuery, limit: 5 };
            const res = await getProduct(payload);
            setProducts(res.products || []);
          } catch (err) {
            console.error("API ERROR:", err);
            setProducts([]);
          } finally {
            setLoading(false);
          }
        };
        fetchSearchResults();
      } else {
        setProducts([]);
        setIsDropdownOpen(false);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getReadableLocation = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch location details");
    }
    const data = await response.json();
    const address = data?.address || {};
    const primary =
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      address.county;
    const secondary = address.state || address.country;
    if (primary && secondary) return `${primary}, ${secondary}`;
    if (primary) return primary;
    return data?.display_name?.split(",").slice(0, 2).join(", ") || "Current location";
  };

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      setDeliveryLocation("Location unavailable");
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationText = await getReadableLocation(latitude, longitude);
          setDeliveryLocation(locationText);
        } catch (error) {
          setDeliveryLocation("Location unavailable");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setDeliveryLocation("Enable location");
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  useEffect(() => {
    detectUserLocation();
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchQuery("");
    if (open) {
      setOpen(false);
      setActiveMenu(null);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsDropdownOpen(true);
    setLoading(true);

    try {
      const payload = { searchField: searchQuery, limit: 5 };
      const res = await getProduct(payload);
      setProducts(res.products || []);
    } catch (err) {
      console.error("API ERROR:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const closeSidebar = () => {
    setOpen(false);
    setActiveMenu(null);
    setActiveMobileGroup({});
  };

  // Check if a nav item is active based on current path
  const isNavActive = (menuUrl) => {
    const topSlug = menuUrl.replace(/^\//, '');
    return location.pathname === menuUrl || location.pathname.startsWith(`${menuUrl}/`);
  };

  const toggleMobileGroup = (menuIndex, groupIndex) => {
    const key = `${menuIndex}-${groupIndex}`;
    setActiveMobileGroup(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-primary-white border-b border-grey-100 transition-all duration-500 ${isScrolled ? "shadow-elegant" : ""}`}
      >
        <nav className="w-full">
          {/* Top Row */}
          <div className="flex items-center justify-between py-[2px] px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center justify-center flex-shrink-0">
              <a href="/">
                <img
                  src={logo}
                  alt="RedHeart Logo"
                  className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
                />
              </a>
            </div>

            <button
              type="button"
              onClick={detectUserLocation}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#eaf6ff] border border-[#d7e9f7] hover:bg-[#e2f2ff] transition-colors"
            >
              <MapPin className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
              <span className="text-xs font-body font-medium text-black-charcoal max-w-[160px] truncate">
                {isDetectingLocation ? "Detecting..." : deliveryLocation}
              </span>
              <Pencil className="w-3.5 h-3.5 text-grey-600" strokeWidth={2} />
            </button>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex relative flex-1 max-w-xl mx-6"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" strokeWidth={1.5} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for"
                className="w-full pl-12 pr-10 py-2 text-sm font-body text-black-charcoal bg-grey-50 border border-grey-200 rounded-md focus:outline-none focus:border-accent-rose-400 focus:bg-primary-white transition-all duration-300 placeholder:text-grey-400"
              />

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full left-0 mt-2 w-full bg-white border border-grey-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <button
                        type="button"
                        key={product._id}
                        onClick={() => {
                          const cat = product.categorization?.category_name || product.category || '';
                          const sku = product.sku || product.product_id || '';
                          navigate(getProductUrl(cat, product.slug, sku), { state: { id: product._id } });
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-grey-100 transition-all"
                      >
                        <img
                          src={product.media.primary_image_url}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-full mr-3"
                        />
                        <span className="text-sm font-medium text-black">{product.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-grey-500">No results found</div>
                  )}
                </div>
              )}
            </form>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                type="button"
                className="flex flex-col items-center text-black-charcoal hover:text-accent-rose-600 transition-colors"
              >
                <Truck className="w-6 h-6" strokeWidth={1.75} />
                <span className="text-[11px] leading-4 font-body">Track Order</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const authToken = localStorage.getItem("authToken");
                  navigate(authToken ? "/my-account" : "/login");
                }}
                className="flex flex-col items-center text-black-charcoal hover:text-accent-rose-600 transition-colors"
              >
                <User className="w-6 h-6" strokeWidth={1.75} />
                <span className="text-[11px] leading-4 font-body">Sign In</span>
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="relative flex flex-col items-center text-black-charcoal hover:text-accent-rose-600 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
                <span className="text-[11px] leading-4 font-body">Cart</span>
                {totalCount > 0 && (
                  <span className="absolute -top-1 right-0 bg-gradient-to-br from-accent-rose-500 to-accent-pink-600 text-primary-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center space-x-1.5">
              <button
                onClick={handleSearchClick}
                className={`p-2 text-black-charcoal focus:outline-none transition-all duration-300 hover:text-accent-rose-600 hover:bg-grey-50 rounded-full ${isSearchOpen ? "text-accent-rose-600 bg-accent-rose-50" : ""}`}
              >
                <Search className="w-6 h-6" strokeWidth={2} />
              </button>
              {isSearchOpen && (
                <div className="absolute top-20 left-0 w-full px-4 z-50" ref={mobileSearchRef}>
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for flowers, bouquets, gifts..."
                      className="w-full pl-12 pr-4 py-3 text-sm rounded-full border border-grey-200 focus:outline-none focus:border-accent-rose-400"
                    />
                  </form>

                  {isDropdownOpen && (
                    <div ref={dropdownRef} className="mt-2 w-full bg-white border border-grey-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                      {loading ? (
                        <div className="flex justify-center py-4">
                          <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : products.length > 0 ? (
                        products.map((product) => (
                          <button
                            key={product._id}
                            onClick={() => {
                              const cat = product.categorization?.category_name || '';
                              const sku = product.sku || product.product_id || '';
                              navigate(getProductUrl(cat, product.slug, sku), { state: { id: product.product_id } });
                              setIsDropdownOpen(false);
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 hover:bg-grey-100 transition-all"
                          >
                            <img
                              src={product.media.primary_image_url}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-full mr-3"
                            />
                            <span className="text-sm font-medium text-black">{product.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-grey-500">No results found</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                className="p-2 text-black-charcoal focus:outline-none transition-all duration-300 hover:text-accent-rose-600 hover:bg-grey-50 rounded-full"
                onClick={() => setOpen(!open)}
              >
                {open ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Second Row — Desktop Mega Menu */}
          <div className="hidden lg:flex justify-center bg-primary-white border-t border-grey-200">
            <ul className="relative flex items-center space-x-1 xl:space-x-2 px-4">
              {MEGA_MENU.map((menu, index) => {
                const active = isNavActive(menu.url);
                return (
                  <li key={index} className="group relative">
                    <button
                      onClick={() => navigate(menu.url)}
                      className={`px-3 py-2.5 text-[15px] font-body font-normal transition-all duration-300 whitespace-nowrap ${active ? "text-red-600" : "text-black-charcoal hover:text-accent-rose-600"}`}
                    >
                      {menu.title}
                    </button>

                    {/* Mega Dropdown */}
                    <div className="absolute hidden group-hover:block top-full pt-1 left-1/2 -translate-x-1/2 z-50">
                      <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 overflow-hidden relative w-[min(1100px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] max-h-[70vh]">
                        {/* Arrow */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>

                        {/* Groups grid */}
                        <div className="flex flex-row gap-8 overflow-x-auto overflow-y-auto pb-2 max-h-[58vh] hide-scrollbar">
                          {menu.groups.map((group, gi) => (
                            <div key={gi} className="min-w-[150px] max-w-[200px] flex flex-col flex-shrink-0">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100 whitespace-nowrap">
                                {group.heading}
                              </p>
                              <ul className="space-y-1">
                                {group.items.map((item, ii) => (
                                  <li key={ii}>
                                    <button
                                      onClick={() => navigate(item.url)}
                                      className="block w-full text-left text-sm text-gray-700 hover:text-red-600 py-1 transition-colors duration-150 whitespace-nowrap"
                                    >
                                      {item.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              {/* Internship Program — standalone link with flashing NEW tag */}
              <li className="relative">
                <button
                  onClick={() => navigate("/hiring-for-internship")}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-[15px] font-body font-normal text-black-charcoal hover:text-accent-rose-600 transition-all duration-300 whitespace-nowrap"
                >
                  Internship Program
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-600 text-white uppercase tracking-wide animate-pulse">
                    New
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
          >
            <div
              className={`absolute inset-0 bg-black-soft/60 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
              onClick={closeSidebar}
            ></div>
            <aside
              className={`absolute right-0 top-0 h-full w-full max-w-sm bg-primary-white shadow-premium transform transition-transform duration-400 overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-b from-primary-white to-grey-50/30 border-b border-grey-200 px-6 py-5 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <img src={logo} alt="RedHeart Logo" className="h-8 w-auto" />
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-full text-grey-700 hover:text-accent-rose-600 hover:bg-grey-100 transition-all duration-300"
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="grid grid-cols-3 gap-3 pb-6 border-b border-grey-200 mb-6">
                  <button
                    onClick={() => {
                      closeSidebar();
                      setIsSearchOpen(true);
                    }}
                    className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group"
                  >
                    <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300">
                      <Search className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-body font-medium">Search</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/cart");
                      closeSidebar();
                    }}
                    className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group relative"
                  >
                    <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300 relative">
                      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent-rose-500 to-accent-pink-600 text-primary-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                          {cartCount > 99 ? "99+" : cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-body font-medium">Cart</span>
                  </button>
                  <button
                    onClick={() => {
                      const authToken = localStorage.getItem("authToken");
                      navigate(authToken ? "/my-account" : "/login");
                      setOpen(false);
                    }}
                    className="flex flex-col items-center justify-center space-y-2 px-3 py-4 bg-gradient-to-br from-grey-50 to-grey-100/50 hover:from-accent-rose-50 hover:to-accent-pink-50 rounded-xl transition-all duration-300 text-grey-700 hover:text-accent-rose-600 group"
                  >
                    <div className="p-2 rounded-full bg-primary-white group-hover:bg-accent-rose-100 transition-colors duration-300">
                      <User className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-body font-medium">Account</span>
                  </button>
                </div>

                <nav className="space-y-1">
                  {MEGA_MENU.map((menu, index) => {
                    const isOpen = activeMenu === index;
                    const active = isNavActive(menu.url);
                    return (
                      <div key={index} className="border-b border-grey-100 last:border-0">
                        <button
                          className={`w-full text-left px-4 py-4 flex justify-between items-center font-display font-semibold text-base transition-all duration-300 rounded-lg hover:bg-grey-50 group ${active ? "text-red-600" : "text-black-charcoal hover:text-accent-rose-600"}`}
                          onClick={() => setActiveMenu(isOpen ? null : index)}
                        >
                          <span>{menu.title}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 text-grey-500 group-hover:text-accent-rose-600 ${isOpen ? "rotate-180" : ""}`}
                            strokeWidth={2}
                          />
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="pl-2 pb-4 mt-1 space-y-1">
                            {/* Link to top-level page */}
                            <button
                              onClick={() => { navigate(menu.url); closeSidebar(); }}
                              className="w-full text-left px-4 py-2 text-sm font-semibold text-accent-rose-600 hover:bg-grey-50 rounded-lg transition-all"
                            >
                              All {menu.title}
                            </button>

                            {menu.groups.map((group, gi) => {
                              const groupKey = `${index}-${gi}`;
                              const groupOpen = activeMobileGroup[groupKey];
                              return (
                                <div key={gi} className="mt-2">
                                  {/* Group accordion toggle */}
                                  <button
                                    onClick={() => toggleMobileGroup(index, gi)}
                                    className="w-full text-left px-4 py-2 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                                  >
                                    <span>{group.heading}</span>
                                    <ChevronDown
                                      className={`w-4 h-4 transition-transform duration-200 ${groupOpen ? "rotate-180" : ""}`}
                                      strokeWidth={2}
                                    />
                                  </button>

                                  <div className={`overflow-hidden transition-all duration-200 ${groupOpen ? "max-h-screen" : "max-h-0"}`}>
                                    <ul className="pl-2 space-y-0.5 mt-1">
                                      {group.items.map((item, ii) => (
                                        <li key={ii}>
                                          <button
                                            onClick={() => { navigate(item.url); closeSidebar(); }}
                                            className="w-full text-left px-4 py-2 text-sm font-body text-grey-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-accent-rose-50/50 hover:to-accent-pink-50/50 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-accent-rose-300"
                                          >
                                            {item.label}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Internship Program — mobile */}
                  <div className="pt-2 mt-2 border-t border-grey-100">
                    <button
                      onClick={() => { navigate("/hiring-for-internship"); closeSidebar(); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <span>Internship Program</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-600 text-white uppercase tracking-wide animate-pulse">
                        New
                      </span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>
          </div>
        </nav>
      </header>
    </>
  );
}
