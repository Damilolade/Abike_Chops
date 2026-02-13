import { useOutletContext } from "react-router-dom";

const Pending = () => {
  const { orders, completeOrder } = useOutletContext();

  // Filter pending orders
  const pendingOrders = orders.filter((o) => o.status === "pending");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
      {pendingOrders.length === 0 ? (
        <p>No pending orders.</p>
      ) : (
        <ul className="space-y-2">
          {pendingOrders.map((o) => (
            <li
              key={o.id}
              className="p-3 bg-white/10 rounded-lg flex justify-between items-center"
            >
              <span>Order #{o.id}</span>
              <button
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 text-white"
                onClick={() => completeOrder(o.id)}
              >
                Mark Completed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pending;
