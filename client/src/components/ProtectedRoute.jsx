import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  return auth.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
