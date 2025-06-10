import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useDoctorAuth";

export default function DoctorPrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/doctor" replace />;
  return children;
}
