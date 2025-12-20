import React from "react";
import { Heart, Award, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Heart className="w-8 h-8 text-accent-rose-600" strokeWidth={2} fill="currentColor" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            About Red Heart
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-8 tracking-tight">
            Our Story
          </h2>
          <div className="space-y-6">
            <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-4 tracking-tight">
              Our Values
            </h2>
            <p className="font-body text-grey-700 text-base md:text-lg max-w-2xl mx-auto font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Heart className="w-8 h-8 text-accent-rose-600" strokeWidth={2} fill="currentColor" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Passion
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Award className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Excellence
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
                <Users className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-black-charcoal mb-4 tracking-tight">
                Community
              </h3>
              <p className="font-body text-grey-700 font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-accent-rose-600" strokeWidth={2} />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal tracking-tight">
              Our Mission
            </h2>
          </div>
          <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="font-body text-base md:text-lg text-grey-700 font-light leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

