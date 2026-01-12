import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from"../../assets/RedHeart-Logo-02.png";
const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-red-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center relative animate-fadeIn">
        
        {/* Logo */}
        <img
          src={logo}
          alt="Red Heart Logo"
          className="mx-auto w-24 h-24 mb-4"
        />

        {/* Pulsing Heart */}
        <div className="text-red-500 text-6xl mb-4 animate-pulse">❤️</div>

        {/* Thank You Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h2>
        <p className="text-gray-600 mb-4">
          Your thoughtful gift is on its way to make someone’s day brighter 💖
        </p>

        {/* Cute Note */}
        <p className="text-red-500 font-semibold mb-6">
          We can’t wait to deliver your love!
        </p>

        {/* Button (optional) */}
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Go to Homepage
        </button>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default OrderConfirmation;
