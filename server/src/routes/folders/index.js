import { Router } from "express";
import { listFolders, createFolder, renameFolder, deleteFolder } from "../../controllers/folders/index.js";

const router = Router();

router.post("/create", createFolder);
router.get("/listFolders", listFolders);
router.put("/:name", renameFolder);
router.delete("/:name", deleteFolder);

export default router;