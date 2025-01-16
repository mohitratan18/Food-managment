import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/page";

// Admin Pages
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const MenuManagement = React.lazy(() => import("./pages/admin/MenuManagement"));
const SalesAnalytics = React.lazy(() => import("./pages/admin/SalesAnalytics"));
const AdminOrderHistory = React.lazy(
  () => import("./pages/admin/OrderHistory")
);
const Predictions = React.lazy(() => import("./pages/admin/Predictions"));

// User Pages
const UserDashboard = React.lazy(() => import("./pages/user/Dashboard"));
const Menu = React.lazy(() => import("./pages/user/Menu"));
const Tables = React.lazy(() => import("./pages/user/Tables"));
const Orders = React.lazy(() => import("./pages/user/Orders"));

function App() {
  // This would normally come from your auth system
  const role = "admin";

  return (
    <Router>
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <Layout role="admin">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/menu" element={<MenuManagement />} />
                  <Route path="/sales" element={<SalesAnalytics />} />
                  <Route path="/orders" element={<AdminOrderHistory />} />
                  <Route path="/predictions" element={<Predictions />} />
                </Routes>
              </Layout>
            }
          />

          {/* User Routes */}
          <Route
            path="/*"
            element={
              <Layout role="user">
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </Layout>
            }
          />

          {/* Redirect based on role */}
          <Route
            path="/"
            element={
              <Navigate to={role === "admin" ? "/admin" : "/"} replace />
            }
          />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
