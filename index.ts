import express, { Application } from "express";
import { config } from "./config/index";
import router from './routes'

const app: Application = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.use("/", router);

// Start the Express server
const PORT = config.Port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
