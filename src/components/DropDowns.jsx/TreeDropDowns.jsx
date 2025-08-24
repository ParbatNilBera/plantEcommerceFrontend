import { ChevronDown, ArrowUpDown } from "lucide-react";

export default function TreeDropDown({ sortOrder, setSortOrder }) {
  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-0 text-center">
      <div className="relative">
        {/* Left icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ArrowUpDown className="w-5 h-5 text-green-600" />
        </div>

        {/* Select dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full py-3 pl-12 pr-10 bg-white border-2 border-green-200 rounded-xl
                     text-gray-700 font-medium shadow-sm hover:border-green-400
                     focus:ring-4 focus:ring-green-100 focus:border-green-500
                     transition-all duration-200 outline-none appearance-none
                     hover:shadow-md cursor-pointer
                     sm:text-base text-sm"
        >
          <option value="" className="text-gray-500">
            Sort by Price
          </option>
          <option value="lowToHigh" className="text-gray-700">
            Price: Low to High
          </option>
          <option value="highToLow" className="text-gray-700">
            Price: High to Low
          </option>
        </select>

        {/* Right icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-green-600" />
        </div>

        {/* Optional subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white rounded-xl pointer-events-none opacity-20"></div>
      </div>
    </div>
  );
}
