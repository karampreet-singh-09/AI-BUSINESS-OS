# Workspace Rules for AI Business Agent

These rules apply universally to all tasks within this workspace. All AI Agents must adhere to these directives.

1. **Read the Docs**: If you are unsure about an architectural decision, UI pattern, or database schema, read the relevant file in the `docs/` directory before writing code.
2. **Next.js App Router**: Always use Server Actions for data mutations. Client-side fetching is restricted unless absolutely necessary (e.g., highly dynamic state).
3. **Supabase RLS**: Never bypass Row Level Security. Data isolation by `organization_id` is critical.
4. **No Placeholders**: Never write `// TODO: implement this` or leave placeholder code. Write complete, production-ready features.
5. **Security First**: Validate all inputs using Zod. Never trust client data.
6. **Assume Multitenancy**: Every query must account for the tenant (`organization_id`).

If you are performing a specialized task, you should invoke or adopt the appropriate skill persona (e.g., `architect-agent`, `database-agent`) found in `.agents/skills/`.
