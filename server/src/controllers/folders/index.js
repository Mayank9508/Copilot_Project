import path from "path";
import fs from "fs";
import { customError, success } from "../../utils/response.utils.js";

const currentDir = path.resolve() + "/assets";

export const createFolder = async (req, res) => {
  const { folderName } = req.body;
  console.log("creating folder at", `${currentDir}/${folderName}`);

  fs.mkdir(`${currentDir}/${folderName}`, { recursive: true }, (err) => {
    if (err) return customError(res, {}, 500, err.message || "Error creating folder");
    return success(res, { message: "Folder created successfully" });
  });
};

export const listFolders = (req, res) => {
  fs.readdir(currentDir, { withFileTypes: true }, (err, entries) => {
    if (err) return customError(res, {}, 500, err.message || "Error listing folders");
    const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    return success(res, { folders });
  });
};

export const renameFolder = (req, res) => {
  const oldName = req.params?.name;
  const newName = req.body?.newName || req.body?.name;
  if (!oldName || !newName) return customError(res, {}, 400, "Invalid folder names");
  const from = `${currentDir}/${oldName}`;
  const to = `${currentDir}/${newName}`;
  fs.rename(from, to, (err) => {
    if (err) {
      if (err.code === "ENOENT") return customError(res, {}, 404, "Folder not found");
      return customError(res, {}, 500, err.message || "Error renaming folder");
    }
    return success(res, { message: "Folder renamed", from: oldName, to: newName });
  });
};

export const deleteFolder = (req, res) => {
  const name = req.params?.name;
  if (!name) return customError(res, {}, 400, "Invalid folder name");
  const target = `${currentDir}/${name}`;
  fs.rmdir(target, { recursive: true }, (err) => {
    if (err) {
      if (err.code === "ENOENT") return customError(res, {}, 404, "Folder not found");
      return customError(res, {}, 500, err.message || "Error deleting folder");
    }
    return success(res, { message: "Folder deleted", folder: name });
  });
};
