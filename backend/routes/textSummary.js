export default async function textSummary(req, res) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Summarise the following text into clear, short bullet points.
Do not add headings or explanations.

TEXT:
${text}
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarise text" });
  }
}