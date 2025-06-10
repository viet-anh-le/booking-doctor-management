import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAdminAuth";

export default function AdminPrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/admin/signin" replace />;
  return children;
}
