import React, { useState, useEffect } from "react";
import {
  CreditCard,
  DollarSign,
  Send,
  TrendingUp,
  History,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { getTransactions, addTransaction } from "../utils/dataService";

const Wallet = () => {
  const [balance, setBalance] = useState(12500);
  const [transactions, setTransactions] = useState([]);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const txns = getTransactions();
    setTransactions(txns || []);
  };

  const handleAddFunds = async () => {
    if (!addAmount || addAmount <= 0) {
      setMessage({ text: "Enter a valid amount", type: "error" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newBalance = balance + parseFloat(addAmount);
      setBalance(newBalance);

      // Add transaction record
      addTransaction({
        id: Date.now(),
        type: "credit",
        amount: parseFloat(addAmount),
        method: paymentMethod,
        description: `Funded via ${paymentMethod}`,
        date: new Date().toISOString(),
        status: "completed",
      });

      setMessage({
        text: `₦${addAmount} added successfully!`,
        type: "success",
      });
      setAddAmount("");
      setShowAddFunds(false);
      loadTransactions();
    } catch {
      setMessage({ text: "Transaction failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      setMessage({ text: "Enter a valid amount", type: "error" });
      return;
    }

    if (withdrawAmount > balance) {
      setMessage({ text: "Insufficient balance", type: "error" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newBalance = balance - parseFloat(withdrawAmount);
      setBalance(newBalance);

      // Add transaction record
      addTransaction({
        id: Date.now(),
        type: "debit",
        amount: parseFloat(withdrawAmount),
        method: paymentMethod,
        description: "Withdrawal",
        date: new Date().toISOString(),
        status: "completed",
      });

      setMessage({
        text: `₦${withdrawAmount} withdrawal initiated!`,
        type: "success",
      });
      setWithdrawAmount("");
      setShowWithdraw(false);
      loadTransactions();
    } catch {
      setMessage({ text: "Withdrawal failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const recentTxns = transactions.slice(-5).reverse();
  const totalSpent = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalFunded = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wallet</h1>
          <p className="text-gray-600">
            Manage your account balance and transactions
          </p>
        </div>

        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-white/80 mb-2">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-5xl font-bold">
                    {showBalance ? `₦${balance.toLocaleString()}` : "••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
                  </button>
                </div>
              </div>
              <CreditCard size={48} className="opacity-50" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Total Funded</p>
                <p className="text-xl font-semibold">
                  ₦{totalFunded.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Total Spent</p>
                <p className="text-xl font-semibold">
                  ₦{totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Transactions</p>
                <p className="text-xl font-semibold">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowAddFunds(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
          >
            <Plus size={20} />
            Add Funds
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
          >
            <Minus size={20} />
            Withdraw
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 px-4 font-semibold transition flex items-center gap-2 ${
              activeTab === "history"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <History size={18} />
            History
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Monthly Spending
                </h3>
                <TrendingUp className="text-blue-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ₦{totalSpent.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Based on latest transactions
              </p>
            </div>

            {/* Funding Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Funded
                </h3>
                <Plus className="text-green-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ₦{totalFunded.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Funds added to wallet</p>
            </div>

            {/* Transaction Count */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <History className="text-purple-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {transactions.length}
              </p>
              <p className="text-sm text-gray-600">Total transactions</p>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {recentTxns.length > 0 ? (
              <div>
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Recent Transactions
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentTxns.map((txn) => (
                    <div
                      key={txn.id}
                      className="p-6 hover:bg-gray-50 transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            txn.type === "credit"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {txn.type === "credit" ? (
                            <ArrowDownLeft
                              className="text-green-600"
                              size={24}
                            />
                          ) : (
                            <ArrowUpRight className="text-red-600" size={24} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {txn.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {txn.method} •{" "}
                            {new Date(txn.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-xl font-bold ${
                          txn.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {txn.type === "credit" ? "+" : "-"}₦
                        {txn.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <History size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No transactions yet</p>
              </div>
            )}
          </div>
        )}

        {/* Add Funds Modal */}
        {showAddFunds && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add Funds to Wallet
              </h2>

              <div className="space-y-4 mb-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="mobile">Mobile Money</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Add Funds"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Withdraw from Wallet
              </h2>

              <div className="space-y-4 mb-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Available: ₦{balance.toLocaleString()}
                  </p>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Withdrawal Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  >
                    <option value="bank">Bank Account</option>
                    <option value="card">Debit Card</option>
                    <option value="mobile">Mobile Money</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Withdraw"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
