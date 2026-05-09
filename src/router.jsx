import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";
import SellWithUs from "./pages/sell-with-us/sell-with-us";
import { CategoryRedirect, ProductRedirect } from "./utils/RedirectHandler";
import CityLandingPage from "./pages/cityLanding/CityLandingPage";
import DeliveryCities from "./pages/deliveryCities/DeliveryCities";

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
const SizeGuide = lazy(() => import("./pages/sell-with-us/sell-with-us"));
const Cookies = lazy(() => import("./pages/cookies/cookies"));
const RefundPolicy = lazy(() => import("./pages/refund-policy/refund-policy"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const MyAccount = lazy(() => import("./pages/my-account/my-account"));
const Orders = lazy(() => import("./pages/orders/orders"));
const Hamper = lazy(() => import("./pages/hampers/hamper"));
const HiringForInternship = lazy(() => import("./pages/hiring-for-internship/hiring-for-internship"));

const fallback = (
  <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
    <h1 className="text-xl font-semibold text-red-600 mb-1">RedHeart</h1>
    <p className="text-xs text-gray-600 max-w-xs">
      Bringing warmth, love, and passion to every heartbeat.
    </p>
  </div>
);

const Router = () => {
  return (
    <Suspense fallback={fallback}>
      <Routes>
        {/* ── Static / utility routes ── */}
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AppLayout><About /></AppLayout>} />
        <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
        <Route path="/privacy-policy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
        <Route path="/terms" element={<AppLayout><Terms /></AppLayout>} />
        <Route path="/faq" element={<AppLayout><FAQ /></AppLayout>} />
        <Route path="/shipping" element={<AppLayout><Shipping /></AppLayout>} />
        <Route path="/returns" element={<AppLayout><Returns /></AppLayout>} />
        <Route path="/track-order" element={<AppLayout><TrackOrder /></AppLayout>} />
        <Route path="/gift-cards" element={<AppLayout><GiftCards /></AppLayout>} />
        <Route path="/sell-with-us" element={<AppLayout><SellWithUs /></AppLayout>} />
        <Route path="/cookies" element={<AppLayout><Cookies /></AppLayout>} />
        <Route path="/refund-policy" element={<AppLayout><RefundPolicy /></AppLayout>} />
        <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
        <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
        <Route path="/my-account" element={<AppLayout><MyAccount /></AppLayout>} />
        <Route path="/orders" element={<AppLayout><Orders /></AppLayout>} />
        <Route path="/hamper" element={<AppLayout><Hamper /></AppLayout>} />
        <Route path="/hiring-for-internship" element={<AppLayout><HiringForInternship /></AppLayout>} />

        {/* ── Legacy /product/ routes → 301 redirect to new SEO URLs ── */}
        <Route path="/product/:category" element={<CategoryRedirect />} />
        <Route path="/product/:category/:productSlug" element={<ProductRedirect />} />

        {/* ── New SEO product detail route ── */}
        {/* /p/:categorySlug/:productSlug  e.g. /p/order-cake-online/black-forest-cake-100001ca */}
        <Route path="/p/:categorySlug/:productSlug" element={<AppLayout><ProductDescription /></AppLayout>} />

        {/* ── Delivery cities directory page ── */}
        <Route path="/delivery-cities" element={<AppLayout><DeliveryCities /></AppLayout>} />

        {/* ── City landing pages (MORE specific than catch-alls, must come first) ── */}
        {/* /florist-near-me/bangalore, /order-cake-online/mumbai, /plants-online/delhi  */}
        {/* CityLandingPage internally detects subcategory vs city slug            */}
        <Route path="/florist-near-me/:citySlug"   element={<AppLayout><CityLandingPage category="Flowers" /></AppLayout>} />
        <Route path="/order-cake-online/:citySlug" element={<AppLayout><CityLandingPage category="Cakes" /></AppLayout>} />
        <Route path="/plants-online/:citySlug"     element={<AppLayout><CityLandingPage category="Plants" /></AppLayout>} />

        {/* ── Category & occasion routes — catch-alls MUST be last ── */}
        {/* Subcategory: /order-cake-online/butterscotch, /florist-near-me/roses */}
        <Route path="/:categorySlug/:subcategorySlug" element={<AppLayout><Product /></AppLayout>} />
        {/* Category/occasion: /florist-near-me, /birthday-gifts-delivery, /husband … */}
        <Route path="/:categorySlug" element={<AppLayout><Product /></AppLayout>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
