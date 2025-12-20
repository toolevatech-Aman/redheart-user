import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PackageSearch, Search } from "lucide-react";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order tracking
    console.log("Tracking order:", orderNumber);
  };

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <PackageSearch className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Track Your Order
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Enter your order number to track your shipment
          </p>
        </div>
      </section>

      {/* Track Order Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block font-body text-sm font-light text-black-charcoal mb-2">
                Order Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number"
                  required
                  className="flex-1 px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide transition-all duration-300 border border-accent-rose-700/30 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" strokeWidth={2} />
                  Track
                </button>
              </div>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-grey-200">
            <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="font-body text-base text-grey-700 font-light leading-relaxed">
              If you need assistance tracking your order, please <Link to="/contact" className="text-accent-rose-600 hover:text-accent-rose-700 underline">contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackOrder;

