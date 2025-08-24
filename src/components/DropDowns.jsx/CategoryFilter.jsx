import React, { useState, useRef, useEffect } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

const CategoryFilterDropdown = ({
  categories,
  selectedFilters,
  handleFilterToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto z-100" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center focus:ring-2 focus:ring-green-500 outline-none"
      >
        {selectedFilters.length > 0
          ? selectedFilters.join(", ")
          : "Select Categories"}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category list */}
          <div className="flex flex-col gap-1 p-2">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterToggle(category)}
                  className={`text-left px-3 py-2 rounded-md transition-all ${
                    selectedFilters.includes(category)
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-gray-400 px-3 py-2 text-sm">
                No categories found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Selected category tags */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
            >
              {filter}
              <button onClick={() => handleFilterToggle(filter)}>
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;
