// Fake API simulation with localStorage fallback

// ------------------- GET ALL ORDERS -------------------
export async function getOrders() {
  const saved = localStorage.getItem("orders");
  return saved ? JSON.parse(saved) : [];
}

// ------------------- ADD ORDER -------------------
export async function addOrderAPI(order) {
  const saved = localStorage.getItem("orders");
  const orders = saved ? JSON.parse(saved) : [];

  const newOrder = {
    id: Date.now(),
    ...order,
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  return newOrder;
}

// ------------------- UPDATE ORDER -------------------
export async function updateOrderAPI(id, data) {
  const saved = localStorage.getItem("orders");
  let orders = saved ? JSON.parse(saved) : [];

  orders = orders.map((o) =>
    o.id === id ? { ...o, ...data } : o
  );

  localStorage.setItem("orders", JSON.stringify(orders));

  return orders.find((o) => o.id === id);
}

// ------------------- DELETE ORDER -------------------
export async function deleteOrderAPI(id) {
  const saved = localStorage.getItem("orders");
  let orders = saved ? JSON.parse(saved) : [];

  orders = orders.filter((o) => o.id !== id);

  localStorage.setItem("orders", JSON.stringify(orders));
  return true;
}

// ------------------- LOCAL STORAGE HELPERS -------------------
export function saveOrdersLocal(data) {
  localStorage.setItem("orders", JSON.stringify(data));
}

export function getOrdersLocal() {
  const saved = localStorage.getItem("orders");
  return saved ? JSON.parse(saved) : [];
}
