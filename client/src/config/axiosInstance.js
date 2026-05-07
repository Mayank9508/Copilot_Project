import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (response) => response,

//   (error) => {
//     if (
//       error.response?.status === 401 &&
//       error.response?.message === "Invalid access token"
//     ) {
//       // Handle unauthorized error (e.g., redirect to login)
//       // const newAccessToken = getRefreshToken();
//     }

//     if (
//       error.response?.status === 401 &&
//       error.response?.message === "Authentication invalid"
//     ) {
//       window.location.href = "/login";
//     }
//   },
// );
