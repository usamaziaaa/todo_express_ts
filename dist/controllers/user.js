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
exports.verifyRefreshToken = exports.userLogin = exports.userSignup = void 0;
const constants_1 = require("../constants");
const auth_1 = __importDefault(require("../services/auth"));
const user_1 = __importDefault(require("../services/user"));
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield user_1.default.signup({ username, password });
        res
            .status(constants_1.HttpStatus.CREATED)
            .json({ message: "User registered successfully" });
    }
    catch (error) {
        if (error.message === "Username already exists") {
            res
                .status(constants_1.HttpStatus.CONFLICT)
                .json({ error: "Username already exists" });
        }
        else {
            console.error(error);
            res
                .status(constants_1.HttpStatus.SERVER_ERROR)
                .json({ error: "Error hashing password" });
        }
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.login(req.body);
        res
            .status(constants_1.HttpStatus.CREATED)
            .json(Object.assign({ message: "Login successful" }, result));
    }
    catch (error) {
        if (error.message === "User not found") {
            res.status(constants_1.HttpStatus.NOT_FOUND).json({ error: "User not found" });
        }
        else {
            res.status(constants_1.HttpStatus.SERVER_ERROR).json({ error: error.message });
        }
    }
});
exports.userLogin = userLogin;
const verifyRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res
            .status(constants_1.HttpStatus.UNAUTHORIZED)
            .json({ message: "Refresh token is required" });
    }
    try {
        const token = yield auth_1.default.verifyRefreshToken(refreshToken);
        res.status(constants_1.HttpStatus.CREATED).json(token);
    }
    catch (error) {
        res.status(constants_1.HttpStatus.UNAUTHORIZED).json({ error: error.message });
    }
});
exports.verifyRefreshToken = verifyRefreshToken;
