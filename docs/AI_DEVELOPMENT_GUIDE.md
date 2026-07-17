# AI Development Guide

This platform is "AI-Native". AI is not just a chatbot wrapper; it drives workflows.

## 1. Large Language Models (LLMs)
- **Vercel AI SDK**: We use the Vercel AI SDK (`ai` and `@ai-sdk/openai`) for standardized LLM streaming, tool calling, and structured data generation (`generateObject`).
- **Model Selection**: 
  - Use fast/cheap models (e.g., `gpt-4o-mini`, `claude-3-haiku`) for basic classification, data extraction, and routing.
  - Use frontier models (e.g., `gpt-4o`, `claude-3.5-sonnet`) for complex reasoning and final generation.

## 2. Retrieval-Augmented Generation (RAG)
- **Embeddings**: We use `text-embedding-3-small`.
- **Storage**: Stored in Supabase `pgvector` columns.
- **Retrieval Flow**:
  1. User asks question.
  2. Embed user question.
  3. Query Supabase using `vector_cosine_ops` (ensure RLS applies so users only query their organization's data!).
  4. Inject retrieved chunks into LLM prompt.

## 3. Agentic Workflows & Tool Calling
- AI agents in the app must be capable of taking action on behalf of the user.
- Define strict, Zod-validated tools using the Vercel AI SDK.
- **Security Check**: ALWAYS verify authorization inside the tool implementation before executing the database mutation. Do not trust the LLM to verify permissions.

## 4. Memory & Context Management
- LLM context windows are large but finite (and expensive).
- Store conversation history in the database.
- Periodically summarize long conversations in a background job, keeping only the summary and the last N messages in the active context window.
