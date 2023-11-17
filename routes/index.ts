import express from "express";
import authRoutes from "./auth";
import todoRoutes from "./todo";

const router = express.Router();

router.use("/", authRoutes);
router.use("/todos", todoRoutes);

export default router;
