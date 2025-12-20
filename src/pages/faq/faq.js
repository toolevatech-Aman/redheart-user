import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "How long does shipping take?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "What is your return policy?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "How do I track my order?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

