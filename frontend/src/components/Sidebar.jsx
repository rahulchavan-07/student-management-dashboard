import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaSignOutAlt,
  FaUserPlus,
  FaUsers,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Top navbar for small screens */}
      <div className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:hidden">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 h-screen fixed top-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-5 hidden md:block">
          <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
        </div>

        <ul className="space-y-3 p-5 pt-0 mt-12 md:mt-0">
          <li className="p-2 hover:bg-gray-700 rounded">
            <Link to="/dashboard" className="flex items-center" onClick={() => setIsOpen(false)}>
              <FaChartPie className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded">
            <Link to="/manage" className="flex items-center" onClick={() => setIsOpen(false)}>
              <FaUsers className="mr-2" />
              Manage Students
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded">
            <Link to="/add" className="flex items-center" onClick={() => setIsOpen(false)}>
              <FaUserPlus className="mr-2" />
              Add Students
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded">
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center w-full"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
