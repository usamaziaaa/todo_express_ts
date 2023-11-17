"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.loadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const loadFile = (file) => {
    try {
        const data = fs_1.default.readFileSync(file, "utf8");
        return JSON.parse(data);
    }
    catch (error) {
        return {};
    }
};
exports.loadFile = loadFile;
const saveFile = (file, users) => {
    fs_1.default.writeFileSync(file, JSON.stringify(users, null, 2));
};
exports.saveFile = saveFile;
