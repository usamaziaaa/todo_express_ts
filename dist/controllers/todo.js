"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.fetchTodos = exports.addTodo = void 0;
const constants_1 = require("../constants");
const todo_1 = __importDefault(require("../services/todo"));
const addTodo = (req, res) => {
    const username = req.username;
    const { title, completed } = req.body;
    try {
        const result = todo_1.default.add(username, title, completed);
        res.status(constants_1.HttpStatus.CREATED).json(result);
    }
    catch (error) {
        res.status(constants_1.HttpStatus.SERVER_ERROR).json({ error: error.message });
    }
};
exports.addTodo = addTodo;
const fetchTodos = (req, res) => {
    try {
        const result = todo_1.default.fetch(req.username);
        res.status(constants_1.HttpStatus.CREATED).json(result);
    }
    catch (error) {
        res.status(constants_1.HttpStatus.SERVER_ERROR).json({ error: error.message });
    }
};
exports.fetchTodos = fetchTodos;
const deleteTodo = (req, res) => {
    const username = req.username;
    const todoId = req.params.id;
    try {
        const result = todo_1.default.delete(username, todoId);
        res.status(constants_1.HttpStatus.CREATED).json(result);
    }
    catch (error) {
        res.status(constants_1.HttpStatus.SERVER_ERROR).json({ error: error.message });
    }
};
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => {
    const username = req.username;
    const todoId = req.params.id;
    const { title, completed } = req.body;
    try {
        const result = todo_1.default.update(username, todoId, title, completed);
        res.status(constants_1.HttpStatus.CREATED).json(result);
    }
    catch (error) {
        res.status(constants_1.HttpStatus.SERVER_ERROR).json({ error: error.message });
    }
};
exports.updateTodo = updateTodo;
