import React from "react";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Scale className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
            Effective Date: January 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* Introduction */}
            <div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Welcome to Redheart. By accessing our website, placing an order, or using any of our services, you agree to the following Terms & Conditions. Please read them carefully.
              </p>
            </div>

            {/* 1. General */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  1. General
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Redheart is an online gifting service offering flowers, cakes, plants, personalised gifts, and hampers.</li>
                <li>By using our platform, you accept our Terms, Privacy Policy, and Cancellation/Refund Policy.</li>
                <li>We may update or modify these terms anytime. Continued use of the website means acceptance of changes.</li>
              </ul>
            </div>

            {/* 2. Eligibility */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                2. Eligibility
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-2">
                To place an order, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Be at least 18 years old</li>
                <li>Provide accurate personal, delivery, and payment information</li>
              </ul>
            </div>

            {/* 3. Products & Availability */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                3. Products & Availability
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-2">
                Product images are for representation; actual products may slightly vary in colour, design, or size.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-2">
                Seasonal availability may affect the exact flower or cake variant.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Redheart reserves the right to substitute items of equal or higher value if needed.
              </p>
            </div>

            {/* 4. Order Acceptance */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                4. Order Acceptance
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>An order is considered confirmed only after payment is successfully processed.</li>
                <li>Redheart may cancel orders due to stock unavailability, delivery limitations, payment issues, or suspicious activity.</li>
                <li>In such cases, customers will be notified and refunded (if applicable).</li>
              </ul>
            </div>

            {/* 5. Pricing & Payments */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                5. Pricing & Payments
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>All prices are listed in Indian Rupees (INR).</li>
                <li>We may update pricing without prior notice.</li>
                <li>Payments are processed through secure third-party payment gateways.</li>
                <li>Redheart is not responsible for issues arising from the payment provider’s end.</li>
              </ul>
            </div>

            {/* 6. Delivery Terms */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                6. Delivery Terms
              </h2>
              <p className="text-grey-700 mb-2">
                Delivery time slots are approximate and may vary due to traffic, weather, holidays, or unexpected delays.
              </p>
              <p className="text-grey-700 mb-2">
                Delivery is attempted once; re-delivery may incur extra charges.
              </p>
              <p className="text-grey-700 mb-4">
                Incorrect address, wrong contact details, or recipient unavailability may result in delivery failure without refund.
              </p>
              <p className="text-grey-700 font-medium mb-2">
                Same-Day / Midnight Delivery
              </p>
              <p className="text-grey-700 mb-2">
                Once placed, orders for these services cannot be cancelled.
              </p>
              <p className="text-grey-700">
                Delivery delays caused by unforeseen circumstances do not qualify for full refunds.
              </p>
            </div>

            {/* 7. Personalised Gifts */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                7. Personalised Gifts
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>For custom products, customers must upload correct images/content.</li>
                <li>Redheart is not responsible for spelling errors, poor-quality images, or incorrect details submitted by customers.</li>
              </ul>
            </div>

            {/* 8. Promotions */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                8. Promotions, Discounts & Coupons
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Coupons cannot be combined unless explicitly mentioned.</li>
                <li>Offers may have specific terms like expiration dates or minimum order values.</li>
                <li>Redheart reserves the right to modify or discontinue promotions at any time.</li>
              </ul>
            </div>

            {/* 9. User Conduct */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  9. User Conduct
                </h2>
              </div>
              <p className="text-grey-700 mb-2">Users must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Provide false information</li>
                <li>Misuse the website or attempt to breach security</li>
                <li>Copy, resell, or misuse content or products listed</li>
                <li>Engage in fraudulent activities</li>
              </ul>
            </div>

            {/* 10. Intellectual Property */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                10. Intellectual Property
              </h2>
              <p className="text-grey-700">
                All images, designs, logos, product descriptions, and content on the website belong to Redheart. Reproduction or copying without permission is strictly prohibited.
              </p>
            </div>

            {/* 11. Limitation of Liability */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                11. Limitation of Liability
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Redheart is not liable for delays caused by external factors like traffic, weather, festivals, or courier disruptions.</li>
                <li>We are not responsible for allergic reactions to flowers, cakes, or food items.</li>
                <li>In no case shall Redheart be liable for indirect, incidental, or consequential damages.</li>
              </ul>
            </div>

            {/* 12. Refund */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                12. Return, Refund & Replacement
              </h2>
              <p className="text-grey-700">
                All refunds, cancellations, and replacements will follow our Cancellation & Refund Policy.
              </p>
            </div>

            {/* 13. Governing Law */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                13. Governing Law
              </h2>
              <p className="text-grey-700">
                These Terms & Conditions are governed by the laws of India. Any disputes shall be handled under the jurisdiction of courts located in [Your City], India.
              </p>
            </div>

            {/* 14. Contact */}
            <div className="pt-8 border-t border-grey-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  14. Contact Us
                </h2>
              </div>
              <p className="text-grey-700">
                For questions or clarifications:<br />
                Redheart Customer Support<br />
                Email: admin@redheart.in<br />
                Phone: +91-9275506722
              </p>
              <p className="text-grey-700 mt-6">
                Thank you for choosing Redheart — where every gift speaks from the heart.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
