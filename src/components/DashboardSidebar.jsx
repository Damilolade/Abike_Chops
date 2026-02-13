import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaBox,
  FaBook,
  FaDollarSign,
  FaUsers,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardSidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Master Dashboard", icon: FaChartLine },
    { path: "/createorder/admin", label: "Orders", icon: FaBox },
    { path: "/training/admindashboard", label: "Training", icon: FaBook },
    { path: "/dashboards/finance", label: "Finance", icon: FaDollarSign },
    { path: "/dashboards/users", label: "Users", icon: FaUsers },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 lg:hidden bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white w-64 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-blue-500">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-blue-200 transition-colors"
          >
            <FaChartLine /> Admin Panel
          </Link>
          <p className="text-blue-200 text-sm mt-1">Dashboard Navigation</p>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-500 border-r-4 border-white"
                    : "hover:bg-blue-700"
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-blue-500 p-6 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold transition-colors text-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Back to Home
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 justify-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper - adjust for sidebar */}
      <div className="lg:ml-64">
        {/* This wrapper ensures content doesn't hide behind sidebar on larger screens */}
      </div>
    </>
  );
};

export default DashboardSidebar;
