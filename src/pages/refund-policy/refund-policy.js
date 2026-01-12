import React from "react";
import { DollarSign } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      {/* Cancellation & Refund Policy Section */}
<section className="py-16 bg-grey-50 border-t border-grey-200">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <h2 className="text-3xl sm:text-4xl font-display font-light text-black-charcoal text-center mb-4">
      Cancellation & Refund Policy
    </h2>
    <p className="text-center text-grey-600 mb-10 font-body text-sm">
      Effective Date: January 2025
    </p>

    <div className="space-y-8 font-body text-grey-700 text-sm leading-relaxed">

      {/* Intro */}
      <p>
        At <span className="font-medium text-black-charcoal">Redheart</span>, we aim to deliver happiness through
        timely and high-quality gifts. We understand that certain situations may require
        cancellations or refunds. Please review the policy below.
      </p>

      {/* Order Cancellation */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          1. Order Cancellation
        </h3>
        <p>
          <span className="font-medium">Before Dispatch:</span> Orders can be cancelled within
          <span className="font-medium"> 1 hour </span>
          of placing them, provided the item has not been processed or dispatched.
        </p>
      </div>

      {/* Non-Cancellable Items */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          2. Non-Cancellable Items
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Customised or personalised gifts</li>
          <li>Same-day delivery orders</li>
          <li>Perishable items (flowers, cakes, plants, chocolates)</li>
          <li>Festive or limited-edition hampers</li>
        </ul>
      </div>

      {/* Refund Policy */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          3. Refund Policy
        </h3>

        <div className="space-y-4">
          <p>
            <span className="font-medium">a) Damaged or Defective Product:</span><br />
            Eligible for refund, replacement, or store credit.  
            <br />
            <span className="italic text-grey-600">
              Proof required within 2 hours of delivery (photos/videos).
            </span>
          </p>

          <p>
            <span className="font-medium">b) Wrong Product Delivered:</span><br />
            Full refund or replacement will be provided at no extra cost.
          </p>

          <p>
            <span className="font-medium">c) Product Not Delivered:</span><br />
            A full refund will be initiated if the failure occurred from our end.
            <br />
            <span className="italic text-grey-600">
              No refunds for incorrect address, unreachable contact, or recipient unavailability.
            </span>
          </p>

          <p>
            <span className="font-medium">d) Refund Timeline:</span>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Online payments: 5–7 business days</li>
            <li>Wallet / store credit: Instant</li>
            <li>Bank transfer (if applicable): 3–5 business days</li>
          </ul>
        </div>
      </div>

      {/* Replacement Policy */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          4. Replacement Policy
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Wrong product received</li>
          <li>Damaged or poor-quality item</li>
          <li>Missing item in a gift hamper</li>
        </ul>
      </div>

      {/* Same-Day & Midnight */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          5. Same-Day & Midnight Deliveries
        </h3>
        <p>
          These are time-sensitive services. Once confirmed, cancellations are not allowed.
          Refunds apply only for non-delivery or incorrect/damaged products.
        </p>
      </div>

      {/* Quality Concerns */}
      <div>
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          6. Quality Concerns
        </h3>
        <p>
          Flowers, cakes, and plants are perishable. Natural variations in colour, size,
          blooming stage, and appearance are normal and do not qualify as defects.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl p-6 shadow-soft border border-grey-200">
        <h3 className="text-lg font-display text-black-charcoal mb-2">
          7. Contact Us
        </h3>
        <p>
          <span className="font-medium">Email:</span> admin@redheart.in
        </p>
        <p>
          <span className="font-medium">Phone:</span> +91-9275506722
        </p>
      </div>

    </div>
  </div>
</section>


      {/* Content Section */}
      {/* <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Refund Eligibility
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
                Refund Process
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li className="font-body text-base text-grey-700 font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li className="font-body text-base text-grey-700 font-light">Sed do eiusmod tempor incididunt ut labore et dolore</li>
                <li className="font-body text-base text-grey-700 font-light">Ut enim ad minim veniam, quis nostrud exercitation</li>
              </ol>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Refund Timeline
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default RefundPolicy;

