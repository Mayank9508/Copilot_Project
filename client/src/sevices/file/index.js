import { axiosInstance } from "../../config/axisoInstance.js";

// create file
export const createFile = (data) => {
  return axiosInstance.post("/file/create", data);
};

// list files
export const getFiles = () => {
  return axiosInstance.get("/file/listFiles");
};

// read file
export const readFile = (name) => {
  return axiosInstance.get(`/file/${name}`);
};

// update file
export const updateFile = (name, data) => {
  return axiosInstance.put(`/file/${name}`, data);
};

// delete file
export const deleteFile = (name) => {
  return axiosInstance.delete(`/file/${name}`);
};