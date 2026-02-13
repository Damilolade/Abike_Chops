import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import localData from "../data/db.json";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const { pathname } = useLocation();
  const [orders, setOrders] = useState([]);
  const [sidebarOpenDesktop, setSidebarOpenDesktop] = useState(true);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  // Check if current route is a dashboard page
  const isDashboard =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboards") ||
    pathname.startsWith("/createorder/admin");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        if (!res.ok) throw new Error("API down");
        const data = await res.json();
        setOrders(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.warn("Using local orders fallback");
        setOrders(localData.orders || []);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const completeOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o)),
    );
  };

  return (
    <>
      {isDashboard ? (
        // Dashboard layout - minimal wrapper
        <div className="min-h-screen">
          <Outlet context={{ orders, addOrder, completeOrder }} />
        </div>
      ) : (
        // Regular app layout with navbar/sidebar/footer
        <div className="flex min-h-screen bg-gradient-to-br from-black via-purple-900 to-yellow-700 text-white">
          {/* Navbar */}
          <header className="fixed top-0 left-0 w-full z-30 bg-purple-900 border-b border-yellow-400 shadow-md">
            <Navbar
              onMenuClick={() => setSidebarOpenMobile(true)}
              onToggleSidebar={() => setSidebarOpenDesktop((v) => !v)}
              sidebarOpen={sidebarOpenDesktop}
            />
          </header>

          {/* Layout */}
          <div className="flex flex-1 pt-16 w-full">
            {/* Desktop Sidebar */}
            <aside
              className={`hidden md:flex transition-all duration-300
            ${sidebarOpenDesktop ? "w-64" : "w-16"}
            bg-black/80 border-r border-purple-700 shadow-md`}
            >
              <Sidebar
                isOpen={sidebarOpenDesktop}
                orders={orders}
                onClose={() => setSidebarOpenDesktop(false)}
              />
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpenMobile && (
              <div className="fixed inset-0 z-40 md:hidden">
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setSidebarOpenMobile(false)}
                />
                <aside className="relative w-64 h-full bg-purple-900 shadow-xl p-4">
                  <Sidebar
                    isOpen
                    orders={orders}
                    onClose={() => setSidebarOpenMobile(false)}
                  />
                </aside>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 gap-4">
              <main className="flex-1 overflow-y-auto bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Outlet context={{ orders, addOrder, completeOrder }} />
              </main>

              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayout;
