import React from "react";
import { Heart, Award, Users, Sparkles, Gift, Leaf, Cake } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Heart className="w-8 h-8 text-accent-rose-600" fill="currentColor" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6">
            About Us
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-3xl mx-auto">
            Welcome to Redheart — your trusted destination for premium gifting.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-4xl font-light mb-6">
            Who We Are
          </h2>
          <p className="font-body text-grey-700 leading-relaxed mb-6">
            We believe gifting is more than just exchanging products; it’s about expressing emotions, celebrating relationships, and creating unforgettable memories. That’s why at Redheart, every bouquet, every cake, every plant, and every gift hamper is crafted with care, creativity, and a touch of love.
          </p>
          <p className="font-body text-grey-700 leading-relaxed">
            Redheart is a modern gifting brand offering a wide range of flowers, cakes, plants, personalised gifts, and festive hampers. Inspired by industry leaders yet committed to our own identity, we focus on delivering high-quality gifts with timely delivery and exceptional customer experience.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-4xl font-light mb-10 text-center">
            What We Offer
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light mb-2">🌹 Flowers for Every Emotion</h3>
              <p className="text-grey-700">
                From roses, tulips, carnations, gerberas to rare exotic flowers — available in red, white, pink, yellow, black, and more. Whether it’s love, celebration, apology, or gratitude, we have a bloom for every mood.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light mb-2">🍰 Cakes for Every Celebration</h3>
              <p className="text-grey-700">
                Choose from a variety of flavours, designs, and custom options. Perfect for birthdays, anniversaries, milestones, or just to make someone’s day sweeter.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light mb-2">🌱 Plants that Bring Positivity</h3>
              <p className="text-grey-700">
                Air-purifying plants, indoor greens, lucky bamboo, flowering plants, succulents, bonsais — we offer a complete range for nature lovers and home décor enthusiasts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light mb-2">🌼 Flower Bulbs & Garden Gifts</h3>
              <p className="text-grey-700">
                For gardening lovers, we provide high-quality flower bulbs and plant essentials to bring colour and life to any space.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light mb-2">🎁 Personalised Gifts & Hampers</h3>
              <p className="text-grey-700">
                From photo frames to customised accessories, we make gifts personal. And when it comes to Valentine’s Day, we curate exclusive luxury hampers specially designed to make the moment magical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-4xl font-light mb-6">
            Our Mission
          </h2>
          <p className="text-grey-700">
            To make gifting effortless, emotional, and meaningful for everyone. We aim to deliver joy at the right moment, in the most beautiful way.
          </p>
        </div>
      </section>

      {/* Why Redheart */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-4xl font-light mb-6">
            Why Redheart?
          </h2>
          <ul className="list-disc pl-6 text-grey-700 space-y-2">
            <li>Premium quality products</li>
            <li>Wide gifting range for every occasion</li>
            <li>Same-day and timely delivery</li>
            <li>Customisation options</li>
            <li>Customer-first service</li>
          </ul>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 md:py-24 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-light mb-6">
            Our Promise
          </h2>
          <p className="text-grey-700 mb-4">
            At Redheart, every gift is a promise — a promise to deliver happiness with heart.
          </p>
          <p className="text-grey-700">
            Thank you for choosing us to be a part of your special moments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
