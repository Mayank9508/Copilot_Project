import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />; // ✅ /login nahi, / pe bhejo

  return <Outlet />;
};

export default ProtectedRoute;