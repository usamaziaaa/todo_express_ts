"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const todo_1 = require("../controllers/todo");
const router = express_1.default.Router();
// Middleware for authorization
router.use(verifyToken_1.verifyToken);
// Routes
router.get("/", todo_1.fetchTodos);
router.delete("/:id", todo_1.deleteTodo);
router.put("/:id", todo_1.updateTodo);
router.post("/add", todo_1.addTodo);
exports.default = router;
