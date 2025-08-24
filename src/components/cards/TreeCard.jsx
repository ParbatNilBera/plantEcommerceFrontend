// import React from "react";
// import { useNavigate } from "react-router-dom";

// import { motion, AnimatePresence } from "framer-motion";
// const TreeCard = ({ product, truncateDescription }) => {
//   const navigate = useNavigate();
//   return (
//     <motion.div
//       key={product._id}
//       layout
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//       className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//       onClick={() => {
//         console.log(navigate(`/plants/${product._id}`));
//       }}
//     >
//       <div className="aspect-w-16 aspect-h-12 bg-gray-200">
//         <img
//           src={product.imageUrl || "/placeholder.png"}
//           alt={product.name}
//           className="w-full h-48 object-cover"
//         />
//       </div>

//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//           {product.name}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//           {truncateDescription(product.description)}
//         </p>

//         <div className="flex items-center justify-between mb-3">
//           <span className="text-2xl font-bold text-green-600">
//             ₹{product.price}
//           </span>
//           <span className="text-sm text-gray-500">Stock: {product.stock}</span>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {product.categories?.map((cat) => (
//             <span
//               key={cat}
//               className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
//             >
//               {cat}
//             </span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TreeCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TreeCard = ({ product, truncateDescription }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={product._id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/plants/${product._id}`)}
    >
      {/* Plant Image */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Plant Info */}
      <div className="p-6">
        {/* Plant Name */}
        <h3 className="text-xl font-bold text-[#2E7D32] mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {truncateDescription(product.description)}
        </p>

        {/* Price */}
        <div className="text-2xl font-bold text-green-800 mb-4">
          ₹{product.price}
        </div>

        {/* Stock */}
        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>
    </motion.div>
  );
};

export default TreeCard;
