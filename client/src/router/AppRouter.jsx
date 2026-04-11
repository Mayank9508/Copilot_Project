import {createBrowserRouter, RouterProvider} from "react-router";
import AuthLayout from "../layouts/AuthLaout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomeLayout from "../layouts/HomeLayout";


const AppRouter = () => {
  const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/home",
        element: <HomeLayout />
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRouter;