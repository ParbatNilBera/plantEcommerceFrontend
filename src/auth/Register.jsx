import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const { updateUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      if (res.data.status === "success") {
        toast.success(res.data.message || "Login successful!");
        updateUser(res.data.data);
        navigate("/");
        reset(); // Reset form fields
      } else {
        toast.error(res.data.message || "Register failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during Register"
      );
    }
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasUppercase: (value) =>
        /[A-Z]/.test(value) ||
        "Password must contain at least one uppercase letter",
      hasLowercase: (value) =>
        /[a-z]/.test(value) ||
        "Password must contain at least one lowercase letter",
      hasNumber: (value) =>
        /\d/.test(value) || "Password must contain at least one number",
      hasSpecial: (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Password must contain at least one special character",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap");

        .font-roboto-condensed {
          font-family: "Roboto Condensed", sans-serif;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out;
        }
      `}</style>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full md:w-96 animate-fade-up font-roboto-condensed">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Join Our Plant Community
          </h1>
          <p className="text-gray-600 text-sm">
            Create your account to start your green journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("phone", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                type="tel"
                placeholder="Phone Number (Optional)"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", passwordValidation)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <div className="mt-2 text-xs text-gray-500">
              Password must contain: 8+ characters, uppercase, lowercase,
              number, and special character
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{ backgroundColor: "#2E7D32" }}
            className="w-full py-3 px-4 rounded-full text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
