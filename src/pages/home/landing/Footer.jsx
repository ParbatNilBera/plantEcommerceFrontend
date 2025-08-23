import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { useState } from "react";

export default function PlantFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // Handle newsletter subscription
      console.log("Subscribe email:", email);
      setEmail("");
      alert("Thank you for subscribing!");
    }
  };

  return (
    <footer
      className="bg-[#2E7D32] text-white"
      style={{ fontFamily: "Roboto Condensed, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl" />
              <h3 className="text-xl font-bold">GreenLeaf</h3>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Bringing nature's beauty into your home with premium plants and
              sustainable gardening solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Shop
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                FAQs
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Shipping
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Returns
              </a>
              <a
                href="#"
                className="block text-green-100 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>

            {/* Newsletter Subscription */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-4 py-2 bg-[#8D6E63] text-white text-sm font-medium rounded-r-lg hover:bg-[#6D4C41] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Contact Email */}
            <div className="mb-4">
              <a
                href="mailto:hello@greenleaf.com"
                className="text-green-100 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2"
              >
                <FiMail className="text-base" />
                <span>hello@greenleaf.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors duration-200"
              >
                <FiFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors duration-200"
              >
                <FiInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors duration-200"
              >
                <FiTwitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-600 mb-6"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-green-100 text-sm">
            © 2025 GreenLeaf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
