import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuthHook";

const ProtectedAdminRoute = ({ children }) => {
  const auth = useAuth();

  // 🚨 Guard against undefined
  if (!auth) {
    return null; // or loading spinner
  }

  const { loading, isAdmin } = auth;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
