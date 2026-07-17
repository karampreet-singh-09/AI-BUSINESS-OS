# Product Vision & Scope

## The Mission
To build an **AI operating system for small and medium businesses (SMBs)**. 

## What We Are NOT Building
- We are not building a simple wrapper around ChatGPT.
- We are not building a generic chatbot that exists outside the context of the business data.

## What We ARE Building
- **Customer Conversation Management**: A unified inbox for customer interactions.
- **Contextual Memory**: The AI remembers customer information across interactions.
- **Knowledge Retrieval (RAG)**: The AI answers questions definitively based ONLY on uploaded business knowledge.
- **Workflow Automation**: The AI leverages "Tool Calling" to execute repetitive business workflows (e.g., updating a CRM record, sending an email).
- **Central Dashboard**: A clean, scalable, multi-tenant UI for business owners to manage operations.

## MVP Focus
For the MVP stage, every architectural decision must be evaluated against these metrics:
1. **Simplicity**: Do not over-engineer. Use Supabase and Next.js primitives.
2. **Scalability**: The data model (PostgreSQL + RLS) must gracefully handle thousands of tenants.
3. **Maintainability**: The codebase must remain 100% human-readable. Do not tolerate duplicate code (DRY).
