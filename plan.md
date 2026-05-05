# Charcole Docs — Payments Module Documentation Plan
## v2.3.0 | `content/2. guides/6. payments/`

---

## Overview

This plan covers every documentation page needed to fully document the payments feature shipped in Charcole v2.3.0. It is written for an AI agent or engineer who will write the actual markdown files. Read this plan completely before writing a single page.

The payments feature has two audiences that need separate documentation paths:

1. **Charcole CLI users** — developers who scaffold a new project and select payments during setup
2. **Non-Charcole / standalone users** — developers who install `@charcoles/payments` into an existing Express app

Both paths must be documented. The swagger section already does this pattern well (`5. swagger/8. non-charcole-users.md`) — mirror that approach.

---

## Directory Structure to Create

```
content/2. guides/6. payments/
├── .navigation.yml
├── 1. introduction.md
├── 2. setup.md
├── 3. providers.md
├── 4. endpoints.md
├── 5. webhooks.md
├── 6. environment-variables.md
├── 7. non-charcole-users.md
└── 8. payments-examples.md
```

### File numbering rationale
The existing swagger section starts at `6.` because guides start at `3.` (repositories). Payments is the next guide section, so it gets prefix `6.` for the folder. Inside the folder, pages start at `1.` (fresh section, no inherited numbering).

### Update these existing files too
```
content/2. guides/.navigation.yml   → add payments section entry
nuxt.config.ts                      → add payments page URLs to sitemap
```

---

## Writing Rules (Match Existing Style Exactly)

Before writing any page, understand these rules from the existing docs:

**Frontmatter** — every page needs:
```yaml
---
title: 'Page Title'
description: 'One sentence. What this page explains.'
navigation:
  icon: i-heroicons-[icon-name]
seo:
  title: 'Page Title — Charcole'
  description: 'Same or slightly expanded description for SEO.'
---
```

**Tone** — practical, direct, no filler. Start with why the feature exists, then show how to use it. Never start a page with "In this guide we will learn how to...". Just start with the reality.

**Code blocks** — always specify the language. Use `bash`, `js`, `ts`, `json`, `env` as appropriate.

**Structure per page**:
1. Short paragraph — what problem this page solves
2. Steps or explanation — with code
3. Quick test or verification — so the user knows it worked
4. (If applicable) — notes, warnings, or next steps

**Callout components** (Docus):
- `::callout{type="warning"}` — for critical warnings (e.g., raw body middleware ordering)
- `::callout{type="info"}` — for tips and notes
- `::callout{type="danger"}` — for security-critical items

**Never document internal implementation details** — the docs are for users, not contributors. Don't explain adapter pattern internals. Do explain what endpoints exist and how to configure them.

---

## Page-by-Page Specification

---

### Page 1: `1. introduction.md`
**Title**: Payments
**Navigation icon**: `i-heroicons-credit-card`
**Purpose**: Orient the reader. What the payments module is, what you get, which providers are supported, and how to choose between them.

**Must cover**:
- What the payments module adds to a Charcole project (4 endpoints, auto-configured, env-driven)
- The two providers: Stripe and LemonSqueezy — present both as first-class, equal options
- **The Pakistan note**: Stripe does not support PKR payouts to Pakistani bank accounts. LemonSqueezy is the correct choice for Pakistani developers and similar regions. This must be stated clearly and without apology — it is a primary use case, not a footnote.
- A simple comparison table: Stripe vs LemonSqueezy, what each is best for
- How to enable it — one line: select "Yes" to payments during CLI setup, or install `@charcoles/payments` for existing projects
- Link forward to Setup page

**Tone note**: The Pakistan/LemonSqueezy context is a feature, not a workaround. Present it as "we built this because it matters" — not "unfortunately Stripe doesn't work here".

**Comparison table shape**:
| | Stripe | LemonSqueezy |
|---|---|---|
| Best for | Global SaaS | Global + Pakistan/regional |
| Payout model | Direct | Merchant of record |
| Payment flow | Frontend JS (client_secret) | Hosted checkout URL |
| PKR payout support | ❌ | ✅ |

---

### Page 2: `2. setup.md`
**Title**: Setup
**Navigation icon**: `i-heroicons-wrench-screwdriver`
**Purpose**: Get a developer from zero to running payment endpoints in under 5 minutes. Two paths: new project (CLI), existing project (manual).

**Must cover**:

**Path A — New project (CLI)**:
1. Run `npx create-charcole@latest` (or whatever the CLI command is)
2. When prompted "Include payments module?" → select Yes
3. When prompted for provider → choose Stripe or LemonSqueezy
4. Add credentials to `.env` (link to environment-variables page)
5. Run the server — endpoints are live at `/payments/*`

**Path B — Existing Charcole project**:
1. Install: `npm install @charcoles/payments`
2. Add the raw body middleware line in `app.js` BEFORE `express.json()` — this must be a warning callout, not just a code comment. This is the #1 setup mistake.
3. Call `setupPayments(app)` after middleware setup
4. Add env vars
5. Endpoints live at `/payments/*`

**The raw body middleware warning** — must be a `::callout{type="warning"}`:
> The webhook route requires the raw request body before Express parses it. Register `express.raw()` on `/payments/webhook` **before** `app.use(express.json())`. Reversing the order will silently break webhook signature verification.

**Code example for app.js setup (critical, must be in the docs)**:
```js
// MUST come before express.json()
app.use('/payments/webhook', express.raw({ type: 'application/json' }))

app.use(express.json())
// ... rest of middleware

setupPayments(app)
```

**Do not** explain why this works at the code level (Buffer vs parsed object). Just state what to do and why it matters to the user (webhooks won't work if you skip this).

---

### Page 3: `3. providers.md`
**Title**: Providers
**Navigation icon**: `i-heroicons-building-library`
**Purpose**: Deep-dive on configuring each provider. One section per provider. This is the page developers come back to when setting up credentials.

**Must cover**:

**Stripe section**:
- What you need: secret key, webhook secret, (optional) publishable key
- Where to get them: dashboard.stripe.com/apikeys
- Test vs live keys (sk_test_ vs sk_live_)
- The `.env` block for Stripe
- How the payment flow works from the user perspective:
  1. Frontend calls `POST /payments/create-intent`
  2. Gets back `clientSecret`
  3. Frontend passes it to `Stripe.js` → `stripe.confirmPayment()`
  4. Stripe fires `payment_intent.succeeded` webhook to your server
  5. Server fulfills the order
- Brief note: `STRIPE_PUBLISHABLE_KEY` is frontend-only, safe to expose, not used server-side

**LemonSqueezy section**:
- What you need: API key, webhook secret, store ID
- Where to get them (with dashboard paths):
  - API key: app.lemonsqueezy.com/settings/api
  - Store ID: numeric ID in the URL at app.lemonsqueezy.com/stores/[ID]
  - Webhook secret: created when you set up a webhook in the dashboard
- The `.env` block for LemonSqueezy
- **The variantId requirement** — this is critical and unique to LemonSqueezy:
  - LemonSqueezy uses product variants, not raw amounts. You can't say "charge $29.99" — you must have a product in your LS store.
  - For variable-amount payments (custom invoices, tips), create a "Pay What You Want" product in your LemonSqueezy store and use that variant's ID.
  - Pass `variantId` in the `metadata` field of `POST /payments/create-intent`
  - This must be a `::callout{type="info"}` block
- How the payment flow works from the user perspective:
  1. Frontend calls `POST /payments/create-intent` with `metadata.variantId`
  2. Gets back `checkoutUrl`
  3. Redirect user to `checkoutUrl` → they pay on LemonSqueezy's hosted page
  4. LemonSqueezy fires `order_created` webhook to your server
  5. Server fulfills the order

**Provider switching**:
- Changing `PAYMENT_PROVIDER` in `.env` is all that's needed to switch providers
- No code changes required
- The adapter is instantiated once at server startup

---

### Page 4: `4. endpoints.md`
**Title**: API Endpoints
**Navigation icon**: `i-heroicons-arrows-right-left`
**Purpose**: Complete reference for all 4 payment endpoints. Developers bookmark this page. It must be scannable, with request/response examples for both providers.

**Must cover all 4 endpoints**:

#### `POST /payments/create-intent`
- Auth: JWT required (Bearer token)
- Body schema (with field descriptions):
  ```json
  {
    "amount": 2999,
    "currency": "usd",
    "metadata": {
      "orderId": "order_123",
      "variantId": "78901"
    }
  }
  ```
- `amount` note: smallest currency unit — cents for USD, paisas for PKR. `2999` = $29.99.
- `currency` note: ISO 4217, 3 letters, case-insensitive
- `metadata.variantId` note: LemonSqueezy only — required for LS, ignored by Stripe
- Response (Stripe):
  ```json
  {
    "success": true,
    "data": {
      "id": "pi_3abc...",
      "clientSecret": "pi_3abc..._secret_xyz",
      "status": "requires_payment_method",
      "amount": 2999,
      "currency": "usd"
    }
  }
  ```
- Response (LemonSqueezy):
  ```json
  {
    "success": true,
    "data": {
      "id": "abc123",
      "checkoutUrl": "https://store.lemonsqueezy.com/checkout/buy/...",
      "status": "created",
      "amount": 2999,
      "currency": "usd"
    }
  }
  ```
- What to do with the response: Stripe → pass `clientSecret` to Stripe.js. LemonSqueezy → redirect to `checkoutUrl`.

#### `POST /payments/refund`
- Auth: JWT required
- Body:
  ```json
  { "paymentId": "pi_3abc...", "amount": 1000 }
  ```
- `amount` is optional — omit for full refund
- Response:
  ```json
  {
    "success": true,
    "data": {
      "id": "re_456...",
      "status": "succeeded",
      "amount": 1000
    }
  }
  ```

#### `GET /payments/status/:paymentId`
- Auth: JWT required
- No body
- Response with normalized status values:
  ```json
  {
    "success": true,
    "data": {
      "id": "pi_3abc...",
      "status": "paid",
      "amount": 2999,
      "currency": "usd"
    }
  }
  ```
- Status values table — normalized across both providers:

  | Status | Meaning |
  |---|---|
  | `pending` | Payment not yet confirmed |
  | `paid` | Payment successfully charged |
  | `failed` | Payment failed or cancelled |
  | `refunded` | Payment was refunded |

#### `POST /payments/webhook`
- Auth: **None (JWT not used)** — authenticated by provider signature
- This endpoint is called by Stripe/LemonSqueezy, not your frontend
- Stripe sends `Stripe-Signature` header
- LemonSqueezy sends `X-Signature` header
- Always returns `200 { "received": true }` on success
- Error handling callout: never return 4xx from a webhook unless signature verification fails — providers will retry on 4xx and create a retry storm

---

### Page 5: `5. webhooks.md`
**Title**: Webhooks
**Navigation icon**: `i-heroicons-bolt`
**Purpose**: Explain why webhooks matter, how to handle events, how to test them locally, and the deduplication behavior.

**Must cover**:

**Why webhooks are the only reliable confirmation**:
- Users close browser tabs, lose internet, etc.
- The `clientSecret` confirmation flow is optimistic — the server doesn't know if payment succeeded unless the webhook arrives
- Never fulfill an order based on a frontend callback alone

**The raw body requirement** (again, brief callout — this page references the setup page):
- Link back to Setup page for full details, just a reminder here

**Events reference table**:

| Event | Provider | Meaning |
|---|---|---|
| `payment_intent.succeeded` | Stripe | Payment confirmed — fulfill order |
| `payment_intent.payment_failed` | Stripe | Payment failed |
| `charge.refunded` | Stripe | Refund processed |
| `order_created` | LemonSqueezy | Payment confirmed — fulfill order |
| `order_refunded` | LemonSqueezy | Refund processed |
| `subscription_cancelled` | LemonSqueezy | Subscription ended |

**Where to add your fulfillment logic**:
The generated `payments.controller.js` has a `switch` statement with comment placeholders. Show what it looks like and where to add code:

```js
switch (result.event) {
  case PAYMENT_EVENTS.STRIPE_PAYMENT_SUCCEEDED:
  case PAYMENT_EVENTS.LS_ORDER_CREATED:
    // Add your logic here: send confirmation email, update DB, etc.
    break
  // ...
}
```

**Webhook deduplication**:
- Providers retry webhooks on failure — the same event can arrive multiple times
- The module includes in-memory deduplication: if the same event ID arrives twice, it returns `{ received: true, duplicate: true }` and skips processing
- Warning callout: in-memory deduplication resets on server restart. For production, use Redis or a database table to persist processed event IDs.

**Testing locally**:

Stripe:
```bash
stripe listen --forward-to localhost:3000/payments/webhook
```

LemonSqueezy:
```bash
# Expose your local server
npx ngrok http 3000
# Then set your webhook URL in the LemonSqueezy dashboard to:
# https://your-ngrok-url.ngrok.io/payments/webhook
```

---

### Page 6: `6. environment-variables.md`
**Title**: Environment Variables
**Navigation icon**: `i-heroicons-key`
**Purpose**: Single source of truth for every payment-related env var. Developers come here when they see an error about missing config.

**Must cover**:

Complete table of all vars:

| Variable | Required | Provider | Description |
|---|---|---|---|
| `PAYMENT_PROVIDER` | Yes | Both | `"stripe"` or `"lemonsqueezy"` |
| `STRIPE_SECRET_KEY` | If Stripe | Stripe | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | If Stripe | Stripe | `whsec_...` from Stripe dashboard |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe | Frontend only — `pk_live_...` |
| `LEMONSQUEEZY_API_KEY` | If LemonSqueezy | LemonSqueezy | From LS API settings |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | If LemonSqueezy | LemonSqueezy | From LS webhook settings |
| `LEMONSQUEEZY_STORE_ID` | If LemonSqueezy | LemonSqueezy | Numeric store ID from LS dashboard URL |

**Full `.env` block** — the complete copy-paste block as it appears in `.env.example`:
```env
# Payments
PAYMENT_PROVIDER=

# Stripe — https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

# LemonSqueezy — https://app.lemonsqueezy.com/settings/api
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_STORE_ID=
```

**Notes per variable**:
- `PAYMENT_PROVIDER` — this is how you switch providers. No code change needed, just update this value and restart.
- `STRIPE_PUBLISHABLE_KEY` — safe to expose in frontend code. Not used server-side. Include it in your `.env` for reference but it's never read by the server.
- `LEMONSQUEEZY_STORE_ID` — numeric only. Find it in the URL: `app.lemonsqueezy.com/stores/[THIS_NUMBER]`
- All payment vars are optional in the Zod env schema — if you don't use payments, the server won't crash because of missing payment vars.

**Error reference** — what each config error means:

| Error code | Meaning | Fix |
|---|---|---|
| `PROVIDER_NOT_CONFIGURED` | `PAYMENT_PROVIDER` env var not set | Add `PAYMENT_PROVIDER=stripe` or `lemonsqueezy` to `.env` |
| `CONFIG_ERROR` | Required key missing for selected provider | Check the required vars for your provider |
| `WEBHOOK_INVALID` | Webhook signature verification failed | Check `STRIPE_WEBHOOK_SECRET` or `LEMONSQUEEZY_WEBHOOK_SECRET` |

---

### Page 7: `7. non-charcole-users.md`
**Title**: Using Without Charcole
**Navigation icon**: `i-heroicons-puzzle-piece`
**Purpose**: For developers who have an existing Express app and want to add `@charcoles/payments` directly without using the Charcole CLI. Mirrors the pattern from `5. swagger/8. non-charcole-users.md`.

**Must cover**:

**Installation**:
```bash
npm install @charcoles/payments
```

**The critical setup order** (warning callout — same as setup page, repeated here because this page is read independently):
```js
import express from 'express'
import { setupPayments } from '@charcoles/payments'

const app = express()

// ⚠️ Must come BEFORE express.json()
app.use('/payments/webhook', express.raw({ type: 'application/json' }))

app.use(express.json())
// ... rest of your middleware

setupPayments(app, {
  provider: 'stripe',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
})

app.listen(3000)
```

**All options for `setupPayments()`**:
```js
setupPayments(app, {
  provider: 'stripe',              // or 'lemonsqueezy'
  stripeSecretKey: '...',
  stripeWebhookSecret: '...',
  lemonSqueezyApiKey: '...',
  lemonSqueezyWebhookSecret: '...',
  lemonSqueezyStoreId: '...',
  mountPath: '/payments',          // default — change if needed
})
```

**LemonSqueezy example**:
```js
setupPayments(app, {
  provider: 'lemonsqueezy',
  lemonSqueezyApiKey: process.env.LEMONSQUEEZY_API_KEY,
  lemonSqueezyWebhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  lemonSqueezyStoreId: process.env.LEMONSQUEEZY_STORE_ID,
})
```

**Using adapters directly** (advanced — for when you want the adapter logic without the Express routes):
```js
import { StripeAdapter, LemonSqueezyAdapter } from '@charcoles/payments'

const adapter = new StripeAdapter({
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
})

const result = await adapter.createPayment({ amount: 2999, currency: 'usd' })
```

**TypeScript support** — the package ships `index.d.ts`. All types are available:
```ts
import type { CreatePaymentResult, PaymentStatus, SetupPaymentsOptions } from '@charcoles/payments'
```

---

### Page 8: `8. payments-examples.md`
**Title**: Examples
**Navigation icon**: `i-heroicons-code-bracket`
**Purpose**: Complete, copy-paste-ready examples for the most common payment scenarios. Equivalent to `5. swagger/9. swagger-examples.md`. This is the page developers keep open while building.

**Must cover**:

**Example 1: Full Stripe payment flow**
- Frontend calls create-intent → gets clientSecret → confirms with Stripe.js → webhook fires → server fulfills order
- Show the server-side code only (this is backend docs). Frontend code is a brief comment.
- Show the curl request:
```bash
curl -X POST http://localhost:3000/payments/create-intent \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount": 2999, "currency": "usd", "metadata": {"orderId": "order_123"}}'
```

**Example 2: Full LemonSqueezy checkout flow**
- Server-side call with variantId in metadata → gets checkoutUrl → redirect user
```bash
curl -X POST http://localhost:3000/payments/create-intent \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount": 2999, "currency": "usd", "metadata": {"variantId": "78901", "orderId": "order_456"}}'
```

**Example 3: Refund a payment**
```bash
# Full refund
curl -X POST http://localhost:3000/payments/refund \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"paymentId": "pi_3abc..."}'

# Partial refund ($10.00)
curl -X POST http://localhost:3000/payments/refund \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"paymentId": "pi_3abc...", "amount": 1000}'
```

**Example 4: Check payment status**
```bash
curl -X GET http://localhost:3000/payments/status/pi_3abc... \
  -H "Authorization: Bearer <token>"
```

**Example 5: Custom webhook fulfillment logic**
Show the switch statement in the controller with real logic filled in (not just comments):
```js
switch (result.event) {
  case PAYMENT_EVENTS.STRIPE_PAYMENT_SUCCEEDED:
  case PAYMENT_EVENTS.LS_ORDER_CREATED:
    await sendConfirmationEmail(result.data)
    await updateOrderStatus(result.data.id, 'paid')
    break

  case PAYMENT_EVENTS.STRIPE_PAYMENT_FAILED:
    await notifyCustomerOfFailure(result.data)
    break

  case PAYMENT_EVENTS.LS_ORDER_REFUNDED:
  case PAYMENT_EVENTS.STRIPE_REFUND_CREATED:
    await updateOrderStatus(result.data.id, 'refunded')
    break
}
```

**Example 6: PKR payments with LemonSqueezy**
- Pakistani developers section — show a complete `.env` for PKR-based SaaS:
```env
PAYMENT_PROVIDER=lemonsqueezy
LEMONSQUEEZY_API_KEY=your_api_key
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
LEMONSQUEEZY_STORE_ID=12345
```
- Brief note: set your product price in PKR in the LemonSqueezy dashboard. The `amount` field in the API is informational when using LemonSqueezy — the actual charge is determined by the variant price in your store.
- Note on variantId: create a single "Custom Payment" product variant at your standard price, or separate variants for different tiers.

---

## Navigation File: `.navigation.yml`

Create `content/2. guides/6. payments/.navigation.yml`:

```yaml
title: Payments
icon: i-heroicons-credit-card
```

Update `content/2. guides/.navigation.yml` to include the payments section. Add an entry for `6. payments` in the same format as existing entries.

---

## `nuxt.config.ts` Sitemap Updates

Add these URLs to the sitemap configuration in `nuxt.config.ts`:

```
/guides/payments
/guides/payments/setup
/guides/payments/providers
/guides/payments/endpoints
/guides/payments/webhooks
/guides/payments/environment-variables
/guides/payments/non-charcole-users
/guides/payments/payments-examples
```

Match the exact format of existing sitemap entries (check whether they use trailing slashes or not, whether they're in a `urls` array or a different structure).

---

## Summary: What the AI Agent Must Produce

| File | Status |
|---|---|
| `content/2. guides/6. payments/.navigation.yml` | Create |
| `content/2. guides/6. payments/1. introduction.md` | Create |
| `content/2. guides/6. payments/2. setup.md` | Create |
| `content/2. guides/6. payments/3. providers.md` | Create |
| `content/2. guides/6. payments/4. endpoints.md` | Create |
| `content/2. guides/6. payments/5. webhooks.md` | Create |
| `content/2. guides/6. payments/6. environment-variables.md` | Create |
| `content/2. guides/6. payments/7. non-charcole-users.md` | Create |
| `content/2. guides/6. payments/8. payments-examples.md` | Create |
| `content/2. guides/.navigation.yml` | Modify — add payments entry |
| `nuxt.config.ts` | Modify — add payment page URLs to sitemap |

**Total: 9 new files + 2 modifications.**

---

## What NOT to Document

- Internal adapter implementation details (PaymentAdapter class, StripeAdapter internals)
- The `resetAdapter()` function (test utility, not for users)
- Zod schema internals
- File structure of `packages/payments/src/`
- Any Phase 1–6 implementation plan content
- TypeScript types unless showing the standalone package usage

The docs are for people using Charcole, not people contributing to it.

---

## Cross-Links Between Pages

Every page should have natural links to related pages. Minimum cross-links:

- Introduction → Setup, Providers
- Setup → Environment Variables, Providers, Endpoints
- Providers → Environment Variables, Endpoints, Examples
- Endpoints → Webhooks, Examples
- Webhooks → Setup (raw body reminder), Examples
- Environment Variables → Providers
- Non-Charcole Users → Endpoints, Webhooks, Examples
- Examples → Providers (for variantId context)

---

*End of documentation plan — Charcole v2.3.0 Payments Module*