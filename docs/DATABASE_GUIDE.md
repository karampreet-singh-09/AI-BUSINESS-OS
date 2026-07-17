# Database & Schema Guide

This project relies on PostgreSQL (via Supabase) as its core data engine. Strict adherence to these rules ensures data integrity, security, and performance.

## Core Conventions
- **Naming**: Use `snake_case` for all table names, column names, and functions.
- **Primary Keys**: Use `UUID v4` for all primary keys. Never use auto-incrementing integers.
- **Timestamps**: Every table MUST have `created_at` (timestamptz) and `updated_at` (timestamptz) defaulting to `now()`.
- **Soft Deletes**: Avoid hard deletes for critical business data. Use a `deleted_at` (timestamptz) column instead.

## Multitenancy & Row Level Security (RLS)
Security is handled at the database level.
1. **Organization ID**: Every tenant-specific table MUST have an `organization_id` foreign key.
2. **Enable RLS**: `ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;`
3. **Strict Policies**: Write explicit policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
   
*Example Policy:*
```sql
CREATE POLICY "Users can view org data" ON public.contacts
FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
  )
);
```

## AI & Vector Embeddings (pgvector)
We use `pgvector` for our RAG pipeline.
- Embedding columns should be named `embedding` with type `vector(1536)` (assuming OpenAI embeddings).
- **Indexing**: Always create an HNSW index on the vector column to ensure fast similarity search at scale.
  ```sql
  CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
  ```

## Migrations
We use Supabase Local CLI for migrations.
1. Make changes locally.
2. Generate migration: `supabase db diff -f feature_name`
3. Review the generated `.sql` file in `supabase/migrations/`.
4. Never modify a migration file after it has been deployed.

## Triggers & Functions
Use PostgreSQL triggers for automatic bookkeeping:
- Automatically updating the `updated_at` column.
- Synchronizing user profiles when a new user signs up via `auth.users`.

## Foreign Keys & Cascading
- Always define foreign key constraints to maintain referential integrity.
- Use `ON DELETE CASCADE` only for tightly coupled child records (e.g., deleting a contact deletes its notes).
- Use `ON DELETE RESTRICT` for vital records (e.g., you cannot delete an organization if it has active subscriptions).
