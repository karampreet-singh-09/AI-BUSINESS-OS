# AI Business Agent - The OS for SMBs

Welcome to the AI Business Agent repository. 

**The Goal:** We are NOT building just another AI chatbot. We are building an **AI operating system for small and medium businesses (SMBs)**. 

The AI serves as a deeply integrated layer to manage customer conversations, remember customer information, answer questions using uploaded knowledge bases (RAG), automate repetitive workflows, and act as the central operational dashboard.

## Core Design Principles
This project is an MVP focused on simplicity, scalability, and maintainability.
- **Modular Architecture**: Strict separation of concerns (Frontend, Backend, AI, Integrations).
- **Production-Ready**: Type-safe code, secure authentication, zero "AI slop".
- **Multi-tenant Architecture**: Strong Row Level Security (RLS) data isolation per business.
- **Clean UI / Excellent UX**: Mobile responsive, dark/light mode support, component-based frontend.

## Technology Stack
- **Frontend**: React (Next.js App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase, PostgreSQL, Supabase Auth, Edge Functions (when needed)
- **AI**: OpenAI, RAG (pgvector), Vercel AI SDK Tool Calling
- **Deployment**: Vercel

## Project Structure
We follow a feature-based folder architecture (`src/features/`) to maintain modularity. Please read the extensive documentation in the `docs/` folder before contributing.

## Development Directives
- **Documentation First**: AI agents and developers must proactively update the markdown files in `docs/` whenever an architectural decision or standard changes, without requiring explicit permission.
- **No Magic**: Write clean, readable code that any human engineer can easily pick up.

---
*For detailed architecture, state management, routing, and environment guidelines, consult the `docs/` directory.*
