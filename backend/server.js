// server.js
import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./src/config/database.js";
import ProductRoutes from "./src/routes/products.js";
import AuthRoutes from "./src/routes/auth.js";
import AnalyticsRoutes from "./src/routes/analytics.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;
// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/auth/", AuthRoutes);
app.use("/api/analytics", AnalyticsRoutes);

// Basic GET route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
  connectdb();
});
