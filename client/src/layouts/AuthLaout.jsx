import { useState } from "react";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      {isLogin ? (
        <LoginPage setToggle={setIsLogin} />
      ) : (
        <RegisterPage setToggle={setIsLogin} />
      )}
    </div>
  );
};

export default AuthLayout;