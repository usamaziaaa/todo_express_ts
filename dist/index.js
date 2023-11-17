"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./config/index");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware for parsing JSON request bodies
app.use(express_1.default.json());
// Routes
app.use("/", routes_1.default);
// Start the Express server
const PORT = index_1.config.Port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
