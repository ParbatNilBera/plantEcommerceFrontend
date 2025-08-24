import React, { useState, useEffect } from "react";
import { ChevronRight, Leaf } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Plant-themed background images (using high-quality nature images from Unsplash)
  const backgroundImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80", // Forest/nature
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80", // Indoor plants
    "https://images.unsplash.com/photo-1594498653385-d5172c532c00?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Outdoor garden
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      role="banner"
      aria-label="Plant-themed hero section"
    >
      {/* Background Images with Fade Transition */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Dark Green Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#2E7D32]/70 to-black/50"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-white/90 animate-pulse" />
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
        >
          Bring Nature
          <br />
          <span className="text-green-300">Into Your Space</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover our curated collection of premium plants and transform your
          home into a green sanctuary
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Shop Now Button */}
          <button
            className="w-full sm:w-auto group bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300/50 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[200px]"
            aria-label="Shop for plants now"
          >
            <span>Shop Now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Learn More Button */}
          <button
            className="w-full sm:w-auto group bg-[#8D6E63] hover:bg-[#6D4C41] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300/50 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[200px]"
            aria-label="Learn more about plant care"
          >
            <span>Learn More</span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div
          className="mt-12 sm:mt-16 flex justify-center gap-2"
          role="tablist"
          aria-label="Slideshow navigation"
        >
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Loading Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
    </section>
  );
};

export default HeroSection;
