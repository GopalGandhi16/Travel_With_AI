import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // toastId prevents duplicate toasts on mount during redirect
      toast.error("Please login to continue", { toastId: "auth_error" });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
