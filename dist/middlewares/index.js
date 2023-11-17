"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const constants_1 = require("../constants");
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(constants_1.HttpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT.accessTokenSecret);
        req.username = decoded.username;
        next();
    }
    catch (error) {
        return res
            .status(constants_1.HttpStatus.UNAUTHORIZED)
            .json({ error: "Token is invalid" });
    }
}
exports.verifyToken = verifyToken;
