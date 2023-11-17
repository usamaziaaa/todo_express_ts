"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const config_1 = require("../config");
const helper_1 = require("../helpers/helper");
class Todo {
    static fetch(username) {
        var _a;
        try {
            let todos = (0, helper_1.loadFile)(config_1.config.Todos.filePath);
            let userTodos = ((_a = todos[username]) === null || _a === void 0 ? void 0 : _a.todos) || [];
            return { username, userTodos };
        }
        catch (error) {
            console.error("Error fetching todos:", error);
            throw new Error("Error fetching todos");
        }
    }
    static add(username, title, completed) {
        try {
            let todos = (0, helper_1.loadFile)(config_1.config.Todos.filePath);
            const todo = { title, completed, id: (0, uuid_1.v4)() };
            if (todos[username]) {
                todos[username].todos = [...todos[username].todos, todo];
            }
            else {
                todos[username] = {
                    todos: [todo],
                };
            }
            (0, helper_1.saveFile)(config_1.config.Todos.filePath, todos);
            return { message: "New Todo Added", todo };
        }
        catch (error) {
            console.error("Error Adding todo:", error);
            throw new Error("Error Adding todo");
        }
    }
    static delete(username, id) {
        try {
            let todos = (0, helper_1.loadFile)(config_1.config.Todos.filePath);
            let userTodos = todos[username].todos;
            let todoToDelete = userTodos.find((todo) => todo.id === id);
            if (!todoToDelete) {
                throw new Error("Todo not found");
            }
            userTodos = userTodos.filter((todo) => todo.id !== id);
            todos[username].todos = userTodos;
            (0, helper_1.saveFile)(config_1.config.Todos.filePath, todos);
            return { message: "Todo Deleted Successfully" };
        }
        catch (error) {
            console.error("Error Deleted Todo:", error);
            throw new Error(error.message);
        }
    }
    static update(username, id, title, completed) {
        try {
            let todos = (0, helper_1.loadFile)(config_1.config.Todos.filePath);
            let userTodos = todos[username].todos;
            let todoToUpdate = userTodos.find((todo) => todo.id === id);
            if (!todoToUpdate) {
                throw new Error("Todo not found");
            }
            if (title) {
                todoToUpdate.title = title;
            }
            if (completed !== undefined) {
                todoToUpdate.completed = completed;
            }
            todos[username].todos = userTodos;
            (0, helper_1.saveFile)(config_1.config.Todos.filePath, todos);
            return { message: "Todo Updated Successfully" };
        }
        catch (error) {
            console.error("Error Updating Todo:", error);
            throw new Error(error.message);
        }
    }
}
exports.default = Todo;
