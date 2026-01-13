// backend/services/scrappey.js
import "dotenv/config";

export async function scrapeWithScrappey(url) {
  if (!url) {
    throw new Error("No URL provided");
  }

  const SCRAPPEY_API_KEY = process.env.SCRAPPEY_API_KEY;
  if (!SCRAPPEY_API_KEY) {
    throw new Error("SCRAPPEY_API_KEY missing");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 80000);

  let response;
  try {
    response = await fetch(
      `https://publisher.scrappey.com/api/v1?key=${SCRAPPEY_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cmd: "request.get",
          url,
          requestType: "request"
        }),
        signal: controller.signal
      }
    );
  } catch (err) {
    clearTimeout(timeout);
    throw new Error(`Scrappey request failed: ${err.message}`);
  }

  clearTimeout(timeout);

  const data = await response.json();
  const scrapedText = data?.solution?.response;

  if (!scrapedText) {
    throw new Error("Scrappey returned no content");
  }

  return scrapedText;
}