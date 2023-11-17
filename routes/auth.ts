import express from "express";
import { userSignup, userLogin, verifyRefreshToken } from "../controllers/user";

const router = express.Router();

// Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post('/refresh-token', verifyRefreshToken);

export default router;
