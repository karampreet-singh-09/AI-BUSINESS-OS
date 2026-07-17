# System Architecture Guide

This document outlines the high-level architecture of the AI Business Agent platform. The architecture is designed to support a scalable, secure, multi-tenant SaaS application.

## Core Paradigms
- **Serverless First**: Rely on Vercel Edge Functions and Serverless Functions to handle compute dynamically.
- **Thick Backend-for-Frontend (BFF)**: Next.js App Router serves as our BFF. We do not use a separate Node.js/Express backend. All API routes and Server Actions live within Next.js.
- **Database as the Source of Truth**: Supabase (PostgreSQL) handles relational data, authentication state, and vector embeddings (pgvector).
- **Zero-Trust Multitenancy**: Row Level Security (RLS) is strictly enforced at the database level. The application layer never bypasses RLS.

## Directory Structure
We use a feature-driven folder structure inside the Next.js `src/` directory.

```
src/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication flows (Login, Register)
│   ├── (dashboard)/      # Protected dashboard routes
│   └── api/              # Public-facing REST APIs and Webhooks
├── components/           # Shared UI components (shadcn/ui, primitives)
│   ├── ui/               # Base design system components
│   └── shared/           # Complex shared components (e.g., DataTables)
├── features/             # Feature modules (The core of our app)
│   ├── organizations/    # Org management, invites, members
│   ├── crm/              # Contacts, pipelines, deals
│   ├── ai/               # Chatbots, workflows, RAG integrations
│   └── billing/          # Stripe integration, subscriptions
├── lib/                  # Core utilities (Supabase clients, generic helpers)
├── styles/               # Global CSS and Tailwind configs
└── types/                # Global TypeScript definitions
```

## Feature Module Anatomy
Each folder inside `src/features/` should be highly cohesive and self-contained:
- `components/` - UI components specific to this feature.
- `actions/` - Next.js Server Actions (mutations).
- `queries/` - Database fetch logic (read-only).
- `schemas/` - Zod validation schemas.
- `types.ts` - TypeScript interfaces specific to the feature.

## Data Flow
1. **Client -> Server**: Components use standard React forms or `useTransition` to call Next.js Server Actions.
2. **Server Action**: Validates input using Zod, authenticates the user, and communicates with Supabase.
3. **Database**: Supabase evaluates RLS policies, executes the query, and returns data.
4. **Server -> Client**: Next.js `revalidatePath` or `revalidateTag` updates the cache and pushes the new state to the client.

## Authentication & Authorization
- **Auth**: Supabase Auth with SSR. Cookies are securely transmitted to Next.js middleware.
- **Middleware**: Protects `/(dashboard)/*` routes and handles tenant routing if subdomains are used.
- **Authz**: Handled exclusively via PostgreSQL RLS policies based on `auth.uid()` and organization memberships.
