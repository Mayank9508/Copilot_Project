import { axiosInstance } from "../../config/axisoInstance.js";
import asyncHandler from "../../utils/asyncHandler.js";

// 🔹 Create folder
export const createFolder = asyncHandler(async (data) => {
  const res = await axiosInstance.post("/folder/create", data);

  return {
    success: res.data.success,
    folder: res.data.folder || data?.name,
  };
});

// 🔹 Get all folders
export const getFolders = asyncHandler(async () => {
  const res = await axiosInstance.get("/folder/listFolders");

  return {
    folders: res.data.folders || [],
    count: res.data.folders?.length || 0,
  };
});

// 🔹 Rename folder
export const renameFolder = asyncHandler(async (name, data) => {
  const res = await axiosInstance.put(`/folder/${name}`, data);

  return {
    success: res.data.success,
    oldName: name,
    newName: data?.name,
  };
});

// 🔹 Delete folder
export const deleteFolder = asyncHandler(async (name) => {
  const res = await axiosInstance.delete(`/folder/${name}`);

  return {
    success: res.data.success,
    deletedFolder: name,
  };
});