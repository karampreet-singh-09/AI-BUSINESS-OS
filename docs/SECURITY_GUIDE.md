# Security Guide

Security is non-negotiable for a B2B SaaS platform. Every layer must be secured.

## 1. Authentication
- We strictly use Supabase Auth with **Server-Side Rendering (SSR)**.
- JWTs must not be stored in `localStorage`. We use HTTP-only, secure cookies to transport the auth token.
- Passwordless logins (Magic Links) and OAuth (Google, Microsoft) are highly recommended.

## 2. Authorization (Row Level Security)
- Supabase Row Level Security (RLS) is our primary defense against data leakage.
- Even if the API tier is compromised, the database should reject unauthorized queries.
- Never use the `service_role` key in client code or standard API routes. Only use it in specific administrative webhooks (e.g., Stripe fulfillment) where standard user context is unavailable.

## 3. Input Validation & SQL Injection
- Always validate input using Zod before processing.
- Since we use the Supabase JS Client, queries are parameterized automatically, mitigating SQL Injection.
- However, if writing raw RPC functions in PostgreSQL, always use parameter binding.

## 4. Cross-Site Scripting (XSS)
- React automatically escapes variables in JSX.
- Never use `dangerouslySetInnerHTML` unless rendering explicitly sanitized Markdown/HTML (using DOMPurify).

## 5. Cross-Site Request Forgery (CSRF)
- Next.js Server Actions automatically include built-in CSRF protection.
- For external API routes mutating data, validate the Origin and use strict CORS policies.

## 6. Secret Management
- Never commit `.env` files.
- Use Vercel Environment Variables for production/preview secrets.
- Use `NEXT_PUBLIC_` only for variables that are safe to expose to the browser (e.g., Supabase URL, Supabase Anon Key).

## 7. Dependency Scanning
- Periodically run `npm audit`.
- Keep Next.js and core dependencies updated to receive security patches.
