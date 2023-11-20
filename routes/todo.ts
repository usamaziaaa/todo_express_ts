import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo";

const router = express.Router();

// Middleware for authorization
router.use(verifyToken);

// Routes
router.get("/", fetchTodos);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);
router.post("/add", addTodo);

export default router;
