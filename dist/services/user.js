"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const helper_1 = require("../helpers/helper");
const index_1 = require("../config/index");
const auth_1 = __importDefault(require("./auth"));
class User {
    static signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = user;
            let users = (0, helper_1.loadFile)(index_1.config.Users.filePath);
            if (users[username]) {
                throw new Error("Username already exists");
            }
            try {
                const hash = yield bcrypt_1.default.hash(password, 10);
                users[username] = { username, password: hash };
                (0, helper_1.saveFile)(index_1.config.Users.filePath, users);
            }
            catch (error) {
                console.error(error);
                throw new Error("Error hashing password");
            }
        });
    }
    static login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (0, helper_1.loadFile)(index_1.config.Users.filePath);
            const { username, password } = user;
            if (!users[username]) {
                throw new Error("User not found");
            }
            try {
                const isPasswordValid = yield bcrypt_1.default.compare(password, users[username].password);
                if (isPasswordValid) {
                    console.log("isPasswordValid-->", user);
                    const accessToken = auth_1.default.generateAccessToken(user);
                    const refreshToken = auth_1.default.generateRefreshToken(user);
                    return { user: users[username], accessToken, refreshToken };
                }
                else {
                    throw new Error("Authentication failed");
                }
            }
            catch (error) {
                console.error("Error occurred:", error);
                throw new Error("Login failed");
            }
        });
    }
}
exports.default = User;
