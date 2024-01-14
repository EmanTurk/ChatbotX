import express from "express";
import dotenv from "dotenv";
const server = express();

// import { errorHandler } from "./middleware/errorHandling.js";
import connectDB from "./config/db.js";

dotenv.config();

server.use(express.json());

// server.use("/api/v1/books", booksRouter);
// server.use("/api/v1/users", usersRouter);

// server.use(errorHandler);

const PORT = process.env.PORT || 6000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server online at port ${PORT}`);
  });
});
