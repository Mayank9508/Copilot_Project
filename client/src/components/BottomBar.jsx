import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser, setAuthChecked } from "../features/auth/AuthSlice";
import { logoutUser } from "../sevices/auth";

const BottomBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // backend logout api
      await logoutUser();

      // redux clear
      dispatch(removeUser());
      dispatch(setAuthChecked());

      // redirect
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-auto p-2 border-t border-gray-700">
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default BottomBar;