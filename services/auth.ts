import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserCreditienals } from "./types";

class Auth {
  static generateAccessToken(user: UserCreditienals) {
    console.log("generateAccessToken-->", user);
    return jwt.sign(user, config.JWT.accessTokenSecret, {
      expiresIn: config.JWT.accessTokenExpireTime,
    });
  }

  static generateRefreshToken(user: UserCreditienals) {
    return jwt.sign(user, config.JWT.refreshTokenSecret, {
      expiresIn: config.JWT.refreshTokenExpireTime,
    });
  }

  static async verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.JWT.refreshTokenSecret);
      const { username, password } = decoded;
      const accessToken = this.generateAccessToken({ username, password });
      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error("Invalid refresh token");
    }
  }
}

export default Auth;
