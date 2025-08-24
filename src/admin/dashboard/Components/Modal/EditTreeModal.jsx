import React, { useState, useEffect } from "react";
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

const EditTreeModal = ({ isOpen, setIsOpen, tree, refreshPlants }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();

  // ✅ Populate form when tree changes
  useEffect(() => {
    if (tree) {
      reset({
        name: tree.name || "",
        categories: tree.categories || [], // ✅ now an array
        description: tree.description || "",
        price: tree.price || "",
        stock: tree.stock || "",
        image: null,
      });

      if (tree.media?.url) {
        setImagePreview(tree.media.url);
      } else {
        setImagePreview(null);
      }
    }
  }, [tree, reset]);

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
      console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      data.categories.forEach((cat) => {
        formData.append("categories[]", cat);
      });

      if (data.image) {
        formData.append("media", data.image);
        console.log(data.image);
      }

      console.log(formData);
      const res = await axiosInstance.put(
        API_PATH.PLANT.UPDATE_PLANT(tree._id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        refreshPlants?.(); // ✅ refresh list
        toast.success("Tree Updated Successfully");
        setIsOpen(false);
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error updating tree:", error);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
  };

  return (
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
              <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GoPackageDependents className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Edit Tree</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-blue-700 rounded-full"
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
                        className="w-full h-48 object-cover rounded-lg border-2 border-blue-200"
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
                      className="cursor-pointer border-2 border-dashed border-blue-400 
               rounded-lg p-8 text-center hover:border-blue-500 transition
               block max-w-md mx-auto"
                    >
                      <FaUpload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-700">
                        Click to upload new tree image
                      </p>
                      <p className="text-sm text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
                      <input
                        id="image-input"
                        name="image"
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
                    {...register("name", { required: "Tree name is required" })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tree name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                {/* Categories */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <GoPackageDependents className="w-4 h-4" />
                    Categories *
                  </label>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-blue-50"
                      >
                        <input
                          type="checkbox"
                          value={cat}
                          defaultChecked={tree?.categories?.includes(cat)} // ✅ pre-fill checked
                          {...register("categories", {
                            validate: (value) =>
                              (value && value.length > 0) ||
                              "At least one category is required",
                          })}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
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
                      {...register("price", { required: "Price is required" })}
                      type="number"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <CiHashtag className="w-4 h-4" />
                      Stock *
                    </label>
                    <input
                      {...register("stock", { required: "Stock is required" })}
                      type="number"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter tree description"
                  />
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
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg"
                  >
                    {isSubmitting ? "Updating..." : "Update Tree"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditTreeModal;
