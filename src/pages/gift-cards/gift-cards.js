import React from "react";
import { Gift } from "lucide-react";

const CouponsDeals = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Gift className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Coupons & Deals
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Enjoy exclusive offers, bulk order discounts, and promotional coupons to make your gifting experience delightful.
          </p>
        </div>
      </section>

      {/* Coupons & Deals Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Bulk Order Deals */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Bulk Order Deals
            </h2>
            <p className="font-body text-base text-grey-700 font-light leading-relaxed">
              Planning to place a large order for corporate gifting, events, or celebrations? We offer special pricing on bulk orders.
            </p>
          </div>

          {/* Available Coupons */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Available Coupons
            </h2>

            {/* Coupon 1 */}
            <div className="mb-6">
              <p className="font-body text-base text-grey-700 font-light mb-1">
                🎉 <strong>Coupon: NEW10</strong>
              </p>
              <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
                <li>Discount: Flat 10% OFF on your first purchase</li>
                <li>Minimum Order Value: ₹599</li>
                <li>Applicable On: All categories — flowers, cakes, plants, personalised gifts, hampers, and more</li>
                <li>Terms: Valid for new customers only, cannot be combined with other coupons, one-time use per user</li>
              </ul>
            </div>

            {/* Coupon 2 */}
            <div className="mb-6">
              <p className="font-body text-base text-grey-700 font-light mb-1">
                🎁 <strong>Coupon: HAPPY100</strong>
              </p>
              <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
                <li>Discount: Flat ₹100 OFF</li>
                <li>Minimum Order Value: ₹1000</li>
                <li>Applicable On: All gift categories</li>
              </ul>
            </div>
          </div>

          {/* How to Apply Coupons */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              How to Apply Coupons
            </h2>
            <ol className="list-decimal list-inside ml-4 space-y-2">
              <li className="font-body text-base text-grey-700 font-light">Add products to your cart</li>
              <li className="font-body text-base text-grey-700 font-light">Proceed to checkout</li>
              <li className="font-body text-base text-grey-700 font-light">Enter your coupon code in the “Apply Coupon” section</li>
              <li className="font-body text-base text-grey-700 font-light">The discount will be applied automatically if terms are met</li>
            </ol>
          </div>

          {/* Important Guidelines */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Important Coupon Guidelines
            </h2>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Only one coupon can be applied per order</li>
              <li>Coupons may not apply to special combos or festive hampers</li>
              <li>Coupons cannot be exchanged for cash</li>
              <li>Coupon misuse may lead to order cancellation</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
              Stay Updated
            </h2>
            <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-2">
              We regularly launch festival offers, Valentine’s Day deals, limited-time discounts, and early-bird sale coupons. Follow us for updates:
            </p>
            <ul className="list-disc list-inside text-grey-700 font-light ml-4 space-y-1">
              <li>Instagram: <a href="https://www.instagram.com/redheart.in" className="text-accent-rose-600">@redheart.in</a></li>
              <li>Facebook: Redheart Gifting</li>
              <li>Website: <a href="https://www.redheart.in" className="text-accent-rose-600">redheart.in</a></li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CouponsDeals;
