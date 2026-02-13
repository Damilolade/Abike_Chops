/**
 * Data Management Utility Service
 * Handles localStorage operations with better structure and data persistence
 */

const STORAGE_KEYS = {
  STUDENTS: "students",
  PENDING_ORDERS: "pendingOrders",
  COMPLETED_ORDERS: "completedOrders",
  USERS: "users",
  CLASSES: "classes",
  PAYMENTS: "payments",
  TRANSACTIONS: "transactions",
};

/**
 * Get data from localStorage with default value
 */
export const getData = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Set data to localStorage
 */
export const setData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Remove data from localStorage
 */
export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Get all students
 */
export const getStudents = () => getData(STORAGE_KEYS.STUDENTS, []);

/**
 * Add new student
 */
export const addStudent = (student) => {
  const students = getStudents();
  const newStudent = {
    id: Date.now(),
    ...student,
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  setData(STORAGE_KEYS.STUDENTS, students);
  return newStudent;
};

/**
 * Update student
 */
export const updateStudent = (studentId, updates) => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === studentId);
  if (index !== -1) {
    students[index] = { ...students[index], ...updates };
    setData(STORAGE_KEYS.STUDENTS, students);
    return students[index];
  }
  return null;
};

/**
 * Delete student
 */
export const deleteStudent = (studentId) => {
  const students = getStudents();
  const filtered = students.filter((s) => s.id !== studentId);
  setData(STORAGE_KEYS.STUDENTS, filtered);
  return true;
};

/**
 * Get pending orders
 */
export const getPendingOrders = () => getData(STORAGE_KEYS.PENDING_ORDERS, []);

/**
 * Get completed orders
 */
export const getCompletedOrders = () => getData(STORAGE_KEYS.COMPLETED_ORDERS, []);

/**
 * Add order
 */
export const addOrder = (order, status = "pending") => {
  const key = status === "pending" ? STORAGE_KEYS.PENDING_ORDERS : STORAGE_KEYS.COMPLETED_ORDERS;
  const orders = getData(key, []);
  const newOrder = {
    id: Date.now(),
    ...order,
    status,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  setData(key, orders);
  return newOrder;
};

/**
 * Move order from pending to completed
 */
export const completeOrder = (orderId) => {
  const pending = getPendingOrders();
  const order = pending.find((o) => o.id === orderId);
  
  if (order) {
    const updated = pending.filter((o) => o.id !== orderId);
    setData(STORAGE_KEYS.PENDING_ORDERS, updated);
    
    const completed = getCompletedOrders();
    completed.push({
      ...order,
      status: "completed",
      completedAt: new Date().toISOString(),
    });
    setData(STORAGE_KEYS.COMPLETED_ORDERS, completed);
    return true;
  }
  return false;
};

/**
 * Delete order
 */
export const deleteOrder = (orderId, status = "pending") => {
  const key = status === "pending" ? STORAGE_KEYS.PENDING_ORDERS : STORAGE_KEYS.COMPLETED_ORDERS;
  const orders = getData(key, []);
  const filtered = orders.filter((o) => o.id !== orderId);
  setData(key, filtered);
  return true;
};

/**
 * Get all users
 */
export const getUsers = () => getData(STORAGE_KEYS.USERS, []);

/**
 * Add user
 */
export const addUser = (user) => {
  const users = getUsers();
  const newUser = {
    id: Date.now(),
    ...user,
    createdAt: new Date().toISOString(),
    status: "active",
  };
  users.push(newUser);
  setData(STORAGE_KEYS.USERS, users);
  return newUser;
};

/**
 * Update user
 */
export const updateUser = (userId, updates) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    setData(STORAGE_KEYS.USERS, users);
    return users[index];
  }
  return null;
};

/**
 * Delete user
 */
export const deleteUser = (userId) => {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  setData(STORAGE_KEYS.USERS, filtered);
  return true;
};

/**
 * Get all transactions
 */
export const getTransactions = () => getData(STORAGE_KEYS.TRANSACTIONS, []);

/**
 * Add transaction
 */
export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  const newTransaction = {
    id: Date.now(),
    ...transaction,
    timestamp: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  setData(STORAGE_KEYS.TRANSACTIONS, transactions);
  return newTransaction;
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = () => {
  const students = getStudents();
  const pending = getPendingOrders();
  const completed = getCompletedOrders();
  const transactions = getTransactions();
  const users = getUsers();

  const totalRevenue = completed.reduce((sum, order) => sum + (order.amount || 0), 0);
  const monthlyRevenue = completed
    .filter((order) => {
      const orderDate = new Date(order.completedAt);
      const currentDate = new Date();
      return orderDate.getMonth() === currentDate.getMonth() && 
             orderDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, order) => sum + (order.amount || 0), 0);

  return {
    totalStudents: students.length,
    totalUsers: users.length,
    totalRevenue,
    monthlyRevenue,
    pendingOrders: pending.length,
    completedOrders: completed.length,
    activeTransactions: transactions.filter((t) => t.status === "active").length,
  };
};

/**
 * Export data to CSV
 */
export const exportToCSV = (data, filename = "export.csv") => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        return typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Export data to JSON
 */
export const exportToJSON = (data, filename = "export.json") => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};
