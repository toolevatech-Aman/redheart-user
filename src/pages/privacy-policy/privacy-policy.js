import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Shield className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Privacy Policy
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
                At Redheart, we value your trust. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, mobile application, or services.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                By accessing or purchasing from Redheart, you agree to the terms described in this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  1. Information We Collect
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                We may collect the following types of information:
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Your information helps us provide a smooth and personalized experience. We use it for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Processing and delivering orders</li>
                <li>Verifying payments</li>
                <li>Sending order updates and notifications</li>
                <li>Improving website functionality</li>
                <li>Personalizing offers and recommendations</li>
                <li>Providing customer support</li>
              </ul>
            </div>

            {/* Sharing of Information */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                3. Sharing of Information
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Redheart does not sell or trade your personal data.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                We only share information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Delivery partners for fulfilling your orders</li>
                <li>Payment gateways for secure transactions</li>
                <li>Business partners for promotional services (only if consented)</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mt-4">
                All third-party partners are required to maintain strict data confidentiality.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  4. Data Security
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                We use advanced security measures to keep your information safe:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>SSL encryption</li>
                <li>Secure servers</li>
                <li>Restricted access protocols</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                5. Your Rights
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                You can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-grey-700">
                <li>Request a copy of your stored data</li>
                <li>Ask us to update or correct information</li>
                <li>Opt out of promotional messages</li>
                <li>Request deletion of your personal data (where legally applicable)</li>
              </ul>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mt-4">
                To make such requests, email us at: admin@redheart.in
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                6. Cookies
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                You can choose to disable cookies through your browser settings. However, some site features may not function properly without them.
              </p>
            </div>

            {/* Third Party Links */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                7. Links to Third-Party Websites
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Our site may contain links to external websites. We are not responsible for their content, policies, or security practices.
              </p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                8. Updates to This Privacy Policy
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                We may update this policy occasionally. Any changes will be posted on this page with the updated date.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-grey-200">
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                9. Contact Us
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                For questions, concerns, or privacy-related requests, contact:
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Redheart Customer Support<br />
                Email: admin@redheart.in<br />
                Phone: +91-9275506722
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mt-6">
                Thank you for trusting Redheart with your personal information.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
