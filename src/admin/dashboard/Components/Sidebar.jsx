import { FiEdit, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed, handleLogout }) => {
  return (
    <div
      className={`bg-green-600 text-white flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo/Header */}
      <div className="p-4 border-b border-green-500 flex justify-between items-center">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold">TreeManager</h1>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-green-500 rounded-lg md:hidden"
        >
          {sidebarCollapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-3 bg-green-500 rounded-lg hover:bg-green-400 transition-colors"
            >
              <FiEdit className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Manage Trees</span>}
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-500 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 hover:bg-green-500 rounded-lg transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          {!sidebarCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
