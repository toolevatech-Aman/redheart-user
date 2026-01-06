import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
  {
    question: "What types of flowers can I order from Redheart?",
    answer:
      "We offer a wide range of flowers including roses, tulips, carnations, gerberas, lilies, exotic blooms, and premium bouquets in various colours."
  },
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes, same‑day delivery is available on most flowers and cakes placed before the cut‑off time."
  },
  {
    question: "Can I schedule a delivery for a specific date and time?",
    answer:
      "Yes, you can choose your preferred date and time slot during checkout."
  },
  {
    question: "Do you deliver at midnight or early morning?",
    answer:
      "We offer special delivery slots like midnight and early‑morning deliveries in select cities."
  },
  {
    question: "What happens if the recipient is not available at the delivery location?",
    answer:
      "Our delivery partner will attempt contact. If unreachable, the order may be left with a neighbour or returned to our hub."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit/debit cards, net banking, digital wallets, and selected EMI options."
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "COD is not available as most gifts are perishable and require prepaid confirmation."
  },
  {
    question: "Will I receive an invoice for my order?",
    answer:
      "Yes, a digital invoice is emailed immediately after order confirmation."
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order in the “My Orders” section or through the tracking link sent via SMS/Email."
  },
  {
    question: "Are your cakes fresh and eggless?",
    answer:
      "All cakes are freshly baked, and eggless options are available for most flavours."
  },
  {
    question: "Do you deliver indoor plants and flower bulbs?",
    answer:
      "Yes, we deliver air‑purifying plants, succulents, flowering plants, and seasonal flower bulbs nationwide."
  },
  {
    question: "Are gift hampers customisable?",
    answer:
      "Yes, we offer custom hampers, especially for Valentine’s Day, birthdays, anniversaries, and corporate orders."
  },
  {
    question: "Can I cancel an order after placing it?",
    answer:
      "Cancellations are possible before dispatch. Perishable items like cakes and flowers have tighter timelines."
  },
  {
    question: "What if my product is damaged or incorrect?",
    answer:
      "If you receive a damaged or wrong item, contact us within 24 hours for a replacement or resolution."
  },
  {
    question: "How long does a refund take?",
    answer:
      "Refunds typically take 5–7 business days to reflect in your account."
  },
  {
    question: "Can I use multiple coupons in one order?",
    answer: "No, only one coupon can be applied per order."
  },
  {
    question: "Do you handle corporate gifting?",
    answer:
      "Yes, we specialise in customised corporate gifting with branding options."
  },
  {
    question: "How early should I place a bulk order?",
    answer:
      "We recommend placing bulk orders at least 3–7 days in advance."
  }
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <HelpCircle className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-grey-200 bg-primary-white transition-all duration-300 hover:border-accent-rose-300 hover:shadow-elegant"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-display text-lg font-light text-black-charcoal tracking-tight pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-accent-rose-600 flex-shrink-0" strokeWidth={2} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-grey-400 flex-shrink-0" strokeWidth={2} />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 pt-0 border-t border-grey-100">
                    <p className="font-body text-base text-grey-700 font-light leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 pt-8 border-t border-grey-200 text-center">
            <p className="font-body text-base text-grey-700 font-light mb-4">
              Still have questions? We're here to help.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide transition-all duration-300 border border-accent-rose-700/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

