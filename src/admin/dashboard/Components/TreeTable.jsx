import { FiGrid, FiList } from "react-icons/fi";
import AddTree from "./Process/AddTree";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import GridView from "./view/GridView";
import ListView from "./view/ListView";
import toast from "react-hot-toast";
import EditTreeModal from "./Modal/EditTreeModal";

const CATEGORIES = [
  "All",
  "Indoor",
  "Outdoor",
  "Flowering",
  "Succulent",
  "Herb",
  "Tree",
  "Air Purifying",
  "Home Decor",
];

const TreeTable = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ✅ Fetch plants
  const fetchPlants = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.PLANT.GET_ALL_PLANTS);
      const items = res.data.data.items || [];
      setPlants(items);
      setFilteredPlants(items);
    } catch (error) {
      console.error("Error fetching plants:", error);
      toast.error("Failed to fetch plants");
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // ✅ Apply filters when search/category changes
  useEffect(() => {
    let data = [...plants];

    if (category !== "All") {
      data = data.filter((p) => p.categories?.includes(category));
    }

    if (search.trim()) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPlants(data);
  }, [search, category, plants]);

  // ✅ Handle edit button click
  const handleEditTree = (tree) => {
    setSelectedPlant(tree);
    setIsEditOpen(true);
  };

  const handleDeleteTree = async (Id) => {
    try {
      const res = await axiosInstance.delete(API_PATH.PLANT.DELETE_PLANT(Id));
      if (res.status === 200) {
        fetchPlants();
        toast.success("Plant deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting tree:", error);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm mb-6">
        {/* Add Tree Button */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-end">
          <AddTree
            setPlants={setPlants}
            plants={plants}
            refreshPlants={fetchPlants}
          />
        </div>

        {/* Filters + View Toggle */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between gap-4">
          {/* Filters */}
          <div className="flex gap-4">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg text-gray-700"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded-lg w-64"
            />
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 self-start md:self-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiList className="w-4 h-4 mr-2" />
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiGrid className="w-4 h-4 mr-2" />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      <div className="min-h-[400px]">
        {viewMode === "table" ? (
          <ListView
            handleDeleteTree={handleDeleteTree}
            plants={filteredPlants}
            handleEditTree={handleEditTree}
          />
        ) : (
          <GridView
            handleDeleteTree={handleDeleteTree}
            plants={filteredPlants}
            handleEditTree={handleEditTree}
          />
        )}

        {/* Edit Modal */}
        <EditTreeModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          tree={selectedPlant}
          refreshPlants={fetchPlants}
        />
      </div>
    </div>
  );
};

export default TreeTable;
