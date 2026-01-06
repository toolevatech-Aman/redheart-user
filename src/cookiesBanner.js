import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    const denied = localStorage.getItem("cookiesDenied");

    if (!accepted && !denied) {
      const timer = setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setAnimate(true), 50);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookiesDenied", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg z-50 transform transition-transform duration-500 ease-out ${
        animate ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mb-3 md:mb-0 md:mr-6 text-sm md:text-base max-w-2xl space-y-1">
        <p>
          We use cookies to enhance your experience, analyze site traffic, and serve personalized content.
        </p>
        <p>
          Cookies help us remember your preferences and improve the website performance.
        </p>
        <p>
          By continuing to browse, you agree to our use of cookies. You can manage your preferences anytime.
        </p>
        <p>
          <a
            href="/cookies"
            className="underline hover:text-green-400 transition"
          >
            Read our Cookies Policy
          </a>
        </p>
      </div>
      <div className="flex space-x-3 mt-2 md:mt-0">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Accept
        </button>
        <button
          onClick={handleDeny}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
