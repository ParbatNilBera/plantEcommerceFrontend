// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATH } from "../utils/apiPath";

// const EditAddress = () => {
//   const [address, setAddress] = useState();
//   useEffect(() => {
//     const fetchAddress = async () => {
//       const res = await axiosInstance.get(API_PATH.USER.GET_ADDRESS);
//       if (res.data.data[0]) {
//         setAddress(res.data.data[0]);
//       }
//     };
//     fetchAddress();
//   }, []);

//   return <div>EditAddress</div>;
// };

// export default EditAddress;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCheckCircle, FiEdit, FiPlusCircle } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

const UserAddress = () => {
  const [address, setAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Fetch user's existing address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.USER.GET_ADDRESS);
        if (res.data.data && res.data.data[0]) {
          setAddress(res.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  // Handle edit button click
  const handleEdit = () => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        country: address.country || "",
      });
    }
    setIsEditing(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save or update address via API
  const handleSaveAddress = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosInstance.post(API_PATH.USER.UPDATE_ADDRESS, {
        ...formData,
      });
      console.log(res);
      if (res.data.status === "success") {
        // take the last added address
        const updatedAddress =
          res.data.data[res.data.data.length - 1] || formData;

        setAddress(updatedAddress);
        setShowSuccess(true);
        setIsEditing(false);

        // hide success after 3s
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg border border-green-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-green-100 rounded-full">
            <FiMapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Address Management
            </h1>
            <p className="text-gray-600">Manage your delivery address</p>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3"
            >
              <FiCheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Address saved successfully!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Show Address Card if exists and not editing */}
          {address && !isEditing ? (
            <motion.div
              key="address-card"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 border border-green-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Your Address
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiEdit className="w-4 h-4" />
                  Edit
                </motion.button>
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="font-medium">{address.fullName}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p>{address.postalCode}</p>
                <p className="font-medium">{address.country}</p>
              </div>
            </motion.div>
          ) : (
            /* Show Form for Add/Edit */
            <motion.form
              key="address-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSaveAddress}
            >
              <div className="flex items-center gap-2 mb-6">
                <FiPlusCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  {address ? "Edit Address" : "Add New Address"}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter street address"
                    required
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter state"
                      required
                    />
                  </div>
                </div>

                {/* Postal Code and Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter postal code"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter country"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors font-medium disabled:bg-green-400"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    {loading
                      ? "Saving..."
                      : address
                      ? "Update Address"
                      : "Save Address"}
                  </motion.button>

                  {address && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserAddress;
