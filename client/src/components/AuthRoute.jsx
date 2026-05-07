import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) return <div>Loading...</div>;
  if (user) return <Navigate to="/home" />;

  return <Outlet />;
};

export default AuthRoute;