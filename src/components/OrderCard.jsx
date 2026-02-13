import React from "react";

const OrderCard = ({ order, onComplete, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow mb-3 bg-white">
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Item:</strong> {order.item}</p>
      <p><strong>Qty:</strong> {order.quantity}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <div className="mt-3 flex gap-2">
        {order.status === "pending" && (
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => onComplete(order.id)}
          >
            Mark Complete
          </button>
        )}

        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => onDelete(order.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrderCard;

