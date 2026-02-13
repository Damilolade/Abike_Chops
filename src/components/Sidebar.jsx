import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import coffea from "../assets/coffea.webp";

// ✅ Import lucide-react icons
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  GraduationCap,
  Wallet,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Bell,
  Gift,
  BarChart3,
  Users,
  DollarSign,
  LogOut,
  MessageCircle,
} from "lucide-react";

// ✅ Only import components if you will render them directly here
// Otherwise, leave rendering to App.jsx routes
// import AdminDashboard from "../trainingclass/AdminDashboard";
// import Quiz from "../trainingclass/Quiz";

const Sidebar = ({ isOpen = true, onClose = () => {}, orders = [] }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) setOpenDropdown(null);
  }, [isOpen]);

  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      document.body.classList.add("bg-white", "text-gray-900");
    }
  }, [darkMode]);

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const closeAll = () => {
    setOpenDropdown(null);
    onClose();
  };

  // Order stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const progress =
    totalOrders === 0 ? 0 : (completedOrders / totalOrders) * 100;

  return (
    <div
      className={`relative flex flex-col h-full overflow-hidden rounded-lg transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 border-l-4 border-yellow-400"
          : "bg-cover bg-center"
      }`}
      style={!darkMode ? { backgroundImage: `url(${coffea})` } : undefined}
    >
      {/* Overlay - only in light mode */}
      {!darkMode && <div className="absolute inset-0 bg-black/60" />}

      <div
        className={`relative z-10 flex flex-col h-full p-4 space-y-3 transition-colors duration-500 ${
          darkMode ? "text-gray-100" : "text-white"
        }`}
      >
        {isOpen && (
          <h2
            className={`text-lg font-semibold transition-colors ${
              darkMode ? "text-yellow-300" : "text-white"
            }`}
          >
            Dashboard
          </h2>
        )}

        {/* Promo */}
        <div
          className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur transition-all ${
            darkMode ? "bg-gray-800 border border-yellow-400/30" : "bg-white/10"
          }`}
        >
          <Bell size={20} />
          {isOpen && (
            <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>
              New promo available!
            </span>
          )}
          <Gift size={18} className="ml-auto" />
        </div>

        {/* Wallet */}
        <div
          className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur transition-all ${
            darkMode ? "bg-gray-800 border border-blue-400/30" : "bg-white/10"
          }`}
        >
          <Wallet size={20} />
          {isOpen && (
            <div>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-300"
                }`}
              >
                Wallet Balance
              </p>
              <p
                className={`text-base font-semibold ${
                  darkMode ? "text-yellow-300" : ""
                }`}
              >
                ₦12,500
              </p>
            </div>
          )}
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border ${
            darkMode
              ? "bg-yellow-400/20 border-yellow-400 hover:bg-yellow-400/30"
              : "bg-gray-700/40 border-gray-600 hover:bg-gray-700/60"
          }`}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-300" />
          ) : (
            <Moon size={20} className="text-blue-300" />
          )}
          {isOpen && (
            <span className="text-sm font-medium">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Order progress */}
        {isOpen && (
          <div
            className="cursor-pointer"
            onClick={() => navigate("/createorder/completed")}
          >
            <p
              className={`text-xs mb-1 ${
                darkMode ? "text-gray-400" : "text-gray-300"
              }`}
            >
              Order Progress
            </p>
            <div
              className={`w-full h-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-white/20"
              }`}
            >
              <div
                className="h-2 bg-green-400 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs mt-1">
              {completedOrders}/{totalOrders} completed
            </p>
          </div>
        )}

        {/* Menu */}
        <ul className="space-y-2 mt-3">
          {/* Admin Dashboard */}
          <li>
            <button
              onClick={() => toggleDropdown("admin")}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 size={20} />
                {isOpen && <span>Admin</span>}
              </div>
              {isOpen &&
                (openDropdown === "admin" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>

            {openDropdown === "admin" && isOpen && (
              <ul
                className={`ml-4 space-y-1 ${darkMode ? "text-gray-300" : ""}`}
              >
                <li>
                  <Link
                    to="/admin"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    📊 Master Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/createorder/admin"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    📦 Orders Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboards/finance"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    💰 Finance Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboards/users"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    👥 User Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/admindashboard"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    🎓 Training Dashboard
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <button
              onClick={() => toggleDropdown("order")}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                {isOpen && <span>Orders</span>}
              </div>
              {isOpen &&
                (openDropdown === "order" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>

            {openDropdown === "order" && isOpen && (
              <ul
                className={`ml-4 space-y-1 ${darkMode ? "text-gray-300" : ""}`}
              >
                <li>
                  <Link
                    to="/createorder/pending"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Pending ({pendingOrders})
                  </Link>
                </li>
                <li>
                  <Link
                    to="/createorder/completed"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Completed ({completedOrders})
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Create Order */}
          <li>
            <Link
              to="/createorder"
              onClick={closeAll}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <PlusCircle size={20} />
              {isOpen && <span>Create Order</span>}
            </Link>
          </li>

          {/* Training */}
          <li>
            <button
              onClick={() => toggleDropdown("training")}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap size={20} />
                {isOpen && <span>Training</span>}
              </div>
              {isOpen &&
                (openDropdown === "training" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>

            {openDropdown === "training" && isOpen && (
              <ul
                className={`ml-4 space-y-1 ${darkMode ? "text-gray-300" : ""}`}
              >
                <li>
                  <Link
                    to="/training/classform"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Class Form
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/classlogin"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Class Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/payment"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Payment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/ourclass"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Our Class
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/upcoming"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Upcoming Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/recorded"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Recorded Sessions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/completed"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Completed Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/admindashboard"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    AdminDashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/quiz"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training/expired"
                    onClick={closeAll}
                    className={`block p-1 rounded hover:pl-2 transition-all ${
                      darkMode ? "hover:text-yellow-300 hover:bg-gray-800" : ""
                    }`}
                  >
                    Expired
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Wallet */}
          <li>
            <Link
              to="/wallet"
              onClick={closeAll}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <Wallet size={20} /> {isOpen && "Wallet"}
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              onClick={closeAll}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <ShoppingCart size={20} /> {isOpen && "Cart"}
            </Link>
          </li>

          {/* Chat */}
          <li>
            <Link
              to="/chat"
              onClick={closeAll}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-white/10"
              }`}
            >
              <MessageCircle size={20} /> {isOpen && "Chat"}
            </Link>
          </li>
        </ul>

        {/* Sign Out */}
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/");
          }}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-all ${
            darkMode
              ? "bg-red-900 hover:bg-red-800 text-red-100 border border-red-700"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          <LogOut size={18} />
          {isOpen && "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
