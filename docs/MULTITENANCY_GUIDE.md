# Multitenancy Guide

Our SaaS supports multiple businesses (tenants) operating on the same infrastructure. Isolation is paramount.

## 1. The Organization ID
- Almost every table in the database MUST have an `organization_id` column.
- The `organization_id` is the boundary. Data from Org A must never leak to Org B.

## 2. Enforcing Isolation via RLS
We rely on Supabase Row Level Security to enforce isolation at the database level.

```sql
-- Example: A user can only access contacts belonging to their organization
CREATE POLICY "Contacts Isolation" ON public.contacts
FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
  )
);
```
- Never write API logic that fetches "all contacts" and filters them in JavaScript. The database must filter them before they ever reach the API.

## 3. Context & Routing
- In the frontend, the current organization context can be determined by the URL (e.g., `app.saas.com/[orgSlug]/dashboard` or via a selected org state stored in a cookie).
- Always pass the `organization_id` to Server Actions explicitly, but ALSO verify on the backend that the logged-in user actually has access to that `organization_id`.
