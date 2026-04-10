import { Router } from "express";
import {
	listFiles,
	createFile,
	readFile,
	updateFile,
	deleteFile,
} from "../../controllers/files/index.js";

const router = Router();

router.post("/", createFile);
router.get("/", listFiles);
router.get("/:name", readFile);
router.put("/:name", updateFile);
router.delete("/:name", deleteFile);

export default router;