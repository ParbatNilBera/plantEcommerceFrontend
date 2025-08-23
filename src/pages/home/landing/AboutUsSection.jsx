import React, { useState, useEffect } from "react";
import { FaLeaf, FaSmile, FaTruck } from "react-icons/fa";

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2E7D32]">
              About Us
            </h2>

            {/* Subheading/Tagline */}
            <p className="text-xl lg:text-2xl italic text-[#8D6E63] font-medium">
              Growing Nature, One Plant at a Time
            </p>

            {/* Description Paragraph */}
            <p className="text-gray-700 leading-relaxed text-lg">
              We're passionate about bringing the beauty of nature into your
              home. Our carefully curated collection of plants, from vibrant
              houseplants to stunning outdoor varieties, helps you create your
              perfect green sanctuary. With expert care guides and sustainable
              practices, we make plant parenthood accessible and enjoyable for
              everyone.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-4 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Shop Now
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful plant nursery with various plants and greenery"
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div
          className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Eco-Friendly */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32] rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Eco-Friendly
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sustainably sourced plants with eco-conscious packaging and
              practices.
            </p>
          </div>

          {/* Customer Happiness */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32] rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaSmile className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Customer Happiness
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Dedicated support and plant care guidance to ensure your success.
            </p>
          </div>

          {/* Fast Delivery */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32] rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaTruck className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Quick, safe shipping to get your new plant friends to you in
              perfect condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
