import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";

const PlantDetailsPage = () => {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const careIcons = {
    sunlight: "☀️",
    water: "💧",
    soil: "🌱",
    temperature: "🌡️",
  };

  // Fetch plant details
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATH.PLANT.GET_PARTICULAR_PLANT(plantId)
        );
        const plantData = res.data.data;
        setPlant(plantData);
        setSelectedImage(plantData.imageUrl);
      } catch (error) {
        console.error("Error fetching plant:", error);
        toast.error("Failed to load plant details");
      }
    };
    fetchPlant();
  }, [plantId]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render stars
  const renderStars = (rating, reviewsCount) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-yellow-400 fill-current"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">{stars}</div>
        <span className="text-sm text-gray-600">
          {rating} ({reviewsCount} reviews)
        </span>
      </div>
    );
  };

  // Add to Cart
  const handleAddToCart = async () => {
    if (!plant || quantity <= 0) return;
    try {
      setIsAdding(true);
      const res = await axiosInstance.post(API_PATH.CART.ADD_TO_CART, {
        productId: plant._id,
        quantity,
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (!plant) return <div className="text-center py-20">Loading...</div>;

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Roboto Condensed, sans-serif" }}
    >
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold" style={{ color: "#2E7D32" }}>
              PlantShop
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FiShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              <div className="relative">
                {plant.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                      style={{ backgroundColor: "#2E7D32" }}
                    >
                      Featured
                    </span>
                  </div>
                )}
                <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              {plant.images && plant.images.length > 0 && (
                <div className="flex space-x-3">
                  {[plant.imageUrl, ...plant.images].map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(image)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === image
                          ? "border-[#2E7D32] shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${plant.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: "#2E7D32" }}
              >
                {plant.name}
              </h1>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {plant.categories?.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm font-medium text-white rounded-full"
                    style={{ backgroundColor: "#8D6E63" }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Rating */}
              {renderStars(
                plant.rating?.average || 0,
                plant.rating?.reviewsCount || 0
              )}

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {plant.description}
              </p>

              {/* Price & Stock */}
              <div className="space-y-2">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#2E7D32" }}
                >
                  ₹{plant.price}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    plant.isAvailable && plant.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {plant.isAvailable && plant.stock > 0
                    ? `In Stock (${plant.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Care Tips */}
              <div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#2E7D32" }}
                >
                  Care Instructions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(plant.careTips || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{careIcons[key]}</span>
                        <div>
                          <div className="font-semibold text-gray-900 capitalize">
                            {key}
                          </div>
                          <div className="text-gray-600 text-sm">{value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-semibold text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 bg-gray-50 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(plant.stock, quantity + 1))
                      }
                      className="px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  disabled={!plant.isAvailable || plant.stock === 0 || isAdding}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plant.isAvailable && plant.stock > 0
                      ? "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor:
                      plant.isAvailable && plant.stock > 0
                        ? "#2E7D32"
                        : "#9CA3AF",
                  }}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>
                    {isAdding
                      ? "Adding..."
                      : plant.isAvailable && plant.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
