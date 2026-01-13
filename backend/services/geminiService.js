import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function summariseText(text) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  "Summarise the following text into short, easy to understand and friendly notes for students with ADHD. Do not return anything in bold text. Do not start with Hey everyone!:\n\n" +
                  text
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    throw err;
  }
}