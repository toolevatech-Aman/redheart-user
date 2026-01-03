import React, { useEffect, useState } from "react";
import { getHamperProduct } from "../../service/addOnHamper";

const steps = ["Flowers", "Cakes", "Chocolate", "Plants"];

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

  // Add product or increase quantity
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

  // Decrease quantity or remove if 0
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
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 text-center text-2xl  shadow-sm">
        Build Your Personalized Hamper
      </header>

      {/* Step Indicator */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition-all ${
              index === stepIndex
                ? "bg-red-600 text-white border-red-600"
                : "border-black text-black hover:bg-red-100 cursor-pointer"
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
          className="h-2 bg-red-600 rounded-full transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 flex-1">
        {/* Products Section */}
        <div className="md:w-2/3 flex flex-col">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Select {currentCategory}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader border-4 border-red-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
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
                    className="border rounded-lg p-4 shadow hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice}
                    </p>
                    <p className="text-red-600 font-bold text-lg mb-2">
                      ₹{item.sellingPrice}
                    </p>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToHamper(item)}
                        className="mt-auto w-full bg-black text-white py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Add to Hamper
                      </button>
                    ) : (
                      <div className="mt-auto flex items-center justify-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="px-3 py-1 bg-gray-200 rounded-full hover:bg-red-100 transition"
                        >
                          -
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
                          onClick={() => addToHamper(item)}
                          className="px-3 py-1 bg-gray-200 rounded-full hover:bg-red-100 transition"
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
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-black text-black hover:bg-red-100"
              }`}
            >
              Back
            </button>

            {stepIndex < steps.length - 1 && (
              <button
                onClick={() => setStepIndex(stepIndex + 1)}
                className="px-6 py-2 rounded-full font-semibold bg-red-600 text-white hover:bg-black transition"
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Hamper Summary - Sticky */}
        <div className="md:w-1/3 border rounded-lg p-5 shadow-lg flex flex-col sticky top-6 h-fit">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Your Hamper
          </h2>

          {hamper.length === 0 ? (
            <p className="text-gray-500">No items added yet</p>
          ) : (
            <ul className="space-y-3 flex-1 max-h-[65vh] overflow-y-auto">
              {hamper.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-600">
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
                <span className="text-red-600">₹{totalPrice}</span>
              </div>

              {stepIndex === steps.length - 1 && (
                <button className="mt-4 w-full bg-red-600 text-white py-3 rounded hover:bg-black transition">
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
