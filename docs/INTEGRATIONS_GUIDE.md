# Integrations Guide

Our SaaS platform acts as the central nervous system for our customers' businesses. Integrations are key.

## 1. Inbound Webhooks
When receiving data from external services (e.g., Stripe, WhatsApp, SendGrid):
- **Verification**: You MUST verify the webhook signature. Never process unverified webhooks.
- **Idempotency**: Webhook endpoints must be idempotent. External services will often retry requests. Ensure processing the same webhook twice does not duplicate data (e.g., track processed webhook IDs in the database).
- **Asynchronous Processing**: If a webhook requires heavy processing (like generating an AI response to a WhatsApp message), acknowledge the webhook immediately (`200 OK`) and process the payload asynchronously using Inngest, Trigger.dev, or Supabase Edge Functions.

## 2. Outbound API Calls
When calling external services:
- **Timeouts**: Always enforce a timeout. Do not let an external API outage hang our server.
- **Retries**: Implement exponential backoff for transient errors (5xx codes, Rate Limits).
- **Secrets**: Store external API keys securely (Supabase Vault or Vercel Env Vars).

## 3. Specific Integrations

### WhatsApp (Meta Graph API)
- Verify the hub signature on setup.
- Webhooks come in via `POST /api/webhooks/whatsapp`.
- Match the incoming phone number to a Contact in the CRM to route the conversation to the correct organization.

### Email (Resend / SendGrid)
- Transactional emails (invites, password resets) are sent via Resend.
- Keep email templates in a dedicated folder (`src/features/email/templates/`) using React Email.
