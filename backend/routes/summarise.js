import express from "express";
import { summariseText } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const data = await summariseText(text);
    const summaryText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ summary: summaryText });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

export default router;