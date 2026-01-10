import React, { useEffect, useState } from "react";
import { getHamperProduct } from "../../service/addOnHamper";

const steps = ["Flowers", "Cakes", "Chocolate", "Plants","Gifts"];

const HamperBuilder = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [hamper, setHamper] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentCategory = steps[stepIndex];

  useEffect(() => {
    fetchProducts(currentCategory);
  }, [currentCategory]);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const data = await getHamperProduct(category);
      setProducts(data);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToHamper = (product) => {
    const existingIndex = hamper.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      const newHamper = [...hamper];
      newHamper[existingIndex].quantity += 1;
      setHamper(newHamper);
    } else {
      setHamper([...hamper, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    const index = hamper.findIndex((item) => item._id === productId);
    if (index === -1) return;

    const newHamper = [...hamper];
    if (newHamper[index].quantity > 1) {
      newHamper[index].quantity -= 1;
    } else {
      newHamper.splice(index, 1);
    }
    setHamper(newHamper);
  };

  const totalPrice = hamper.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  const getQuantity = (productId) => {
    const item = hamper.find((i) => i._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-gray-900 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#800000] to-[#c0392b] text-white py-6 text-center text-3xl font-serif shadow-md">
        Build Your Premium Hamper
      </header>

      {/* Step Indicator */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`px-6 py-2 rounded-full font-semibold border-2 text-sm transition-all ${
              index === stepIndex
                ? "bg-[#c0392b] text-white border-[#c0392b]"
                : "border-gray-300 text-gray-600 hover:bg-[#fbeae6] cursor-pointer"
            }`}
            onClick={() => setStepIndex(index)}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-3/4 mx-auto mt-4 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-[#c0392b] rounded-full transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 flex-1">
        {/* Products Section */}
        <div className="md:w-2/3 flex flex-col">
          <h2 className="text-2xl font-bold text-[#c0392b] mb-4">
            Select {currentCategory}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader border-4 border-[#c0392b] border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto pr-2">
              {products.map((item) => {
                const quantity = getQuantity(item._id);
                return (
                  <div
                    key={item._id}
                    className="border rounded-2xl p-4 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-44 w-full object-cover rounded-xl mb-3"
                    />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </p>
                    <p className="text-[#c0392b] font-bold text-lg mb-2">
                      ₹{item.sellingPrice}
                    </p>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToHamper(item)}
                        className="mt-auto w-full bg-gradient-to-r from-[#c0392b] to-[#e74c3c] text-white py-2 rounded-full hover:from-[#e74c3c] hover:to-[#c0392b] transition"
                      >
                        Add to Hamper
                      </button>
                    ) : (
                      <div className="mt-auto flex items-center justify-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="px-3 py-1 bg-gray-100 rounded-full hover:bg-[#fbeae6] transition"
                        >
                          -
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
                          onClick={() => addToHamper(item)}
                          className="px-3 py-1 bg-gray-100 rounded-full hover:bg-[#fbeae6] transition"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              disabled={stepIndex === 0}
              onClick={() => setStepIndex(stepIndex - 1)}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition ${
                stepIndex === 0
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-gray-400 text-gray-700 hover:bg-[#fbeae6]"
              }`}
            >
              Back
            </button>

            <div className="flex gap-3">
              {stepIndex < steps.length - 1 && (
                <button
                  onClick={() => setStepIndex(stepIndex + 1)}
                  className="px-6 py-2 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-[#fbeae6] transition"
                >
                  Skip
                </button>
              )}
              {stepIndex < steps.length - 1 && (
                <button
                  onClick={() => setStepIndex(stepIndex + 1)}
                  className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-[#c0392b] to-[#e74c3c] text-white hover:from-[#e74c3c] hover:to-[#c0392b] transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hamper Summary */}
        <div className="md:w-1/3 border rounded-2xl p-6 shadow-xl flex flex-col sticky top-6 h-fit bg-white">
          <h2 className="text-xl font-bold text-[#c0392b] mb-4">
            Your Hamper
          </h2>

          {hamper.length === 0 ? (
            <p className="text-gray-400 italic">No items added yet</p>
          ) : (
            <ul className="space-y-3 flex-1 max-h-[65vh] overflow-y-auto">
              {hamper.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#c0392b]">
                      ₹{item.sellingPrice * item.quantity}
                    </span>
                    <span className="font-semibold">x{item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {hamper.length > 0 && (
            <>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total</span>
                <span className="text-[#c0392b]">₹{totalPrice}</span>
              </div>

              {stepIndex === steps.length - 1 && (
                <button className="mt-4 w-full bg-gradient-to-r from-[#c0392b] to-[#e74c3c] text-white py-3 rounded-full hover:from-[#e74c3c] hover:to-[#c0392b] transition">
                  Checkout Hamper
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Loader CSS */}
      <style>
        {`
          .loader {
            border-top-color: transparent;
            border-right-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default HamperBuilder;
