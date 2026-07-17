# Monetization & Billing Guide

We use Stripe to handle billing, subscriptions, and usage-based pricing.

## 1. Core Architecture
- The "Customer" in Stripe is mapped to the `organization_id`, NOT the individual user.
- The Supabase database holds a synchronized copy of the billing state (e.g., `subscriptions`, `prices`, `products`) via Stripe Webhooks.
- Do NOT query the Stripe API directly from the frontend to check subscription status. Always check the Supabase database.

## 2. Stripe Webhooks
Our single source of truth for billing state is the Stripe Webhook endpoint.
- Endpoint: `/api/webhooks/stripe`
- Required Events to handle:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Webhooks MUST verify the `Stripe-Signature` header before making any database changes.

## 3. Entitlements & Guardrails
- Before allowing an organization to perform a premium action (e.g., creating a new team member, generating an AI workflow), you must verify their entitlement.
- Create utility functions in `src/features/billing/queries/` to check limits (e.g., `checkSeatLimit(orgId)`).
- If an organization is past due on their bill, downgrade their access gracefully (read-only mode) rather than hard-crashing.
