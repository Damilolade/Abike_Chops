import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  getOrders,
  addOrderAPI,
  getOrdersLocal,
  saveOrdersLocal
} from "../api/api";

import { User, Package, Hash, Clock } from "lucide-react";
import { motion } from "framer-motion";

const CreateOrder = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    item: "",
    quantity: 1,
  });

  const [message, setMessage] = useState("");

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      saveOrdersLocal(data);
    } catch {
      const local = getOrdersLocal();
      setOrders(local);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now(),
      customer: form.customer,
      item: form.item,
      quantity: Number(form.quantity),
      status: "pending",
      date: new Date().toISOString(),
    };

    try {
      const saved = await addOrderAPI(newOrder);
      const updated = [...orders, saved];
      setOrders(updated);
      saveOrdersLocal(updated);
      setMessage("Order Created Successfully ✔");
    } catch {
      const localUpdated = [...orders, newOrder];
      setOrders(localUpdated);
      saveOrdersLocal(localUpdated);
      setMessage("Saved offline (No Internet). ✔");
    }

    setForm({ customer: "", item: "", quantity: 1 });

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen w-full p-6 
      bg-gradient-to-br from-black via-purple-900 to-yellow-700">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 flex items-center gap-2 
        bg-gradient-to-r from-purple-400 to-yellow-300 
        bg-clip-text text-transparent"
      >
        <Clock size={22} />
        Create New Order
      </motion.h1>

      {/* SUCCESS MESSAGE */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 bg-purple-800 text-white p-3 
          rounded-xl shadow-lg border border-yellow-400"
        >
          {message}
        </motion.p>
      )}

      {/* FORM CARD */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-4 bg-white/90 backdrop-blur 
        p-6 rounded-2xl shadow-xl border border-purple-300"
      >

        {/* CUSTOMER */}
        <div>
          <label className="block mb-1 flex items-center gap-2 font-semibold text-purple-800">
            <User size={18} />
            Customer Name
          </label>
          <input
            type="text"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-purple-300 
            focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter customer name"
            required
          />
        </div>

        {/* ITEM */}
        <div>
          <label className="block mb-1 flex items-center gap-2 font-semibold text-purple-800">
            <Package size={18} />
            Item Name
          </label>
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-purple-300 
            focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="E.g. Puff Puff, Samosa..."
            required
          />
        </div>

        {/* QUANTITY */}
        <div>
          <label className="block mb-1 flex items-center gap-2 font-semibold text-purple-800">
            <Hash size={18} />
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-3 rounded-xl border border-purple-300 
            focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-900 to-yellow-500 
          text-white py-3 rounded-xl font-semibold shadow-xl 
          hover:opacity-90 transition-all"
        >
          Submit Order
        </button>
      </motion.form>

      {/* CHILD ROUTES */}
      <Outlet context={{ orders, setOrders }} />
    </div>
  );
};

export default CreateOrder;
