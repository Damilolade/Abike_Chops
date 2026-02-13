// App.jsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

/* =======================
   Context Providers
======================= */
import { AuthProvider } from "./context/AuthContext";

/* =======================
   Layout
======================= */
import RootLayOut from "./layout/RootLayOut";

/* =======================
   Main Pages
======================= */
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Wallet from "./Pages/Wallet";
import Cart from "./Pages/Cart";
import Chat from "./Pages/Chat";

/* =======================
   Training Pages
======================= */
import ClassForm from "./trainingclass/ClassForm";
import ClassLogin from "./trainingclass/ClassLogin";
import PaymentPage from "./trainingclass/PaymentPage";
import OurClass from "./trainingclass/OurClass";
import UpComing from "./trainingclass/UpComing";
import RecordedClass from "./trainingclass/RecordedClass";
import CompletedClass from "./trainingclass/Completed";
import Quiz from "./trainingclass/Quiz";
import Expired from "./trainingclass/Expired";
import AdminDashboard from "./trainingclass/AdminDashboard";

/* =======================
   Orders
======================= */
import CreateOrder from "./createorder/CreateOrder";
import PendingOrders from "./createorder/Pending";
import CompletedOrders from "./createorder/Completed";
import AdminOrders from "./createorder/AdminOrders";

/* =======================
   Dashboards
======================= */
import MasterDashboard from "./dashboards/MasterDashboard";
import FinanceDashboard from "./dashboards/FinanceDashboard";
import UserManagementDashboard from "./dashboards/UserManagementDashboard";

/* =======================
   Protected Routes
======================= */
import ProtectedTrainingRoute from "./components/ProtectedTrainingRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

/* =======================
   Router
======================= */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      {/* =======================
          Public Pages
      ======================= */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="cart" element={<Cart />} />
      <Route path="chat" element={<Chat />} />

      {/* =======================
          Training Routes
      ======================= */}
      <Route path="training">
        {/* Public Training */}
        <Route path="classform" element={<ClassForm />} />
        <Route path="classlogin" element={<ClassLogin />} />
        <Route path="payment" element={<PaymentPage />} />

        {/* Protected Training Area */}
        <Route
          element={
            <ProtectedTrainingRoute>
              <Outlet />
            </ProtectedTrainingRoute>
          }
        >
          <Route path="ourclass" element={<OurClass />} />
          <Route path="upcoming" element={<UpComing />} />
          <Route path="recorded" element={<RecordedClass />} />
          <Route path="completed" element={<CompletedClass />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="expired" element={<Expired />} />
        </Route>

        {/* Admin Only */}
        <Route
          path="admindashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Route>

      {/* =======================
          Orders
      ======================= */}
      <Route path="createorder">
        <Route index element={<CreateOrder />} />
        <Route path="pending" element={<PendingOrders />} />
        <Route path="completed" element={<CompletedOrders />} />
        <Route
          path="admin"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />
      </Route>

      {/* =======================
          Admin Dashboards
      ======================= */}
      <Route
        path="admin"
        element={
          <ProtectedAdminRoute>
            <MasterDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="dashboards/finance"
        element={
          <ProtectedAdminRoute>
            <FinanceDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="dashboards/users"
        element={
          <ProtectedAdminRoute>
            <UserManagementDashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* =======================
          Fallback
      ======================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

/* =======================
   App Entry
======================= */
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
