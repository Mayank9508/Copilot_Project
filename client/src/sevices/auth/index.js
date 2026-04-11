// src/services/auth.service.js

import { axiosInstance } from "../../config/axisoInstance.js";

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const getMe = () => {
  return axiosInstance.get("/auth/me");
};

export const refreshToken = () => {
  return axiosInstance.get("/auth/refresh-token");
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};