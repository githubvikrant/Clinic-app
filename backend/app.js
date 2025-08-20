import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// ✅ CORS setup for local frontend (Vite runs on port 5173 by default)
app.use(cors({
  origin: ["https://clinic-app-frontend-7avw.onrender.com", "https://clinic-app-dashboard.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Allow preflight requests
app.options("*", cors());

// Default route to confirm server is running
app.get("/", (req, res) => res.send("Server running..."));

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Ping route for testing
app.get("/api/v1/ping", (req, res) => {
  res.status(200).json({ message: "Pong" });
});

// Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Database connection
dbConnection();

// Error handler middleware
app.use(errorMiddleware);

export default app;
