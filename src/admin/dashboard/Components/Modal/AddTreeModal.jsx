import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { IoIosClose } from "react-icons/io";
import { FaUpload, FaRupeeSign } from "react-icons/fa";
import { GoPackageDependents } from "react-icons/go";
import { CiShoppingTag, CiHashtag } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import axiosInstance from "../../../../utils/axiosInstance";
import { API_PATH } from "../../../../utils/apiPath";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Indoor",
  "Outdoor",
  "Flowering",
  "Succulent",
  "Herb",
  "Tree",
  "Air Purifying",
  "Home Decor",
];

const AddTreeModal = ({ refreshPlants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    // in useForm defaultValues
    defaultValues: {
      name: "",
      categories: [], // ✅ array instead of category
      description: "",
      price: "",
      stock: "",
      image: null,
      careTips: {
        sunlight: "Moderate",
        water: "Once a week",
        soil: "Well-drained",
        temperature: "15-30°C",
      },
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null);
    const fileInput = document.getElementById("image-input");
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);

      // Categories array as JSON string
      formData.append("categories", JSON.stringify(data.categories));

      // Flatten careTips
      formData.append("careTips[sunlight]", data.careTips.sunlight);
      formData.append("careTips[water]", data.careTips.water);
      formData.append("careTips[soil]", data.careTips.soil);
      formData.append("careTips[temperature]", data.careTips.temperature);

      if (!data.image) {
        toast.error("Add image to proceed");
        return;
      }
      formData.append("media", data.image);

      const res = await axiosInstance.post(
        API_PATH.PLANT.CREATE_PLANT,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        refreshPlants?.(res.data.data);
      }

      reset();
      setImagePreview(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding tree:", error);
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.name);
  //     formData.append("description", data.description);
  //     formData.append("price", data.price);
  //     formData.append("stock", data.stock);

  //     // ✅ send array properly
  //     formData.append("categories", JSON.stringify(data.categories));

  //     formData.append("careTips", JSON.stringify(data.careTips));

  //     if (!data.image) {
  //       toast.error("Add image to Process");
  //       return;
  //     }

  //     if (data.image) {
  //       formData.append("media", data.image);
  //     }

  //     const res = await axiosInstance.post(
  //       API_PATH.PLANT.CREATE_PLANT,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (res.data.status === "success") {
  //       refreshPlants?.(res.data.data);
  //     }
  //     reset();
  //     setImagePreview(null);
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.error("Error adding tree:", error);
  //   }
  // };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
  };

  return (
    <div>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GoPackageDependents className="w-5 h-5" />
          Add Tree
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
                exit: { opacity: 0 },
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 text-white p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GoPackageDependents className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Add New Tree</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-green-700 rounded-full"
                  >
                    <IoIosClose className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="overflow-y-auto max-h-[calc(90vh-88px)] p-6 space-y-6"
                >
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaUpload className="w-4 h-4" />
                      Tree Image
                    </label>
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-green-200"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                        >
                          <IoIosClose className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-input"
                        className="cursor-pointer border-2 border-dashed border-green-400 
                 rounded-lg p-8 text-center hover:border-green-500 transition
                 block max-w-md mx-auto"
                      >
                        <FaUpload className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-700">
                          Click to upload tree image
                        </p>
                        <p className="text-sm text-gray-400">
                          PNG, JPG up to 10MB
                        </p>
                        <input
                          id="image-input"
                          name="image" // ✅ important
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <CiShoppingTag className="w-4 h-4" />
                      Tree Name *
                    </label>
                    <input
                      {...register("name", {
                        required: "Tree name is required",
                      })}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Enter tree name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  {/* Categories (multi-select) */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <GoPackageDependents className="w-4 h-4" />
                      Categories *
                    </label>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
                        >
                          <input
                            type="checkbox"
                            value={cat}
                            {...register("categories", {
                              validate: (value) =>
                                value.length > 0 ||
                                "At least one category is required",
                            })}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>

                    {errors.categories && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.categories.message}
                      </p>
                    )}
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaRupeeSign className="w-4 h-4" />
                        Price *
                      </label>
                      <input
                        {...register("price", {
                          required: "Price is required",
                        })}
                        type="number"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CiHashtag className="w-4 h-4" />
                        Stock *
                      </label>
                      <input
                        {...register("stock", {
                          required: "Stock is required",
                        })}
                        type="number"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FiFileText className="w-4 h-4" />
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows="4"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="Enter tree description"
                    />
                  </div>

                  {/* Care Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sunlight
                      </label>
                      <input
                        {...register("careTips.sunlight")}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="e.g. Moderate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Water
                      </label>
                      <input
                        {...register("careTips.water")}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="e.g. Once a week"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Soil
                      </label>
                      <input
                        {...register("careTips.soil")}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="e.g. Well-drained"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Temperature
                      </label>
                      <input
                        {...register("careTips.temperature")}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="e.g. 15-30°C"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg"
                    >
                      {isSubmitting ? "Adding..." : "Add Tree"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTreeModal;
