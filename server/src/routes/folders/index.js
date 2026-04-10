import { Router } from "express";
import { listFolders, createFolder, renameFolder, deleteFolder } from "../../controllers/folders/index.js";

const router = Router();

router.post("/", createFolder);
router.get("/", listFolders);
router.put("/:name", renameFolder);
router.delete("/:name", deleteFolder);

export default router;