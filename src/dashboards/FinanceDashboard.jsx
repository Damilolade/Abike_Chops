import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaCreditCard,
  FaDownload,
  FaFilter,
} from "react-icons/fa";
import {
  getCompletedOrders,
  exportToCSV,
  exportToJSON,
} from "../utils/dataService";

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageOrderValue: 0,
    totalOrders: 0,
  });
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const orders = getCompletedOrders();
    const transactionData = orders.map((order) => ({
      id: order.id,
      date: order.completedAt || order.createdAt,
      amount: order.amount || 0,
      customerName: order.customerName || order.email || "Unknown",
      status: "Completed",
      paymentMethod: order.paymentMethod || "N/A",
    }));

    setTransactions(transactionData);
    setStats({
      totalRevenue: transactionData.reduce(
        (sum, t) => sum + (t.amount || 0),
        0,
      ),
      monthlyRevenue: 0,
      averageOrderValue: 0,
      totalOrders: transactionData.length,
    });
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, transactions, selectedMonth, selectedYear]);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Month & Year filter
    filtered = filtered.filter((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getMonth() === selectedMonth &&
        tDate.getFullYear() === selectedYear
      );
    });

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (t) => new Date(t.date) >= new Date(filters.dateFrom),
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (t) => new Date(t.date) <= new Date(filters.dateTo),
      );
    }

    // Amount range filter
    if (filters.minAmount) {
      filtered = filtered.filter(
        (t) => t.amount >= parseFloat(filters.minAmount),
      );
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(
        (t) => t.amount <= parseFloat(filters.maxAmount),
      );
    }

    setFilteredTransactions(filtered);
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`${color} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-5xl opacity-20" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          💰 Finance Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Payment tracking and financial reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaDollarSign}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          color="bg-green-500"
        />
        <StatCard
          icon={FaCreditCard}
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toFixed(2)}`}
          color="bg-blue-500"
        />
        <StatCard
          icon={FaDollarSign}
          title="Avg. Order Value"
          value={`$${stats.averageOrderValue.toFixed(2)}`}
          color="bg-purple-500"
        />
        <StatCard
          icon={FaCreditCard}
          title="Total Transactions"
          value={stats.totalOrders}
          color="bg-orange-500"
        />
      </div>

      {/* Month & Year Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          📅 Period Selection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2024, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaFilter /> Advanced Filters
          </h2>
          <button
            onClick={resetFilters}
            className="text-sm bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Amount
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Amount
            </label>
            <input
              type="number"
              placeholder="9999"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">📊 Transactions</h2>
          <div className="flex gap-2">
            <button
              onClick={() =>
                exportToCSV(filteredTransactions, "transactions.csv")
              }
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm font-semibold transition-colors"
            >
              <FaDownload /> CSV
            </button>
            <button
              onClick={() =>
                exportToJSON(filteredTransactions, "transactions.json")
              }
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold transition-colors"
            >
              <FaDownload /> JSON
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                Date
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                Payment Method
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">
                    {transaction.customerName}
                  </td>
                  <td className="px-4 py-3 text-green-600 font-bold">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Period Summary
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Period:</span>{" "}
              {new Date(selectedYear, selectedMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Transactions:</span>{" "}
              {filteredTransactions.length}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Revenue:</span> $
              {stats.monthlyRevenue.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Average Transaction:</span> $
              {filteredTransactions.length > 0
                ? (stats.monthlyRevenue / filteredTransactions.length).toFixed(
                    2,
                  )
                : "0.00"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Lifetime Stats
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">All Time Revenue:</span> $
              {stats.totalRevenue.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Transactions:</span>{" "}
              {stats.totalOrders}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Avg per Transaction:</span> $
              {stats.averageOrderValue.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Data Coverage:</span>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
