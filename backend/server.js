// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import API routes
import summariseRoutes from "./routes/summarise.js";
import textSummary from "./routes/textSummary.js";
import linkSummaryRoutes from "./routes/linkSummary.js";
import quizRoutes from "./routes/quiz.js";
import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Logging middleware
app.use((req, res, next) => {
  console.log("📥 Incoming request:", req.method, req.url);
  next();
});

// Serve frontend static assets
app.use("/js", express.static(path.join(__dirname, "../frontend/js")));
app.use("/css", express.static(path.join(__dirname, "../frontend/css")));
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));
app.use("/partials", express.static(path.join(__dirname, "../frontend/partials")));

// API routes
app.use("/api/summarise", summariseRoutes);
app.post("/api/text-summary", textSummary);
app.use("/api/link-summary", linkSummaryRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Serve HTML pages
const pagesPath = path.join(__dirname, "../frontend/pages");

app.get("/", (req, res) => {
  res.sendFile(path.join(pagesPath, "index.html"));
});

app.get("/summarise", (req, res) => {
  res.sendFile(path.join(pagesPath, "summarise.html"));
});

app.get("/cardify", (req, res) => {
  res.sendFile(path.join(pagesPath, "cardify.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(pagesPath, "quiz.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(pagesPath, "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(pagesPath, "signup.html"));
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(pagesPath, "forgot-password.html"));
});

app.get("/text-summary", (req, res) => {
  res.sendFile(path.join(pagesPath, "text-summary.html"));
});

app.get("/link-summary", (req, res) => {
  res.sendFile(path.join(pagesPath, "link-summary.html"));
});

app.get("/save-summary", (req, res) => {
  res.sendFile(path.join(pagesPath, "save-summary.html"));
});

// Catch-all 404 for unknown routes
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});