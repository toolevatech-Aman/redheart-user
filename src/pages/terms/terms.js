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
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Agreement */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Agreement to Terms
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Use of Service */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Use of Service
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li className="font-body text-base text-grey-700 font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li className="font-body text-base text-grey-700 font-light">Sed do eiusmod tempor incididunt ut labore et dolore</li>
                <li className="font-body text-base text-grey-700 font-light">Ut enim ad minim veniam, quis nostrud exercitation</li>
                <li className="font-body text-base text-grey-700 font-light">Duis aute irure dolor in reprehenderit in voluptate</li>
              </ul>
            </div>

            {/* Prohibited Uses */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Prohibited Uses
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Intellectual Property
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Limitation of Liability
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-grey-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Contact Information
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at legal@redheart.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;

