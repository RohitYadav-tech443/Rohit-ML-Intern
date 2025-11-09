// src/app.js
import express from "express";
import documentRoutes from "./routes/documentRoutes.js"; // ✅ this path is CRITICAL
import ragRoutes from "./routes/ragRoutes.js"; // ✅ this path is CRITICAL
const app = express();

// Middleware
app.use(express.json());
app.use("/api/chat", ragRoutes);
app.use(express.urlencoded({ extended: true }));

// ✅ Register routes
app.use("/api/documents", documentRoutes);
app.use("/api/rag", ragRoutes);

// Optional check
app.get("/", (req, res) => {
  res.send("✅ Server is running fine!");
});

console.log("🟢 app.js is running and trying to register routes...");

export default app;
