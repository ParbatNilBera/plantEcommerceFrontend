import React, { useState, useEffect, useContext } from "react";
import {
  FiMenu,
  FiUser,
  FiX,
  FiEdit3,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, clearUser } = useContext(UserContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    clearUser();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? " shadow-lg backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo and Burger Menu */}
            <div className="flex items-center space-x-4">
              {user && (
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 text-yellow-500 transition-colors duration-200"
                >
                  <FiMenu size={24} />
                </button>
              )}
              <div className="flex items-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#2E7D32" }}
                >
                  🌱 PlantCo
                </div>
              </div>
            </div>

            {/* Right Side - User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    style={{ color: "#2E7D32" }}
                  >
                    <FiUser size={24} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-yellow-400"
                    style={{
                      backgroundColor: "transparent",
                      border: `1px solid #2E7D32`,
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: "#2E7D32" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-in Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "#E8F5E8",
          fontFamily: '"Roboto Condensed", sans-serif',
        }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-200">
          <h2 className="text-xl font-bold" style={{ color: "#2E7D32" }}>
            Menu
          </h2>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-green-200 transition-colors duration-200"
            style={{ color: "#2E7D32" }}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-4">
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-left"
            style={{ color: "#2E7D32" }}
            onClick={() => {
              navigate("/editProfile");
            }}
          >
            <FiEdit3 size={20} />
            <span>Edit Profile</span>
          </button>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-left"
            style={{ color: "#2E7D32" }}
            onClick={() => {
              navigate("/editAddress");
            }}
          >
            <FiMapPin size={20} />
            <span>Edit Address</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-left"
            style={{ color: "#2E7D32" }}
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
