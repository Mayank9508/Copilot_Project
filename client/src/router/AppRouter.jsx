import { createBrowserRouter, RouterProvider } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthLayout from "../layouts/AuthLaout";
import HomeLayout from "../layouts/HomeLayout";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import { axiosInstance } from "../config/axiosInstance";
import {
  removeUser,
  setAuthChecked,
  setUser,
} from "../features/auth/AuthSlice";

const AppRouter = () => {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      dispatch(setUser(res.data.data.user));
      dispatch(setAuthChecked());
    } catch {
      dispatch(removeUser());
      dispatch(setAuthChecked());
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthRoute />,
      children: [{ path: "", element: <AuthLayout /> }],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [{ path: "", element: <HomeLayout /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
