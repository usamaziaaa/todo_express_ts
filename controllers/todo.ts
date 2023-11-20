import { Response } from "express";
import { HttpStatus } from "../constants";
import Todo from "../services/todo";
import { IGetUserAuthInfoRequest } from "../middlewares/types";

export const addTodo = (req: IGetUserAuthInfoRequest, res: Response) => {
  const username = req.username;
  const { title, completed } = req.body;
  try {
    const result = Todo.add(username, title, completed);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

export const fetchTodos = (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const result = Todo.fetch(req.username);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

export const deleteTodo = (req: IGetUserAuthInfoRequest, res: Response) => {
  const username = req.username;
  const todoId = req.params.id;
  try {
    const result = Todo.delete(username, todoId);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

export const updateTodo = (req: IGetUserAuthInfoRequest, res: Response) => {
  const username = req.username;
  const todoId = req.params.id;
  const { title, completed } = req.body;
  try {
    const result = Todo.update(username, todoId, title, completed);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};
