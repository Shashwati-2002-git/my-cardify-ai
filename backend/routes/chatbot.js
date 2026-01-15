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
        - When asked about your identity, respond that you are Cardify AI's chatbot.
        - When asked where to access saved notes and cards, respond with "Click on the profile icon at the top right corner and select 'My Notes' from the menu.".

        CARDIFY AI INFORMATION:
          - Cardify AI is an AI-powered website that summarizes text, documents, and website links into short, easy-to-understand content.
          - It generates flashcards from summaries to improve memory retention, especially helpful for people with ADHD.
          - Users can take AI-generated quizzes based on their summaries and cards.
          - The platform uses Gemini AI for summarization and quiz generation.
          - Supported inputs: text, document upload, and links.
          - Users can sign up, log in, and reset passwords.
          - Pages: Home, Login, Signup, Summarise, Cardify, Quiz.
          - No medical, legal, or financial advice is provided.

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