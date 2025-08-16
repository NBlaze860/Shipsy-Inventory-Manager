// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables first, before any other imports
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cookieParser from "cookie-parser";
import { connectdb } from "./src/config/database.js";
import ProductRoutes from "./src/routes/products.js";
import AuthRoutes from "./src/routes/auth.js";
import AnalyticsRoutes from "./src/routes/analytics.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

// CORS middleware must come before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", ProductRoutes);
app.use("/api/auth/", AuthRoutes);
app.use("/api/analytics", AnalyticsRoutes);

// Basic GET route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
  connectdb();
});
