import React from "react";
import { Cookie } from "lucide-react";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Cookie className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Cookie Policy
          </h1>
          <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* What Are Cookies */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                What Are Cookies
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help the site remember your preferences, login information, and other details to improve your browsing experience.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Cookies may also be used to analyze traffic, measure the effectiveness of advertising, and provide personalized content. They are widely used to make websites work more efficiently and deliver a better user experience.
              </p>
            </div>

            {/* How We Use Cookies */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                How We Use Cookies
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                We use cookies for several purposes, including:  
              </p>
              <ul className="list-disc ml-6 text-grey-700 space-y-2">
                <li>To remember your preferences and settings.</li>
                <li>To analyze site traffic and improve our services.</li>
                <li>To show personalized content and relevant advertisements.</li>
                <li>To enhance website functionality and ensure security.</li>
              </ul>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Managing Cookies
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                You have the right to control the cookies stored on your device. You can accept or decline cookies through your browser settings or via the cookie banner on this website.  
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Most browsers allow you to manage cookie preferences, delete existing cookies, or block certain types of cookies entirely. Please note that disabling cookies may affect the functionality of some parts of our website.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                For more detailed information about how we use cookies and your options, please visit our <a href="/privacy-policy" className="underline hover:text-accent-rose-600 transition">Privacy Policy</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
