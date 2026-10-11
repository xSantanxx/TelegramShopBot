import "dotenv/config";
import express from "express";
import { searchCatalog } from "./catalog/search.js";
import { formatSearchResults } from "./bot/format.js";
import { parseSearchRequest } from "./bot/parse-request.js";
import { replyToFindCommand } from "./bot/replies.js";

const app = express();
app.use(express.json());

app.get("/health", (_request, response) => response.json({ ok: true }));

app.post("/telegram/webhook", async (request, response) => {
  if (process.env.TELEGRAM_WEBHOOK_SECRET &&
      request.get("x-telegram-bot-api-secret-token") !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return response.sendStatus(401);
  }

  const message = request.body.message;
  if (!message?.text) return response.sendStatus(200);

  // console.log(message.text);

  let text = "";

  const input = message.text.toLowerCase();

  if(input.startsWith("/start")) {
    text = "Hello 😁, I'm your personal assistant for finding clothes. Please use /find to search for clothes.";
  } else if(!input.startsWith("/find")) {
    text = replyToFindCommand(input);
  } else {
    const { query, size } = parseSearchRequest(message.text);
    const results = await searchCatalog({ query, size });
    text = formatSearchResults(results);
  }

  // Kept behind configuration so local tests never send messages.
  if (process.env.TELEGRAM_BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: message.chat.id, text, disable_web_page_preview: true })
    });
  }

  return response.sendStatus(200);
});

app.listen(process.env.PORT ?? 3000, () => console.log("Bot server listening"));
