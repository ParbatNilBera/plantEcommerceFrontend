// import { FiEdit, FiTrash, FiPlus, FiGrid, FiList } from "react-icons/fi";

// const ListView = ({ handleDeleteTree, plants, handleEditTree }) => {
//   return (
//     <div>
//       {" "}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="p-4 text-left">Tree</th>
//               <th className="p-4 text-left">Category</th>
//               <th className="p-4 text-left">Price</th>
//               <th className="p-4 text-left">Stock</th>
//               <th className="p-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plants?.map((tree) => (
//               <tr
//                 key={tree._id}
//                 className="border-b border-gray-100 hover:bg-gray-50"
//               >
//                 <td className="p-4 flex items-center">
//                   <img
//                     src={tree.imageUrl}
//                     alt={tree.name}
//                     className="w-12 h-12 rounded-lg object-cover mr-3"
//                   />
//                   <div>
//                     <div className="font-medium text-gray-900">{tree.name}</div>
//                     <div className="text-sm text-gray-500 max-w-xs truncate">
//                       {tree.description}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   {tree.categories.map((cat, idx) => (
//                     <span
//                       key={idx}
//                       className="inline-flex items-center px-2.5 py-0.5 mr-2 rounded-full text-xs font-medium bg-green-100 text-green-800"
//                     >
//                       {cat}
//                     </span>
//                   ))}
//                 </td>
//                 <td className="p-4 font-medium text-gray-900">₹{tree.price}</td>
//                 <td className="p-4">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       tree.stock < 5
//                         ? "bg-red-100 text-red-800"
//                         : tree.stock < 10
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {tree.stock} units
//                   </span>
//                 </td>
//                 <td className="p-4 flex space-x-2">
//                   <button
//                     onClick={() => handleEditTree(tree)}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                   >
//                     <FiEdit className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteTree(tree._id)}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <FiTrash className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ListView;

import { FiEdit, FiTrash } from "react-icons/fi";

const ListView = ({ handleDeleteTree, plants, handleEditTree }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left">Tree</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants?.map((tree) => (
              <tr
                key={tree._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 flex items-center space-x-3">
                  <img
                    src={tree.imageUrl}
                    alt={tree.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{tree.name}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {tree.description}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {tree.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 mr-2 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {cat}
                    </span>
                  ))}
                </td>
                <td className="p-4 font-medium text-gray-900">₹{tree.price}</td>
                <td className="p-4">
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
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEditTree(tree)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTree(tree._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
