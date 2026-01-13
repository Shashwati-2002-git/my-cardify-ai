import express from "express";

const router = express.Router();

const SYSTEM_PROMPT = `
You are the Cardify AI assistant.

You must answer questions ONLY using the information below.
If the answer is not present, say:
"I can only answer questions related to Cardify AI."

ABOUT CARDIFY AI:
- Cardify AI helps users summarize text, documents, and links.
- Users can generate flashcards from summaries.
- Users can take quizzes generated from summaries.
- It uses Gemini AI for summaries and quizzes.
- It supports text input, document upload, and link summarization.
- Users can sign up, log in, and reset passwords.
- The website has pages: Home, Login, Signup, Summarise, Cardify, Quiz.
- It does not provide medical, legal, or financial advice.
`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_PROMPT + "\n\nUser question: " + message }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I can only answer questions related to Cardify AI.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot failed" });
  }
});

export default router;