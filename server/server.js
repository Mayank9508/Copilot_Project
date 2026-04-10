import app from "./src/index.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

dotenv.config({ quiet: true });

const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
