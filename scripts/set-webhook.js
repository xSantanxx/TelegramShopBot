import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const publicUrl = process.argv[2];

if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN in .env");
  process.exit(1);
}

if (!publicUrl) {
  console.error("Usage: npm run set-webhook -- https://YOUR_PUBLIC_URL");
  process.exit(1);
}

const url = `${publicUrl.replace(/\/$/, "")}/telegram/webhook`;
const body = { url };
if (secret) body.secret_token = secret;

const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body)
});

const result = await response.json();
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
