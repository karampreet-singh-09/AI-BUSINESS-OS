# Architecture Decision Log (ADR)

This log records major architectural decisions made during the development of the platform.

## Format
Every decision must follow this format:
- **Date**: [YYYY-MM-DD]
- **Decision**: [What did we decide?]
- **Context**: [Why was this a problem? What were the alternatives?]
- **Consequences**: [What are the trade-offs of this decision?]

---

### [2026-07-17] Adopt Next.js App Router & Server Actions
- **Context**: We need a fast, SEO-friendly framework that reduces client-side JavaScript.
- **Decision**: Use Next.js App Router for the entire application, utilizing Server Actions for mutations instead of traditional API Routes, to tightly couple the frontend with business logic.
- **Consequences**: We are locked into the React/Next ecosystem. We must carefully manage the boundary between Server and Client components.

### [2026-07-17] Supabase for Auth & Database
- **Context**: We need robust multitenancy and vector search capabilities.
- **Decision**: Use Supabase (PostgreSQL). Rely on Row Level Security (RLS) for tenant isolation, and pgvector for AI memory and RAG.
- **Consequences**: We are writing authorization logic in SQL (RLS). We must maintain strict migration disciplines.
