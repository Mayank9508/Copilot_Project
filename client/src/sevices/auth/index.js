import { axiosInstance } from "../../config/axisoInstance.js";
import asyncHandler from "../../utils/asyncHandler.js";

// 🔹 Register
export const registerUser = asyncHandler(async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
});

// 🔹 Login
export const loginUser = asyncHandler(async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  return {
    success: response.data.success,
    user: response.data?.user,
    token: response.data.token,
  };
});

// 🔹 Get current user
export const getMe = asyncHandler(async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
});

// 🔹 Refresh Token
export const refreshToken = asyncHandler(async () => {
  const response = await axiosInstance.get("/auth/refresh-token");
  return response.data;
});

// 🔹 Logout
export const logoutUser = asyncHandler(async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
});