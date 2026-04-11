import express from "express";
import logger from "morgan";
import errorMiddleware from "./utils/error-handler.js";
import { notFound } from "./utils/response.utils.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(logger("tiny"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  })
);
app.set("trust proxy", true);

// handling Routes
app.use("/api/v1", Router);

//handling 404 not found
app.use((req, res) => {
  return notFound(res, {
    ip: req.ip,
    method: req.method,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl} `,
  });
});

// handling errors
app.use(errorMiddleware);

export default app;