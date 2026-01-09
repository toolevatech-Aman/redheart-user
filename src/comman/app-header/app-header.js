import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/RedHeart-Logo-02.png";
import { getProduct } from "../../service/products";
import { menuData } from "../../constants/menuData";
import { useSelector } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
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
  const totalCount = useSelector((state) => state.cart.totalCount);

  // Scroll effect for header shadow'
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
        handleSearchSubmit({ preventDefault: () => { } });
      } else {
        setProducts([]);
        setIsDropdownOpen(false);
      }
    }, 300); // wait 500ms after typing
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

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchQuery("");
    if (open) {
      setOpen(false);
      setActiveMenu(null);
    }
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsDropdownOpen(true); // show loader immediately
    setLoading(true);

    try {
      const payload = { searchField: searchQuery, limit: 5, };
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
  };

  return (
    <>
      <header
        className={`sticky  top-0 z-50 bg-primary-white border-b border-grey-100 transition-all duration-500 ${isScrolled ? "shadow-elegant" : ""
          }`}
      >
        <nav className="w-full">
          {/* Top Row */}
          <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center justify-center flex-shrink-0">
              <a href="/">
                <img
                  src={logo}
                  alt="RedHeart Logo"
                  className="h-32 sm:h-50 md:h-48 lg:h-56 xl:h-64 object-contain"
                />
              </a>
            </div>




            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-2xl mx-8 hidden lg:flex relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400" strokeWidth={1.5} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for flowers, bouquets, gifts..."
                className="w-full pl-12 pr-12 py-3.5 md:py-4 text-sm md:text-base font-body text-black-charcoal bg-grey-50 border-2 border-grey-200 rounded-full focus:outline-none focus:border-accent-rose-400 focus:bg-primary-white transition-all duration-300 placeholder:text-grey-400"
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
                        onClick={(e) => {
                          console.log("Navigating to", `/product/search/${product.slug}`);
                          navigate(`/product/${product.category}/${product.slug}`, { state: { id: product._id } });
                          setIsDropdownOpen(false);
                        }}

                        className="flex items-center w-full text-left px-4 py-2 hover:bg-grey-100 transition-all"
                      >
                        <img
                          src={product.media.primary_image_url} // your API image
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
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => {
                  const authToken = localStorage.getItem("authToken");
                  navigate(authToken ? "/my-account" : "/login");
                }}
                className="p-2.5 rounded-full text-black-charcoal hover:text-accent-rose-600 hover:bg-grey-50 transition-all duration-300"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2.5 rounded-full text-black-charcoal hover:text-accent-rose-600 hover:bg-grey-50 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-accent-rose-500 to-accent-pink-600 text-primary-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center space-x-1.5 pr-4 sm:pr-6">
              <button
                onClick={handleSearchClick}
                className={`p-2 text-black-charcoal focus:outline-none transition-all duration-300 hover:text-accent-rose-600 hover:bg-grey-50 rounded-full ${isSearchOpen ? "text-accent-rose-600 bg-accent-rose-50" : ""
                  }`}
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

                  {/* Dropdown */}
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
                              navigate(`/product/${product.category}/${product.slug}`, { state: { id: product._id } });
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

          {/* Second Row Desktop Menu */}
          <div className="hidden lg:flex justify-center bg-primary-white border-t border-red-700 shadow-sm">
  <ul className="flex items-center space-x-4 xl:space-x-6 px-8">
    {menuData.map((menu, index) => {
      // Determine number of columns dynamically (max 4)
      const columns = menu.items.length <= 4 ? menu.items.length : 4;

      // Map columns to Tailwind classes
      const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
      }[columns];

      return (
        <li key={index} className="group relative">
          <button className="px-3 py-3 text-sm xl:text-[15px] font-body font-medium text-black-charcoal hover:text-accent-rose-600 transition-all duration-300">
            {menu.title}
          </button>

          {/* Dropdown */}
          <div className="absolute hidden group-hover:block pt-3 left-1/2 -translate-x-1/2 z-50">
            <div
              className="bg-white backdrop-blur-md rounded-3xl p-6 border border-black/10 overflow-hidden relative"
              style={{
                width: `${columns * 8}rem`, // adjust width
              }}
            >
              {/* Arrow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-l border-t border-black/10 rotate-45"></div>

              {/* Grid */}
              <ul className={`grid ${gridColsClass} gap-x-6 gap-y-4`}>
                {menu.items.map((item, i) => (
                  <li
                    key={i}
                    className="px-2 py-2 hover:bg-grey-50 rounded-lg transition-all duration-200"
                  >
                    <a
                      href={`/product/${item.name}`}
                      className="block text-black hover:text-red-600"
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.date && (
                        <span className="block text-xs text-red-400 mt-1">
                          {item.date}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      );
    })}
  </ul>
</div>



          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${open ? "visible opacity-100" : "invisible opacity-0"
              }`}
          >
            <div
              className={`absolute inset-0 bg-black-soft/60 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"
                }`}
              onClick={closeSidebar}
            ></div>
            <aside
              className={`absolute right-0 top-0 h-full w-full max-w-sm bg-primary-white shadow-premium transform transition-transform duration-400 overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"
                }`}
            >
              {/* Sidebar header and content same as your original code */}
              {/* ...keep your mobile sidebar code unchanged */}
              {/* Mobile Sidebar */}
              <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${open ? "visible opacity-100" : "invisible opacity-0"
                  }`}
              >
                {/* Backdrop */}
                <div
                  className={`absolute inset-0 bg-black-soft/60 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"
                    }`}
                  onClick={closeSidebar}
                ></div>

                {/* Sidebar */}
                <aside
                  className={`absolute right-0 top-0 h-full w-full max-w-sm bg-primary-white shadow-premium transform transition-transform duration-400 overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                  {/* Sidebar Header */}
                  <div className="sticky top-0 z-10 bg-gradient-to-b from-primary-white to-grey-50/30 border-b border-grey-200 px-6 py-5 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <img src={logo} alt="RedHeart Logo" className="h-10 w-auto" />
                      <div className="flex flex-col">
                        <span className="font-elegant text-2xl text-accent-rose-600 leading-none">Red Heart</span>
                        <span className="font-body text-[10px] text-grey-600 tracking-wider uppercase">Menu</span>
                      </div>
                    </div>
                    <button
                      onClick={closeSidebar}
                      className="p-2 rounded-full text-grey-700 hover:text-accent-rose-600 hover:bg-grey-100 transition-all duration-300"
                    >
                      <X className="w-6 h-6" strokeWidth={2} />
                    </button>
                  </div>

                  {/* Sidebar Content */}
                  <div className="px-6 py-6">
                    {/* Quick Actions */}
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

                    {/* Sidebar Menu Items */}
                    <nav className="space-y-2">
                      {menuData.map((menu, index) => (
                        <div key={index} className="border-b border-grey-100 last:border-0">
                          <button
                            className="w-full text-left px-4 py-4 flex justify-between items-center font-display font-semibold text-base text-black-charcoal hover:text-accent-rose-600 transition-all duration-300 rounded-lg hover:bg-grey-50 group"
                            onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                          >
                            <span className="relative">
                              {menu.title}
                              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-rose-400 to-accent-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 text-grey-500 group-hover:text-accent-rose-600 ${activeMenu === index ? "rotate-180" : ""
                                }`}
                              strokeWidth={2}
                            />
                          </button>

                          <div className={`overflow-hidden transition-all duration-300 ${activeMenu === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                            <ul className="pl-4 pb-4 space-y-1 mt-2">
                              {menu.items.map((item, i) => (
                                <li key={i}>
                                  <a
                                    href="#"
                                    className="block px-4 py-3 text-sm font-body text-grey-700 hover:text-accent-rose-600 hover:bg-gradient-to-r hover:from-accent-rose-50/50 hover:to-accent-pink-50/50 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-accent-rose-300"
                                    onClick={closeSidebar}
                                  >
                                    {item.name} {item.date && <span className="text-xs text-grey-400 ml-1">({item.date})</span>}
                                  </a>
                                </li>
                              ))}

                            </ul>
                          </div>
                        </div>
                      ))}
                    </nav>
                  </div>
                </aside>
              </div>

            </aside>
          </div>
        </nav>
      </header>
    </>
  );
}
