import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
        You are Cardify AI's chatbot.

        RULES (follow strictly):
        - Answer ONLY if the question can be answered using the information below.
        - If the answer is present, answer clearly and directly.

        CARDIFY AI INFORMATION:
        - Cardify AI helps users summarize text, documents, and links.
        - Users can generate flashcards from summaries.
        - Users can take quizzes generated from summaries.
        - It uses Gemini AI for summaries and quizzes.
        - It supports text input, document upload, and link summarization.
        - Users can sign up, log in, and reset passwords.
        - Pages: Home, Login, Signup, Summarise, Cardify, Quiz.
        - No medical, legal, or financial advice.

        User question:
        ${message}
                  `
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 150
          }
        })
      }
    );

    const data = await response.json();
    let reply = "I can only answer questions related to Cardify AI.";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content?.parts?.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }


    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot failed" });
  }
});

export default router;