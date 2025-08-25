// import React, { useState } from "react";
// import axiosInstance from "../../../../utils/axiosInstance";
// import AddTreeModal from "../Modal/AddTreeModal";
// import { FiEdit, FiTrash, FiPlus, FiGrid, FiList } from "react-icons/fi";
// import { API_PATH } from "../../../../utils/apiPath";

// const TreeTable = ({ setPlants }) => {
//   const [showModal, setShowModal] = useState(false);

//   const refreshPlants = (newPlant) => {
//     console.log(newPlant);
//     setPlants((prevPlants) => [newPlant, ...prevPlants]);
//   };
//   const handleAddTree = async (data) => {
//     try {
//       // Example API call
//       const res = await axiosInstance.post(API_PATH.PLANT.ADD_PLANT, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Added:", res.data);
//     } catch (error) {
//       console.error("Error adding tree:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Modal */}
//       <AddTreeModal
//         refreshPlants={refreshPlants}
//         isOpen={showModal}
//         setPlants={setPlants}
//         onClose={() => setShowModal(false)}
//         onSubmit={handleAddTree}
//       />
//     </div>
//   );
// };

// export default TreeTable;

import React, { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import AddTreeModal from "../Modal/AddTreeModal";
import { API_PATH } from "../../../../utils/apiPath";

const TreeTable = ({ setPlants }) => {
  const [showModal, setShowModal] = useState(false);

  const refreshPlants = (newPlant) => {
    console.log(newPlant);
    setPlants((prevPlants) => [newPlant, ...prevPlants]);
  };

  const handleAddTree = async (data) => {
    try {
      const res = await axiosInstance.post(API_PATH.PLANT.ADD_PLANT, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Added:", res.data);
    } catch (error) {
      console.error("Error adding tree:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Button to open modal */}

      {/* Modal */}
      <AddTreeModal
        refreshPlants={refreshPlants}
        isOpen={showModal}
        setPlants={setPlants}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTree}
        className="w-full max-w-lg mx-auto sm:mx-auto sm:w-full sm:h-auto"
      />
    </div>
  );
};

export default TreeTable;
