import { useOutletContext } from "react-router-dom";
import { User, Package, Clock, CheckCircle } from "lucide-react";

const Completed = () => {
  const { orders } = useOutletContext();

  // Filter completed orders
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <CheckCircle size={24} /> Completed Orders
      </h2>

      {completedOrders.length === 0 ? (
        <p>No completed orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {completedOrders.map((o) => (
            <li
              key={o.id}
              className="p-3 bg-white/20 rounded-lg flex justify-between items-center"
            >
              <div className="space-y-1">
                <p className="font-semibold flex items-center gap-2">
                  <Package size={16} /> Order #{o.id}
                </p>
                <p className="flex items-center gap-2">
                  <User size={16} /> {o.customer}
                </p>
                <p className="flex items-center gap-2">
                  <Package size={16} /> {o.items.join(", ")}
                </p>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <Clock size={14} /> {new Date(o.createdAt).toLocaleString()}
                </p>
                <p>Quantity: {o.quantity}</p>
              </div>

              <span className="flex items-center gap-1 text-green-400 font-semibold">
                <CheckCircle size={16} /> Completed
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Completed;
