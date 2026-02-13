import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaBook,
  FaArrowRight,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";
import { getDashboardStats, exportToJSON } from "../utils/dataService";

const MasterDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeClasses: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
  });
  const [timeframe, setTimeframe] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [timeframe]);

  const loadDashboardData = () => {
    try {
      const dashStats = getDashboardStats();
      setStats(dashStats);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  const StatCard = (props) => {
    const { icon: Icon, title, value, color, subtitle, trend } = props;
    return (
      <div
        className={`${color} rounded-lg shadow-md p-6 text-white transform transition hover:scale-105`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold opacity-90">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Icon className="text-5xl opacity-20" />
            {trend && (
              <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-semibold">
                <FaChartLine /> {trend}%
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DashboardCard = (props) => {
    const { title, description, icon: Icon, link, color } = props;
    return (
      <Link
        to={link}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all transform"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <Icon className={`text-3xl ${color}`} />
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-4 text-blue-500 font-semibold text-sm flex items-center gap-1">
          View Details <FaArrowRight className="ml-1" />
        </div>
      </Link>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardSidebar onLogout={handleLogout} />

      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 mt-16 lg:mt-0">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              📊 Master Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              ABIKE_CHOPS Admin Control Center
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
              <option value="day">Today</option>
            </select>
            <button
              onClick={() => exportToJSON(stats, "dashboard-stats.json")}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaUsers}
            title="Total Students"
            value={stats.totalStudents}
            color="bg-blue-500"
            subtitle="Active learners"
            trend="12"
          />
          <StatCard
            icon={FaDollarSign}
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            color="bg-green-500"
            subtitle="All completed orders"
            trend="8"
          />
          <StatCard
            icon={FaShoppingCart}
            title="Pending Orders"
            value={stats.pendingOrders}
            color="bg-orange-500"
            subtitle="Awaiting fulfillment"
            trend="-5"
          />
          <StatCard
            icon={FaBook}
            title="Active Classes"
            value={stats.activeClasses}
            color="bg-purple-500"
            subtitle="Running sessions"
            trend="3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine /> Monthly Revenue
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-semibold">This Month</span>
                <span className="text-2xl font-bold text-green-600">
                  ${stats.monthlyRevenue.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((stats.monthlyRevenue / 10000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">Target: $10,000</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              📈 Quick Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Total Users</span>
                <span className="text-lg font-bold text-gray-800">
                  {stats.totalUsers}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Active Classes</span>
                <span className="text-lg font-bold text-gray-800">
                  {stats.activeClasses}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Order Value</span>
                <span className="text-lg font-bold text-gray-800">
                  $
                  {(
                    stats.totalRevenue / Math.max(stats.pendingOrders + 10, 1)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎯 Dashboard Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="🎓 Training Dashboard"
              description="Manage students, classes, and training analytics"
              icon={FaBook}
              link="/training/admindashboard"
              color="text-blue-500"
            />
            <DashboardCard
              title="📦 Orders Dashboard"
              description="Track orders, manage statuses, and monitor order flow"
              icon={FaShoppingCart}
              link="/createorder/admin"
              color="text-orange-500"
            />
            <DashboardCard
              title="💰 Finance Dashboard"
              description="Payment tracking and detailed financial reports"
              icon={FaDollarSign}
              link="/dashboards/finance"
              color="text-green-500"
            />
            <DashboardCard
              title="👥 User Management"
              description="View and manage all platform users and students"
              icon={FaUsers}
              link="/dashboards/users"
              color="text-purple-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ⚡ Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              to="/training/classform"
              className="bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 text-sm font-semibold transition-colors text-center"
            >
              + Create New Class
            </Link>
            <Link
              to="/createorder"
              className="bg-orange-50 text-orange-600 px-4 py-3 rounded-lg hover:bg-orange-100 text-sm font-semibold transition-colors text-center"
            >
              + New Order
            </Link>
            <Link
              to="/training/ourclass"
              className="bg-purple-50 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-100 text-sm font-semibold transition-colors text-center"
            >
              📚 View Classes
            </Link>
            <Link
              to="/"
              className="bg-gray-50 text-gray-600 px-4 py-3 rounded-lg hover:bg-gray-100 text-sm font-semibold transition-colors text-center"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
          <p>© 2024 ABike Chops Admin Panel. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default MasterDashboard;
