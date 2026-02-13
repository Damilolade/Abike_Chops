const BASE_URL = "http://localhost:5000/orders";

export const getOrders = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addOrderAPI = async (order) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const updateOrderAPI = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteOrderAPI = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

// -------- LOCALSTORAGE BACKUP --------

const LOCAL_KEY = "abike_orders";

export const getOrdersLocal = () => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
};

export const saveOrdersLocal = (orders) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
};
