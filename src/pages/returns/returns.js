import React from "react";
import { RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <RotateCcw className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Returns & Exchanges
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Our hassle-free return and exchange policy
          </p>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Return Policy
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Return Timeframe
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <RotateCcw className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  How to Return
                </h2>
              </div>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li className="font-body text-base text-grey-700 font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li className="font-body text-base text-grey-700 font-light">Sed do eiusmod tempor incididunt ut labore et dolore</li>
                <li className="font-body text-base text-grey-700 font-light">Ut enim ad minim veniam, quis nostrud exercitation</li>
                <li className="font-body text-base text-grey-700 font-light">Duis aute irure dolor in reprehenderit in voluptate</li>
              </ol>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal tracking-tight">
                  Non-Returnable Items
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

export default Returns;

