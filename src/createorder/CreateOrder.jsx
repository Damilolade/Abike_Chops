import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User, Package, Clock, PlusCircle, CheckCircle } from "lucide-react";

const CreateOrder = () => {
  const { orders, addOrder, completeOrder } = useOutletContext();
  const [orderItems, setOrderItems] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddOrder = () => {
    if (!customerName || !orderItems) return;

    const newOrder = {
      id: Date.now().toString(),
      status: "pending",
      items: orderItems.split(",").map((i) => i.trim()), // store as array
      quantity: Number(quantity),
      customer: customerName,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    // Clear form
    setCustomerName("");
    setOrderItems("");
    setQuantity(1);
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");

  return (
    <div className="space-y-6">
      {/* Add Order Form */}
      <div className="p-4 bg-white/10 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PlusCircle size={24} /> Add New Order
        </h2>
        <div className="flex items-center gap-2">
          <User size={20} /> 
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-200 p-2 rounded bg-white/20 text-white placeholder-gray-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <Package size={20} /> 
          <input
            type="text"
            placeholder="Order Items"
            value={orderItems}
            onChange={(e) => setOrderItems(e.target.value)}
            className="w-200 p-2 rounded bg-white/20 text-white placeholder-gray-300"
          />
        </div>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-50 p-2 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Quantity"
        />
        <button
          className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white"
          onClick={handleAddOrder}
        >
          <PlusCircle size={18} /> Add Order
        </button>
      </div>

      {/* Pending Orders */}
      <div className="p-4 bg-white/10 rounded-lg space-y-3">
        <h3 className="text-lg font-semibold">Pending Orders</h3>
        {pendingOrders.length === 0 ? (
          <p>No pending orders.</p>
        ) : (
          <ul className="space-y-2">
            {pendingOrders.map((o) => (
              <li
                key={o.id}
                className="p-3 bg-white/20 rounded-lg flex justify-between items-center"
              >
                <div className="space-y-1">
                  <p className="font-semibold flex items-center gap-2">
                    <Package size={16} /> Order #{o.id}
                  </p>
                  <p className="flex items-center gap-2"><User size={16} /> {o.customer}</p>
                  <p className="flex items-center gap-2">
                    <Package size={16} /> {o.items.join(", ")}
                  </p>
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    <Clock size={14} /> {new Date(o.createdAt).toLocaleString()}
                  </p>
                  <p>Quantity: {o.quantity}</p>
                </div>
                <button
                  className="flex items-center gap-1 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-white"
                  onClick={() => completeOrder(o.id)}
                >
                  <CheckCircle size={16} /> Complete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
