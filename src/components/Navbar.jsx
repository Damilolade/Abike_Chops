import React from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, Home, Info, Phone } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ onMenuClick, onToggleSidebar, sidebarOpen }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg border-b-4 border-yellow-500">
      {/* Left Section: Mobile Menu + Desktop Collapse */}
      <div className="flex items-center gap-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          onClick={onMenuClick}
          aria-label="Toggle mobile sidebar"
        >
          <Menu size={22} className="text-white font-bold" />
        </button>

        {/* Desktop collapse button */}
        <button
          className="hidden md:flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <ChevronDown
            size={22}
            className={`text-white font-bold transition-transform duration-300 ${
              sidebarOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Center Section: Logo / Title */}
      <Link
        to="/"
        className="flex items-center flex-1 justify-center md:justify-start gap-6 md:gap-8 px-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-50"></div>
          <img
            src={logo}
            alt="brandlogo"
            className="relative h-14 w-14 object-cover rounded-2xl shadow-xl border-2 border-white transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="text-2xl font-black tracking-wider text-red-700 hidden sm:inline drop-shadow-lg">
          ABIKE<span className="text-gray-800">_CHOPS</span>
        </span>
      </Link>

      {/* Right Section: User / Notifications */}
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          to="/"
          className="hidden md:flex p-3 rounded-xl bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
          title="Home"
        >
          <Home size={20} className="text-red-600 font-bold" />
        </Link>
        <Link
          to="/about"
          className="hidden md:flex p-3 rounded-xl bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
          title="About"
        >
          <Info size={20} className="text-red-600 font-bold" />
        </Link>
        <Link
          to="/contact"
          className="hidden md:flex p-3 rounded-xl bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
          title="Contact"
        >
          <Phone size={20} className="text-red-600 font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
