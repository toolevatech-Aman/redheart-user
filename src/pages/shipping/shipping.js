import React from "react";
import { Truck, Package, Clock, MapPin } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Truck className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Shipping Information
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Clock className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Standard Shipping
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed mb-4">
                5-7 business days
              </p>
              <p className="font-body text-sm text-grey-600 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Package className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Express Shipping
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed mb-4">
                2-3 business days
              </p>
              <p className="font-body text-sm text-grey-600 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Truck className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Same Day Delivery
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed mb-4">
                Available in select areas
              </p>
              <p className="font-body text-sm text-grey-600 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Shipping Rates
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Delivery Areas
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Tracking Your Order
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;

