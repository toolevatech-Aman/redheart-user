import React, { use } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { FiGift, FiTruck } from "react-icons/fi";
import { GiCakeSlice, GiFlowerPot } from "react-icons/gi";
// Import images
import birthdaypic from "../../assets/collections/Birthday-Cake-1.webp";
import Anniversary from "../../assets/collections/anniversary-love-9914310ca-aaa_0.avif";
import Wedding from "../../assets/collections/weddingg.webp";
import housewarming from "../../assets/collections/housewarming.webp";
import bbyshower from "../../assets/collections/babyshower.webp";
import lovaromance from "../../assets/collections/getwellsoon.jpg";

import loveAffectionImg from "../../assets/collections-image/love-affection.avif";
import redRoseImg from "../../assets/blossoms-image/chrismas.jpg";
import pinkRoseImg from "../../assets/blossoms-image/lorhi.jpg";
import whiteRoseImg from "../../assets/blossoms-image/holi.jpg";
import yellowRoseImg from "../../assets/blossoms-image/eid.webp";

import roseBouquetImg from "../../assets/shop-by-flower-image/flowerandcake.webp";
import lillyBouquetImg from "../../assets/shop-by-flower-image/flowerandbookew.webp";
import orchidsBouquetImg from "../../assets/shop-by-flower-image/flowerandteddy.jpeg";
import cakeandteddy from "../../assets/shop-by-flower-image/cakeandteddy.avif";
import flowerChocolateImg from "../../assets/floral-image/flower-chocolate.webp";
import flowerTeddyImg from "../../assets/floral-image/flower-teddy.jpg";
import allFlowerComboImg from "../../assets/floral-image/all-flower-combo.avif";

import congratulationImg from "../../assets/occasion-image/congratulation.jpg";
import thankYouImg from "../../assets/occasion-image/thank-you.jpeg";
import getWellSoonImg from "../../assets/occasion-image/get-well-soon.webp";

import cake from "../../assets/category-image/cake.webp";
import combo from "../../assets/category-image/combo.jpeg";
import plant from "../../assets/category-image/plant.avif";

import hero1 from "../../assets/hero-image/17768080-0BED-4D5D-BDD0-4C620CB29901_4_5005_c.jpeg";
import hero2 from "../../assets/hero-image/728AF6B8-A0EA-48B7-BBB4-47A594B437BE_4_5005_c.jpeg";
import hero3 from "../../assets/hero-image/7CC8073B-CB39-42FA-9EA8-A06FEFC1CE95_4_5005_c.jpeg";
import hero4 from "../../assets/hero-image/85CC3076-3EAB-4BB9-B01E-1C9B31D8E8FF_4_5005_c.jpeg";
import hero5 from "../../assets/hero-image/B3D3A4E6-90FE-4437-8905-2794D80B9A66_4_5005_c.jpeg";
import hero6 from "../../assets/hero-image/B765D234-E0AE-4F39-A0D4-85A1883911B9_4_5005_c.jpeg";
import hero7 from "../../assets/hero-image/BCD5580A-1738-4609-8EB3-CA8B4B54D4F6_4_5005_c.jpeg";
import hero8 from "../../assets/hero-image/E4FA1C23-A9E0-4717-9D01-7BFE64221799_4_5005_c.jpeg";

import anniversary1 from "../../assets/category-image/anniversary-1.webp";
import birthday1 from "../../assets/category-image/birthday.avif";
import giftforher from "../../assets/category-image/giftforher.jpg";
import giftforhim from "../../assets/category-image/giftforhim.jpg";

import chocolates from "../../assets/category-image/chocolates .jpg";
import gifts from "../../assets/category-image/gifts.webp";
import hampers from "../../assets/category-image/hampers.webp";

import buildHamper from "../../assets/background/buildhamper.webp";

import SEOHead from "../../comman/seo/seo-head";

const Home = () => {
	const collections = [
		{
			id: 1,
			label: "Birthday",
			image: birthdaypic,
			description: "Our most loved arrangements",
			alt: "Birthday gifts, flowers and cakes for memorable celebrations",
			title: "Order Birthday Gifts, Flowers & Cakes Online",
		},
		{
			id: 2,
			label: "Anniversary",
			image: Anniversary,
			description: "Express your deepest emotions",
			alt: "Anniversary flowers, cakes and romantic gift combos",
			title: "Buy Anniversary Flowers, Cakes & Romantic Gifts Online",
		},
		{
			id: 3,
			label: "Wedding",
			image: Wedding,
			description: "Elegant arrangements for your special day",
			alt: "Wedding gifts, flower arrangements and celebration hampers",
			title: "Shop Wedding Gifts, Flowers & Hampers Online",
		},
		{
			id: 4,
			label: "House Warming",
			image: housewarming,
			description: "Celebrate timeless love",
			alt: "House warming gifts, indoor plants and decorative hampers",
			title: "Send House Warming Gifts & Plants Online",
		},
		{
			id: 5,
			label: "Baby Shower",
			image: bbyshower,
			description: "Make their day unforgettable",
			alt: "Baby shower gifts, flowers and cute hampers for new parents",
			title: "Buy Baby Shower Gifts & Hampers Online",
		},
		{
			id: 6,
			label: "Love n Romance",
			image: lovaromance,
			description: "Classic elegance in every petal",
			alt: "Romantic gifts, roses, cakes and love combos for special moments",
			title: "Order Romantic Gifts, Roses & Cakes Online",
		},
		{
			id: 7,
			label: "Get Well Soon",
			image: getWellSoonImg,
			description: "Classic elegance in every petal",
			alt: "Get well soon flowers, fruits and thoughtful recovery gifts",
			title: "Send Get Well Soon Flowers & Gifts Online",
		},
	];

	const festivalCollection = [
		{
			id: 1,
			label: "Christmas",
			image: redRoseImg,
			color: "Red",
			description:
				"Celebrate the warmth and joy of Christmas with the vibrant red of love and cheer.",
			alt: "Christmas gifts, flowers, cakes and festive hampers for celebrations",
			title: "Buy Christmas Gifts, Flowers & Hampers Online",
		},
		{
			id: 2,
			label: "Lohri",
			image: pinkRoseImg,
			color: "Pink",
			description:
				"Welcome the harvest season with Lohri’s festive spirit, wrapped in soft, cheerful pink.",
			alt: "Lohri gifts, sweets, flowers and festive gift hampers",
			title: "Shop Lohri Gifts & Festive Hampers Online",
		},
		{
			id: 3,
			label: "Holi",
			image: whiteRoseImg,
			color: "White",
			description:
				"Dive into the festival of colors with Holi, starting fresh with the purity of white.",
			alt: "Holi gifts, colors, sweets, flowers and celebration hampers",
			title: "Order Holi Gifts, Sweets & Hampers Online",
		},
		{
			id: 4,
			label: "Eid Al Fitr",
			image: yellowRoseImg,
			color: "Yellow",
			description:
				"Mark Eid Al Fitr with golden yellow hues, symbolizing joy, prosperity, and new beginnings.",
			alt: "Eid gifts, flowers, sweets and premium festive hampers",
			title: "Buy Eid Gifts, Flowers & Hampers Online",
		},
	];

	const shopByCombo = [
		{
			id: 1,
			label: "Flowers & Cakes",
			image: roseBouquetImg,
			alt: "Flower bouquet with cake combo for birthday and anniversary gifts",
			title: "Order Flowers & Cakes Combo Online for Birthday & Anniversary",
		},
		{
			id: 2,
			label: "Flowers & Chocolates",
			image: lillyBouquetImg,
			alt: "Flowers and chocolates gift combo for romantic surprises",
			title: "Buy Flowers & Chocolates Combo Online",
		},
		{
			id: 3,
			label: "Flowers & Teddy",
			image: orchidsBouquetImg,
			alt: "Flower bouquet with teddy bear gift combo for loved ones",
			title: "Shop Flowers & Teddy Bear Combo Online",
		},
		{
			id: 4,
			label: "Cakes & Teddy",
			image: cakeandteddy,
			alt: "Cake with teddy bear combo gift for special occasions",
			title: "Order Cakes & Teddy Combo Gift Online",
		},
	];

	const floralAssortments = [
		{
			id: 1,
			title: "Flowers & Chocolates",
			image: flowerChocolateImg,
			description: "Sweet gestures of love",
		},
		{
			id: 2,
			title: "Flowers & Teddy",
			image: flowerTeddyImg,
			description: "Cuddly companions",
		},
		{
			id: 3,
			title: "All Flowers Combo",
			image: allFlowerComboImg,
			description: "Complete floral experience",
		},
	];

	const occasions = [
		{ id: 1, title: "Congratulations", image: congratulationImg },
		{ id: 2, title: "Thank You", image: thankYouImg },
		{ id: 3, title: "Get Well Soon", image: getWellSoonImg },
	];
	const categories = [
		{
			id: 1,
			label: "Husband",
			img: anniversary1,
			description: "Because he deserves more than just a thank-you.",
			alt: "Romantic and thoughtful gifts for husband including cakes, flowers and surprises",
			title:
				"Best Gifts for Husband Online – Cakes, Flowers & Romantic Surprises",
		},
		{
			id: 2,
			label: "Wife",
			img: birthday1,
			description: "Turn everyday love into unforgettable moments.",
			alt: "Beautiful gifts for wife with flowers, cakes and personalized presents",
			title: "Buy Gifts for Wife Online – Flowers, Cakes & Personalized Gifts",
		},
		{
			id: 3,
			label: "Her",
			img: giftforher,
			description: "Surprises she’ll smile about all day.",
			alt: "Unique and cute gifts for her including chocolates, flowers and hampers",
			title: "Shop Cute & Unique Gifts for Her Online",
		},
		{
			id: 4,
			label: "Him",
			img: giftforhim,
			description: "Gifts that speak louder than words.",
			alt: "Special gifts for him with cakes, plants, chocolates and combos",
			title: "Order Special Gifts for Him Online",
		},
	];

	const mainCategories = [
		{
			label: "Cakes",
			img: cake,
			alt: "Birthday, anniversary and celebration cakes online delivery",
			title: "Buy Cakes Online for Birthday, Anniversary & Celebrations",
		},
		{
			label: "Flowers",
			img: loveAffectionImg,
			alt: "Fresh flower bouquets, roses and floral arrangements for gifting",
			title: "Order Fresh Flowers & Rose Bouquets Online",
		},
		{
			label: "Plants",
			img: plant,
			alt: "Indoor plants, lucky bamboo and air purifying plants for home",
			title: "Send Indoor Plants & Green Gifts Online",
		},
		{
			label: "Combos",
			img: combo,
			alt: "Gift combos with flowers, cakes, chocolates and soft toys",
			title: "Shop Gift Combos with Flowers, Cakes & Chocolates",
		},
		{
			label: "Chocolate Gifts",
			img: chocolates,
			alt: "Chocolate gift hampers and sweet treats for special occasions",
			title: "Buy Chocolate Gift Hampers & Sweet Gifts Online",
		},
		{
			label: "Gifts",
			img: gifts,
			alt: "Personalized gifts, soft toys and unique presents for loved ones",
			title: "Shop Personalized & Unique Gifts Online",
		},
		{
			label: "Hampers",
			img: hampers,
			alt: "Premium gift hampers for festivals, birthdays and celebrations",
			title: "Order Premium Gift Hampers Online",
		},
	];
	const heroes = [
		{
			img: hero1,
			link: "/product/Birthday",
			alt: "Birthday gifts online with flowers, cakes and personalized surprises",
			title: "Shop Birthday Gifts, Flowers & Cakes Online",
		},
		{
			img: hero2,
			link: "/product/Valentine's%20Day",
			alt: "Valentine's Day romantic gifts, roses, cakes and love hampers",
			title: "Buy Valentine's Day Gifts, Roses & Cakes Online",
		},
		{
			img: hero3,
			link: "/product/Anniversary",
			alt: "Anniversary gifts for couples with flowers, cakes and combos",
			title: "Order Anniversary Flowers, Cakes & Gifts Online",
		},
		{
			img: hero4,
			link: "/product/Plants",
			alt: "Indoor plants and green gifts for home decoration and wellness",
			title: "Send Indoor Plants & Green Gifts Online",
		},
		{
			img: hero5,
			link: "/product/Plants",
			alt: "Lucky bamboo, air purifying and decorative plants as gifts",
			title: "Buy Lucky Bamboo & Air Purifying Plants Online",
		},
		{
			img: hero6,
			link: "/product/Chocolate%20Gifts",
			alt: "Chocolate gift hampers and sweet treats for special occasions",
			title: "Shop Chocolate Gift Hampers Online",
		},
		{
			img: hero7,
			link: "/product/Flowers",
			alt: "Fresh flower bouquets and roses for delivery across India",
			title: "Order Fresh Flower Bouquets Online",
		},
		{
			img: hero8,
			link: "/product/Cakes",
			alt: "Delicious cakes for birthday, anniversary and celebrations",
			title: "Buy Cakes Online for Every Occasion",
		},
	];
	return (
		<>
			<SEOHead
				productName='Flowers, Cakes, Plants, Chocolates & Gifts'
				categoryName='Occasions'
				description='Shop premium flowers, cakes, plants, chocolates and gift hampers for every occasion. Fast delivery and handcrafted gifts by RedHeart.'
				canonicalPath={window.location.pathname}
			/>
			<div className='min-h-screen bg-primary-white'>
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
				<section className='py-8 bg-white'>
					<div className='overflow-x-auto flex gap-5 px-4 sm:px-6 lg:px-8 scroll-smooth snap-x snap-mandatory hide-scrollbar'>
						{heroes.map((item, idx) => (
							<a
								key={idx}
								href={item.link}
								title={`${item.title}`}
								className='
          min-w-[220px]
          sm:min-w-[280px]
          lg:min-w-[430px]
          snap-center
          shrink-0
          rounded-2xl
          overflow-hidden
          shadow-lg
          block
        '>
								<img
									src={item.img}
									alt={`${item.title} flowers, cakes and gifts`}
									title={`${item.title} flowers, cakes and gifts`}
									className='w-full h-64 sm:h-72 lg:h-80 object-cover'
								/>
							</a>
						))}
					</div>

					<style jsx>{`
						.hide-scrollbar {
							-ms-overflow-style: none;
							scrollbar-width: none;
						}
						.hide-scrollbar::-webkit-scrollbar {
							display: none;
						}
					`}</style>
				</section>

				<section className='py-8 bg-gradient-to-b from-white to-gray-50'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Optional: Heading */}
						<div className='text-center mb-8'>
							<h2 className='text-3xl font-serif text-[#8B0000]'>
								Our Categories
							</h2>
							<p className='text-gray-600 text-base md:text-lg'>
								Explore what suits your taste
							</p>
						</div>

						{/* Carousel */}
						<div className='w-full overflow-x-auto hide-scrollbar'>
							<div className='flex gap-4 md:gap-5 py-4 snap-x snap-mandatory scroll-smooth'>
								{mainCategories.map((item, idx) => {
									return (
										<a
											key={idx}
											href={`/product/${item.label}`}
											title={`${item.title}`}
											className='flex-shrink-0 w-48 sm:w-52 md:w-56 snap-center cursor-pointer block'>
											{/* Image */}
											<div className='group relative rounded-2xl overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-300'>
												<img
													src={item.img}
													alt={`${item.label} flowers, cakes and gifts`}
													title={`${item.label} flowers, cakes and gifts`}
													className='w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105'
												/>
												<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent'></div>
											</div>

											{/* Title */}
											<h3 className='mt-2 text-center font-display text-sm md:text-base font-light tracking-wide text-gray-900 truncate'>
												{item.label}
											</h3>
										</a>
									);
								})}
							</div>
						</div>
					</div>

					{/* Hide scrollbar styles */}
					<style jsx>{`
						.hide-scrollbar {
							-ms-overflow-style: none; /* IE & Edge */
							scrollbar-width: none; /* Firefox */
						}
						.hide-scrollbar::-webkit-scrollbar {
							display: none; /* Chrome, Safari, Opera */
						}
					`}</style>
				</section>

				{/* Build Your Own Hamper Section */}
				<a
					className='relative cursor-pointer group'
					href='/hamper'
					title='Build Your Own Hamper with flowers, gifts and treats'>
					{/* Background Image */}
					<div className='w-full h-64 sm:h-80 md:h-96 lg:h-96 overflow-hidden rounded-2xl'>
						<img
							src={buildHamper}
							alt='Build Your Own Hamper'
							title='Build Your Own Hamper'
							className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
						/>
						{/* Overlay */}
						<div className='absolute inset-0 bg-black/30 md:bg-black/40 group-hover:bg-black/50 transition-all duration-500'></div>
					</div>

					{/* Text Content */}
					<div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8'>
						<h2 className='font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg'>
							Build Your Own Hamper
						</h2>
						<p className='mt-2 text-sm sm:text-base md:text-lg text-white/90 font-light drop-shadow-md'>
							Choose flowers, gifts, and treats for your perfect combo
						</p>

						{/* Luxury Button */}
						<button className='mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300'>
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
				</a>

				<section className='py-16 bg-gradient-to-b from-[#fff5f2] to-white'>
					<div className='max-w-7xl mx-auto px-4'>
						{/* Section Title */}
						<h2 className='text-4xl text-center mb-12 text-[#8B0000] font-serif'>
							Shop By Occasions & Relations
						</h2>

						{/* Categories Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
							{categories.map((category) => (
								<a
									key={category.id}
									href={`/product/${category.label}`}
									title={`${category.title}`}
									className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer'>
									{/* Image */}
									<div className='overflow-hidden'>
										<img
											src={category.img}
											alt={category.title}
											title={category.title}
											className='w-full h-64 object-cover transition-transform duration-500 hover:scale-110'
										/>
									</div>

									{/* Text */}
									<div className='p-6 text-center'>
										<h3 className='text-xl font-semibold text-[#8B0000] mb-2'>
											{category.label}
										</h3>
										<p className='text-gray-500 text-sm'>
											{category?.description}
										</p>
									</div>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* Collections Section */}

				<section className='py-4 bg-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Section Header */}
						<div className='text-center mb-12'>
							<h2 className='text-4xl text-center mb-2 text-[#8B0000] font-serif'>
								Our Occasions Collections
							</h2>
							<p className='font-body text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
								Curated with passion, designed with elegance
							</p>
						</div>

						{/* Carousel */}
						<div className='carousel-container overflow-x-auto flex space-x-4 py-4 scroll-smooth snap-x snap-mandatory'>
							{collections.map((collection) => (
								<a
									key={collection.id}
									className='carousel-item flex-shrink-0 w-64 sm:w-72 md:w-80 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden snap-center cursor-pointer group transition-all duration-500 hover:shadow-xl'
									href={`/product/${collection.label}`}
									title={`${collection.title}`}>
									{/* Image */}
									<div className='relative w-full h-56 sm:h-48 md:h-56 overflow-hidden rounded-t-2xl'>
										<img
											src={collection.image}
											alt={collection.title}
											title={collection.title}
											className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
										/>
									</div>

									{/* Text */}
									<div className='p-3 md:p-4 text-center'>
										<h3 className='font-display text-lg md:text-lg font-semibold text-[#8B0000] mb-1 group-hover:text-[#e74c3c] transition-colors duration-300'>
											{collection.label}
										</h3>
										<p className='font-body text-sm md:text-base text-gray-700'>
											{collection.description}
										</p>
									</div>
								</a>
							))}
						</div>
					</div>

					{/* Hide scrollbar */}
					<style jsx>{`
						.carousel-container {
							-ms-overflow-style: none; /* IE and Edge */
							scrollbar-width: none; /* Firefox */
						}
						.carousel-container::-webkit-scrollbar {
							display: none; /* Chrome, Safari, Opera */
						}
					`}</style>
				</section>

				{/* Blossoms By Hues Section */}
				<section className='py-8 bg-gradient-to-b from-[#fff5f2] to-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Section Header */}
						<div className='text-center mb-10 sm:mb-12 md:mb-16'>
							<h2 className='text-4xl text-center mb-2 text-[#8B0000] font-serif'>
								Celebrate Festivals in Full Color
							</h2>
							<p className='font-body text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
								Explore a spectrum of colors that capture every emotion and make
								your festival moments unforgettable.
							</p>
						</div>

						{/* Carousel */}
						{/* Carousel */}
						<div className='flex justify-center'>
							<div className='overflow-x-auto flex gap-4 md:gap-5 scroll-smooth snap-x snap-mandatory hide-scrollbar py-2'>
								{festivalCollection.map((blossom) => (
									<a
										key={blossom.id}
										className='flex-shrink-0 w-48 sm:w-52 md:w-60 lg:w-64 snap-center group relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer'
										href={`/product/${blossom.label}`}
										title={`${blossom.title}`}>
										{/* Image */}
										<div className='relative h-36 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-2xl'>
											<img
												src={blossom.image}
												alt={blossom.title}
												title={blossom.title}
												className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
											/>
										</div>

										{/* Text & Color */}
										<div className='p-3 sm:p-4 md:p-5 text-center'>
											<div className='inline-block px-3 py-1 bg-[#8B0000]/90 backdrop-blur-sm border border-[#8B0000]/30 rounded-full mb-2'>
												<span className='text-xs sm:text-sm text-white font-semibold uppercase tracking-wide'>
													{blossom.label}
												</span>
											</div>
											<h3 className='font-display text-sm sm:text-base md:text-sm font-small text-gray-400'>
												{blossom.description}
											</h3>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Hide scrollbar styles */}
					<style jsx>{`
						.hide-scrollbar {
							-ms-overflow-style: none; /* IE & Edge */
							scrollbar-width: none; /* Firefox */
						}
						.hide-scrollbar::-webkit-scrollbar {
							display: none; /* Chrome, Safari, Opera */
						}
					`}</style>
				</section>

				<section className='py-16 bg-gradient-to-b from-[#fff5f2] to-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Section Header */}
						<div className='text-center mb-12'>
							<h2 className='text-4xl font-serif text-[#8B0000] mb-3'>
								Why Choose Us
							</h2>
							<p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
								We make every occasion special with our flowers, cakes, and
								gifts.
							</p>
						</div>

						{/* USP Cards */}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
							{/* USP 1 */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									<GiFlowerPot
										className='w-12 h-12'
										aria-label='Fresh premium flowers delivery'
										title='Fresh premium flowers delivery'
									/>
								</div>
								<h3 className='text-lg font-medium text-gray-800 mb-2'>
									Fresh & Premium Flowers
								</h3>
								<p className='text-gray-500 text-sm'>
									Handpicked blooms delivered fresh to your doorstep.
								</p>
							</div>

							{/* USP 2 */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									<GiCakeSlice
										className='w-12 h-12'
										aria-label='Delicious custom cakes for every celebration'
										title='Delicious custom cakes for every celebration'
									/>
								</div>
								<h3 className='text-lg font-medium text-gray-800 mb-2'>
									Delicious Custom Cakes
								</h3>
								<p className='text-gray-500 text-sm'>
									Bespoke cakes baked with love for every occasion.
								</p>
							</div>

							{/* USP 3 */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									<FiGift
										className='w-12 h-12'
										aria-label='Thoughtful gift selection including flowers, cakes, and personalized hampers'
										title='Thoughtful gift selection including flowers, cakes, and personalized hampers'
									/>
								</div>
								<h3 className='text-lg font-medium text-gray-800 mb-2'>
									Thoughtful Gift Selection
								</h3>
								<p className='text-gray-500 text-sm'>
									Curated gifts to make every celebration memorable.
								</p>
							</div>

							{/* USP 4 */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									<FiTruck
										className='w-12 h-12'
										aria-label='Fast and reliable same day delivery for flowers, cakes, and gifts'
										title='Fast and reliable same day delivery for flowers, cakes, and gifts'
									/>
								</div>
								<h3 className='text-lg font-medium text-gray-800 mb-2'>
									Fast & Reliable Delivery
								</h3>
								<p className='text-gray-500 text-sm'>
									We make sure your surprises reach on time, every time.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className='py-8 bg-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Section Header */}
						<div className='text-center mb-10 sm:mb-12 md:mb-16'>
							<h2 className='text-4xl text-center mb-2 text-[#8B0000] font-serif'>
								Shop by Combo Type
							</h2>
							<p className='font-body text-gray-600 text-base md:text-lg max-w-2xl mx-auto'>
								Each Combo tells a unique story
							</p>
						</div>

						{/* Carousel */}
						{/* Carousel */}
						<div className='flex justify-center'>
							<div className='overflow-x-auto flex gap-4 md:gap-5 scroll-smooth snap-x snap-mandatory hide-scrollbar py-2'>
								{shopByCombo.map((blossom) => (
									<a
										key={blossom.id}
										className='flex-shrink-0 w-48 sm:w-52 md:w-60 lg:w-64 snap-center group relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer'
										href={`/product/${blossom.label}`}
										title={`${blossom.title}`}>
										{/* Image */}
										<div className='relative h-36 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-2xl'>
											<img
												src={blossom.image}
												alt={blossom.title}
												title={blossom.title}
												className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
											/>
										</div>

										{/* Text & Color */}
										<div className='p-3 sm:p-4 md:p-5 text-center'>
											<div className='inline-block px-2 py-0.5 bg-[#8B0000]/80 backdrop-blur-sm border border-[#8B0000]/20 rounded-full mb-1 transition-all duration-300 hover:bg-[#8B0000]/100'>
												<span className='text-[10px] sm:text-xs text-white font-medium uppercase tracking-wider'>
													{blossom.label}
												</span>
											</div>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Hide scrollbar styles */}
					<style jsx>{`
						.hide-scrollbar {
							-ms-overflow-style: none; /* IE & Edge */
							scrollbar-width: none; /* Firefox */
						}
						.hide-scrollbar::-webkit-scrollbar {
							display: none; /* Chrome, Safari, Opera */
						}
					`}</style>
				</section>

				<section className='py-16 bg-gradient-to-b from-[#fff5f2] to-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{/* Header */}
						<div className='text-center mb-12'>
							<h1 className='text-xl md:text-3xl font-serif text-[#8B0000] mb-4'>
								Celebrate Moments with Flowers, Cakes & Gifts Online in India
							</h1>
							<p className='text-gray-600 text-base md:text-lg max-w-3xl mx-auto'>
								At Redheart, gifting is more than just exchanging products —
								it’s about expressing emotions, celebrating relationships, and
								creating unforgettable memories. Every bouquet, cake, plant, and
								gift hamper is crafted with care, creativity, and a touch of
								love.
							</p>
						</div>

						{/* Offerings / Features */}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10'>
							{/* Flowers */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									🌹
								</div>
								<h3 className='text-lg md:text-xl font-medium text-gray-800 mb-2'>
									Flowers for Every Emotion
								</h3>
								<p className='text-gray-500 text-sm md:text-base'>
									From roses to exotic blooms, we have a flower for every mood
									and moment.
								</p>
							</div>

							{/* Cakes */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									🍰
								</div>
								<h3 className='text-lg md:text-xl font-medium text-gray-800 mb-2'>
									Cakes for Every Celebration
								</h3>
								<p className='text-gray-500 text-sm md:text-base'>
									Customisable cakes in various flavours and designs to make
									every occasion sweeter.
								</p>
							</div>

							{/* Gifts & Plants */}
							<div className='flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500'>
								<div className='mb-4 p-4 bg-[#8B0000]/10 rounded-full text-[#8B0000]'>
									🎁
								</div>
								<h3 className='text-lg md:text-xl font-medium text-gray-800 mb-2'>
									Plants & Personalised Gifts
								</h3>
								<p className='text-gray-500 text-sm md:text-base'>
									Air-purifying plants, succulents, and curated gift hampers to
									make moments memorable.
								</p>
							</div>
						</div>

						{/* Call to Action / Promise */}
						<div className='mt-12 text-center'>
							<p className='text-gray-700 text-lg md:text-xl max-w-2xl mx-auto'>
								At Redheart, every gift is a promise — a promise to deliver
								happiness with heart, on time, every time.
							</p>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-20 md:py-28 lg:py-32 bg-gradient-to-br from-accent-rose-50/50 via-accent-pink-50/30 to-grey-50/50 border-t border-grey-200'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 rounded-full mb-8'>
							<Heart
								className='w-8 h-8 text-accent-rose-600'
								strokeWidth={2}
								fill='currentColor'
							/>
						</div>
						<h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-light text-black-charcoal mb-6 tracking-tight'>
							Spread Love, One Bloom at a Time
						</h2>
						<p className='font-body text-grey-700 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed'>
							Let us help you create unforgettable moments with our premium
							floral arrangements
						</p>
						<a
							href='#collections'
							title='Start shopping flowers, cakes, plants and gifts online at RedHeart'
							className='inline-flex items-center gap-2 px-10 py-4 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide rounded-full transition-all duration-300 shadow-elegant hover:shadow-premium border border-accent-rose-700/30'>
							Start Shopping
							<ArrowRight className='w-5 h-5' strokeWidth={2} />
						</a>
					</div>
				</section>
			</div>
		</>
	);
};

export default Home;
