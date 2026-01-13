// backend/routes/linkSummary.js
import express from "express";
import "dotenv/config";
import { scrapeWithScrappey } from "../services/scrappey.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // 1️⃣ Scrape webpage using Scrappey
    const scrapedText = await scrapeWithScrappey(url);

    if (!scrapedText) {
      return res.status(500).json({ error: "Failed to scrape content" });
    }

    // 2️⃣ Summarise using Gemini
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarise the following content into clear bullet points. Do not use bold text.\n\n${scrapedText}`
                }
              ]
            }
          ]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    const summaryText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summaryText) {
      return res.status(500).json({ error: "Gemini failed to summarise" });
    }

    // 3️⃣ Convert summary into bullet list
    const bullets = summaryText
      .split("\n")
      .map(line => line.replace(/^[-•*]/, "").trim())
      .filter(Boolean);

    return res.json({ summary: bullets });

  } catch (err) {
    console.error("🔥 Link summary error:", err);
    return res.status(500).json({ error: "Failed to summarise link" });
  }
});

export default router;