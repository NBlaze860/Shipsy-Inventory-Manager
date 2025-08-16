#!/usr/bin/env node

/**
 * Production startup script for Render deployment
 * Ensures correct working directory and starts the backend server
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change to backend directory and start the server
const backendPath = path.join(__dirname, "backend");
process.chdir(backendPath);

console.log("Starting server from:", process.cwd());

// Start the backend server
const server = spawn("node", ["server.js"], {
  stdio: "inherit",
  cwd: backendPath,
});

server.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

server.on("close", (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});
