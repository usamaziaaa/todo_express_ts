"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    Port: process.env.PORT_NUMBER,
    Users: {
        filePath: process.env.USERS_FILE_PATH,
    },
    JWT: {
        key: process.env.SECRET_KEY,
        accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    },
    Todos: {
        filePath: process.env.TODOS_FILE_PATH,
    }
};
