// import { useContext, useEffect, useState } from "react";
// import Sidebar from "./Components/Sidebar";
// import Header from "./Components/Header";
// import TreeTable from "./Components/TreeTable";
// import { UserContext } from "../../context/UserContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { clearUser } = useContext(UserContext);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [trees, setTrees] = useState([]);
//   const [filteredTrees, setFilteredTrees] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   useEffect(() => {
//     const res = JSON.parse(localStorage.getItem("user")); // ✅ works now
//     console.log(res);

//     if (!res || res?.role !== "admin") {
//       navigate("/admin");
//     }
//   }, []);

//   const handleLogout = () => {
//     /* logout logic */
//     clearUser();
//     navigate("/admin");
//     toast.success("Log Out Done");
//   };
//   const handleAddTree = () => setShowModal(true);
//   const handleEditTree = (tree) => {
//     /* edit logic */
//   };
//   const setDeleteConfirm = (id) => {
//     /* delete logic */
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar
//         sidebarCollapsed={sidebarCollapsed}
//         setSidebarCollapsed={setSidebarCollapsed}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 overflow-auto">
//         <Header />
//         <div className="p-6">
//           <TreeTable
//             filteredTrees={filteredTrees}
//             handleAddTree={handleAddTree}
//             handleEditTree={handleEditTree}
//             setDeleteConfirm={setDeleteConfirm}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useContext, useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import TreeTable from "./Components/TreeTable";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [trees, setTrees] = useState([]);
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // md breakpoint
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user"));
    if (!res || res?.role !== "admin") {
      navigate("/admin");
    }
  }, []);

  const handleLogout = () => {
    clearUser();
    navigate("/admin");
    toast.success("Log Out Done");
  };

  const handleAddTree = () => setShowModal(true);
  const handleEditTree = (tree) => {
    /* edit logic */
  };
  const setDeleteConfirm = (id) => {
    /* delete logic */
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        handleLogout={handleLogout}
      />
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <TreeTable
            filteredTrees={filteredTrees}
            handleAddTree={handleAddTree}
            handleEditTree={handleEditTree}
            setDeleteConfirm={setDeleteConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
