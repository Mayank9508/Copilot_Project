import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  badRequest,
  customError,
  success,
} from "../../utils/response.utils.js";
import { sendAccessToken, sendTokens } from "../../utils/auth.util.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name: name, // mapping
      email,
      password,
    });

    sendTokens(user, 201, res);
  } catch (err) {
    console.log("Error during registration:", err);
    return badRequest(res, err, "Invalid input");
  }
};

export const login = async (req, res) => {
  console.log("Login request received with body:", req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return badRequest(res, {}, "Please provide email and password");

  const user = await User.findOne({ email });
  if (!user) {
    return customError(res, {}, 401, "Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return customError(res, {}, 401, "Invalid credentials");
  }

  sendTokens(user, 200, res);
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return customError(res, {}, 401, "Token is required");
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    sendAccessToken(res, payload);
  } catch (err) {
    return customError(res, {}, 403, "Invalid refresh token");
  }
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  return success(res, { user });
};
