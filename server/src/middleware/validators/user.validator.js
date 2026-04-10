import { badRequest } from "../../utils/response.utils.js";

export function validateRegister(req, res, next) {
  console.log("Validating registration input:", req.body);
  const { name, email, password } = req.body || {};
  const errors = [];
  if (!name || String(name).trim().length < 3)
    errors.push("name must be at least 3 characters");
  if (!email || !String(email).includes("@")) errors.push("invalid email");
  if (!password || String(password).length < 6)
    errors.push("password must be at least 6 characters");
  if (errors.length) return badRequest(res, { errors }, "Invalid input");
  next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body || {};
  const errors = [];
  if (!email || !String(email).includes("@")) errors.push("invalid email");
  if (!password) errors.push("password is required");
  if (errors.length) return badRequest(res, { errors }, "Invalid input");
  next();
}
