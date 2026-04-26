import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";
import SellWithUs from "./pages/sell-with-us/sell-with-us";
import SEOHead from "./comman/seo/seo-head";
// import logoImage from "./assets/yobhaLogo.png"
// Lazy load pages
const Home = lazy(() => import("./pages/home/home"));
const Login = lazy(() => import("./pages/login/login"));
const ProductDescription = lazy(() => import("./pages/product/product-description")); 
const Product = lazy(() => import("./pages/product/product"));
const About = lazy(() => import("./pages/about/about"));
const Contact = lazy(() => import("./pages/contact/contact"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy/privacy-policy"));
const Terms = lazy(() => import("./pages/terms/terms"));
const FAQ = lazy(() => import("./pages/faq/faq"));
const Shipping = lazy(() => import("./pages/shipping/shipping"));
const Returns = lazy(() => import("./pages/returns/returns"));
const TrackOrder = lazy(() => import("./pages/track-order/track-order"));
const GiftCards = lazy(() => import("./pages/gift-cards/gift-cards"));
const Cookies = lazy(() => import("./pages/cookies/cookies"));
const RefundPolicy = lazy(() => import("./pages/refund-policy/refund-policy"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const MyAccount = lazy(() => import("./pages/my-account/my-account"));
const Orders = lazy(() => import("./pages/orders/orders"));
const Hamper = lazy(() => import("./pages/hampers/hamper"));
const Router = () => {
  const routes = [
    // { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/", element: <Home />, productName: "Flowers, Cakes, Plants & Gifts", categoryName: "Occasions" },
    { path: "/login", element: <Login />, productName: "Login", categoryName: "Account" },
    { path: "/home", element: <Home />, productName: "Flowers, Cakes, Plants & Gifts", categoryName: "Occasions" },
    { path: "/product/:category", element: <Product />, productName: "Products", categoryName: "Category" },
    { path: "/product/:category/:productSlug", element: <ProductDescription />, productName: "Product Details", categoryName: "Category" },
    { path: "/about", element: <About />, productName: "About Us", categoryName: "Company" },
    { path: "/contact", element: <Contact />, productName: "Contact Us", categoryName: "Support" },
    { path: "/privacy-policy", element: <PrivacyPolicy />, productName: "Privacy Policy", categoryName: "Legal" },
    { path: "/terms", element: <Terms />, productName: "Terms & Conditions", categoryName: "Legal" },
    { path: "/faq", element: <FAQ />, productName: "Frequently Asked Questions", categoryName: "Support" },
    { path: "/shipping", element: <Shipping />, productName: "Shipping Policy", categoryName: "Legal" },
    { path: "/returns", element: <Returns />, productName: "Returns Policy", categoryName: "Legal" },
    { path: "/track-order", element: <TrackOrder />, productName: "Track Order", categoryName: "Orders" },
    { path: "/gift-cards", element: <GiftCards />, productName: "Gift Cards", categoryName: "Gifting" },
    { path: "/sell-with-us", element: <SellWithUs />, productName: "Sell With Us", categoryName: "Partners" },
    { path: "/cookies", element: <Cookies />, productName: "Cookie Policy", categoryName: "Legal" },
    { path: "/refund-policy", element: <RefundPolicy />, productName: "Refund Policy", categoryName: "Legal" },
    { path: "/cart", element: <Cart />, productName: "Cart", categoryName: "Checkout" },
    { path: "/checkout", element: <Checkout />, productName: "Checkout", categoryName: "Checkout" },
    { path: "/my-account", element: <MyAccount />, productName: "My Account", categoryName: "Account" },
    { path: "/orders", element: <Orders />, productName: "Orders", categoryName: "Account" },
    { path: "/hamper", element: <Hamper />, productName: "Build Your Hamper", categoryName: "Gifting" },
  ];

  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center h-screen px-4 text-center">
  {/* Main Title */}
  <h1 className="text-xl font-semibold text-red-600 mb-1">
    RedHeart
  </h1>

  {/* Subtitle / beautiful line */}
  <p className="text-xs text-gray-600 max-w-xs">
    Bringing warmth, love, and passion to every heartbeat.
  </p>
</div>


}>
      <Routes>
        {routes.map(({ path, element, productName, categoryName }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <>
                <SEOHead productName={productName} categoryName={categoryName} canonicalPath={path} />
                {path === "/login" ? element : <AppLayout>{element}</AppLayout>}
              </>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;