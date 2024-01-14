import express from "express";
import {loginUser, registerUser } from "../controllers/authUserController.js";
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login",loginUser );

// router.use(protect);
// private routes


export default router;