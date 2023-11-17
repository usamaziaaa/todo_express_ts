import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { HttpStatus } from "../constants";

export interface IGetUserAuthInfoRequest extends Request {
  username: string;
}

export function verifyToken(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.accessTokenSecret);
    req.username = decoded.username;

    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: "Token is invalid" });
  }
}
