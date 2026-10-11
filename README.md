# Clothing Price Tracker Bot

The first vertical slice is deliberately small: receive an exact-product request from Telegram, query catalog providers, rank offers by price, and reply with links. It currently uses a local mock provider so the conversation and search flow are runnable before any retailer feed is approved.

## Run it (local dry run)

1. Copy `.env.example` to `.env`. Leave the Telegram fields empty for a local dry run.
2. Run `npm install`, then `npm run dev`.
3. Check `GET http://localhost:3000/health` → `{ "ok": true }`.

## Connect to Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the token.
2. Put values in `.env`:
   - `TELEGRAM_BOT_TOKEN=` your BotFather token
   - `TELEGRAM_WEBHOOK_SECRET=` a random string (`openssl rand -hex 16`)
3. Start the server: `npm run dev` (default port 3000).
4. Expose HTTPS with a tunnel, e.g. `ngrok http 3000`, and copy the `https://...` URL.
5. Register the webhook (uses `.env` token/secret):

```bash
npm run set-webhook -- https://YOUR_NGROK_URL
```

6. Message the bot in Telegram: `/find Nike Air Force 1 size 10`.
7. Confirm the bot replies with mock Nike listings and the server logged the webhook request.

Webhook endpoint: `POST /telegram/webhook` (Telegram sends header `x-telegram-bot-api-secret-token` when a secret is configured).

## Product-data decision

Retailer websites are not treated as data APIs. The next provider must be connected only after access is granted through a retailer, affiliate network, licensed product-data provider, or another source whose terms cover this use.

Initial research outcome:

| Retailer | Current status | Next action |
| --- | --- | --- |
| Nike | Its official affiliate program says accepted publishers receive an automated product feed through CJ. | Apply to CJ/Nike; verify that feed fields and terms permit personal price tracking. |
| SSENSE | Its US terms prohibit scraping and similar automated extraction. | Ask its affiliate/partnership channel whether product-feed access is available for this use. |
| FARFETCH | Its terms prohibit systematic extraction/reuse of product listings without written consent. | Seek written permission or an approved partner feed. |
| Polo Ralph Lauren | No approved product-search feed has been verified in this research. | Ask its affiliate/partnership contact; do not integrate directly meanwhile. |

## Delivery sequence

1. Replace the mock catalog with the first approved feed and normalize its products into the provider contract.
2. Add MongoDB collections for users, watches, and price observations; implement `/save` and `/watch`.
3. Run a scheduled price check, storing each observation and sending a Telegram alert only when a price drops.
4. Add natural-language discovery only after exact matching and tracking are trustworthy. AI converts intent into structured filters; the catalog source remains the authority for price and availability.

## Why this shape

The `catalog` boundary isolates each data supplier. Telegram, storage, alerts, and later AI do not need to know whether a result came from CJ, a licensed API, or another authorized feed. That keeps the first bot simple while avoiding a rewrite when another retailer is added.
