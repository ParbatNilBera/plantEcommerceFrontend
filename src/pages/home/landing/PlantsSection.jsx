import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";

const PlantsSection = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPlants = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.PLANT.GET_TOP_PLANTS);
        // API response has `items` array
        setPlants(res.data.data.items || []);
      } catch (error) {
        console.error("Error fetching top plants:", error);
      }
    };
    fetchTopPlants();
  }, []);

  return (
    <section className="bg-[#F9FBE7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Plants
          </h2>
          <div className="w-24 h-1 bg-[#8D6E63] mx-auto rounded-full"></div>
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Plant Image */}
              <div className="overflow-hidden">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Plant Info */}
              <div className="p-6">
                {/* Plant Name */}
                <h3 className="text-xl font-bold text-[#2E7D32] mb-2">
                  {plant.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {plant.description}
                </p>

                {/* Price */}
                <div className="text-2xl font-bold text-green-800 mb-4">
                  ₹{plant.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Plants Button */}
        <div className="text-center mt-12">
          <button
            className="bg-[#2E7D32] hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={() => {
              navigate("/plants");
            }}
          >
            View All Plants
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlantsSection;
