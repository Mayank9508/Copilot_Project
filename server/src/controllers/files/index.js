import path from "path";
import fs from "fs";
import { customError, success } from "../../utils/response.utils.js";

const currentDir = path.resolve() + "/assets"; 

export const createFile = async (req, res) => {
  const { fileName, content } = req.body;
  console.log("creating file at", `${currentDir}/${fileName}`);

  fs.writeFile(`${currentDir}/${fileName}`, content ?? "", "utf8", (err) => {
    if (err) {
      return customError(res, {}, 500, err.message || "Error creating file");
    }
    return success(res, { message: "File created successfully" });
  });

};

export const listFiles = (req, res) => {
  fs.readdir(currentDir, { withFileTypes: true }, (err, entries) => {
    if (err) return customError(res, {}, 500, err.message || "Error listing files");
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);
    return success(res, { files });
  });
};

export const readFile = (req, res) => {
  const name = req.params?.name;
  if (!name) return customError(res, {}, 400, "Invalid file name");
  const target = `${currentDir}/${name}`;
  fs.readFile(target, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") return customError(res, {}, 404, "File not found");
      return customError(res, {}, 500, err.message || "Error reading file");
    }
    return success(res, { file: name, content: data });
  });
};

export const updateFile = (req, res) => {
  const name = req.params?.name;
  const content = req.body?.content ?? "";
  if (!name) return customError(res, {}, 400, "Invalid file name");
  const target = `${currentDir}/${name}`;
  fs.writeFile(target, content, "utf8", (err) => {
    if (err) return customError(res, {}, 500, err.message || "Error updating file");
    return success(res, { message: "File updated", file: name });
  });
};

export const deleteFile = (req, res) => {
  const name = req.params?.name;
  if (!name) return customError(res, {}, 400, "Invalid file name");
  const target = `${currentDir}/${name}`;
  fs.unlink(target, (err) => {
    if (err) {
      if (err.code === "ENOENT") return customError(res, {}, 404, "File not found");
      return customError(res, {}, 500, err.message || "Error deleting file");
    }
    return success(res, { message: "File deleted", file: name });
  });
};
