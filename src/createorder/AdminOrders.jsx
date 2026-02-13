import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaClock,
  FaDownload,
  FaDollarSign,
  FaTrash,
  FaFilter,
} from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";
import {
  completeOrder,
  deleteOrder,
  getPendingOrders,
  getCompletedOrders,
  exportToCSV,
  exportToJSON,
} from "../utils/dataService";

const AdminOrders = () => {
  const [orders, setOrders] = useState({
    pending: [],
    completed: [],
  });
  const [activeTab, setActiveTab] = useState("pending");
  const [filterAmount, setFilterAmount] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const pending = getPendingOrders();
    const completed = getCompletedOrders();
    setOrders({ pending, completed });
  };

  const handleStatusUpdate = (orderId) => {
    completeOrder(orderId);
    loadOrders();
  };

  const handleDeleteOrder = (orderId, status) => {
    deleteOrder(orderId, status);
    loadOrders();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  // eslint-disable-next-line no-unused-vars
  const TabButton = ({ tab, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
        activeTab === tab
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      <Icon />
      {label}
      <span className="ml-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
        {count}
      </span>
    </button>
  );

  const OrderTable = ({ data, status }) => (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="px-4 py-3 text-left text-gray-700 font-semibold">
              Order ID
            </th>
            <th className="px-4 py-3 text-left text-gray-700 font-semibold">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-gray-700 font-semibold">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-gray-700 font-semibold">
              Date
            </th>
            <th className="px-4 py-3 text-left text-gray-700 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  #{order.id}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {order.customerName || order.email || "N/A"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 font-semibold text-green-600">
                    <FaDollarSign className="text-sm" />
                    {order.amount || "0.00"}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {status === "pending" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order.id, "completed")
                        }
                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm font-semibold transition-colors"
                      >
                        <FaCheck className="text-xs" />
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(order.id, status)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm font-semibold transition-colors"
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                No {status} orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const totalRevenue = orders.completed.reduce(
    (sum, order) => sum + (order.amount || 0),
    0,
  );

  let filteredData =
    activeTab === "pending" ? orders.pending : orders.completed;
  if (filterAmount === "high") {
    filteredData = filteredData.filter((o) => o.amount > 500);
  } else if (filterAmount === "low") {
    filteredData = filteredData.filter((o) => o.amount <= 500);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardSidebar onLogout={handleLogout} />
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 mt-16 lg:mt-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                📦 Orders Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage and track all orders</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
              <button
                onClick={() => exportToCSV(filteredData, "orders.csv")}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold transition-colors text-sm"
              >
                <FaDownload /> CSV
              </button>
              <button
                onClick={() => exportToJSON(filteredData, "orders.json")}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors text-sm"
              >
                <FaDownload /> JSON
              </button>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex items-center gap-4">
          <FaFilter className="text-gray-600" />
          <select
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Amounts</option>
            <option value="high">High ($500+)</option>
            <option value="low">Low (Under $500)</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {orders.pending.length}
                </p>
              </div>
              <FaClock className="text-4xl text-orange-300" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Completed Orders
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {orders.completed.length}
                </p>
              </div>
              <FaCheck className="text-4xl text-green-300" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <FaDollarSign className="text-4xl text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <TabButton
            tab="pending"
            label="Pending"
            icon={FaClock}
            count={orders.pending.length}
          />
          <TabButton
            tab="completed"
            label="Completed"
            icon={FaCheck}
            count={orders.completed.length}
          />
        </div>

        {/* Orders Table */}
        {activeTab === "pending" && (
          <OrderTable data={filteredData} status="pending" />
        )}
        {activeTab === "completed" && (
          <OrderTable data={filteredData} status="completed" />
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
