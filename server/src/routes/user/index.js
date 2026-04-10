import express from "express";
import { login, me, refreshToken, register } from "../../controllers/user/index.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { validateRegister, validateLogin } from "../../middleware/validators/user.validator.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/refresh-token", refreshToken);
router.get("/me", isAuthenticated, me);


export default router;