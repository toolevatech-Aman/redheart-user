import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";
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
const SizeGuide = lazy(() => import("./pages/size-guide/size-guide"));
const Cookies = lazy(() => import("./pages/cookies/cookies"));
const RefundPolicy = lazy(() => import("./pages/refund-policy/refund-policy"));
const Cart = lazy(() => import("./pages/cart/cart"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const MyAccount = lazy(() => import("./pages/my-account/my-account"));
const Orders = lazy(() => import("./pages/orders/orders"));
const logoImage ="s"
const Router = () => {
  const routes = [
    // { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/", element: <Home /> },
    {path: "/login", element: <Login />},
    { path: "/home", element: <Home /> },
    {path: "/product/:category", element: <Product />},
    {path:"/product/:category/:productSlug", element: <ProductDescription />},
    {path: "/about", element: <About />},
    {path: "/contact", element: <Contact />},
    {path: "/privacy-policy", element: <PrivacyPolicy />},
    {path: "/terms", element: <Terms />},
    {path: "/faq", element: <FAQ />},
    {path: "/shipping", element: <Shipping />},
    {path: "/returns", element: <Returns />},
    {path: "/track-order", element: <TrackOrder />},
    {path: "/gift-cards", element: <GiftCards />},
    {path: "/size-guide", element: <SizeGuide />},
    {path: "/cookies", element: <Cookies />},
    {path: "/refund-policy", element: <RefundPolicy />},
    {path: "/cart", element: <Cart />},
    {path: "/checkout", element: <Checkout />},
    {path: "/my-account", element: <MyAccount />},
    {path: "/orders", element: <Orders />},
  ];

  return (
    <Suspense fallback={ <div className="flex items-center justify-center h-screen">
      <img
        src={logoImage}
        alt="YOBHA Logo"
        className="h-8 md:h-10"
      />
    </div>}>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={path === "/login" ? element : <AppLayout>{element}</AppLayout>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;