import { v4 as uuidv4 } from "uuid";
import { config } from "../config";
import { loadFile, saveFile } from "../helpers/helper";

class Todo {
  static fetch(username: string) {
    try {
      let todos = loadFile(config.Todos.filePath);
      let userTodos = todos[username]?.todos || [];

      return { username, userTodos };
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Error fetching todos");
    }
  }
  static add(username: string, title: string, completed: boolean) {
    try {
      let todos = loadFile(config.Todos.filePath);
      const todo = { title, completed, id: uuidv4() };

      if (todos[username]) {
        todos[username].todos = [...todos[username].todos, todo];
      } else {
        todos[username] = {
          todos: [todo],
        };
      }

      saveFile(config.Todos.filePath, todos);
      return { message: "New Todo Added", todo };
    } catch (error) {
      console.error("Error Adding todo:", error);
      throw new Error("Error Adding todo");
    }
  }
  static delete(username: string, id: string) {
    try {
      let todos = loadFile(config.Todos.filePath);

      let userTodos = todos[username].todos;
      let todoToDelete = userTodos.find((todo: any) => todo.id === id);

      if (!todoToDelete) {
        throw new Error("Todo not found");
      }

      userTodos = userTodos.filter((todo: any) => todo.id !== id);
      todos[username].todos = userTodos;

      saveFile(config.Todos.filePath, todos);
      return { message: "Todo Deleted Successfully" };
    } catch (error) {
      console.error("Error Deleted Todo:", error);
      throw new Error(error.message);
    }
  }
  static update(
    username: string,
    id: string,
    title: string,
    completed: boolean
  ) {
    try {
      let todos = loadFile(config.Todos.filePath);

      let userTodos = todos[username].todos;
      let todoToUpdate = userTodos.find((todo: any) => todo.id === id);

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

      saveFile(config.Todos.filePath, todos);
      return { message: "Todo Updated Successfully" };
    } catch (error) {
      console.error("Error Updating Todo:", error);
      throw new Error(error.message);
    }
  }
}

export default Todo;
