import { axiosInstance } from "../../config/axiosInstance.js";
import asyncHandler from "../../utils/asyncHandler.js";

// 🔹 Create file
export const createFile = asyncHandler(async (data) => {
  const res = await axiosInstance.post("/file/create", data);

  return {
    success: res.data.success,
    file: res.data.file || data?.name,
  };
});

// 🔹 Get all files
export const getFiles = asyncHandler(async () => {
  const res = await axiosInstance.get("/file/listFiles");
  return {
    files: res.data.data?.files || [],  // ✅ res.data.data
  };
});

// 🔹 Read file
export const readFile = asyncHandler(async (name) => {
  const res = await axiosInstance.get(`/file/${name}`);

  return {
    fileName: name,
    content: res.data.content || res.data,
  };
});

// 🔹 Update file
export const updateFile = asyncHandler(async (name, data) => {
  const res = await axiosInstance.put(`/file/${name}`, data);

  return {
    success: res.data.success,
    updatedFile: name,
  };
});

// 🔹 Delete file
export const deleteFile = asyncHandler(async (name) => {
  const res = await axiosInstance.delete(`/file/${name}`);

  return {
    success: res.data.success,
    deletedFile: name,
  };
});