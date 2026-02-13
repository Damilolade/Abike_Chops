import React, { useState } from "react";

const OrderForm = ({ createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    createOrder({
      customer,
      item,
      quantity,
      status: "pending",
    });

    setCustomer("");
    setItem("");
    setQuantity(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-white border rounded-xl shadow-sm mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">Add New Order</h3>

      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-3 rounded-lg w-200 mb-3"
        required
      />

      <input
        type="text"
        placeholder="Item Name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="border p-3 rounded-lg w-200 mb-3"
        required
      />

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-3 rounded-lg w-full mb-3"
      />

      <button className="w-200 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg">
        Add Order
      </button>
    </form>
  );
};

export default OrderForm;
