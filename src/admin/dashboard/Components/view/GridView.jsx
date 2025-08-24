import { FiEdit, FiTrash } from "react-icons/fi";

const GridView = ({ handleDeleteTree, plants, handleEditTree }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {plants?.map((tree) => (
        <div
          key={tree._id}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={tree.imageUrl}
              alt={tree.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-medium text-gray-900 text-lg mb-1">
                {tree.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {tree.description}
              </p>
            </div>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {tree.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-900">
                ₹{tree.price}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  tree.stock < 5
                    ? "bg-red-100 text-red-800"
                    : tree.stock < 10
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {tree.stock} units
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTree(tree)}
                className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
              >
                <FiEdit className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => handleDeleteTree(tree._id)}
                className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
              >
                <FiTrash className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
