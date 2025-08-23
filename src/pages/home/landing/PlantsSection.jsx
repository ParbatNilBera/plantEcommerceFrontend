import React, { useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlantsSection = () => {
  const [wishlist, setWishlist] = useState(new Set());
  const navigate = useNavigate();

  const plants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      description:
        "Easy-care tropical plant with stunning split leaves. Perfect for bright, indirect light.",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Snake Plant",
      description:
        "Low-maintenance succulent that thrives in low light. Great air purifier for any room.",
      price: 28.5,
      image:
        "https://images.unsplash.com/photo-1593482892540-3b24a8b0c3d5?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      description:
        "Statement plant with large, glossy leaves. Brings a tropical vibe to any space.",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1586061895630-8206881b2e8f?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Pothos Golden",
      description:
        "Trailing vine perfect for hanging baskets. Grows quickly in various light conditions.",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1586061895527-8b05c8b75c96?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Peace Lily",
      description:
        "Elegant flowering plant that blooms white flowers. Excellent for removing toxins.",
      price: 32.75,
      image:
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Rubber Plant",
      description:
        "Glossy, dark green leaves create a bold statement. Very resilient and easy to care for.",
      price: 38.99,
      image:
        "https://images.unsplash.com/photo-1586061896251-58a2ee5ca516?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const toggleWishlist = (plantId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(plantId)) {
        newWishlist.delete(plantId);
      } else {
        newWishlist.add(plantId);
      }
      return newWishlist;
    });
  };

  const handleAddToCart = (plant) => {
    // Simulate add to cart action
    alert(`Added ${plant.name} to cart!`);
  };

  return (
    <section className="bg-[#F9FBE7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Plants
          </h2>
          <div className="w-24 h-1 bg-[#8D6E63] mx-auto rounded-full"></div>
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Plant Image */}
              <div className="overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Plant Info */}
              <div className="p-6">
                {/* Plant Name */}
                <h3 className="text-xl font-bold text-[#2E7D32] mb-2">
                  {plant.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {plant.description}
                </p>

                {/* Price */}
                <div className="text-2xl font-bold text-green-800 mb-4">
                  ${plant.price}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between">
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(plant)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <FaShoppingCart className="text-sm" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(plant.id)}
                    className={`p-3 rounded-full border-2 transition-all duration-200 ${
                      wishlist.has(plant.id)
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <FaHeart className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Plants Button */}
        <div className="text-center mt-12">
          <button
            className="bg-[#2E7D32] hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={() => {
              navigate("/plants");
            }}
          >
            View All Plants
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlantsSection;
