// backend/routes/quiz.js
import express from "express";
import "dotenv/config";

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ----------------------------
// POST /api/quiz
// ----------------------------
router.post("/", async (req, res) => {
  try {
    const { points } = req.body;

    if (!Array.isArray(points) || points.length === 0) {
      return res
        .status(400)
        .json({ error: "No summary points provided" });
    }

    console.log("📘 Points received for quiz:", points);

    const prompt = `
You are STRICTLY LIMITED to the information provided below.
DO NOT use outside knowledge.
DO NOT assume facts.

Create EXACTLY 10 multiple-choice questions ONLY from these notes.

Rules:
- Each question must come DIRECTLY from the notes
- Do NOT invent facts
- 4 options only (A, B, C, D)
- One correct answer

Return ONLY valid JSON in this format:

[
  {
    "question": "",
    "options": {
      "A": "",
      "B": "",
      "C": "",
      "D": ""
    },
    "correctAnswer": "A"
  }
]

NOTES:
${points.map(p => `- ${p}`).join("\n")}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    let rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res
        .status(500)
        .json({ error: "Quiz generation failed" });
    }

    // Clean Gemini markdown
    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const quiz = JSON.parse(cleanedText);

    res.json({ quiz });

  } catch (err) {
    console.error("❌ Quiz generation error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

export default router;