import React from "react";
import { Users } from "lucide-react";

const SellWithUs = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Users className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Sell With Us
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Partner with Redheart — India’s Premium Gifting Platform. Expand your reach and grow your business!
          </p>
        </div>
      </section>

      {/* Sell With Us Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Why Sell With Us */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              🌟 Why Sell With Redheart?
            </h2>
            <p className="font-body text-base text-grey-700 font-light leading-relaxed">
              Gain access to thousands of customers looking for premium flowers, cakes, plants, flower bulbs, personalised gifts, and festive hampers.
            </p>
          </div>

          {/* Who Can Partner */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Who Can Partner With Us?
            </h2>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Florists & bouquet makers</li>
              <li>Bakeries (cakes, pastries, desserts)</li>
              <li>Plant nurseries & suppliers</li>
              <li>Flower bulb suppliers</li>
              <li>Personalised gift creators</li>
              <li>Hamper makers</li>
              <li>Artisans & handcrafted gift vendors</li>
              <li>Eco-friendly & lifestyle product sellers</li>
            </ul>
            <p className="font-body text-base text-grey-700 font-light mt-2">
              If you produce quality products with timely service — you’re the perfect fit.
            </p>
          </div>

          {/* Partnership Requirements */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Partnership Requirements
            </h2>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Valid GST details (if applicable)</li>
              <li>Consistent product quality</li>
              <li>Proper packaging standards</li>
              <li>Ability to fulfil orders on time</li>
              <li>Clear pricing & inventory updates</li>
            </ul>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="font-body text-base text-grey-700 font-light mb-2">Step 1: Apply Online</p>
            <p className="font-body text-base text-grey-700 font-light">
              Fill out the Partner Registration Form to get started.
            </p>
          </div>

          {/* Benefits for Local Sellers */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Benefits for Local Sellers
            </h2>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Get discovered by more customers in your city</li>
              <li>Zero-cost listing</li>
              <li>Earn more during festivals: Valentine’s Day, Diwali, Rakhi, Christmas, New Year, Mother’s Day, etc.</li>
              <li>Priority promotion for high-quality sellers</li>
            </ul>
          </div>

          {/* Bulk Order Partnerships */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Bulk Order Partnerships
            </h2>
            <p className="font-body text-base text-grey-700 font-light mb-2">
              If you specialise in:
            </p>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Corporate gifting</li>
              <li>Event gifting (weddings, engagements, birthdays)</li>
              <li>Festive hampers</li>
              <li>Large flower arrangements</li>
            </ul>
            <p className="font-body text-base text-grey-700 font-light mt-2">
              Redheart provides special collaborations with higher order volumes.
            </p>
          </div>

          {/* Contact for Partnership */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Contact for Partnership
            </h2>
            <p className="font-body text-base text-grey-700 font-light mb-1">
              Interested in selling with us? Reach out to our vendor support:
            </p>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Email: <a href="mailto:partners@redheart.in" className="text-accent-rose-600">partners@redheart.in</a></li>
              <li>Phone: +91‑9275506722</li>
            </ul>
            <p className="font-body text-base text-grey-700 font-light mt-2">
              Join Redheart today and grow your business with India’s trusted gifting marketplace!
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SellWithUs;
