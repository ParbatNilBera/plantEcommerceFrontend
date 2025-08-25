import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiEdit, FiTrash, FiPlus, FiGrid, FiList } from "react-icons/fi";

import TreeCard from "../components/cards/TreeCard";
import TreeDropDowns from "../components/DropDowns.jsx/TreeDropDowns";
import CategoryFilter from "../components/DropDowns.jsx/CategoryFilter";
import PriceRange from "../components/DropDowns.jsx/PriceRange";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sampleProducts, setSampleProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]); // min-max
  const [sortOrder, setSortOrder] = useState(""); // "lowToHigh" | "highToLow"
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 7;

  // Example attribute filters
  const attributes = ["Air Purifying", "Flowering", "Succulent", "Herb"];
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const categories = [
    "Indoor",
    "Outdoor",
    "Flowering",
    "Succulent",
    "Herb",
    "Tree",
    "Air Purifying",
    "Home Decor",
  ];

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.PLANT.GET_ALL_PLANTS);
        console.log(res.data.data.items);
        setSampleProducts(res.data.data.items || []);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter((product) => {
      // Name or category keyword search
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categories?.some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        product.categories?.some((cat) => selectedCategories.includes(cat));

      // Attribute filter
      const matchesAttribute =
        selectedAttributes.length === 0 ||
        product.attributes?.some((attr) => selectedAttributes.includes(attr));

      // Price filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return (
        matchesSearch && matchesCategory && matchesAttribute && matchesPrice
      );
    });

    // Sorting
    if (sortOrder === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === "highToLow")
      filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [
    searchTerm,
    selectedCategories,
    selectedAttributes,
    priceRange,
    sampleProducts,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleAttributeToggle = (attribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
    setCurrentPage(1);
  };

  const truncateDescription = (text = "", maxLength = 100) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PlantCo
        </motion.h1>

        {/* Filters */}
        <motion.div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <CategoryFilter
            categories={categories}
            selectedFilters={selectedCategories}
            handleFilterToggle={handleCategoryToggle}
          />

          {/* Attributes Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {attributes.map((attr) => (
              <button
                key={attr}
                onClick={() => handleAttributeToggle(attr)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedAttributes.includes(attr)
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {attr}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />

          {/* Sort Dropdown */}
          <TreeDropDowns sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <TreeCard
                key={product._id}
                product={product}
                truncateDescription={truncateDescription}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      currentPage === page
                        ? "bg-green-500 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
