import { axiosInstance } from "../../config/axisoInstance.js";

// create folder
export const createFolder = (data) => {
  return axiosInstance.post("/folder/create", data);
};

// list folders
export const getFolders = () => {
  return axiosInstance.get("/folder/listFolders");
};

// rename folder
export const renameFolder = (name, data) => {
  return axiosInstance.put(`/folder/${name}`, data);
};

// delete folder
export const deleteFolder = (name) => {
  return axiosInstance.delete(`/folder/${name}`);
};