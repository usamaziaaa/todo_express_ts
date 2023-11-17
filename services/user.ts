import bcrypt from "bcrypt";
import { loadFile, saveFile } from "../helpers/helper";
import { config } from "../config/index";
import Auth from "./auth";
import { UserCreditienals } from "./types";

class User {
  static async signup(user: UserCreditienals) {
    const { username, password } = user;
    let users = loadFile(config.Users.filePath);
    if (users[username]) {
      throw new Error("Username already exists");
    }
    try {
      const hash = await bcrypt.hash(password, 10);
      users[username] = { username, password: hash };
      saveFile(config.Users.filePath, users);
    } catch (error) {
      console.error(error);
      throw new Error("Error hashing password");
    }
  }

  static async login(user: UserCreditienals) {
    const users = loadFile(config.Users.filePath);
    const { username, password } = user;

    if (!users[username]) {
      throw new Error("User not found");
    }

    try {
      const isPasswordValid = await bcrypt.compare(
        password,
        users[username].password
      );

      if (isPasswordValid) {
        console.log("isPasswordValid-->", user);
        const accessToken = Auth.generateAccessToken(user);
        const refreshToken = Auth.generateRefreshToken(user);

        return { user: users[username], accessToken, refreshToken };
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      throw new Error("Login failed");
    }
  }
}

export default User;
