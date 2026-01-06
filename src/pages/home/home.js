import React, { use } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

// Import images
import bestSellerImg from "../../assets/collections-image/best-seller.jpg";
import bridalBouquetImg from "../../assets/collections-image/bridal-bouque.jpg";
import loveAffectionImg from "../../assets/collections-image/love-affection.avif";
import anniversaryImg from "../../assets/collections-image/anniversary.webp";
import birthdayImg from "../../assets/collections-image/birthday-flower.webp";
import flowerBouquetImg from "../../assets/collections-image/flower-bouque.avif";

import redRoseImg from "../../assets/blossoms-image/red-rose.jpg";
import pinkRoseImg from "../../assets/blossoms-image/pink-rose.avif";
import whiteRoseImg from "../../assets/blossoms-image/white-rose.jpg";
import yellowRoseImg from "../../assets/blossoms-image/yellow-rose.jpeg";

import roseBouquetImg from "../../assets/shop-by-flower-image/rose-bouque.webp";
import lillyBouquetImg from "../../assets/shop-by-flower-image/lilly-bouque.webp";
import orchidsBouquetImg from "../../assets/shop-by-flower-image/orchids-bouque.jpg";

import flowerChocolateImg from "../../assets/floral-image/flower-chocolate.webp";
import flowerTeddyImg from "../../assets/floral-image/flower-teddy.jpg";
import allFlowerComboImg from "../../assets/floral-image/all-flower-combo.avif";

import congratulationImg from "../../assets/occasion-image/congratulation.jpg";
import thankYouImg from "../../assets/occasion-image/thank-you.jpeg";
import getWellSoonImg from "../../assets/occasion-image/get-well-soon.webp";

import cake from "../../assets/category-image/cake.webp"
import combo from "../../assets/category-image/combo.jpeg"
import plant from "../../assets/category-image/plant.avif"

import hero1 from "../../assets/hero-image/hero-image1.jpg"
import hero2 from "../../assets/hero-image/hero-image-2.jpg"
import hero3 from "../../assets/hero-image/hero-image3.jpg"
import hero4 from "../../assets/hero-image/hero-image4.webp"

import categoryBg from "../../assets/background/herobackgroundcat.jpg"
import anniversary1 from "../../assets/category-image/anniversary-1.webp"
import birthday1 from "../../assets/category-image/birthday.avif"
import giftforher from "../../assets/category-image/giftforher.jpg"
import giftforhim from "../../assets/category-image/giftforhim.jpg"

import chocolates from "../../assets/category-image/chocolates .jpg"
import gifts from "../../assets/category-image/gifts.webp"
import hampers from "../../assets/category-image/hampers.webp"

import buildHamper from "../../assets/background/buildhamper.webp"

import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const collections = [
    { id: 1, title: "Best Sellers", image: bestSellerImg, description: "Our most loved arrangements" },
    { id: 2, title: "Love & Affection", image: loveAffectionImg, description: "Express your deepest emotions" },
    { id: 3, title: "Bridal Bouquets", image: bridalBouquetImg, description: "Elegant arrangements for your special day" },
    { id: 4, title: "Anniversary", image: anniversaryImg, description: "Celebrate timeless love" },
    { id: 5, title: "Birthday Flowers", image: birthdayImg, description: "Make their day unforgettable" },
    { id: 6, title: "Flower Bouquets", image: flowerBouquetImg, description: "Classic elegance in every petal" },
  ];

  const blossomsByHues = [
    { id: 1, title: "Red Roses", image: redRoseImg, color: "Red" },
    { id: 2, title: "Pink Roses", image: pinkRoseImg, color: "Pink" },
    { id: 3, title: "White Roses", image: whiteRoseImg, color: "White" },
    { id: 4, title: "Yellow Roses", image: yellowRoseImg, color: "Yellow" },
  ];

  const shopByFlower = [
    { id: 1, title: "Rose Bouquet", image: roseBouquetImg },
    { id: 2, title: "Lilies Bouquet", image: lillyBouquetImg },
    { id: 3, title: "Orchids Bouquet", image: orchidsBouquetImg },
  ];

  const floralAssortments = [
    { id: 1, title: "Flowers & Chocolates", image: flowerChocolateImg, description: "Sweet gestures of love" },
    { id: 2, title: "Flowers & Teddy", image: flowerTeddyImg, description: "Cuddly companions" },
    { id: 3, title: "All Flowers Combo", image: allFlowerComboImg, description: "Complete floral experience" },
  ];

  const occasions = [
    { id: 1, title: "Congratulations", image: congratulationImg },
    { id: 2, title: "Thank You", image: thankYouImg },
    { id: 3, title: "Get Well Soon", image: getWellSoonImg },
  ];
  const categories = [
    { id: 1, title: "Anniversary", img: anniversary1 },
    { id: 2, title: "Birthday", img: birthday1 },
    { id: 3, title: "Gift for Her", img: giftforher },
    { id: 4, title: "Gift for Him", img: giftforhim },
  ];

  const mainCategories = [
    { title: "Cakes", img: cake },
    { title: "Flowers", img: loveAffectionImg },
    { title: "Plants", img: plant },
    { title: "Combos", img: combo },
    { title: "Chocolate Gifts", img: chocolates },
    { title: "Gifts", img: gifts },
    { title: "Hampers", img: hampers }

  ]
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      {/* <section className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={loveAffectionImg}
            alt="Premium Floral Arrangement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-primary-white/95 backdrop-blur-md border border-grey-200/50 rounded-full">
              <Sparkles className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
              <span className="font-body text-xs sm:text-sm text-grey-700 tracking-[0.15em] uppercase font-light">Premium Florals</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-primary-white mb-6 leading-[1.1] tracking-tight">
              Express Your
              <span className="block text-primary-white mt-2"> Heart's Desire</span>
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-primary-white/95 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our exquisite collection of premium flowers and gifts, crafted with love and elegance
            </p>
            <div className="flex justify-center items-center">
              <a
                href="#collections"
                className="group px-8 sm:px-10 py-3 sm:py-4 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide rounded-full transition-all duration-300 flex items-center gap-2 shadow-elegant hover:shadow-premium border border-accent-rose-700/30 text-sm sm:text-base"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section> */}
      {/* Small Posters Carousel */}
      {/* Small Posters Carousel */}
      <section className="py-8 bg-white">


        <div className="overflow-x-auto flex gap-5 px-4 sm:px-6 lg:px-8 scroll-smooth snap-x snap-mandatory">
          {[hero1, hero2, hero3, hero4].map((item) => (
            <div
              key={item}
              className="
          min-w-[220px]          /* mobile */
          sm:min-w-[280px]       /* tablet */
          lg:min-w-[430px]       /* laptop = 2.5 visible */
          snap-center 
          shrink-0 
          rounded-2xl 
          overflow-hidden 
          shadow-lg
        "
            >
              <img
                src={item}
                alt="Poster"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </section>


      <section className="py-8 bg-gradient-to-b from-white to-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}


          {/* Category Grid */}
          <style>
            {`
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `}
          </style>

          <div className="w-full md:overflow-x-auto md:hide-scrollbar">
            <div
              className="
      grid grid-cols-3 gap-4 px-3
      md:flex md:gap-5 md:min-w-max
    "
            >
              {mainCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="
          cursor-pointer
          md:w-56 md:flex-shrink-0
        "
                  onClick={() => navigate(`/product/${item.title}`)}
                >
                  {/* Image */}
                  <div className="group relative rounded-2xl overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-300">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="
              w-full h-40
              md:h-48
              object-cover transition-transform duration-500 group-hover:scale-105
            "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-center font-display text-sm md:text-base font-light tracking-wide text-gray-900 truncate">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>




        </div>
      </section>

      {/* Build Your Own Hamper Section */}
      <section
        className="relative cursor-pointer group"
        onClick={() => navigate("/hamper")}
      >
        {/* Background Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-96 overflow-hidden rounded-2xl">
          <img
            src={buildHamper}
            alt="Build Your Own Hamper"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            Build Your Own Hamper
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-white/90 font-light drop-shadow-md">
            Choose flowers, gifts, and treats for your perfect combo
          </p>

          {/* Luxury Button */}
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
            Customize Now
          </button>
        </div>


        {/* Mobile-only text overlay at bottom */}
        {/* <div className="absolute bottom-4 left-4 right-4 text-center sm:hidden">
          <h2 className="font-display text-lg font-semibold text-white drop-shadow-md">
            Build Your Own Hamper
          </h2>
          <p className="text-xs text-white/90 font-light drop-shadow-sm">
            Customize your perfect gift
          </p>
        </div> */}
      </section>


      <section className="py-16 bg-gradient-to-b from-[#fff5f2] to-white">
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Title */}
    <h2 className="text-4xl text-center mb-12 text-[#8B0000] font-serif">
      Shop By Occasions & Relations
    </h2>

    {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Text */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-[#8B0000] mb-2">
              {category.title}
            </h3>
            <p className="text-gray-500 text-sm">
              Explore our curated selection for this category
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Collections Section */}

<section className="py-4 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-4xl text-center mb-2 text-[#8B0000] font-serif">
        Our Collections
      </h2>
      <p className="font-body text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Curated with passion, designed with elegance
      </p>
    </div>

    {/* Symmetric Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200"
          onClick={() => navigate(`/product/${collection.title}`)}
        >
          {/* Image */}
          <div className="relative w-full h-64 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text */}
          <div className="p-4 md:p-5 text-center">
            <h3 className="font-display text-lg md:text-xl font-semibold text-[#8B0000] mb-2 group-hover:text-[#e74c3c] transition-colors duration-300">
              {collection.title}
            </h3>
            <p className="font-body text-sm md:text-base text-gray-700">
              {collection.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>





      {/* Blossoms By Hues Section */}
      <section className="py-8 bg-gradient-to-b from-[#fff5f2] to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-10 sm:mb-12 md:mb-16">
      <h2 className="text-4xl text-center mb-2 text-[#8B0000] font-serif">
        Blossoms By Hues
      </h2>
      <p className="font-body text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Discover the perfect shade to express your emotions
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {blossomsByHues.map((blossom) => (
        <div
          key={blossom.id}
          className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer"
          onClick={() => navigate(`/product/${blossom.title}`)}
        >
          {/* Image */}
          <div className="relative h-36 sm:h-40 md:h-64 lg:h-72 overflow-hidden rounded-t-2xl">
            <img
              src={blossom.image}
              alt={blossom.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text & Color */}
          <div className="p-4 sm:p-5 md:p-6 text-center">
            <div className="inline-block px-3 py-1 bg-[#8B0000]/90 backdrop-blur-sm border border-[#8B0000]/30 rounded-full mb-2">
              <span className="text-xs sm:text-sm text-white font-semibold uppercase tracking-wide">
                {blossom.color}
              </span>
            </div>
            <h3 className="font-display text-sm sm:text-base md:text-lg font-medium text-gray-800">
              {blossom.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Shop by Flower Type Section */}
      <section className="py-8 sm:py-8 md:py-8 lg:py-8 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-4">
              Shop by Flower Type
            </h2>
            <p className="font-body text-grey-700 text-base md:text-lg max-w-2xl mx-auto">
              Each flower tells a unique story
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {shopByFlower.map((flower) => (
              <div
                key={flower.id}
                className="group relative overflow-hidden bg-primary-white border border-grey-200 shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer rounded-xl"
              >
                <div className="relative h-40 sm:h-48 md:h-96 overflow-hidden" onClick={() => navigate(`/product/${flower.title}`)}>
                  <img
                    src={flower.image}
                    alt={flower.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
                    <h3 className="font-display text-sm sm:text-base md:text-2xl lg:text-3xl font-light text-primary-white mb-2 md:mb-4 tracking-tight">
                      {flower.title}
                    </h3>
                    <div className="flex items-center text-primary-white gap-1 md:group-hover:gap-2 transition-all duration-300">
                      <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-light">Shop Now</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:opacity-0 md:group-hover:opacity-100 md:transform md:-translate-x-2 md:group-hover:translate-x-0 transition-all duration-300" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floral Assortments Section */}
      <section className="py-8 sm:py-12 md:py-24 lg:py-32 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-4">
              Floral Assortments
            </h2>
            <p className="font-body text-grey-700 text-base md:text-lg max-w-2xl mx-auto">
              Perfect combinations for every occasion
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {floralAssortments.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-primary-white border border-grey-200 shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer rounded-xl"
              >
                <div className="relative h-40 sm:h-48 md:h-80 overflow-hidden" onClick={() => navigate(`/product/${item.title}`)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-t border-grey-100">
                  <h3 className="font-display text-sm sm:text-base md:text-xl lg:text-2xl font-light text-black-charcoal mb-2 md:mb-3 group-hover:text-accent-rose-600 transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-grey-600 mb-3 md:mb-5 font-light leading-relaxed">{item.description}</p>
                  <div className="flex items-center text-accent-rose-600 gap-1 md:group-hover:gap-2 transition-all duration-300">
                    <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-light">Explore</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:opacity-0 md:group-hover:opacity-100 md:transform md:-translate-x-2 md:group-hover:translate-x-0 transition-all duration-300" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section id="occasions" className="py-8 sm:py-8 md:py-8 lg:py-8 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="font-body text-grey-700 text-base md:text-lg max-w-2xl mx-auto">
              Thoughtful arrangements for life's special moments
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                className="group relative overflow-hidden bg-primary-white border border-grey-200 shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer rounded-xl"
              >
                <div className="relative h-40 sm:h-48 md:h-96 overflow-hidden" onClick={() => navigate(`/product/${occasion.title}`)}>
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
                    <h3 className="font-display text-sm sm:text-base md:text-2xl lg:text-3xl font-light text-primary-white mb-2 md:mb-4 tracking-tight">
                      {occasion.title}
                    </h3>
                    <div className="flex items-center text-primary-white gap-1 md:group-hover:gap-2 transition-all duration-300">
                      <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider font-light">Shop Now</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:opacity-0 md:group-hover:opacity-100 md:transform md:-translate-x-2 md:group-hover:translate-x-0 transition-all duration-300" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-accent-rose-50/50 via-accent-pink-50/30 to-grey-50/50 border-t border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 rounded-full mb-8">
            <Heart className="w-8 h-8 text-accent-rose-600" strokeWidth={2} fill="currentColor" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-6 tracking-tight">
            Spread Love, One Bloom at a Time
          </h2>
          <p className="font-body text-grey-700 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Let us help you create unforgettable moments with our premium floral arrangements
          </p>
          <a
            href="#collections"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide rounded-full transition-all duration-300 shadow-elegant hover:shadow-premium border border-accent-rose-700/30"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;