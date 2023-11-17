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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
class Auth {
    static generateAccessToken(user) {
        console.log("generateAccessToken-->", user);
        return jsonwebtoken_1.default.sign(user, config_1.config.JWT.accessTokenSecret, {
            expiresIn: config_1.config.JWT.accessTokenExpireTime,
        });
    }
    static generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign(user, config_1.config.JWT.refreshTokenSecret, {
            expiresIn: config_1.config.JWT.refreshTokenExpireTime,
        });
    }
    static verifyRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT.refreshTokenSecret);
                const { username, password } = decoded;
                const accessToken = this.generateAccessToken({ username, password });
                return { accessToken };
            }
            catch (error) {
                console.error(error);
                throw new Error("Invalid refresh token");
            }
        });
    }
}
exports.default = Auth;
