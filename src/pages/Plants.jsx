import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch as Search,
  FiX as X,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sampleProducts, setSampleProducts] = useState([]); // FIX: initialize as []
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 7;

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
    const getAllPlants = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.PLANT.GET_ALL_PLANTS); // FIX
        console.log(res.data.data);
        setSampleProducts(res.data.data.items || []); // match backend shape
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    getAllPlants();
  }, []);

  const filteredProducts = useMemo(() => {
    console.log("hi", sampleProducts);
    return sampleProducts?.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilters.length === 0 ||
        product.categories?.some((cat) => selectedFilters.includes(cat)); // FIX

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilters, sampleProducts]);

  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  console.log("Current Product:", currentProducts);
  const handleFilterToggle = (category) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((f) => f !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleRemoveFilter = (category) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== category));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const truncateDescription = (text = "", maxLength = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Plant Paradise
        </motion.h1>

        {/* ✅ Search and Filters */}
        <motion.div
          className="mb-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilters.includes(category)
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {filter}
                  <button
                    onClick={() => handleRemoveFilter(filter)}
                    className="hover:bg-green-200 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ✅ Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <motion.div
                key={product._id} // FIX
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                onClick={() => {
                  console.log(navigate(`/plants/${product._id}`));
                }}
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  {console.log(product.image)}
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {truncateDescription(product.description)}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.categories?.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </motion.div>
        )}

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
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
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
