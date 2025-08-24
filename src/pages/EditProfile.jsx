import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiUserCheck,
} from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileRes = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
        console.log(profileRes.data.data);
        setProfile(profileRes.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    getProfileData();
  }, []);

  // Keep editedProfile in sync when profile changes
  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedProfile) return;
    handleEditFunction(editedProfile);
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleEditFunction = async (updatedProfile) => {
    try {
      const editRes = await axiosInstance.post(API_PATH.USER.UPDATE_PROFILE, {
        name: updatedProfile.name,
        phone: updatedProfile.phone,
      });
      if (editRes.data.status === "success") {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error Update profile", error);
      toast.error("Failed to update profile");
    }
    // 🔥 Place API update call here
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-600 font-medium">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-white">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold mb-2">User Profile</h1>
              <p className="text-green-100">Manage your personal information</p>
            </motion.div>
          </div>

          {/* Profile Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="p-6 sm:p-8"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="w-4 h-4 mr-2 text-green-600" />
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {profile.name}
                  </div>
                )}
              </div>

              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="w-4 h-4 mr-2 text-green-600" />
                  Email
                  <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Read-only
                  </span>
                </label>
                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed">
                  {profile.email}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="w-4 h-4 mr-2 text-green-600" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile?.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {profile.phone}
                  </div>
                )}
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiUserCheck className="w-4 h-4 mr-2 text-green-600" />
                  Role
                </label>

                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 capitalize">
                  {profile.role}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <FiSave className="w-4 h-4 mr-2" />
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEdit}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <FiEdit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 bg-white rounded-lg shadow-sm border border-green-100 p-4"
        >
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Profile ID: {profile.id}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
