import express from "express";
import dotenv from "dotenv";

const server = express();

import { errorHandler } from "./middleware/errorHandler.js";
import activityRoutes from "./routes/activityRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

server.use(express.json());

server.use("/api/v1/activities", activityRoutes);
// server.use("/api/v1/users", usersRouter);

server.use(errorHandler);

const PORT = process.env.PORT || 6000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server online at port ${PORT}`);
  });
});
