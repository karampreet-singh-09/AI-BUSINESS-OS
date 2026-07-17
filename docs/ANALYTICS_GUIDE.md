# Analytics & Telemetry Guide

To build a great product, we need to know how it is used.

## 1. Product Analytics (PostHog)
We use PostHog for product analytics (page views, button clicks, feature usage).
- **Client-side**: Use `posthog-js` wrapped in a context provider. Identify users upon login.
- **Server-side**: Use `posthog-node` inside Server Actions for critical events (e.g., "Subscription Created", "AI Agent Deployed") to ensure ad-blockers do not hide them.

## 2. Event Naming Convention
- Use `Noun Action` format:
  - `Contact Created`
  - `AI Workflow Started`
  - `Subscription Upgraded`
- Attach relevant metadata to every event (e.g., `organization_id`, `plan_tier`).

## 3. Privacy
- Never send Personally Identifiable Information (PII) like raw passwords, SSNs, or sensitive customer CRM data to PostHog.
- Hash emails or use internal user IDs where possible.
